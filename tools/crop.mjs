// Dev-only helper: crop/zoom a source image by fractional box, overwriting the
// source (or writing to an optional out file). Run `npm run optimize` after to
// regenerate the -400/-800/-1600 webp variants.
// Usage: node tools/crop.mjs <relPathUnderPublic> <left> <top> <width> <height> [outRelPath]
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const [rel, l, t, w, h, out] = process.argv.slice(2)
if (!rel || l == null || t == null || w == null || h == null) {
  console.error('Usage: node tools/crop.mjs <path> <left> <top> <width> <height> [out]')
  process.exit(1)
}

// Read from the pristine backup when present so re-runs never double-crop.
const backup = path.resolve('tmp-orig', rel)
const src = fs.existsSync(backup) ? backup : path.resolve('public', rel)
const dst = path.resolve('public', out || rel)

const img = sharp(src, { failOn: 'none' })
const meta = await img.metadata()
const left = Math.max(0, Math.round(meta.width * Number(l)))
const top = Math.max(0, Math.round(meta.height * Number(t)))
const width = Math.min(meta.width - left, Math.round(meta.width * Number(w)))
const height = Math.min(meta.height - top, Math.round(meta.height * Number(h)))

const buf = await img.extract({ left, top, width, height }).toBuffer()
await sharp(buf).toFile(dst)
console.log(`${rel} -> ${out || rel}  ${width}x${height} @ (${left},${top})`)
