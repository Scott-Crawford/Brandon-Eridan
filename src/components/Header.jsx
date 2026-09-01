import { Link, NavLink, useLocation } from 'react-router-dom'
import { site, categories } from '../data/site.js'

// Title on top (links home), subtitle, then a row of black boxes
// — Costumes · Fashion · Digital Patterning · About. No icons.
// Hidden on the mobile landing page (it takes up too much space there).
export default function Header() {
  const isHome = useLocation().pathname === '/'
  return (
    <header className={'site-header' + (isHome ? ' site-header--home' : '')}>
      <Link to="/" className="brand" aria-label="Brandon Eridan — home">
        <span className="brand-name">{site.name}</span>
        <span className="brand-role">{site.role}</span>
      </Link>
      <nav className="nav-boxes" aria-label="Primary">
        {categories.map((c) => (
          <NavLink
            key={c.slug}
            to={`/${c.slug}`}
            className={({ isActive }) => 'nav-box' + (isActive ? ' is-active' : '')}
          >
            {c.label}
          </NavLink>
        ))}
        <NavLink
          to="/about"
          className={({ isActive }) => 'nav-box' + (isActive ? ' is-active' : '')}
        >
          About
        </NavLink>
      </nav>
    </header>
  )
}
