# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal academic website for Onur Deniz Akan (earthquake engineering researcher), hosted on GitHub Pages at `www.onurdenizakan.com`. HTML5 + CSS3 with a small amount of vanilla JavaScript (the home-page slideshow and contact form). No build tools, no frameworks, no external dependencies.

See `.plans/master-brief.md` for full project context, content inventory, and future work.

## Branching & Deployment

- **`main`** — working branch, all development happens here
- **`publish`** — production branch, GitHub Pages serves from this branch
- Workflow: develop on `main`, merge/push to `publish` when ready to go live
- No build step required

## Architecture

A single unified stylesheet — `style.css` at the repo root — styles every page (loaded as `./style.css` from root, `../style.css` from section folders). Each section is a folder with its own `main.html`:

- `index.html` — Landing/home page (root): full-width hero with name overlay, a "Currently" line, autoplay work-sample slideshow, News (two formats — plain, or with a thumbnail), Tools & Projects cards, a Featured Publication, and a Contact form. No About blurb, profile links, or CV here (those live on the About page).
- `home/` — Home page assets: `images/`, `documents/` (CV), and `home.js` (vanilla JS: the slideshow + the contact-form submit handler). No `main.html` or CSS — content lives in root `index.html`
- `about/` — About/bio page: "About" title + profile blurb, research interests (bullet list), education, publications, teaching, awards
- `research/` — Research articles (card list with thumbnail figures; e.g. the IMPL-EX article `implex.html`)
- `courses/` — Courses section (landing page + 5 individual course detail pages)
- `opensees/` — OpenSees development page (tool cards with thumbnail figures)
- `consultancy/` — Consultancy page (service/project cards with thumbnail figures)

Assets live alongside pages:
- `<section>/documents/` — PDFs (CV, theses, papers)
- `<section>/images/` — Photos
- `<section>/thumbnails/` — SVG icons
- `fonts/` — self-hosted variable woff2 fonts (Source Serif 4 + Source Sans 3) and `OFL.txt` license

Non-published files:
- `.plans/` — Implementation plans and notes, incl. `contact-form-setup.md` (contact-form Apps Script, deploy steps, and the injection-aware AI-triage prompt). Committed but not linked from any page.
- `.claude/` — Claude Code internals (gitignored)

## Design System

**Colors (CSS `:root` variables in `style.css`):**
- Brand/nav: `rgb(126, 32, 32)` (dark burgundy); hover `rgb(158, 44, 44)`
- Page background: `#f4f2ed` (warm off-white)
- Surface (cards/tables): `#ffffff`
- Primary text: `#2b2b2b`
- Secondary text: `#565656`
- Hairline border `rgba(40, 25, 25, 0.12)`; corner radius `--radius: 6px`

**Layout:**
- Max-width container: 1000px, centered
- Two-column desktop layout using CSS Flexbox
- Breakpoint for mobile: `max-width: 900px`
- Type: editorial pairing — body in **Source Serif 4** (`--serif`), nav/headings/UI labels in **Source Sans 3** (`--sans`). Both self-hosted as variable woff2 in `/fonts` via `@font-face`. Root font-size 17px.
- Footer: relative positioning with burgundy top border

**Consistent page structure across all pages:**
1. Navigation bar (dark burgundy, 6 links: Home, About, Research, Courses, OpenSees Dev, Consultancy)
2. Main content area (flexbox container)
3. Footer with copyright (inside `<body>`, relative positioned)

## Conventions

- Navigation links use relative paths to `main.html` in each section folder (e.g., `href="../about/main.html"`)
- Active page marked with `aria-current="page"` on its nav link (styled with an underline indicator)
- Social icons: uniform single-path monochrome glyphs (simple-icons) using `fill: currentColor` — muted gray, burgundy on hover. Order: ResearchGate, GitHub, Google Scholar, LinkedIn, ORCID
- Media queries include `prefers-reduced-motion` for accessibility
- JavaScript is kept minimal and dependency-free (`home/home.js`, vanilla, no libraries); everything else is CSS-only. It powers (a) the home slideshow — autoplays every 15s, arrows + dots, pause on hover/focus, loops, autoplay disabled under `prefers-reduced-motion`; and (b) the contact-form submit handler — posts to a Google Apps Script endpoint via `fetch` (no-cors, form-urlencoded) and shows inline status.
- Home `.hero` is a flex item in the `body` column and must keep `flex-shrink: 0` so it doesn't collapse; its height is a fixed px value (not `vh`) for robustness across mobile browsers.
- News items come in two formats: plain (`<li class="news-item">` with a `.news-body`) or with a thumbnail (add an `<img class="news-thumb">` before the body).
- Text alignment: body content is justified (`text-align: justify`) for an orderly block look; `.teach-list` (About teaching & awards) is the deliberate exception and stays left-aligned.
- Thumbnail cards (research / OpenSees / consultancy): add `.has-thumb` to `.research-card` / `.course-card` — a flex row with a `.card-thumb` (160px wide, full entry height via `align-items: stretch`) beside `.card-body`; stacks vertically below 560px. Use `.card-thumb-placeholder` until real images are dropped into each section's `images/`.
- Contact form: a static `<form>` posts to a Google Apps Script web app that appends rows to a private Google Sheet (write-only endpoint; submissions never touch the repo). The endpoint URL lives in `home/home.js` (`CONTACT_ENDPOINT`). Honeypot + per-minute rate limit + hourly email cap guard against abuse. Full setup + the injection-aware triage prompt: `.plans/contact-form-setup.md`.
- Copyright year: 2026
- Footer must be inside `<body>` tag (not outside it)
