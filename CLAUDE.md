---
title: CLAUDE.md
section: root
doc_type: document
status: active
owner: Founder
last_updated: 2026-07-31
lang: en
---

# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

**FlyGACA/Office** ("The Office") is the internal **documents repository** for Fly GACA — an
independent, educational platform and open regulatory library for Saudi civil aviation. It holds
every operating document that runs the company: strategy/OKRs, governance, legal, finance,
KSA compliance, HR/people, operations/IT specs, GTM, customer success, investor relations,
academy curriculum, and brand — **not** product code. Fly GACA's product code lives in separate
repos: the web monorepo `FlyGACA/FlyGACA-app`, the AI service `FlyGACA/Captain-Adel`, the iOS
family `ay2m/FlyGACA`, and six per-module App Store metadata repos (`FlyGACA/PPL`, `CPL`, `IR`,
`ATPL`, `ELPT`, `AIP`). A Claude Code session here is almost always **drafting, editing, or
reorganizing organizational documents**, not writing or reviewing application code.

> [!IMPORTANT]
> Fly GACA is **not affiliated with GACA** (Saudi General Authority of Civil Aviation). This
> constraint is load-bearing across the whole document tree, not just user-facing product copy —
> legal, GTM, and investor materials must all state the relationship accurately.

This repo contains real operating material — signed/draft legal agreements, financial data, HR
records, investor materials, strategic plans. Treat its contents as sensitive: don't summarize or
quote its financial/legal/HR/investor content into other contexts (chat replies, other repos,
external tools) beyond what the task actually requires, and never publish it. Security or
data-isolation concerns go to the maintainer directly per `01-governance/SECURITY.md` — not a
public issue.

## Repository structure

Twelve numbered sections, each independently browsable:

| # | Section | Contents |
| --- | --- | --- |
| `00-strategy/` | Strategy | Annual plan & OKRs, master roadmap, CEO execution plan, Phase 0 tracker, numbered brainstorms |
| `01-governance/` | Governance | Founders' agreement, SHA, ESOP, Code of Conduct, board pack, decision log, **`CLAUDE.md`** (see below), `CONTRIBUTING.md`, `SECURITY.md` |
| `02-legal/` | Legal | NDA templates, EULA, SLA, pilot agreement, PDPL policies, DPA, IP/takedown procedure |
| `03-finance/` | Finance | Banking policy, procurement, expense policy, budget-vs-actual tracker, KPI dashboard |
| `04-compliance-ksa/` | Compliance (KSA) | MISA license, ZATCA e-invoicing, PDPL DPIA, BCP/DR, Nitaqat plan |
| `05-people/` | People | Employment contracts, employee handbook, offer letters, onboarding/offboarding, HR policies |
| `06-operations-it/` | Operations/IT | Digital office setup, product specs (CRM, Captain Adel, Instructor Dashboard), `runbooks/`, `diagrams/`, `setup/` |
| `07-gtm/` | Go-To-Market | Sales playbook, demo script, objection handling, cold outreach, B2B pipeline, `seo/` strategy |
| `08-customer-success/` | Customer Success | Onboarding playbook, health scoring, NPS, QBR templates, at-risk/expansion playbooks |
| `09-investor-relations/` | Investor Relations | Pitch deck, FAQ, due-diligence questionnaire, investor update template, risk register |
| `10-academy-curriculum/` | Academy & Curriculum | Curriculum map, coverage matrix, PPL mock exams, B2C learner paths, instructor onboarding |
| `11-brand/` | Brand | Design system, design tokens, style guide (Falcon Theme), logos, print assets (EN + RTL AR) |

Support directories:

- **`templates/`** — reusable `.md` starters (`tpl-fin-report.md`, `tpl-hr-policy.md`,
  `tpl-legal-memo.md`, `tpl-ops-runbook.md`, `tpl-strat-proposal.md`). Base new docs on these.
- **`ar/`** — a full parallel Arabic (Saudi MSA) mirror of all 12 sections, same folder structure
  and filenames, translated content. **English is authoritative** — on any conflict the English
  tree governs. Filenames stay ASCII kebab-case even under `ar/` for easy diffing.
- **`tools/print/`** — the Markdown → branded A4 PDF pipeline (see below).
- **`_print/`** — generated PDFs, mirroring the whole tree (including `ar/`). Generated output,
  but **is committed** (not gitignored) — the CI gate below checks it's present and fresh.
- **`_INDEX.md`** / **`ar/_INDEX.md`** — master index of the whole tree.
- **`ar/_GLOSSARY.md`** — the EN↔AR terminology glossary that keeps translations consistent.

