import { hasCredits } from '../data/projects.js'

const LABELS = {
  production: 'Production',
  company: 'Company',
  director: 'Director',
  designer: 'Designer',
  role: 'Role',
  venue: 'Venue',
  photo: 'Photo',
  photoEditing: 'Photo Editing',
  hair: 'Hair',
  construction: 'Construction',
  dyeWork: 'Dye Work',
  stoning: 'Stoning',
  madeFor: 'Made for',
  series: 'Series',
  type: 'Type',
  project: 'Project',
  technique: 'Technique',
  publication: 'Publication',
}

// Only rendered when credits were scraped from his site.
export default function CreditsBlock({ project }) {
  if (!hasCredits(project)) return null
  const entries = Object.entries(project.credits)

  return (
    <dl className="credits">
      <h2 className="credits-heading">Credits</h2>
      {entries.map(([key, value]) => (
        <div className="credits-row" key={key}>
          <dt>{LABELS[key] || key}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  )
}
