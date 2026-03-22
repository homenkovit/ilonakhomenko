---
name: translate
description: "Translate website content (articles and psychological tests) from Russian to English. Use this skill when the user wants to translate content, add English versions of articles or tests, work on i18n/localization of site content, or mentions /translate. Triggers on: translating articles, translating tests, adding English content, i18n, localization, creating en/ versions."
---

# Translate Skill

Translate psychological content (articles and tests) from Russian to English for the bilingual psychology practice website.

## How it works

This skill finds Russian content files that don't yet have English counterparts, translates them, and writes the English versions preserving the exact same file structure.

## Arguments

Parse the user's message for these arguments:

| Argument | Effect |
|----------|--------|
| *(none)* | Translate all untranslated content (articles + tests) |
| `articles` | Only translate articles |
| `tests` | Only translate tests |
| `--force` | Re-translate even if English version already exists |

Arguments can be combined: `articles --force` re-translates all articles.

## Content locations

- **Articles (RU):** `src/data/articles/ru/*.md`
- **Articles (EN):** `src/data/articles/en/*.md`
- **Tests (RU):** `src/data/tests/ru/*.md` + `src/data/tests/ru/*.json`
- **Tests (EN):** `src/data/tests/en/*.md` + `src/data/tests/en/*.json`

English file names must match Russian ones exactly (same slug).

## Step-by-step process

1. **Determine scope** — parse arguments to decide what to translate (articles, tests, or both) and whether `--force` is set.

2. **Find untranslated files** — list files in `ru/` directories and check which ones are missing from `en/`. If `--force`, treat all `ru/` files as candidates.

3. **For each file, translate according to its type** (see rules below).

4. **Write the translated file** to the corresponding `en/` path.

5. **Report results** — list what was translated. If nothing needed translation, say so.

## Translation rules

This is professional psychological content for a therapist's website. The translation quality matters — it should read naturally to an English-speaking audience while maintaining clinical accuracy.

### General principles

- **Tone:** Professional yet warm and empathetic — matching the original Russian style. This is a therapist speaking to potential clients, not a textbook.
- **Clinical terms:** Use standard English clinical/psychological terminology (e.g., "когнитивно-поведенческая терапия" → "cognitive behavioral therapy", "осознанность" → "mindfulness", "выученная беспомощность" → "learned helplessness").
- **Naturalness over literalness:** The English text should read as if it were originally written in English. Restructure sentences when needed for natural flow — don't produce "translationese."
- **Cultural adaptation:** If the Russian text references culturally specific concepts, adapt them so an English reader understands the meaning. Keep universal psychological concepts as-is.

### Article files (`.md`)

```yaml
---
title: "Translate this"
pubDate: 2025-11-03        # DO NOT change
description: "Translate this"
---

Translate the markdown body. Preserve all markdown formatting exactly:
headings, bold, italics, lists, links, line breaks, emoji usage.
```

- Translate: `title`, `description`, and the entire markdown body
- Preserve: `pubDate` value unchanged, all markdown formatting, heading levels, list structure
- Keep any URLs in links unchanged

### Test description files (`.md`)

Same rules as articles — translate `title`, `description` (in frontmatter), and the markdown body (usually test instructions).

### Test data files (`.json`)

These contain the actual test questions, answer options, and scoring interpretations. The JSON structure must remain identical — only translate string values.

**What to translate:**

| Field path | Example |
|------------|---------|
| `options[].text` | `"Совершенно не согласен"` → `"Strongly disagree"` |
| `questions[]` | Each question string |
| `scoring.ranges[].label` | (sum scoring) Interpretation text |
| `scoring.groups[].name` | (groups scoring) Group name |
| `scoring.groups[].positive` | (groups scoring) Positive interpretation |
| `scoring.groups[].negative` | (groups scoring) Negative interpretation |
| `scoring.factors[].name` | (reverse scoring) Factor name |
| `scoring.factors[].description` | (reverse scoring) Factor description |

**What NOT to translate (leave unchanged):**

- `options[].value` — numeric scores
- `scoring.type` — scoring algorithm identifier
- `scoring.ranges[].max` — numeric thresholds
- `scoring.groups[].questions` — question index arrays
- `scoring.factors[].questions` — question index arrays
- `scoring.factors[].reversed` — reversed question indices
- `scoring.factors[].maxScore` — numeric max scores
- All JSON keys/structure

**Validation:** After writing each `.json` file, verify it's valid JSON by reading it back. The structure (number of questions, number of options, number of scoring entries) must match the Russian version exactly.

### Well-known psychological scales

Many of the tests on this site are standardized psychological instruments with established English translations. Use the **official/standard English names and terminology** where they exist:

- Шкала депрессии Бэка → Beck Depression Inventory (BDI)
- Шкала дисфункциональных убеждений Бернса → Burns Dysfunctional Attitude Scale
- Шкала социальной тревожности Лейбовица → Liebowitz Social Anxiety Scale (LSAS)
- Пятифакторный опросник осознанности FFMQ → Five Facet Mindfulness Questionnaire (FFMQ)

For well-known scales, check whether standard English question wording exists and use it when possible, adapting only if the Russian version diverges significantly from the standard.

## Error handling

- If `en/` directories don't exist, create them.
- If a Russian source file is malformed (bad frontmatter, invalid JSON), skip it and report the error — don't halt the entire process.
- Always report a summary at the end: how many files translated, any skipped/failed.
