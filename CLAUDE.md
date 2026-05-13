# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal academic website for Onur Deniz Akan (earthquake engineering researcher), hosted on GitHub Pages at `www.onurdenizakan.com`. Pure HTML5 + CSS3, no build tools or JavaScript frameworks.

See `.plans/master-brief.md` for full project context, content inventory, and future work.

## Branching & Deployment

- **`main`** — working branch, all development happens here
- **`publish`** — production branch, GitHub Pages serves from this branch
- Workflow: develop on `main`, merge/push to `publish` when ready to go live
- No build step required

## Architecture

Each section is a self-contained folder with its own `main.html` and `style.css`:

- `index.html` — Landing/home page (root, uses `home/style.css`)
- `home/` — Home page styles and assets (no `main.html`; content is in root `index.html`)
- `about/` — About/bio page (publications, education, teaching)
- `research/` — Research page (placeholder)
- `courses/` — Courses section (landing page + 5 individual course detail pages)
- `opensees/` — OpenSees development page (placeholder)

Assets live alongside pages:
- `<section>/documents/` — PDFs (CV, theses, papers)
- `<section>/images/` — Photos
- `<section>/thumbnails/` — SVG icons

Non-published files:
- `.plans/` — Implementation plans and website building notes (committed but not linked from any page)
- `.claude/` — Claude Code internals (gitignored)

## Design System

**Colors (CSS `:root` variables in home/about; hardcoded in others):**
- Brand/nav: `rgb(126, 32, 32)` (dark burgundy)
- Page background: `rgb(230, 230, 230)` (light gray)
- Primary text: `rgb(50, 50, 50)`
- Secondary text: `rgb(70, 70, 70)`

**Layout:**
- Max-width container: 960px, centered
- Two-column desktop layout using CSS Flexbox
- Breakpoint for mobile: `max-width: 900px`
- Font: `"Tahoma", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`
- Footer: relative positioning with burgundy top border

**Consistent page structure across all pages:**
1. Navigation bar (dark burgundy, 5 links: Home, About, Research, Courses, OpenSees Dev)
2. Main content area (flexbox container)
3. Footer with copyright (inside `<body>`, relative positioned)

## Conventions

- Navigation links use relative paths to `main.html` in each section folder (e.g., `href="../about/main.html"`)
- SVG icons for external profiles: ResearchGate, GitHub, Google Scholar, LinkedIn, ORCID
- Media queries include `prefers-reduced-motion` for accessibility
- No JavaScript — all interactivity is CSS-only
- Copyright year: 2025
- Footer must be inside `<body>` tag (not outside it)
