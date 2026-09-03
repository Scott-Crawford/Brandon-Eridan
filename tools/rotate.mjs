// Dev-only helper: rotate a source image by a multiple of 90 degrees, overwriting
// the source. Backs up the pristine original to tmp-orig and reads from it so
// re-runs are idempotent (never double-rotate). Run `npm run optimize` after to
// regenerate the -400/-800/-1600 webp variants.
// Usage: node tools/rotate.mjs <relPathUnderPublic> <degrees>
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const [rel, degRaw] = process.argv.slice(2)
const deg = Number(degRaw)
if (!rel || !Number.isFinite(deg)) {
  console.error('Usage: node tools/rotate.mjs <path> <degrees>')
  process.exit(1)
}

// Back up the pristine original once, then always read from it so re-runs are idempotent.
const backup = path.resolve('tmp-orig', rel)
const source = path.resolve('public', rel)
if (!fs.existsSync(backup)) {
  fs.mkdirSync(path.dirname(backup), { recursive: true })
  fs.copyFileSync(source, backup)
}

const buf = await sharp(backup, { failOn: 'none' }).rotate(deg).toBuffer()
await sharp(buf).toFile(source)
console.log(`${rel} rotated ${deg}deg`)
