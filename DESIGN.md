# Brandon Eridan — Portfolio Website Design Doc

**Domain:** brandoneridan.com · **Host:** GitHub Pages (public repo) · **Stack:** React + Vite + React Router
**Tagline:** Costume Technician | Digital Patternmaker

---

## 1. Core preferences (NON-NEGOTIABLE — from Brandon)

These are fixed and non-negotiable.

- **Fonts:** Titles/Headings = **Metamorphous**; all other text = **EB Garamond**.
- **Cover page:** big image background (or 2–3 images together).
- **Shadow box** behind cover text for legibility: **white text on a translucent grey box**.
- **Home images:** fewer, larger images, **each linked to its section**.
- **Header:** echo his current Wix header. **No Instagram/email/other icons in the header.**
- **Header bar style:** each section in its own **box, black with white text** (like current site).
- **Categories (exact):** About · Costumes · Fashion · Digital Patterning.
- **Work organization:** **image with title + date/details underneath**.
- **About + Contact = one combined page**:
  - Image on **left**, bio text on **right**, links **beneath the image**.
  - Contact is **Instagram + email only** (icon + label). No phone, Facebook, or Linktree.
  - **Résumé** (opens in a new tab) and **Commission Google Form** as centered buttons.

---

## 2. Design system

**Typography**
- Headings/nav/titles: **Metamorphous** (Google Fonts).
- Body/captions/metadata: **EB Garamond** (Google Fonts).
- Scale: Hero title ~clamp(2.5–4.5rem); section headers ~2rem; card title ~1.15rem; meta ~0.95rem.

**Color palette**
- Background near-black: `#0d0b0c`
- Warm charcoal surface: `#1a1618`
- Off-white text: `#f2efe9`
- Muted gold accent: `#c9a26b`
- **Shadow box:** `rgba(45,45,48,0.55)` with `backdrop-filter: blur(3px)`, white text.
- **Nav boxes:** solid black `#000` bg, white text, thin border on hover.

**Global elements**
- **Header:** site name in Metamorphous, subtitle "Costume Technician | Digital Patternmaker"; below it a **row of black boxes** — Costumes · Fashion · Digital Patterning · About. No icons. Sticky on scroll. On the **mobile landing page** the header stays (for navigation) but the **category boxes are hidden** to save space.
- **Footer:** small, Metamorphous name + copyright, plus **Instagram + email** (icon + label).
- **Lightbox:** click any gallery image → full-screen overlay with next/prev + caption.
- **Responsive:** grids reflow 3→2→1 columns.
- **A11y:** alt text from data, focus states, keyboard-navigable lightbox.

---

## 3. Information architecture

```
/                       Home  — hero cover + large linked category tiles
/costumes               Costumes    — work grid (image · title · date)
/fashion                Fashion     — work grid
/digital-patterning     Digital Patterning — work grid
/about                  About + Contact (combined) — bio, IG + email, résumé + commission buttons
/work/:slug             Project detail — credits + captioned gallery + lightbox
```

**Data model** (single `projects` data file; add work = add an entry + drop images):
```
{
  slug, title, category: 'costumes'|'fashion'|'digital-patterning',
  date, coverImage, images: [{ src, caption }],
  credits: { production, director, designer, role, venue }, // optional
  description
}
```
Category pages filter by `category`; `/work/:slug` renders one project.

---

## 4. Final design (single, non-switchable)

Brandon reviewed early treatments and chose one cohesive design that mixes
treatments per page. There is no layout switcher and no `data-layout` attribute —
arrangement/density live in `src/styles/layouts.css`, shared shells in
`src/styles/base.css`.

- **Landing:** tall (82vh) centered hero + **2×2 home tiles** (3 categories +
  About). Each tile label sits in a **translucent shadowbox** so it stays
  readable over any cover image.
