// Minimal inline SVG icons for contact links (Instagram, email), shown next to
// their text label. Keyed by the label (lowercased).

const PATHS = {
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  email: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" ry="2" />
      <path d="M3 6l9 6 9-6" />
    </>
  ),
}

export default function SocialIcon({ label, className = '' }) {
  const key = label.toLowerCase()
  const glyph = PATHS[key]
  if (!glyph) return <span className={className}>{label}</span>

  return (
    <svg
      className={`social-icon ${className}`}
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={label}
    >
      {glyph}
    </svg>
  )
}
