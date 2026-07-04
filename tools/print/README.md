---
title: Print pipeline — markdown to branded PDF
section: tools
doc_type: readme
status: active
owner: Founder
last_updated: 2026-07-03
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
node build-html.mjs    # render the self-contained brand HTML docs → PDF
node check.mjs         # guard: front-matter + _print coverage + staleness (no browser)
```

`build.mjs` handles markdown. `build-html.mjs` is a separate renderer for the
few brand/showcase pages authored directly as self-contained HTML
(`the-book-of-fly-gaca.html`, the brainstorms dashboard, `design-system.html`,
`tidal-reckoning.html`) — it prints them with their own styles (the two dark
showcase pages print dark by design). It is kept separate so HTML changes never
invalidate the markdown build cache. `check.mjs` is what CI runs
(`.github/workflows/docs-check.yml`) — dependency-free, no browser.

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

- Committed PDFs add ~50–70 MB to the repo (accepted trade-off so every doc
  is downloadable/printable without tooling). If that becomes a problem,
  move `_print/**/*.pdf` to Git LFS.
- `status: draft` or `scaffold` in front-matter → DRAFT/SCAFFOLD watermark
  on every page. Set `status: active` (or `final`) when adopted.
- The `.docx` / `.xlsx` / `.pptx` deliverables are already print-formatted
  and are not touched by this pipeline.
