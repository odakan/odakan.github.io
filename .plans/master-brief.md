# Master Brief — onurdenizakan.com

## Project Identity

- **Owner:** Onur Deniz Akan — post-doctoral researcher in earthquake engineering, University of Chieti-Pescara (G. d'Annunzio), Italy
- **Domain:** www.onurdenizakan.com
- **Hosting:** GitHub Pages (repo: `odakan/odakan.github.io`)
- **Stack:** Pure HTML5 + CSS3, no JavaScript, no build tools

## Branching & Deployment

- **`main`** — working branch, all development happens here
- **`publish`** — production branch, GitHub Pages serves from this branch
- Workflow: develop on `main`, then merge/push to `publish` when ready to go live

## Site Map (current state)

| Page | Path | Status |
|------|------|--------|
| Home | `index.html` (uses `home/style.css`) | Live — bio summary, news, profile sidebar |
| About | `about/main.html` | Live — research interests, education, publications, conferences, teaching |
| Research | `research/main.html` | Placeholder ("Coming Soon") |
| Courses | `courses/main.html` | Live — landing page with 5 course cards linking to detail pages |
| OpenSees Dev | `opensees/main.html` | Placeholder ("Coming Soon") |

## Architecture

Each section is a self-contained folder:
```
section/
  main.html        — page content
  style.css         — page styles
  documents/        — PDFs (CV, theses, papers)
  images/           — photos
  thumbnails/       — SVG icons
```

Exception: `index.html` lives at root and borrows `home/style.css`.

## Design System

- **Brand color:** `rgb(126, 32, 32)` (dark burgundy) — navbar, accents, footer border
- **Background:** `rgb(230, 230, 230)` (light gray)
- **Text:** `rgb(50, 50, 50)` primary, `rgb(70, 70, 70)` secondary
- **Container:** 960px max-width, centered
- **Layout:** CSS Flexbox, two-column on desktop (content left, profile sidebar right)
- **Font:** Tahoma with system font fallbacks
- **Breakpoint:** `max-width: 900px`
- **Footer:** Relative positioning with burgundy top border
- **Accessibility:** `prefers-reduced-motion` media query

## CSS Architecture Status

Home, About, and Courses pages use modern CSS with `:root` variables. Research and OpenSees pages use a partially modernized approach — navbar structure matches (box-sizing reset, align-items, display: inline-block on links) but values are still hardcoded rather than using CSS variables.

## Content Summary

### Home page (`index.html`)
- Short bio paragraph
- News list (webinar Jun 2025, PhD defense Feb 2025, post-doc start Dec 2024)
- Right column: research image, name, email, social links (ResearchGate, GitHub, Google Scholar, LinkedIn, ORCID), CV download

### About page (`about/main.html`)
- Research interests
- Education (PhD IUSS Pavia 2025, MSc IUSS 2019, MSc UGA 2018, BSc TED 2017)
- Publications (1 journal paper: EESD 2022)
- Conferences (4 entries: ALERT 2023, CompDSSI 2024, ReLUIS 2025, ICSMGE 2026)
- Teaching experience (4 entries)
- Right column: profile photo, name, email, same social links and CV

### Courses section (`courses/`)
Landing page with 5 course summary cards linking to individual detail pages:
- **Course A** — Seismic Assessment of RC Frame Structures (5+1 days, structural engineers)
- **Course B** — Liquefaction Modelling with OpenSees (5 days, geotechnical engineers)
- **Course C1** — Record Selection and PSHA with OpenQuake and ESHM2020 (3 days)
- **Course C2** — Modern Engineering Workflows: Python, AI Agents and Cloud (2-3 days)
- **Course D** — OpenSees Developer: Constitutive Models, Elements and HPC (10 days/2 weeks, PhD/postdoc)

### Placeholder pages
Research and OpenSees Dev still show "Coming Soon" with no content.

## External Profiles Linked

- ResearchGate: researchgate.net/profile/Onur-Akan-2
- GitHub: github.com/odakan
- Google Scholar: citations?user=tCNMPJ4AAAAJ
- LinkedIn: linkedin.com/in/odeniz-akan/
- ORCID: 0000-0003-4433-6596

## Known Issues / Future Work

1. **CSS unification** — Migrate research/opensees stylesheets to use `:root` CSS variables like home/about/courses
2. **Content needed** — Research and OpenSees Dev pages are still placeholders
3. **SVG icons** — Currently inline in HTML; could be externalized for cleaner markup
4. **Mobile responsiveness** — Only one breakpoint at 900px; could be improved for smaller screens
