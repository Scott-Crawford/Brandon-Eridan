import { categories } from '../data/site.js'
import { projectsByCategory } from '../data/projects.js'
import WorkGrid from '../components/WorkGrid.jsx'

export default function Category({ slug }) {
  const category = categories.find((c) => c.slug === slug)
  const items = projectsByCategory(slug)

  return (
    <div className="page page-category">
      <header className="category-head">
        <h1 className="category-title">{category?.label}</h1>
        {category?.blurb && <p className="category-blurb">{category.blurb}</p>}
      </header>
      <WorkGrid items={items} />
    </div>
  )
}
