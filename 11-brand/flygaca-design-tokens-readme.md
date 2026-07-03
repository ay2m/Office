---
title: Fly GACA — Design Tokens (Tokens Studio import)
section: 11-brand
doc_type: readme
status: active
owner: Founder
last_updated: 2026-06-16
lang: en
---

# Fly GACA — Design Tokens (Tokens Studio import)

Extracted from `flygaca/assets/css/tokens.css` + `base.css`. Import into Figma with the **Tokens Studio** plugin (free) — no Figma MCP limits involved.

## What's in the file

`flygaca-design-tokens.json` — 130 tokens across 8 sets:

| Set | Tokens | Notes |
|-----|--------|-------|
| `primitives` | Falcon palette, amber, status, ink (dark text), paper (light neutrals) | raw values; referenced, not themed |
| `spacing` | `space.1`–`space.16` | 4px base, in px |
| `radius` | sm/md/lg/xl/pill | |
| `typography` | font, weight, size, line-height, tracking | sizes are the desktop upper bound of the CSS `clamp()` scale |
| `text` | display, h1–h3, lead, body, small, eyebrow, mono-label | composite type styles → become Figma text styles |
| `shadow` | sm, card, pop, amber, amber-strong | → Figma effect styles |
| `color-dark` | full semantic set | extracted from code (dark-first) |
| `color-light` | full semantic set | **newly authored** light theme |

Two themes are defined — **Dark** and **Light** — under a `mode` group. Each enables its own color set and shares the primitives, scale, type, and shadow sets.

## How to import

1. In Figma, install **Tokens Studio for Figma** (Plugins → find more → "Tokens Studio").
2. Open it → **Settings → use "Single file"**, or just **Tools → Import → Import from file** and select `flygaca-design-tokens.json`.
3. Tokens Studio loads all 8 sets and both themes.
4. Open the **Themes** dropdown → for each theme (Dark, Light) click **Export to Figma** (or "Create variables"). This generates real Figma variable collections + modes, plus text and effect styles.
5. The `$figmaCollectionId` / `$figmaModeId` fields are left null on purpose — Tokens Studio fills them on first export so re-imports update in place instead of duplicating.

After export you'll have native Figma variables (with Light/Dark modes on the color collection), text styles, and effect styles — exactly the Phase 1 foundation, just created by the plugin instead of the MCP.

## Decisions baked in (from discovery)

- **Primary CTA = amber `#FFB020`** (`color.primary`), brand fill = teal (`color.brand`). This matches the live `.btn-primary`, which is amber despite `--brand` being teal.
- **Light mode is net-new.** Code is dark-only; the `color-light` set is an authored light theme using the same palette. Light `link`/`accent`/`danger-text` use darker primitives (`teal-deep`, `sage-deep`, `danger-deep`) added for WCAG contrast on white.
- **Off-palette values folded in** as primitives: `palette.amber`, `palette.amber-bright`, `palette.amber-ink` (`#0A0E14`).

## Resuming the native Figma build

When the Figma plan limit lifts (or you upgrade), I can resume the original MCP build — components with variants and variable bindings (Button, Field, Card, Chip, Nav, Footer) — using the saved state. This token JSON and that build target the same file, so they're compatible.

— Independent educational reference. Not affiliated with GACA.
