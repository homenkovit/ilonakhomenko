## Project Overview

Personal portfolio website for a psychology practice built with Astro (static site generator). The site supports Russian (default) and English via i18n, and features articles, interactive psychological tests, and appointment booking via Cal.com.

## Commands

```bash
npm run dev      # Start dev server with hot reload
npm run build    # Build for production (outputs to /dist)
npm run preview  # Preview production build locally
npm run lint     # Lint with Biome
npm run lint:fix # Lint and auto-fix with Biome
npm run format   # Format with Biome
```

## Architecture

### Content System
- **Articles**: Markdown files in `src/data/articles/{ru,en}/*.md` with frontmatter (title, pubDate)
- **Tests**: Markdown files in `src/data/tests/{ru,en}/*.md` paired with JSON data files containing questions and scoring logic
- **Page content**: Localized page text in `src/data/pages/*.ts` (exported as `Record<Lang, ...>`)
- **FAQ**: Structured data in `src/data/faq.ts` (keyed by locale)
- Content collections configured in `src/content.config.ts` (separate collections per locale: `articlesRu`, `articlesEn`, `testsRu`, `testsEn`)

### Test Scoring System
Three scoring types defined in `src/scripts/test-runner/types.ts`:
- **SumScoring**: Total score mapped to labeled ranges
- **GroupsScoring**: Questions grouped with positive/negative interpretations
- **ReverseScoring**: Multiple factors with some questions scored in reverse

Module structure in `src/scripts/test-runner/`:
- `test-runner.ts` — main class
- `test-state.ts` — localStorage persistence
- `result-formatter.ts` — result formatting
- `scoring/` — scoring strategies (sum, groups, reverse)

### Component Structure
- `src/components/shared/` — Global reusable components (layout, navigation, SEO, UI elements)
- `src/components/index-page/` — Homepage section components
- `src/layouts/BaseLayout.astro` — Main page wrapper

### Assets
- `src/assets/images/` — images processed by Astro (optimization)
- `public/images/` — article and test covers (webp, multiple sizes)
- `public/fonts/` — Inter Cyrillic (woff2, 400/600)
- `public/` — favicon set, og-image.png, icons.svg

### i18n
- Two locales: `ru` (default, no prefix) and `en` (prefix `/en/`)
- Astro's built-in i18n configured in `astro.config.mjs` with `prefixDefaultLocale: false`
- UI translations in `src/i18n/ui.ts`, helpers in `src/i18n/utils.ts` (`getLangFromUrl`, `useTranslations`, `getLocalizedPath`)
- Language-based redirects for English users via `public/_redirects` (Netlify)
- `LanguageSwitcher.astro` component for switching locales
- `scripts/generate-en-manifest.mjs` runs as postbuild to generate a separate PWA manifest for `/en/`

### Routing
File-based routing in `src/pages/[...locale]/`:
- All pages live under `src/pages/[...locale]/` catch-all route for i18n
- Static pages: `index.astro`, `about.astro`, `faq.astro`, `help.astro`, `price.astro`, `education.astro`, `booking.astro`, `404.astro`, `offline.astro`
- Dynamic routes: `articles/[id].astro`, `tests/[id].astro` using `getStaticPaths()`

### Styling
- Global CSS variables and base styles in `src/styles/global.css`
- Scoped styles within Astro components
- Primary breakpoints: 768px (mobile), 800px (tablet), 1500px (large desktop)
- No CSS framework

### Cal.com Integration
- Config in `src/config/cal.ts`, embed script in `src/scripts/cal-embed.ts`
- Lazy-loaded embedded booking widget

### PWA
- `@vite-pwa/astro` with `injectManifest` strategy
- Service worker in `src/sw.ts` (workbox-precaching, networkFirst for pages, cacheFirst for assets)
- Configured in `astro.config.mjs`

### SEO
- `SEO.astro` — meta tags, `JsonLd.astro` — structured data
- Sitemap via `@astrojs/sitemap`

### Deployment
- Hosting: Netlify (`netlify.toml`)
- Security headers (CSP, HSTS, X-Frame-Options, etc.) configured in `netlify.toml`
- CSP includes `cal.com` and `cal.eu` domains for the booking widget; update CSP when adding external resources

## Environment
- No `.env` files used
- `import.meta.env.SITE` with fallback to `https://ilonakhomenko.com` (used in SEO, JsonLd, article/test pages)
- Site URL is set in `astro.config.mjs` (`site:` field)

## Testing
- No automated tests
- Verification: `npm run build` + `npm run preview` + manual review

## Key Conventions

- TypeScript strict mode enabled
- Node 24 required (see `.nvmrc`)
- Biome for linting and formatting (tabs, 100 char line width, double quotes)
- User-facing content in Russian (`lang="ru"`) and English (`lang="en"`)
- Semantic HTML with ARIA labels for accessibility
- Pure Astro components (no React/Vue integrations)
- View Transitions between pages

## Guidelines

- Run `npm run build` only after code changes (components, pages, styles, scripts, configs). Do not run after changes to .md docs or CLAUDE.md
- Run `npm run lint` before committing
- Do not modify `netlify.toml` without user confirmation
- Do not add npm dependencies without user confirmation
- Commit messages and code comments in English
- Site content in Russian and English
