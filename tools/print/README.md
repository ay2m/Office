---
title: Print pipeline — markdown to branded PDF
section: tools
doc_type: readme
status: active
owner: Founder
last_updated: 2026-08-25
lang: en
---

# Print pipeline — markdown → branded A4 PDF

Renders every `.md` in this repo (English tree and the `ar/` mirror) into a
print-ready PDF under `_print/`, mirroring the folder structure. Styling
follows the document "Falcon Theme" in
`11-brand/fly-gaca-document-style-guide.md`: Inter body, Cairo headings,
JetBrains Mono code, Falcon Blue accents, A4 with 0.75 in margins, footer
page numbers, and a diagonal watermark on `status: draft` / `scaffold` docs.
Arabic docs render RTL in Cairo with Latin code/paths kept LTR.

## Usage

```bash
cd tools/print
npm ci                 # 18 packages, no browser download (uses the local Chromium)
npm run build          # markdown → PDF, incremental — only changed docs re-render
npm run build:force    # rebuild every markdown doc
node build.mjs 02-legal/terms-of-use-draft-2026-06-14.md   # one file
node build-html.mjs    # render ALL 20 self-contained HTML pages → PDF
node build-png.mjs     # re-screenshot 11-brand/print/*.html → the 300 dpi catalogue PNGs
node check.mjs         # guard: front-matter + _print coverage + staleness (no browser)
node check-facts.mjs   # guard: the family contract's entity facts (no browser)
```

`build.mjs` handles markdown. `build-html.mjs` is a separate renderer for the
**20** pages authored directly as HTML — it prints them with their own styles
(the two dark showcase pages print dark by design), and is kept separate so HTML
changes never invalidate the markdown build cache:

| Where | What |
| --- | --- |
| `00-strategy/` | `the-book-of-fly-gaca.html`, the brainstorms dashboard |
| `02-legal/` | the Jawazat authorisation letter |
| `03-finance/` | the ZATCA `tax-invoice-template.html` + `vat-return-worksheet.html` |
| `09-investor-relations/decks/` | the bilingual investor decks (EN + AR) |
| `11-brand/` | `design-system.html`, `tidal-reckoning.html` |
| `11-brand/print/` | 10 print-collateral sources — letterheads EN/AR (+ sealed), memo, press release, business cards, envelope, compliments slip, contract cover; these share `brand-print.css` |

Adding or renaming **any** `.html` without re-running `build-html.mjs` fails CI,
exactly like an unrebuilt `.md`.

**CI runs two guards** (`.github/workflows/docs-check.yml`), both dependency-free
and browser-free: `check.mjs` for front-matter and `_print/` freshness, and
`check-facts.mjs` for the family contract's entity facts — it asserts every
`entity` value in `contracts/flygaca-family.json` against the
`01-governance/company-facts.md` table it was copied from, verifies the
manifest's self-hash, and asserts the IBAN and account number are absent from
the manifest (it travels to both product repos). `tools/contracts/stamp-manifest.mjs`
re-stamps that hash after an edit.

Requirements: Node 18+, a Chromium ≥ 131 (for CSS `@page` margin boxes —
page numbers). The script auto-detects the browser under
`$PLAYWRIGHT_BROWSERS_PATH` (default `/opt/pw-browsers`) or uses
`$CHROMIUM_PATH` if set. Fonts are vendored in `fonts/` (OFL-licensed woff2:
Inter, Cairo latin+arabic, JetBrains Mono) so builds are fully offline.

## How it works

1. `build.mjs` walks the repo for `.md` files (skipping `_print/`, `tools/`).
2. Each doc's YAML front-matter (`title / section / doc_type / status /
   owner / last_updated / lang`) becomes the branded cover block; the doc's
   own H1 is dropped when the front-matter title exists to avoid duplication.
3. Markdown renders via markdown-it (GFM tables, task-list checkboxes) into
   an HTML shell linking `theme.css`, then headless Chromium prints it
   (`page.pdf`, `preferCSSPageSize`).
4. `.buildcache.json` stores a content hash per source so unchanged docs are
   skipped — Chromium stamps a fresh CreationDate on every render, and
   without the cache each run would dirty all ~200 committed PDFs.

## Notes

- 263 PDFs are committed, adding ~50–70 MB to the repo (accepted trade-off so
  every doc is downloadable/printable without tooling). If that becomes a
  problem, move `_print/**/*.pdf` to Git LFS.
- **Editing `build.mjs` marks every PDF stale**, because its bytes fold into the
  shared `themeHash`. For a change that cannot alter output (a `SKIP_DIRS` entry,
  a comment, a log line), re-stamp `.buildcache.json` with the new hash instead of
  re-rendering — Chromium restamps `CreationDate` on all 263 otherwise. Verify with
  `node check.mjs` **and** a clean `git status _print/`.
- `status: draft` or `scaffold` in front-matter → DRAFT/SCAFFOLD watermark
  on every page. Set `status: active` (or `final`) when adopted.
- The `.docx` / `.xlsx` / `.pptx` deliverables are already print-formatted
  and are not touched by this pipeline.
