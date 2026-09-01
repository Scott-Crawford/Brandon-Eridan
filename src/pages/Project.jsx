import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { projectBySlug, hasCredits } from '../data/projects.js'
import { categories } from '../data/site.js'
import CreditsBlock from '../components/CreditsBlock.jsx'
import Lightbox from '../components/Lightbox.jsx'
import Thumb from '../components/Thumb.jsx'

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
        {project.description && <p className="project-desc">{project.description}</p>}
      </header>

      <div className={'project-body' + (showCredits ? ' has-credits' : ' no-credits')}>
        <CreditsBlock project={project} />

        <div className="project-gallery">
          {images.length ? (
            images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                className="gallery-item"
                onClick={() => setLightboxIndex(i)}
                aria-label={`Open image ${i + 1}`}
              >
                <Thumb src={img.src} alt={img.caption || project.title} className="gallery-media" />
              </button>
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