Two document formats coexist: polished deliverables (contracts, decks, spreadsheets) are committed
as `.docx`/`.xlsx` binaries; working notes, specs, drafts, and playbooks are `.md` — which is what
the print pipeline and the doc-check CI both operate on. A few brand/showcase pages
(`00-strategy/brainstorms/00-strategic-brainstorms-dashboard.html`, `11-brand`'s
`the-book-of-fly-gaca.html`, `design-system.html`, `tidal-reckoning.html`) are authored directly as
self-contained HTML instead of Markdown and render through a separate path (below).

## The doc convention (enforced by CI)

**Every content `.md` file requires YAML front-matter** with these exact keys:

```yaml
---
title: <doc title>
section: <e.g. 03-finance>
doc_type: <document|readme|template|...>
status: <active|draft|scaffold>
owner: <e.g. Founder>
last_updated: <YYYY-MM-DD>
lang: <en|ar>
---
```

Exemptions: the root `README.md` is skipped entirely; files under any `templates/` directory only
need a `title` key (they use their own authoring schema, not the full doc metadata). Every other
`.md`, anywhere in the tree (including `ar/`), needs the full set.

`status: draft` or `status: scaffold` stamps an automatic DRAFT/SCAFFOLD watermark on the rendered
PDF — set it deliberately.

**Every `.md` must have a matching, up-to-date PDF under `_print/`.** After creating or editing any
`.md` file (English or Arabic), regenerate its PDF before committing:

```bash
cd tools/print
npm ci                      # once, or after a dependency change (no browser download — uses the
                             # pre-installed Chromium the print pipeline auto-detects)
npm run build                # incremental — only content-changed docs re-render
npm run build:force          # rebuild every doc from scratch
node build.mjs <path/to/doc.md>   # render one file
node build-html.mjs           # separately renders the self-contained brand/showcase HTML pages
node check.mjs                # the CI gate itself — front-matter + PDF coverage + staleness,
                               # no browser needed, safe to run anytime
```

`build.mjs` hashes each source file (folded with a hash of `theme.css` + `build.mjs` itself) into
`tools/print/.buildcache.json`; `check.mjs` recomputes that hash and fails if it doesn't match the
committed PDF, i.e. if you edited a doc but didn't rebuild its PDF. **Commit the regenerated PDF
and the updated `.buildcache.json` together with the `.md` change** — a doc edit without a rebuilt
PDF fails CI (`.github/workflows/docs-check.yml`, runs on push to `main` and on PRs touching
`**/*.md`, `**/*.html`, `_print/**`, or `tools/print/**`).

Styling is the "Falcon Theme" documented in `11-brand/fly-gaca-document-style-guide.md`: Inter body
· Cairo headings (and all Arabic text) · JetBrains Mono code, A4 page, 0.75in margins, footer page
numbers, cover block generated from the front-matter. Fonts are vendored under `tools/print/fonts/`
so the whole pipeline runs offline; it auto-detects Chromium via `$PLAYWRIGHT_BROWSERS_PATH`
(default `/opt/pw-browsers`) or `$CHROMIUM_PATH`. Requires Node 18+.

## Conventions

- **Bilingual, English-authoritative.** New or materially changed content docs should eventually
  get an `ar/` counterpart at the same path, translated per `ar/_GLOSSARY.md`'s terminology — but
  unlike the product repos, CI here does **not** hard-gate on EN/AR parity (only front-matter + PDF
  freshness are checked independently per file), so an EN-only doc won't fail CI. Still keep the
  mirror in sync as a matter of practice; don't let it drift silently for long.
- **Sensitive-content discipline.** Legal, financial, HR, and investor documents in this repo are
  real operating material, not samples — quote or restate the minimum necessary for the task.
- **Governance is the source of policy**, not this file: `01-governance/CONTRIBUTING.md` (setup +
  pre-PR checklist), `01-governance/CODE_OF_CONDUCT.md`, `01-governance/SECURITY.md` (responsible
  disclosure — read before touching anything security- or data-isolation-adjacent).
- **`01-governance/CLAUDE.md`** used to be a stale vendored copy of a *different* repo's Claude
  guidance (the product monorepo's, describing `functions/`, routing, etc. — none of which exists
  here); it has been replaced with a short pointer back to this file. If you find it drifting
  again, fix the pointer, don't restore old content.
- License: Apache 2.0 (`01-governance/LICENSE`) for the repo's own material; regulatory content
  quoted anywhere belongs to GACA and is not covered by that license.

## Where to look

- **`_INDEX.md`** — master index across all 12 sections (and `ar/_INDEX.md` for the mirror).
- **`00-strategy/roadmap.md`** — current phase status and what's next.
- **`tools/print/README.md`** — full print-pipeline usage/config detail beyond the summary above.
- **`01-governance/`** — `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `decision-log.md`.
- **`ar/_GLOSSARY.md`** — EN↔AR terminology, use it before translating anything.
