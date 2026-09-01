// Builds a WebP srcset from the responsive variants produced by
// tools/optimize-images.mjs (name-400.webp / -800 / -1600). The original `src`
// stays as the fallback and is what the lightbox opens at full resolution.
const WIDTHS = [400, 800, 1600]

export function responsive(src, sizes = '(max-width: 700px) 90vw, 33vw') {
  if (!src) return { src }
  const dot = src.lastIndexOf('.')
  if (dot < 0) return { src }
  const base = src.slice(0, dot)
  const srcSet = WIDTHS.map((w) => `${base}-${w}.webp ${w}w`).join(', ')
  return { src, srcSet, sizes }
}
