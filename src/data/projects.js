// Project metadata. Images come from the media manifest (media.js), which maps
// each slug -> { cover, gallery[] }. Order within each category follows
// Brandon's live galleries at rmeichs75.wixsite.com/brandon-eridan.
import { media } from './media.js'

// mediaKey lets Digital Patterning entries reuse a costume/fashion image set.
function withMedia(p) {
  const m = media[p.mediaKey || p.slug]
  const cover = p.coverImage || m?.cover || null
  const base = m?.gallery ?? []
  // The image shown as the category cover must also appear in the project
  // gallery (as the first image), de-duplicated so it isn't shown twice when
  // it's already part of the gallery set.
  const gallery = cover ? [cover, ...base.filter((src) => src !== cover)] : base
  return {
    ...p,
    coverImage: cover,
    images: gallery.map((src) => ({ src, caption: p.title })),
  }
}

const raw = [
  // ---------------- COSTUMES ----------------
  {
    slug: 'arcadia',
    title: 'Regency 3-Piece Suit',
    category: 'costumes',
    date: '2026',
    description:
      'A tailored Regency three-piece suit built for the production of Arcadia at Carnegie Mellon University.',
    credits: {
      production: 'Arcadia',
      company: 'Carnegie Mellon University',
      designer: 'Pei Liu',
      photo: 'Louis Stein',
    },
  },
  {
    slug: 'anemia-bodysuit',
    title: 'Fur Chap Bodysuit',
    category: 'costumes',
    date: '2025',
    description: 'A fur chap bodysuit made for Anemia Blunt.',
    credits: {
      madeFor: 'Anemia Blunt',
      photo: 'Starboy Images',
    },
  },
  {
    slug: 'malistaire',
    title: 'Malistaire Drake',
    category: 'costumes',
    date: '2025',
    description: 'A personal cosplay of Malistaire Drake from Wizard101.',
    credits: {
      series: 'Wizard101',
      type: 'Personal Cosplay',
    },
  },
  {
    slug: '70s-suit',
    title: '1970s 3-Piece Suit',
    category: 'costumes',
    description: 'A 1970s-inspired tailored three-piece suit, built as a class project in tailoring.',
    credits: {
      project: 'Class Project',
      technique: 'Tailoring',
    },
  },
  {
    slug: 'lilac-fairy',
    title: 'The Lilac Fairy',
    category: 'costumes',
    description: 'A Lilac Fairy dancewear costume, built as a class project.',
    credits: {
      project: 'Class Project',
      type: 'Dancewear',
    },
  },
  {
    slug: 'joey-bodysuit',
    title: 'Orange Chromatica Bodysuit and Drape',
    category: 'costumes',
    date: '2024',
    description: 'An orange chromatica bodysuit and drape, made for Joey Young for Edgewood Magazine.',
    credits: {
      madeFor: 'Joey Young',
      publication: 'Edgewood Magazine',
    },
  },
  {
    slug: 'mr-burns-marge',
    title: 'Patchwork Gown',
    category: 'costumes',
    date: '2024',
    description:
      'A patchwork gown of post-apocalyptic secondhand materials for Mr. Burns: A Post-Electric Play.',
    credits: {
      production: 'Mr. Burns: A Post-Electric Play',
      company: 'Carnegie Mellon University',
      designer: 'Jeremy Pitzer',
    },
  },
  {
    slug: 'mr-burns-toga',
    title: 'Patchwork Denim Toga',
    category: 'costumes',
    date: '2024',
    description:
      'A patchwork denim toga built from reclaimed materials for Mr. Burns: A Post-Electric Play.',
    credits: {
      production: 'Mr. Burns: A Post-Electric Play',
      company: 'Carnegie Mellon University',
    },
  },
  {
    slug: 'titanic-boarding-suit',
    title: '1912 Boarding Suit',
    category: 'costumes',
    placeholder: true,
    description: 'A 1912 boarding suit for Titanic at Carnegie Mellon University. Images coming soon.',
    credits: {
      production: 'Titanic',
      company: 'Carnegie Mellon University',
      designer: 'Olivia Curry',
      photo: 'DSR Photo',
    },
  },
  {
    slug: 'jirachi-gijinka',
    title: 'Jirachi Gijinka',
    category: 'costumes',
    placeholder: true,
    description: 'A personal gijinka cosplay of Jirachi from Pokémon. Images coming soon.',
    credits: {
      series: 'Pokémon',
      type: 'Personal Cosplay',
    },
  },
  {
    slug: 'striped-dress',
    title: '1892 Striped Promenade Dress',
    category: 'costumes',
    description: 'An 1892 striped promenade dress, built as a class project in advanced draping.',
    credits: {
      project: 'Class Project',
      technique: 'Advanced Draping',
    },
  },
  {
    slug: 'chrollo',
    title: 'Chrollo Lucilfer',
    category: 'costumes',
    date: '2023',
    description: 'A personal cosplay of Chrollo Lucilfer from Hunter×Hunter.',
    credits: {
      series: 'Hunter×Hunter',
      type: 'Personal Cosplay',
    },
  },

  // ---------------- FASHION ----------------
  {
    slug: 'jumpsuit-upcycle',
    title: 'Jumpsuit Upcycle',
    category: 'fashion',
    date: '2025',
    description: 'An upcycled jumpsuit reworked from existing garments.',
  },
  {
    slug: 'braided-ensemble',
    title: 'The Braided Ensemble',
    category: 'fashion',
    description: 'A braided ensemble.',
  },
  {
    slug: 'trespassing-jacket',
    title: 'The Trespassing Jacket',
    category: 'fashion',
    description: 'The Trespassing Jacket.',
  },
  {
    slug: 'strapped-corset-top',
    title: 'Strapped Corset Top',
    category: 'fashion',
    date: '2023',
    description: 'A strapped corset top.',
  },
  {
    slug: 'suture-jack',
    title: 'The Suture Jack',
    category: 'fashion',
    description: 'A constructed jacket, the Suture Jack.',
  },
  {
    slug: 'prideful-ones',
    title: 'The Prideful Ones Jacket',
    category: 'fashion',
    description: 'The Prideful Ones jacket.',
  },
  {
    slug: 'konpan-coat',
    title: 'KonPan Coat',
    category: 'fashion',
    description: 'A statement coat, patterned in CLO 3D.',
  },
  {
    slug: 'soyon-lingerie',
    title: 'Soyon Lingerie',
    category: 'fashion',
    date: '2026',
    description: 'A lingerie set. Illustration by Soyon Kim.',
  },
  {
    slug: 'scott-corset',
    title: 'Scott Corset',
    category: 'fashion',
    placeholder: true,
    description: 'A custom-fitted corset. Images coming soon.',
  },

  // ---------------- DIGITAL PATTERNING (CLO 3D) ----------------
  {
    slug: 'skating-costume-pattern',
    mediaKey: 'skating-costume',
    title: 'Skating Costume',
    category: 'digital-patterning',
    description: 'A skating costume patterned and simulated in CLO 3D.',
  },
  {
    slug: 'leggings',
    title: 'Leggings',
    category: 'digital-patterning',
    placeholder: true,
    description: 'Leggings drafted and simulated in CLO 3D. Images coming soon.',
  },
  {
    slug: 'cape-coat',
    title: 'Cape Coat',
    category: 'digital-patterning',
    placeholder: true,
    description: 'A cape coat digitally patterned in CLO 3D. Images coming soon.',
  },
  {
    slug: 'arcadia-pattern',
    mediaKey: 'arcadia',
    title: 'Arcadia',
    category: 'digital-patterning',
    date: '2026',
    description: 'Digital patterning and 3D simulation in CLO 3D for the Arcadia Regency suit.',
    credits: { production: 'Arcadia', company: 'Carnegie Mellon University', designer: 'Pei Liu' },
  },
  {
    slug: 'konpan-coat-pattern',
    mediaKey: 'konpan-coat',
    title: 'KonPan Coat',
    category: 'digital-patterning',
    // Use the CLO 3D pattern-development render as the cover so the category
    // preview shows an actual digital pattern.
    coverImage: '/images/konpan-coat/g04.png',
    description: 'The KonPan coat, digitally patterned in CLO 3D.',
  },
  {
    slug: 'jester-vestments',
    title: "The Jester's Vestments",
    category: 'digital-patterning',
    placeholder: true,
    description: "The Jester's Vestments, digitally patterned in CLO 3D. Images coming soon.",
  },
]

export const projects = raw.map(withMedia)

export function projectsByCategory(categorySlug) {
  return projects.filter((p) => p.category === categorySlug)
}

export function projectBySlug(slug) {
  return projects.find((p) => p.slug === slug)
}

export function hasCredits(project) {
  return project.credits && Object.keys(project.credits).length > 0
}
