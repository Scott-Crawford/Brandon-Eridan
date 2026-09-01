import { test, expect } from '@playwright/test'
import { projects, projectsByCategory } from '../src/data/projects.js'

const STATIC_ROUTES = ['/', '/costumes', '/fashion', '/digital-patterning', '/about']
const WORK_ROUTES = projects.map((p) => `/work/${p.slug}`)
const ALL_ROUTES = [...STATIC_ROUTES, ...WORK_ROUTES]

// Collect anything that should never happen: console.error output or uncaught
// exceptions from OUR site. Failures from third-party embeds we don't control
// (e.g. Google Fonts) are ignored.
function watchForErrors(page) {
  const errors = []
  page.on('console', (msg) => {
    if (msg.type() !== 'error') return
    const url = msg.location()?.url || ''
    const isThirdParty = url && !url.startsWith('http://localhost:4173')
    if (isThirdParty) return
    errors.push(`console.error: ${msg.text()} @ ${url || 'unknown'}`)
  })
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`))
  return errors
}

test.describe('every page renders cleanly', () => {
  for (const route of ALL_ROUTES) {
    test(`renders ${route}`, async ({ page }) => {
      const errors = watchForErrors(page)
      await page.goto(route, { waitUntil: 'load' })

      await expect(page.locator('.site')).toBeVisible()
      await expect(page.locator('.site-main')).toBeVisible()
      await expect(page.locator('.site-footer')).toBeVisible()

      expect(errors, `Errors on ${route}:\n${errors.join('\n')}`).toEqual([])
    })
  }
})

test.describe('single final design', () => {
  test('no layout switcher exists anywhere', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.layout-switcher')).toHaveCount(0)
    await expect(page.locator('.site')).not.toHaveAttribute('data-layout', /.*/)
  })

  test('mobile landing keeps the header but hides categories + hero title', async ({ page }, testInfo) => {
    const isMobile = testInfo.project.name === 'mobile'

    await page.goto('/')
    // Header is always present for navigation.
    await expect(page.locator('.site-header')).toBeVisible()
    if (isMobile) {
      // On the mobile landing page the category boxes and hero name are hidden.
      await expect(page.locator('.site-header .nav-boxes')).toBeHidden()
      await expect(page.locator('.hero-box')).toBeHidden()
    } else {
      await expect(page.locator('.site-header .nav-boxes')).toBeVisible()
      await expect(page.locator('.hero-box')).toBeVisible()
    }

    // Elsewhere the category nav is always visible.
    await page.goto('/costumes')
    await expect(page.locator('.site-header .nav-boxes')).toBeVisible()
  })

  test('home hero shows a single image (no slideshow controls)', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.hero-photo')).toHaveCount(1)
    await expect(page.locator('.hero-controls')).toHaveCount(0)
  })

  test('home tiles show a readable caption shadowbox', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.tile .tile-caption').first()).toBeVisible()
  })
})

test.describe('projects + galleries', () => {
  test('category pages lead with the expected project', async ({ page }) => {
    const leads = {
      '/costumes': 'Regency 3-Piece Suit',
      '/fashion': 'Jumpsuit Upcycle',
      '/digital-patterning': 'Skating Costume',
    }
    for (const [route, firstTitle] of Object.entries(leads)) {
      await page.goto(route)
      await expect(page.locator('.work-card').first()).toBeVisible()
      await expect(page.locator('.work-title').first()).toHaveText(firstTitle)
    }
  })

  test('costumes read left-to-right across columns match the data order', async ({ page }) => {
    await page.goto('/costumes')
    // Cards are distributed round-robin across columns, so reading each row
    // left-to-right (col0, col1, col2, next row…) must reproduce the data order.
    const cols = await page.locator('.work-col').all()
    const perCol = []
    for (const col of cols) perCol.push(await col.locator('.work-title').allTextContents())

    const rowMajor = []
    const maxLen = Math.max(...perCol.map((c) => c.length))
    for (let r = 0; r < maxLen; r++) {
      for (const c of perCol) {
        if (c[r] != null) rowMajor.push(c[r])
      }
    }
    expect(rowMajor).toEqual(projectsByCategory('costumes').map((p) => p.title))
  })

  test('no broken cover images on category pages', async ({ page }) => {
    for (const route of ['/costumes', '/fashion', '/digital-patterning']) {
      await page.goto(route)
      const broken = await page.evaluate(async () => {
        const imgs = [...document.querySelectorAll('.work-card img.thumb')]
        imgs.forEach((img) => (img.loading = 'eager'))
        await Promise.all(
          imgs.map((img) => (img.complete ? Promise.resolve() : img.decode().catch(() => {}))),
        )
        return imgs.filter((img) => img.naturalWidth === 0).map((img) => img.currentSrc || img.src)
      })
      expect(broken, `Broken covers on ${route}: ${broken.join(', ')}`).toEqual([])
    }
  })

  test('gallery uses responsive srcset; lightbox opens the full-res original', async ({ page }) => {
    await page.goto('/work/arcadia')
    const firstThumb = page.locator('.project-gallery img.thumb').first()
    await expect(firstThumb).toHaveAttribute('srcset', /-800\.webp/)

    await page.locator('button[aria-label="Open image 1"]').click()
    const lb = page.locator('img.lb-image')
    await expect(lb).toBeVisible()
    // Image 1 is the category cover, which now leads the gallery.
    await expect(lb).toHaveAttribute('src', /\/images\/arcadia\/cover\.(jpe?g|png)$/i)
    expect(await lb.getAttribute('srcset')).toBeNull()
  })

  test('project page shows the Atelier credit box when credits exist', async ({ page }) => {
    await page.goto('/work/arcadia')
    await expect(page.locator('.credits')).toBeVisible()
    await expect(page.locator('.credits-heading')).toHaveText(/credits/i)
  })

  test('digital-patterning cover shows a real (non-placeholder) pattern image', async ({ page }) => {
    await page.goto('/digital-patterning')
    const firstCard = page.locator('.work-card').first()
    const cover = firstCard.locator('img.thumb')
    await expect(cover).toBeVisible()
    const naturalWidth = await cover.evaluate((img) => img.naturalWidth)
    expect(naturalWidth).toBeGreaterThan(0)
  })

  test('unknown route renders the 404 page', async ({ page }) => {
    await page.goto('/work/does-not-exist')
    await expect(page.getByText(/not found/i)).toBeVisible()
  })
})

test.describe('contact links (Instagram + email only)', () => {
  test('footer shows Instagram + email and nothing else', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.footer-socials a')).toHaveCount(2)
    await expect(page.locator('.footer-socials a[href*="instagram.com"]')).toBeVisible()
    await expect(page.locator('.footer-socials a[href^="mailto:"]')).toBeVisible()
    await expect(page.locator('.footer-socials a[href*="facebook"]')).toHaveCount(0)
    await expect(page.locator('.footer-socials a[href*="linktr.ee"]')).toHaveCount(0)
  })

  test('about page: Instagram + email links, résumé + commission buttons', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('.about-links a[href*="instagram.com"]')).toBeVisible()
    await expect(page.locator('.about-links a[href^="mailto:"]')).toBeVisible()
    await expect(page.locator('.about-links a[href*="facebook"]')).toHaveCount(0)

    const resume = page.locator('.about-actions a', { hasText: /résumé/i })
    await expect(resume).toHaveAttribute('target', '_blank')
    await expect(resume).not.toHaveAttribute('download', /.*/)

    await expect(page.locator('.about-actions a', { hasText: /commission/i })).toBeVisible()
    await expect(page.locator('.resume-embed, .commission-embed')).toHaveCount(0)
  })
})
