import { Link } from 'react-router-dom'
import { categories, site } from '../data/site.js'
import { projectsByCategory } from '../data/projects.js'
import Thumb from './Thumb.jsx'

// Large linked tiles. Four tiles (3 categories + About) fill a 2x2 grid.
// Each tile's text sits in a translucent shadowbox for readability.
export default function HomeTiles() {
  // Chosen cover per category tile (overrides the first project's cover).
  // Fashion shows the KonPan coat; Digital Patterning shows a CLO 3D render.
  const tileCover = {
    fashion: '/images/konpan-coat/cover.jpg',
    'digital-patterning': '/images/skating-costume/g03.png',
  }
  const tiles = [
    ...categories.map((c) => ({
      to: `/${c.slug}`,
      label: c.label,
      blurb: c.blurb,
      cover: tileCover[c.slug] || projectsByCategory(c.slug)[0]?.coverImage,
    })),
    { to: '/about', label: 'About', blurb: 'Bio, résumé, and commissions.', cover: site.aboutImage },
  ]

  return (
    <section className="home-tiles" aria-label="Sections">
      {tiles.map((t) => (
        <Link key={t.to} to={t.to} className="tile">
          <Thumb src={t.cover} alt={t.label} className="tile-media" />
          <div className="tile-overlay">
            <span className="tile-caption">
              <span className="tile-label">{t.label}</span>
              <span className="tile-blurb">{t.blurb}</span>
            </span>
          </div>
        </Link>
      ))}
    </section>
  )
}
