Read the current `.claude/CLAUDE.md` and then explore the actual project structure to verify the documentation is accurate. Compare each section of CLAUDE.md against reality and update only the parts that are outdated.

## Steps

1. **Read** `.claude/CLAUDE.md` in full.
2. **Explore the project** — check the key areas described in the docs:
   - `src/pages/` — routing, page files
   - `src/components/` — component directory structure
   - `src/data/` — content collections, articles, tests, FAQ
   - `src/scripts/` — scripts structure (test-runner, cal-embed, etc.)
   - `src/styles/` — stylesheets
   - `src/assets/` and `public/` — assets, fonts, images
   - `src/layouts/` — layout files
   - `src/content.config.ts` or equivalent — content collection config
   - `astro.config.mjs` — integrations, site config
   - `netlify.toml` — deployment config, headers
   - `package.json` — dependencies, scripts, node version
   - `.nvmrc` — node version
   - `biome.json` or equivalent — linter/formatter config
   - Any other config files at the project root
3. **Compare** each section of CLAUDE.md with what you found. Note discrepancies: missing directories, renamed files, new integrations, changed scripts, outdated descriptions.
4. **Update** only the sections that are outdated. Preserve the existing structure, style, tone, and formatting of CLAUDE.md. Do not rewrite sections that are still accurate. Do not add unnecessary detail.
5. **Summary** — after making changes, briefly list what was updated and why. If everything is up to date, say so.

## Rules

- Do NOT rewrite the entire file — only fix what's wrong.
- Do NOT change formatting conventions (heading levels, code block style, etc.).
- Do NOT remove sections unless the described feature no longer exists.
- Add new sections only if significant new architecture was introduced (new directories, integrations, major features).
- Keep descriptions concise — match the style of existing content.
- Run `npm run build` after changes to verify nothing is broken (only if code-related sections were updated).
