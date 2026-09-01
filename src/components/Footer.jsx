import { site } from '../data/site.js'
import SocialIcon from './SocialIcon.jsx'

// Footer shows email + Instagram (icon + label).
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <ul className="footer-socials" aria-label="Contact">
        <li>
          <a href={`mailto:${site.email}`} aria-label="Email">
            <SocialIcon label="Email" />
            <span>{site.email}</span>
          </a>
        </li>
        <li>
          <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <SocialIcon label="Instagram" />
            <span>{site.instagram.handle}</span>
          </a>
        </li>
      </ul>
      <p className="footer-copy">
        © {year} {site.name}
      </p>
    </footer>
  )
}
