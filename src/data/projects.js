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
      'A tailored Regency three-piece suit built for the production of *Arcadia* at Carnegie Mellon University.',
    credits: {
      production: 'Arcadia',
      company: 'Carnegie Mellon University',
      designer: 'Pei Liu',
      photo: 'Louis Stein',
    },
    crossLink: {
      image: '/images/arcadia-pattern/cover.jpg',
      to: 'arcadia-pattern',
      label: 'View CLO 3D pattern',
    },
  },
  {
    slug: 'skating-costume',
    title: 'Skating Costume',
    category: 'costumes',
    date: '2026',
    description:
      "A modern interpretation of Torvill and Dean's 1984 *Bolero* routine, made for the Stretchwear course at CMU.",
    credits: {
      type: 'Class Project',
      class: 'Stretchwear',
      design: 'Hugh Hanson',
    },
    crossLink: {
      image: '/images/skating-costume/g03.png',
      to: 'skating-costume-pattern',
      label: 'View CLO 3D pattern',
    },
  },
  {
    slug: 'anemia-bodysuit',
    title: 'Fur Chap Bodysuit',
    category: 'costumes',
    date: '2025',
    description: 'A 4-way stretch bodysuit with attached fur chaps, made for Anemia Blunt.',
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
    date: '2025',
    description: 'Built during a year-long tailoring course at CMU.',
    credits: {
      type: 'Class Project (Tailoring)',
    },
  },
  {
    slug: 'lilac-fairy',
    title: 'The Lilac Fairy',
    category: 'costumes',
    date: '2025',
    description:
      'Traditional ballet bodice and bell-shaped tutu, inspired by the Lilac Fairy from *Sleeping Beauty*.',
    credits: {
      type: 'Class Project (Dancewear)',
    },
    crossLink: {
      image: '/images/lilac-fairy/g03.jpg',
      to: 'lilac-fairy-pattern',
      label: 'View CLO 3D pattern',
    },
  },
  {
    slug: 'joey-bodysuit',
    title: 'Orange Chromatica Bodysuit and Drape',
    category: 'costumes',
    date: '2024',
    description:
      'Custom bodysuit with attached fabric drape, made for Joey Young for *Edgewood Magazine*.',
    credits: {
      madeFor: 'Joey Young',
      publication: 'Edgewood Magazine',
      photo: '@zeldakollins',
      photoEditing: '@indigosparksss',
      hair: '@jaidiar_',
      shoulderBracers: '@indigosparksss',
      dyeWork: '@briandaviddesigns',
      stoning: '@itsjoeyyoung, @portiasparksss, @anemiablunt, @zeldakollins, @warrendmunroe',
    },
  },
  {
    slug: 'mr-burns-marge',
    title: 'Patchwork Gown',
    category: 'costumes',
    date: '2024',
    description:
      'A multi-textured patchwork gown for Marge, Act 3, in *Mr. Burns: A Post-Electric Play*.',
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
      'A patchwork toga created from jeans for Homer, Act 3, in *Mr. Burns: A Post-Electric Play*.',
    credits: {
      production: 'Mr. Burns: A Post-Electric Play',
      company: 'Carnegie Mellon University',
      designer: 'Jeremy Pitzer',
    },
  },
  {
    slug: 'striped-dress',
    title: '1892 Striped Promenade Dress',
    category: 'costumes',
    date: '2024',
    description:
      'Recreation of an 1892 fashion plate for the Advanced Artisan Draping course at CMU.',
    credits: {
      type: 'Class Project',
      class: 'Advanced Artisan Draping',
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
    slug: 'konpan-coat',
    title: 'KonPan Coat',
    category: 'fashion',
    date: '2026',
    description:
      'Graduate thesis project for CMU: a historically-inspired cape-sleeve coat designed, developed, and resized in CLO | 3D.',
    crossLink: {
      image: '/images/konpan-coat/g04.png',
      to: 'konpan-coat-pattern',
      label: 'View CLO 3D pattern',
    },
  },
  {
    slug: 'soyon-lingerie',
    title: 'Soyon Lingerie',
    category: 'fashion',
    date: '2026',
    description: 'A custom lingerie set, designed by Soyon Kim.',
  },
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
    date: '2024',
    description: 'A Renaissance-inspired set, made for the 2024 Rhinestone Steel Queer Fashion Show.',
  },
  {
    slug: 'strapped-corset-top',
    title: 'Strapped Corset Top',
    category: 'fashion',
    date: '2023',
    description: "Inspired by an advertisement for men's corsets, ca. early 1890s.",
  },
  {
    slug: 'suture-jack',
    title: 'The Suture Jack',
    category: 'fashion',
    date: '2019',
    description: 'A distressed denim jacket with extensive grommet detailing.',
  },
  {
    slug: 'trespassing-jacket',
    title: 'The Trespassing Jacket',
    category: 'fashion',
    date: '2018',
    description: 'Inspired by a jacket worn by Adam Lambert ca. 2013.',
  },
  {
    slug: 'prideful-ones',
    title: 'The Prideful Ones Jacket',
    category: 'fashion',
    date: '2018',
    description: 'A studded and painted transgender pride-themed jacket.',
  },

  // ---------------- DIGITAL PATTERNING (CLO 3D) ----------------
  {
    slug: 'arcadia-pattern',
    title: 'Arcadia',
    category: 'digital-patterning',
    date: '2026',
    description: 'Digital patterning and 3D simulation in CLO 3D for the *Arcadia* Regency suit.',
    credits: { production: 'Arcadia', company: 'Carnegie Mellon University', designer: 'Pei Liu' },
    crossLink: {
      image: '/images/arcadia/cover.jpg',
      to: 'arcadia',
      label: 'View full costume',
    },
  },
  {
    slug: 'konpan-coat-pattern',
    title: 'KonPan Coat',
    category: 'digital-patterning',
    // Use the CLO 3D pattern-development render as the cover so the category
    // preview shows an actual digital pattern.
    coverImage: '/images/konpan-coat/g04.png',
    description: 'The KonPan coat, digitally patterned in CLO 3D.',
    crossLink: {
      image: '/images/konpan-coat/g01.jpg',
      to: 'konpan-coat',
      label: 'View full garment',
    },
  },
  {
    slug: 'skating-costume-pattern',
    title: 'Skating Costume',
    category: 'digital-patterning',
    date: '2026',
    description: 'CLO 3D digital patterning and simulation for the *Bolero* skating costume.',
    credits: {
      type: 'Class Project',
      class: 'Stretchwear',
      design: 'Hugh Hanson',
    },
    crossLink: {
      image: '/images/skating-costume/cover.jpg',
      to: 'skating-costume',
      label: 'View full costume',
    },
  },
  {
    slug: 'lilac-fairy-pattern',
    title: 'The Lilac Fairy',
    category: 'digital-patterning',
    date: '2025',
    description: 'CLO 3D digital patterning for the Lilac Fairy ballet bodice.',
    credits: {
      type: 'Class Project (Dancewear)',
    },
    crossLink: {
      image: '/images/lilac-fairy/cover.jpg',
      to: 'lilac-fairy',
      label: 'View full costume',
    },
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
