# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for a psychology practice built with Astro (static site generator). The site is entirely in Russian and features articles, interactive psychological tests, and appointment booking.

## Commands

```bash
npm run dev      # Start dev server with hot reload
npm run build    # Build for production (outputs to /dist)
npm run preview  # Preview production build locally
```

## Architecture

### Content System
- **Articles**: Markdown files in `src/data/articles/*.md` with frontmatter (title, pubDate)
- **Tests**: Markdown files in `src/data/tests/*.md` paired with JSON data files containing questions and scoring logic
- Content collections configured in `src/content.config.ts`

### Test Scoring System
Three scoring types defined in `src/types/test.ts`:
- **SumScoring**: Total score mapped to labeled ranges
- **GroupsScoring**: Questions grouped with positive/negative interpretations
- **ReverseScoring**: Multiple factors with some questions scored in reverse

Test state persists in localStorage via `TestRunner` class (`src/scripts/test-runner.ts`).

### Component Structure
- `src/components/shared/` - Global components (Header, Footer, Navigation, AppointmentDialog)
- `src/components/index-page/` - Homepage section components
- `src/layouts/BaseLayout.astro` - Main page wrapper

### Routing
File-based routing in `src/pages/`:
- Static pages: `index.astro`, `about.astro`, `education.astro`
- Dynamic routes: `articles/[id].astro`, `tests/[id].astro` using `getStaticPaths()`

### Styling
- Global CSS variables and base styles in `src/styles/global.css`
- Scoped styles within Astro components
- Breakpoints: 1440px (desktop), 768px (mobile)
- No CSS framework

## Key Conventions

- TypeScript strict mode enabled
- Node 24 required (see `.nvmrc`)
- All user-facing content in Russian with `lang="ru"`
- Semantic HTML with ARIA labels for accessibility
- Pure Astro components (no React/Vue integrations)