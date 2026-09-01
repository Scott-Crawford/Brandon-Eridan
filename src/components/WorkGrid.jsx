import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Thumb from './Thumb.jsx'

// Number of masonry columns at the current viewport width.
function useColumnCount() {
  const read = () => {
    if (typeof window === 'undefined') return 3
    if (window.matchMedia('(max-width: 560px)').matches) return 1
    if (window.matchMedia('(max-width: 900px)').matches) return 2
    return 3
  }
  const [cols, setCols] = useState(read)
  useEffect(() => {
    const onResize = () => setCols(read())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return cols
}

// Work grid: image → title → date beneath. Cards keep their original aspect
// (no cropping). We distribute items round-robin across columns so the reading
// order runs LEFT-TO-RIGHT across each row (item 1 → col 1, item 2 → col 2, …),
// unlike CSS `column-count`, which fills top-to-bottom. This preserves varied
// image heights without forcing a normalized grid.
export default function WorkGrid({ items }) {
  const colCount = useColumnCount()

  if (!items.length) {
    return <p className="empty-note">Work coming soon.</p>
  }

  const columns = Array.from({ length: colCount }, () => [])
  items.forEach((p, i) => columns[i % colCount].push(p))

  return (
    <div className="work-grid">
      {columns.map((col, ci) => (
        <ul className="work-col" key={col[0]?.slug ?? `col-${ci}`}>
          {col.map((p) => (
            <li key={p.slug} className="work-card">
              <Link to={`/work/${p.slug}`} className="work-link">
                <Thumb src={p.coverImage} alt={p.title} className="work-media" />
                <div className="work-meta">
                  <span className="work-title">{p.title}</span>
                  {p.date && <span className="work-date">{p.date}</span>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}
