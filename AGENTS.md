# AGENTS.md — Brandon Eridan Portfolio

Guidance for AI agents working in this repo. Keep changes minimal and aligned
with the design brief.

## What this is

A costume/fashion/digital-patterning portfolio for Brandon Eridan. React + Vite
+ React Router, static-hosted on GitHub Pages at **brandoneridan.com**. No
backend — the commission form is an embedded Google Form.

## Non-negotiable design rules (from Brandon)

- **Fonts:** headings/titles = **Metamorphous**; all body text = **EB Garamond**
  (loaded in `index.html`). Do not swap fonts.
- **Header:** site title (links home) + subtitle, then **four black nav boxes**:
  Costumes · Fashion · Digital Patterning · About. **No icons in the header.**
- **Cover/hero:** big image with a translucent grey **shadow box**, white text.
- **About = About + Contact combined:** image left, bio right, links beneath the
  image, résumé + commission buttons. Contact is **Instagram + email only**
  (icon + label). No phone, Facebook, or Linktree.
- **Category labels are exact.** "Digital Patterning" replaces the old "CLO | 3D".

## Architecture

- `src/data/site.js` — identity, contact (Instagram + email), résumé URL, and
  commission form URL. **Change site-wide content here.**
- `src/data/projects.js` — hand-authored project metadata; merges images from…
- `src/data/media.js` — hand-maintained manifest mapping each slug to its
  `cover` + `gallery[]`. Edit this (and drop files in `public/images/<slug>/`)
  when adding or changing a project's images.
- `src/components/` — Header, Footer, Hero, HomeTiles, WorkGrid, CreditsBlock,
  Lightbox, Thumb (placeholder fallback), SocialIcon, ScrollToTop.
- `src/pages/` — Home, Category, Project, About, NotFound.
- `src/styles/base.css` — shared design system + component shells.
- `src/styles/layouts.css` — arrangement/density for the single final design
  (Atelier landing + Stage category/gallery treatment).
- `src/lib/img.js` — `responsive()` builds the WebP `srcset` (400/800/1600)
  used by grids/hero; the lightbox intentionally loads the full-res original.
- `public/sw.js` — image-caching service worker (prod-only, cache-first).
- `tools/optimize-images.mjs` — generates the responsive WebP variants.
- `tests/site.spec.js` + `playwright.config.js` — the Playwright suite.

## The final design (single, non-switchable)

There is **one** production design — no layout switcher, no `data-layout`
attribute, no A/B config. Per Brandon's final choices it mixes treatments by
page:

- **Landing:** centered "Atelier" hero + 2×2 home tiles, each tile label in a
  translucent shadowbox for readability.
- **Category pages:** "Stage" 3-column grid that reads left-to-right (items fill
  row by row across columns), images at their original aspect.
- **Project pages:** "Atelier" sticky credit box + "Stage" full-aspect gallery.
- **Mobile:** same design, but on the landing page the header stays while its
  **category boxes and the hero name/title are hidden**, home tiles stack to one
  column, and the credit box becomes a horizontal band above the gallery.

Components render stable class names; arrangement lives in `layouts.css`, shared
shells in `base.css`.

## Images

- Live in `public/images/<slug>/` as `cover.*` and `g01..gNN`.
- Missing images fall back to a styled placeholder via `Thumb.jsx` — safe to add
  a project with no images yet (mark it `placeholder: true`).
- **After adding images, run `npm run optimize`** to generate the responsive
  `-400/-800/-1600.webp` variants (it handles `.jpg`/`.png`/`.webp` sources).
  `responsive()` always emits a srcset for those variants, so a cover without
  them renders broken — the optimizer must be run. It skips corrupt/truncated
  originals and prints them; those need re-exporting.

## Testing

- `npm test` runs Playwright (desktop + mobile) after a production build. It
  asserts every page renders with **no same-origin console errors**
  (third-party embed failures are ignored) plus single-design, contact-link,
  project-order, and **no-broken-cover-image** checks. Keep it green; add cases
  when adding features.
- `test-results/`, `playwright-report/`, `.playwright-mcp/` are gitignored.

## Conventions

- Plain JS/JSX (no TypeScript). 2-space indent, single quotes, no semicolons in
  new files matching existing style.
- Keep the build clean: `npm run build` must pass, and `npm test` must stay
  green. Add explicit `type` to `<button>`s; avoid array-index React keys. Use
  lowercase DOM attributes (e.g. `fetchpriority`, not `fetchPriority`).
- Do not commit `node_modules/` or `dist/` (gitignored). **Do** commit
  `public/images/` and `public/resume.pdf` — Pages serves them.

## Commit / deploy

- Commit under the personal Git identity: `git personal` before committing.
- Pushing to `main` auto-deploys via `.github/workflows/deploy.yml`.
- Owner: prefer giving the user a paste-ready commit command rather than
  committing automatically.