- **Category pages:** **3-column grid** that reads **left-to-right** (item order
  fills row by row across columns), images shown at their **original aspect** (no
  uniform cropping), title + date beneath each.
- **Project pages:** **sticky credit box** (left) + a **full-aspect gallery**
  (right); every image opens full-res in the lightbox.
- **Mobile:** same design; the header stays on the landing page but its
  **category boxes and the hero name/title are hidden**, the hero shrinks to
  ~58vh, **home tiles stack to one column**, and the credit box becomes a
  horizontal band above the gallery.

---

## 5. Tech & hosting summary

- **React + Vite + React Router** (justified by many data-driven project/detail pages + galleries).
- **Google Fonts:** Metamorphous + EB Garamond.
- **Hosting:** GitHub Pages (public repo) via GitHub Actions; custom domain **brandoneridan.com** through Namecheap DNS + HTTPS. Fully free.
- **Commission form:** embedded Google Form `<iframe>` (no backend).
- **SPA routing on Pages:** `dist/index.html` copied to `404.html` so deep links work.
- **Images:** real photos live in `public/images/<slug>/` (cover + gallery); a few projects without photos yet render styled placeholders.

---

## 6. Decisions (locked in)

**Single final design** (see §4) — no switcher, no A/B config.

**Header:** exactly **four** boxes — **Costumes · Fashion · Digital Patterning · About**. Clicking the **site title/logo** returns to Home. (No Home box; no icons in header.)

**Per-project credits:** include a credits block **only when the info is known**
(from his live site). Projects without credits simply omit the block. Project
order within each category follows his live galleries at
`rmeichs75.wixsite.com/brandon-eridan`.

**Contact / links:**
- Email **rmeichs75@gmail.com**
- Instagram **@saint_ends**
- Résumé: converted from his `.docx` to repo-hosted **`/resume.pdf`** (opens in a new tab).
- Commission **Google Form:** `https://docs.google.com/forms/d/e/1FAIpQLSdt6W1e_Kkcp68TuP1WuQLqypOshJlao_LViDmDsxdxtR9geg/viewform` (link-out button).

(Phone, Facebook, and Linktree are intentionally **not** linked anywhere.)

**Category descriptions:**
- Costumes — "Pieces made for productions, personal costumes, and cosplays."
- Fashion — "Clothing pieces for self, others, or class projects."
- Digital Patterning — "Digital patterns and projects created in CLO 3D."

### Build status
- **Images:** real photos live in `public/images/<slug>/` (cover + gallery), with
  the manifest in `src/data/media.js`. Projects with no images yet render a
  styled placeholder (`placeholder: true`).
- **Résumé:** `.docx` converted to `public/resume.pdf`.

### Performance & QA

- **Responsive images:** `npm run optimize` (`tools/optimize-images.mjs`, `sharp`) generates `-400/-800/-1600.webp` variants for every `.jpg`/`.png`/`.webp` source; grids/hero pick the right size via `srcset` (`src/lib/img.js`), while the **lightbox keeps the full-res original**.
- **Image caching:** a prod-only service worker (`public/sw.js`) cache-first-serves images for instant repeat visits (disabled in `npm run dev`).
- **Automated tests:** `npm test` (Playwright, desktop + mobile) checks every page for **zero same-origin console errors** (third-party embeds ignored) plus single-design, contact-link, project-order, and **no-broken-cover-image** checks. Kept green.

### Remaining questions

1. **Placeholder projects** — Titanic (1912 Boarding Suit), Jirachi Gijinka, Leggings, Cape Coat, Scott Corset, and The Jester's Vestments are "images coming soon" placeholders; drop in images when available. (Scott Corset and The Jester's Vestments correspond to empty folders in the source site.)
2. **Sideways images** — a few gallery photos are horizontal and should be rotated upright; re-export or rotate the source files.
3. **Custom domain** — ready to point `brandoneridan.com` at GitHub Pages now (see README), or stay on the default Pages URL first?
