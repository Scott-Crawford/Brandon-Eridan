# Brandon-Eridan — Portfolio

Costume design, fashion, and digital patterning portfolio for **Brandon Eridan**
(Costume Technician | Digital Patternmaker, Pittsburgh, PA).

- **Live domain:** [brandoneridan.com](https://brandoneridan.com)
- **Stack:** React + Vite + React Router, deployed free on GitHub Pages.

## The design

One cohesive design, chosen by Brandon, that mixes treatments per page:

| Page | Treatment |
|---|---|
| **Landing** | Centered hero + 2×2 tiles, each label in a readable shadowbox |
| **Category** | 3-column grid that reads left-to-right, images at their original aspect |
| **Project** | Sticky credit box + full-aspect gallery with lightbox |
| **About** | Bio + headshot, Instagram + email, résumé & commission buttons |

Contact is **Instagram + email only** (in the footer and on About). The résumé
opens in a new tab; the commission form links out to Google Forms. The full
design rationale lives in [DESIGN.md](DESIGN.md).

## Real links

- Commission Google Form: <https://docs.google.com/forms/d/e/1FAIpQLSdt6W1e_Kkcp68TuP1WuQLqypOshJlao_LViDmDsxdxtR9geg/viewform>
- Instagram: <https://www.instagram.com/saint_ends/>
- Email: rmeichs75@gmail.com

## Local development

```powershell
npm install
npm run dev       # http://localhost:5173 (service worker disabled in dev)
npm run build     # production build -> dist/
npm run preview   # preview the production build (service worker + optimized images active)
npm run optimize  # (re)generate responsive WebP image variants
npm test          # run the Playwright test suite
npm run test:ui   # Playwright interactive UI mode
```

## Content & assets

- **Projects/metadata:** `src/data/projects.js`
- **Identity & contact (Instagram + email):** `src/data/site.js`
- **Image manifest (hand-maintained slug → cover/gallery map):** `src/data/media.js`
- **Images live in** `public/images/<slug>/` (`cover.*` + `g01..gNN`), and `public/resume.pdf`.

### Responsive images & caching

- `npm run optimize` (`tools/optimize-images.mjs`, uses `sharp`) writes
  `name-400.webp` / `-800` / `-1600` variants next to every `.jpg` / `.png` /
  `.webp` source. Grids and heroes load the right size via `srcset` (see
  `src/lib/img.js`); the **lightbox opens the full-res original**.
- A lightweight service worker (`public/sw.js`) cache-first-serves images for
  instant repeat visits. It is registered **in production builds only**
  (`import.meta.env.PROD`), so `npm run dev` is never affected. Bump the `CACHE`
  constant in `sw.js` to invalidate.
- Run `npm run optimize` after adding new images. It skips corrupt/truncated
  source files and lists them; re-export those from the originals.

## Quality & testing

A Playwright suite (`tests/site.spec.js`, config in `playwright.config.js`) runs
on **desktop + mobile (Pixel 7)** and builds + previews the production bundle
first. `npm test` verifies:

- **Every page** (all static and `/work/:slug` routes) renders header/footer with
  **zero same-origin console errors**. Third-party embed failures are ignored.
- Key features: single design (no layout switcher), header hidden on the mobile
  landing page, hero image loads, category grids populate in the live-site
  order, gallery uses responsive `srcset` while the lightbox opens the full-res
  original, contact is Instagram + email only, résumé opens in a new tab,
  unknown routes 404, and **no cover image is broken** on any category page.

`test-results/`, `playwright-report/`, and `.playwright-mcp/` are gitignored.

## Deployment (GitHub Pages)

Deployment is automated by `.github/workflows/deploy.yml` on every push to `main`:

1. In the repo on GitHub: **Settings → Pages → Build and deployment → Source = GitHub Actions**.
2. Push to `main`. The workflow builds, adds a `404.html` SPA fallback, and deploys.
3. `public/CNAME` (contains `brandoneridan.com`) tells Pages to serve the custom domain.

## Connecting the Namecheap domain (brandoneridan.com)

1. **GitHub side** — repo **Settings → Pages → Custom domain** → enter
   `brandoneridan.com` → **Save**. (Already committed via `public/CNAME`, but
   setting it in the UI triggers verification.)
2. **Namecheap side** — Domain List → **Manage** → **Advanced DNS**. Remove any
   default parking/redirect records, then add:

   | Type | Host | Value | TTL |
   |---|---|---|---|
   | A | `@` | `185.199.108.153` | Automatic |
   | A | `@` | `185.199.109.153` | Automatic |
   | A | `@` | `185.199.110.153` | Automatic |
   | A | `@` | `185.199.111.153` | Automatic |
   | CNAME | `www` | `<your-github-username>.github.io.` | Automatic |

3. Wait for DNS to propagate (minutes–hours). Back in **Settings → Pages**, once
   the domain is verified, tick **Enforce HTTPS**.
4. Visit <https://brandoneridan.com> — the `www` host redirects to the apex.

> Replace `<your-github-username>` with the account that owns this repo
> (currently `Scott-Crawford`). If Brandon later takes ownership, update the
> CNAME record's target accordingly.

## Committing (personal identity)

This repo commits under the personal Git identity:

```powershell
git personal; git add -A; git commit -m "…"; git push
```
