import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { projectBySlug, hasCredits } from '../data/projects.js'
import { categories } from '../data/site.js'
import CreditsBlock from '../components/CreditsBlock.jsx'
import Lightbox from '../components/Lightbox.jsx'
import Thumb from '../components/Thumb.jsx'
import Rich from '../components/Rich.jsx'

// Gallery column count. Matches the CSS breakpoints: 1 column on phones,
// otherwise 2 columns when a credits sidebar is shown, 3 without. We distribute
// images round-robin across these columns (item i -> column i % colCount) so the
// reading order runs LEFT-TO-RIGHT across each row, unlike CSS `column-count`,
// which fills top-to-bottom.
function useGalleryColumns(showCredits) {
  const read = () => {
    if (typeof window === 'undefined') return showCredits ? 2 : 3
    if (window.matchMedia('(max-width: 720px)').matches) return 1
    return showCredits ? 2 : 3
  }
  const [cols, setCols] = useState(read)
  useEffect(() => {
    const onResize = () => setCols(read())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCredits])
  return cols
}

export default function Project() {
  const { slug } = useParams()
  const project = projectBySlug(slug)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  if (!project) {
    return (
      <div className="page page-project">
        <p className="empty-note">Project not found.</p>
        <Link to="/" className="back-link">← Home</Link>
      </div>
    )
  }

  const category = categories.find((c) => c.slug === project.category)
  const images = project.images || []
  const showCredits = hasCredits(project)
  const colCount = useGalleryColumns(showCredits)
  const galleryColumns = Array.from({ length: colCount }, () => [])
  images.forEach((img, i) => galleryColumns[i % colCount].push({ img, i }))

  return (
    <article className="page page-project">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to={`/${project.category}`}>{category?.label}</Link>
        <span aria-hidden="true"> / </span>
        <span>{project.title}</span>
      </nav>

      <header className="project-head">
        <h1 className="project-title">{project.title}</h1>
        {project.date && <p className="project-date">{project.date}</p>}
        {project.description && <p className="project-desc"><Rich text={project.description} /></p>}
      </header>

      <div className={'project-body' + (showCredits ? ' has-credits' : ' no-credits')}>
        <CreditsBlock project={project} />

        <div className="project-gallery">
          {images.length ? (
            galleryColumns.map((col, ci) => (
              <div className="gallery-col" key={col[0]?.img.src ?? `col-${ci}`}>
                {col.map(({ img, i }) =>
                  project.crossLink && img.src === project.crossLink.image ? (
                    <Link
                      key={img.src}
                      to={`/work/${project.crossLink.to}`}
                      className="gallery-item gallery-item--link"
                      aria-label={project.crossLink.label}
                    >
                      <Thumb src={img.src} alt={img.caption || project.title} className="gallery-media" />
                      <span className="gallery-link-badge">{project.crossLink.label}<span aria-hidden="true"> →</span></span>
                    </Link>
                  ) : (
                    <button
                      key={img.src}
                      type="button"
                      className="gallery-item"
                      onClick={() => setLightboxIndex(i)}
                      aria-label={`Open image ${i + 1}`}
                    >
                      <Thumb src={img.src} alt={img.caption || project.title} className="gallery-media" />
                    </button>
                  ),
                )}
              </div>
            ))
          ) : (
            <p className="empty-note">Images coming soon.</p>
          )}
        </div>
      </div>

      {lightboxIndex != null && images.length > 0 && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((n) => (n - 1 + images.length) % images.length)}
          onNext={() => setLightboxIndex((n) => (n + 1) % images.length)}
        />
      )}
    </article>
  )
}
