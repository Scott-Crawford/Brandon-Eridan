import { useEffect, useCallback } from 'react'

// Full-screen image viewer with next/prev + caption. Keyboard navigable.
export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    },
    [onClose, onPrev, onNext]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  if (index == null) return null
  const img = images[index]
  const many = images.length > 1

  return (
    <dialog className="lightbox" open aria-label="Image viewer">
      <button type="button" className="lb-close" onClick={onClose} aria-label="Close">
        ×
      </button>
      {many && (
        <button type="button" className="lb-nav lb-prev" onClick={onPrev} aria-label="Previous image">
          ‹
        </button>
      )}
      <figure className="lb-figure">
        <img src={img.src} alt={img.caption || ''} className="lb-image" />
        {img.caption && <figcaption className="lb-caption">{img.caption}</figcaption>}
      </figure>
      {many && (
        <button type="button" className="lb-nav lb-next" onClick={onNext} aria-label="Next image">
          ›
        </button>
      )}
      <div className="lb-backdrop" onClick={onClose} aria-hidden="true" />
    </dialog>
  )
}
