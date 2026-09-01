import { site } from '../data/site.js'
import Thumb from '../components/Thumb.jsx'
import SocialIcon from '../components/SocialIcon.jsx'

// Combined About + Contact. Email + Instagram are shown as icon + label pairs.
// Résumé opens in a new tab; commissions link out to the Google Form. Both are
// buttons aligned under the bio.
export default function About() {
  return (
    <div className="page page-about">
      <div className="about-grid">
        <aside className="about-media">
          <Thumb src={site.aboutImage} alt={site.name} className="about-photo" />
          <ul className="about-links" aria-label="Contact">
            <li>
              <a href={`mailto:${site.email}`}>
                <SocialIcon label="Email" />
                <span>{site.email}</span>
              </a>
            </li>
            <li>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
                <SocialIcon label="Instagram" />
                <span>{site.instagram.handle}</span>
              </a>
            </li>
          </ul>
        </aside>

        <div className="about-copy">
          <h1 className="about-title">About</h1>
          {site.bio.map((para) => (
            <p key={para.slice(0, 24)} className="about-para">
              {para}
            </p>
          ))}

          {/* Résumé + commissions — buttons aligned under the bio */}
          <section className="about-actions" aria-label="Résumé and commissions">
            <a className="btn" href={site.resumeUrl} target="_blank" rel="noopener noreferrer">
              View résumé
            </a>
            <a className="btn" href={site.commissionFormUrl} target="_blank" rel="noopener noreferrer">
              Commission a piece
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}
