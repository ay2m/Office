---
description: Bring the Arabic mirror level with the English tree, glossary-first
argument-hint: [path/to/doc.md | --audit]
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---

`ar/` is a parallel Saudi-MSA mirror of the **Markdown layer** across all twelve
sections — same folder structure, same ASCII kebab-case filenames, translated
content. The `.docx` / `.xlsx` / `.html` deliverables are EN-only.

**English is authoritative.** On any conflict the English tree governs; the
mirror is never the place to fix a fact.

## `--audit`

List English `.md` files with no `ar/` counterpart, and counterparts whose
`last_updated` predates their English source. The mirror runs behind by a
handful of docs at any time — that is expected, and CI does not gate on it, but
it should not drift silently for long.

## Translating one doc

1. Read `ar/_GLOSSARY.md` **first** and use its terms. Consistency of
   terminology is the whole point of having a glossary; inventing a synonym for
   an established term is the most common defect here.
2. Copy the English structure exactly — same headings, same order, same tables.
   A mirror a reader cannot diff against the original is not a mirror.
3. Front-matter: same seven keys, `lang: ar`, `title` translated,
   `last_updated` set to today.
4. Keep code, commands, paths, env vars, filenames and product names in Latin
   script. Aviation and regulatory terms follow the glossary.
5. Rebuild the Arabic PDF and commit it with the translation:
   `cd tools/print && node build.mjs ar/<path>.md`, then `node check.mjs`.
   Arabic renders in Cairo; the fonts are vendored, so this works offline.

## Also

If the doc appears in `_INDEX.md`, add it to `ar/_INDEX.md` too. If you meet a
term the glossary does not cover, add it there rather than deciding it once in
one document.

Report: which files you translated, which glossary terms you added, and the
final `node check.mjs` line.
