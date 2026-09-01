import { useState } from 'react'
import { responsive } from '../lib/img.js'

// Renders an image, or a styled gradient placeholder if the image is missing
// (so layouts preview cleanly before real images are dropped in). Displays an
// optimized WebP variant via srcset; the original stays available full-res.
export default function Thumb({ src, alt, className = '', sizes }) {
  const [failed, setFailed] = useState(false)
  const showPlaceholder = !src || failed

  if (showPlaceholder) {
    return (
      <div className={`thumb thumb--placeholder ${className}`} role="img" aria-label={alt}>
        <span className="thumb-ph-label">{alt}</span>
      </div>
    )
  }

  const { src: imgSrc, srcSet, sizes: computedSizes } = responsive(src, sizes)

  return (
    <img
      className={`thumb ${className}`}
      src={imgSrc}
      srcSet={srcSet}
      sizes={computedSizes}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
