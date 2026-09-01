// Generates responsive WebP variants for every raster image in public/images.
// For each source image `name.jpg|png` it writes `name-400.webp`, `name-800.webp`,
// and `name-1600.webp` (never upscaling). Originals are kept as the full-res
// version used by the lightbox. Run: `npm run optimize`.
import { readdir, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const IMAGES_DIR = path.resolve(__dirname, '..', 'public', 'images')
const WIDTHS = [400, 800, 1600]
const SOURCE_RE = /\.(jpe?g|png|webp)$/i
const VARIANT_RE = /-(?:400|800|1600)\.webp$/i
// `--force` regenerates every variant even if it looks up-to-date (use after
// changing the pipeline, e.g. the EXIF auto-rotate below).
const FORCE = process.argv.includes('--force')

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

// Returns true if `out` is already newer than its `source` (nothing to do).
async function isUpToDate(source, out) {
  if (FORCE || !existsSync(out)) return false
  const [s, o] = await Promise.all([stat(source), stat(out)])
  return o.mtimeMs >= s.mtimeMs
}

// Writes every responsive variant for one source image; returns counts.
async function variantsFor(file) {
  const base = file.replace(SOURCE_RE, '')
  let made = 0
  let skipped = 0
  for (const width of WIDTHS) {
    const out = `${base}-${width}.webp`
    if (await isUpToDate(file, out)) {
      skipped++
      continue
    }
    // Never upscale, so srcset candidates always resolve; small sources cap at
    // their native width. `.rotate()` bakes in EXIF orientation so portrait
    // phone photos aren't sideways (WebP output drops EXIF).
    await sharp(file)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(out)
    made++
  }
  return { made, skipped }
}

async function run() {
  if (!existsSync(IMAGES_DIR)) {
    console.error(`No images directory at ${IMAGES_DIR}`)
    process.exit(1)
  }

  let made = 0
  let skipped = 0
  const failed = []

  for await (const file of walk(IMAGES_DIR)) {
    if (!SOURCE_RE.test(file) || VARIANT_RE.test(file)) continue
    try {
      const r = await variantsFor(file)
      made += r.made
      skipped += r.skipped
    } catch (err) {
      failed.push(`${path.relative(IMAGES_DIR, file)} (${err.message.split('\n')[0]})`)
    }
  }

  console.log(`Optimized images: ${made} written, ${skipped} up-to-date.`)
  if (failed.length) {
    console.warn(`\nSkipped ${failed.length} unreadable file(s):`)
    failed.forEach((f) => console.warn(`  - ${f}`))
  }
}

await run()
