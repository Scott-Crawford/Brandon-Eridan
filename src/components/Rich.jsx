// Renders text with lightweight inline emphasis: wrap a phrase in *asterisks*
// to italicize it (used for show/production titles like *Titanic*). Splits on
// paired asterisks and renders the enclosed runs as <em>.
export default function Rich({ text }) {
  if (!text) return null
  const parts = String(text).split(/\*([^*]+)\*/g)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <em key={`em-${i}-${part}`}>{part}</em> : part
      )}
    </>
  )
}
