// Dev-only helper: build a labeled contact sheet (montage) of a folder's source
// images so all of a project's photos can be reviewed in a single image. Not
// used by the site build. Usage: node tools/contact-sheet.mjs <folderName>
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const folder = process.argv[2]
if (!folder) {
  console.error('Usage: node tools/contact-sheet.mjs <folderName>')
  process.exit(1)
}

const dir = path.resolve('public/images', folder)
const outDir = path.resolve('tmp-sheets')
fs.mkdirSync(outDir, { recursive: true })

// Only original source files (skip generated -400/-800/-1600 webp variants).
const files = fs
  .readdirSync(dir)
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f) && !/-(400|800|1600)\.webp$/i.test(f))
  .sort((a, b) => {
    // cover first, then g01, g02, ...
    if (/^cover\./i.test(a)) return -1
    if (/^cover\./i.test(b)) return 1
    return a.localeCompare(b, undefined, { numeric: true })
  })

const cell = 320
const pad = 8
const labelH = 26
const cols = Math.min(4, files.length)
const rows = Math.ceil(files.length / cols)
const cellW = cell + pad * 2
const cellH = cell + labelH + pad * 2

const composites = []
for (let i = 0; i < files.length; i++) {
  const img = await sharp(path.join(dir, files[i]))
    .resize(cell, cell, { fit: 'contain', background: '#222' })
    .toBuffer()
  const col = i % cols
  const row = Math.floor(i / cols)
  const label = Buffer.from(
    `<svg width="${cellW}" height="${labelH}"><rect width="100%" height="100%" fill="#111"/><text x="6" y="18" fill="#0f0" font-family="monospace" font-size="16">${files[i]}</text></svg>`,
  )
  composites.push({ input: img, left: col * cellW + pad, top: row * cellH + pad })
  composites.push({ input: label, left: col * cellW, top: row * cellH + cell + pad })
}

const outPath = path.join(outDir, `${folder}.png`)
await sharp({
  create: {
    width: cols * cellW,
    height: rows * cellH,
    channels: 3,
    background: '#000',
  },
})
  .composite(composites)
  .png()
  .toFile(outPath)

console.log(outPath)
