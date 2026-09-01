// Central site config: identity, contact, résumé, and commission form.

export const site = {
  name: 'Brandon Eridan',
  role: 'Costume Technician | Digital Patternmaker',
  location: 'Pittsburgh, PA',
  email: 'rmeichs75@gmail.com',

  // Commission Google Form (from his Linktree).
  commissionFormUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSdt6W1e_Kkcp68TuP1WuQLqypOshJlao_LViDmDsxdxtR9geg/viewform',

  // Résumé — converted from his .docx to a repo-hosted PDF. Opens in a new tab.
  resumeUrl: '/resume.pdf',

  instagram: { handle: '@saint_ends', url: 'https://www.instagram.com/saint_ends/?hl=en' },

  aboutImage: '/images/about-headshot.jpg',
  heroImages: ['/images/hero-1.jpg'],

  bio: [
    'Brandon Eridan (he/him) is a costume technician, fashion designer, and digital patternmaker based in Pittsburgh, PA. He holds an MFA in costume production from Carnegie Mellon University and a BS in drama from Syracuse University.',
    'During his time at CMU, Brandon worked in many genres of costume, ranging from recreations of historical womenswear (Titanic) to post-apocalyptic patchworks of secondhand materials (Mr. Burns: A Post-Electric Play). Outside of school, Brandon’s work has been seen on the cover of the second volume of Edgewood Magazine, an independent publication highlighting the Pittsburgh drag scene. He has also taken various commissions for custom daywear over the years and has been creating his own clothing for nearly a decade.',
    'Brandon’s journey into sewing began out of necessity as much as curiosity, as he had great difficulty finding masculine clothing in his adolescence that not only fit his body, but also his aesthetic interests. This experience has inspired a great emphasis on size-inclusivity in his practice, and it has also inspired Brandon to develop his own clothing business, specializing in historical- and fantasy-inspired menswear, which he plans to launch in 2026. This business will offer both completed garments as well as digital sewing patterns, one of which he produced for his capstone project during his final year at CMU.',
    'Brandon is currently employed as a suturist at PECA Labs, a Pittsburgh-based company which creates cardiovascular valves and implants. Outside of costuming, he is an avid writer and is currently working on his first novel. He also collects porcelain jester dolls and hopes to one day create life-sized versions of their costumes for himself to wear.',
  ],
}

export const categories = [
  { slug: 'costumes', label: 'Costumes', blurb: 'Pieces made for productions, personal costumes, and cosplays.' },
  { slug: 'fashion', label: 'Fashion', blurb: 'Clothing pieces for self, others, or class projects.' },
  { slug: 'digital-patterning', label: 'Digital Patterning', blurb: 'Digital patterns and projects created in CLO 3D.' },
]
