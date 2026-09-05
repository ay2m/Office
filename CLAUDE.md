---
title: CLAUDE.md
section: root
doc_type: document
status: active
owner: Founder
last_updated: 2026-08-26
lang: en
---

# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

**iflygaca/Office** ("The Office") is the internal **documents repository** for Fly GACA — an
independent, educational platform and open regulatory library for Saudi civil aviation. It holds
every operating document that runs the company: strategy/OKRs, governance, legal, finance,
KSA compliance, HR/people, operations/IT specs, GTM, customer success, investor relations,
academy curriculum, and brand — **not** product code. A Claude Code session here is almost always
**drafting, editing, or reorganizing organizational documents**, not writing or reviewing
application code.

Product code lives in separate repos, all under the **`ay2m`** account:

| Repo | | What it is |
| --- | --- | --- |
| [`iflygaca/FlyGACA`](https://github.com/iflygaca/FlyGACA) | private | **The product.** The bilingual web app (React 19 + Vite) *and* its Express backend on Cloud Run. The regulatory corpus and content pipelines live here too. |
| [`iflygaca/Captain-Adel`](https://github.com/iflygaca/Captain-Adel) | private | The AI flight instructor service behind captadel.com |
| [`iflygaca/FlyGACA-ios`](https://github.com/iflygaca/FlyGACA-ios) | public | The native SwiftUI family — one shared package, one App Store app per exam module |
| [`iflygaca/FlyGACA-app`](https://github.com/iflygaca/FlyGACA-app) | public, **archived** | The retired predecessor of `iflygaca/FlyGACA`. Read-only, kept for its 1,005-commit history. Do not cite it as current. |

**iOS module status:** **ELPT** and **AIP** ship. **PPL, CPL, IR and ATPL are parked** — their
modules were removed from the iOS repo in 2026-08 pending a strategic decision, while their
**web** study packs keep selling at the band prices in `03-finance/monetization.md`.

> [!NOTE]
> Older documents in this tree refer to a `FlyGACA/…` org and to six per-module App Store
> metadata repos (`PPL`, `CPL`, `IR`, `ATPL`, `ELPT`, `AIP`). **Neither is current.** The
> `FlyGACA/…` paths are legacy redirects to `iflygaca/…`, and no per-module repo exists under
> either owner — every one 404s, so App Store metadata lives in `iflygaca/FlyGACA-ios`. Some
> documents also call `iflygaca/FlyGACA` "the iOS family", or `iflygaca/FlyGACA-app` "the web
> monorepo" — it is the web app and backend, and `FlyGACA-app` is archived.

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
| `03-finance/` | Finance | Banking policy, procurement, expense policy, budget-vs-actual tracker, KPI dashboard, ZATCA invoicing (HTML tax-invoice + VAT-return templates) |
| `04-compliance-ksa/` | Compliance (KSA) | MISA license, ZATCA e-invoicing, PDPL DPIA, BCP/DR, Nitaqat plan |
| `05-people/` | People | Employment contracts, employee handbook, offer letters, onboarding/offboarding, HR policies |
| `06-operations-it/` | Operations/IT | Digital office setup, product specs (CRM, Captain Adel, Instructor Dashboard), hosting/secrets placement facts, `runbooks/`, `diagrams/`, `setup/` |
| `07-gtm/` | Go-To-Market | Sales playbook, demo script, objection handling, cold outreach, B2B pipeline, `seo/` strategy |
| `08-customer-success/` | Customer Success | Onboarding playbook, health scoring, NPS, QBR templates, at-risk/expansion playbooks |
| `09-investor-relations/` | Investor Relations | Pitch deck, FAQ, due-diligence questionnaire, investor update template, risk register |
| `10-academy-curriculum/` | Academy & Curriculum | Curriculum map, coverage matrix, PPL mock exams, B2C learner paths, instructor onboarding |
| `11-brand/` | Brand | Design system, design tokens, style guide (Falcon Theme), logos, print assets (EN + RTL AR) |

Support directories:

- **`templates/`** — reusable `.md` starters (`tpl-fin-report.md`, `tpl-hr-policy.md`,
  `tpl-legal-memo.md`, `tpl-ops-runbook.md`, `tpl-strat-proposal.md`; mirrored under
  `ar/templates/`). Base new docs on these.
- **`ar/`** — a parallel Arabic (Saudi MSA) mirror of the **Markdown layer** across all 12
  sections — same folder structure and filenames, translated content. It holds 126
  `.md` matching the English tree's 126 (100% parity across all 12 sections). The `.docx`/`.xlsx`/`.html` deliverables
  are EN-only. **English is authoritative** — on any conflict the English
  tree governs. Filenames stay ASCII kebab-case even under `ar/` for easy diffing.
- **`tools/print/`** — the Markdown → branded A4 PDF pipeline (see below), plus `check-facts.mjs`,
  the entity-facts gate described under **The family contract**.
- **`contracts/flygaca-family.json`** / **`tools/contracts/`** — the cross-repo family contract
  and the tool that stamps its self-hash. See **The family contract** below.
- **`_print/`** — generated PDFs (265 today), mirroring the whole tree (including `ar/`).
  Generated output, but **is committed** (not gitignored) — the CI gate below checks it's present
  and fresh.
- **`_INDEX.md`** / **`ar/_INDEX.md`** — master index of the whole tree.
- **`ar/_GLOSSARY.md`** — the EN↔AR terminology glossary that keeps translations consistent.
- **`drive-index-updates.csv`** — a root-level `old_path,new_path` map recording the Drive→repo
  filename normalisation (Title Case + spaces → ASCII kebab-case). Reference it when an old
  filename turns up in a link or an external index; it is data, not a doc, and the doc-check gate
  ignores it.
- **`.claude/agents/`** — twenty-five subagents scoped to this repo. The originals:
  **doc-smith** (any `.md`/`.html` add/edit/rename, front-matter, and the print pipeline — use
  it when docs-check fails), **ar-mirror** (translating into `ar/` against the glossary and
  rebuilding the Arabic PDFs), **ksa-compliance** (anything turning on Saudi regulation, and any
  vendored-skill output before it is adopted), **family-warden** (the family contract, entity
  facts, and cross-repo drift); plus three GTM agents (**schools-acquisition**,
  **gtm-defensibility-steward**, **fly-gaca-gtm-orchestrator**) and eighteen territory agents —
  one per numbered section (strategy-analyst, governance-clerk, legal-scribe, finance-steward,
  people-ops, ops-it-spec, seo-strategist, customer-success, ir-steward, academy-curriculum,
  brand-keeper) plus pipeline/governance specialists (print-pipeline, index-curator,
  consistency-sweeper, templates-curator, privacy-dpia, exam-bank-author, captadel-liaison).
  `agents/README.md` holds the roster and says when each applies;
  `06-operations-it/agent-workforce-plan.md` explains why the roster exists at all, the
  earn-its-place test every agent must pass, and how the family's other repos are meant to fit.
  (The plan's original four-agent cap was superseded by founder direction on 2026-08-26.)
- **`.claude/skills/`** — six vendored Apache-2.0 governance/privacy/risk skills (GDPR controls,
  privacy impact assessment, ISO 27001, NIST 800-30 risk assessment, third-party vendor risk,
  PCI DSS) chosen because their output is written policy rather than shell commands. They are
  foreign-law scaffolding — **PDPL and ZATCA remain the governing regimes**, and `01-governance/`
  remains the source of policy. Provenance, the pinned upstream commit and the full guardrails:
  `.claude/skills/THIRD_PARTY_NOTICES.md`. Note the whole `.claude/` tree is in `SKIP_DIRS` for
  `check.mjs`/`build.mjs`/`build-html.mjs`, so nothing under it needs front-matter or a `_print/`
  PDF — but that skip is root-anchored, so vendored skills must stay at `.claude/skills/`.
- **`.claude-plugin/marketplace.json`** / **`.claude/plugins/`** — the `flygaca-family` Claude Code
  plugin marketplace, hosted here because this repo owns the roster. Three plugins live locally
  (**office-docs** — the doc convention, the print pipeline, the `ar/` mirror and the entity-facts
  gate; **office-governance** — the same seven agents as `.claude/agents/`, packaged with the
  CI-gate, entity-facts and contract-stamping skills so a session *without* this checkout can use
  them; **family-orchestrators** — the cross-repo full-sync, feature-ship, security-sweep and
  compliance-review workflows plus the `family-auditor` agent); the two product plugins are
  `git-subdir` entries pointing into `iflygaca/FlyGACA` and `iflygaca/Captain-Adel`, so each repo owns its
  own. All three repos register the marketplace in `.claude/settings.json` — registering installs
  nothing, so a plugin still has to be installed deliberately. Install, onboarding and maintenance:
  `06-operations-it/runbooks/runbook-claude-plugins.md`. Plugin Markdown is under `.claude/`, so it
  needs no front-matter and no `_print/` PDF — but it **is** gated:
  `tools/agents/check-agents.mjs` validates every agent under `.claude/agents/` and
  `.claude/plugins/*/agents/`, and fails if `office-governance`'s seven agent copies drift from
  their `.claude/agents/` originals. Edit one, copy to the other, same commit.
  A plugin manifest is `<plugin>/.claude-plugin/plugin.json` — a flat `.claude-plugin.json` beside
  the plugin directory is **not** read by Claude Code, and three plugins carrying only that file
  were removed in Phase 2.2 (DEC-013).

Several document formats coexist: polished deliverables are committed binaries
(`.docx`/`.xlsx`/`.pptx`, plus source PDFs, investor-deck JPGs, and brand PSD/PNG assets — SVG
logos/diagrams are committed as text — with `.gitattributes` declaring the binary set
`.docx`/`.xlsx`/`.pptx`/`.pdf`/`.psd`/`.png`/`.jpg`/`.jpeg`/`.gsheet`); working notes, specs, drafts, and playbooks are `.md` —
which is what the print pipeline and the doc-check CI both operate on. **20 pages are authored as
HTML instead of Markdown** and render through `build-html.mjs` (below): the two bilingual investor
decks in `09-investor-relations/decks/`, the four showcase pages
(`00-strategy/brainstorms/00-strategic-brainstorms-dashboard.html`,
`00-strategy/the-book-of-fly-gaca.html`, `11-brand/design-system.html`,
`11-brand/tidal-reckoning.html`), the two ZATCA finance templates in `03-finance/`
(`tax-invoice-template.html`, `vat-return-worksheet.html`), the eleven print-collateral sources
in `11-brand/print/` (letterheads EN/AR — including the sealed Arabic sheet — memo, press
release, business cards, envelope, compliments slip, contract cover; these share
`11-brand/print/brand-print.css`), and `02-legal/authorization-letter-jawazat-2026-08-20.html`
(the showcase/finance pages are self-contained). `tools/print/build-png.mjs` additionally re-screenshots the `11-brand/print/`
sources into the 300 dpi PNGs the brand catalogue references.

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

Exemptions: the root `README.md` skips only the **front-matter** check — its PDF must still exist
under `_print/` and stay fresh, like any other `.md`; the checker never descends into `tools/**`
or `_print/**` at all; files under any `templates/` directory still need a front-matter block but
only the `title` key inside it (they use their own authoring schema, not the full doc metadata).
Every other `.md`, anywhere in the tree (including `ar/`), needs the full set.

`status: draft` or `status: scaffold` stamps an automatic DRAFT/SCAFFOLD watermark on the rendered
PDF — set it deliberately. (No doc currently uses `scaffold`; the tooling supports it.)

**Every `.md` must have a matching, up-to-date PDF under `_print/`.** After creating or editing any
`.md` file (English or Arabic), regenerate its PDF before committing:

```bash
cd tools/print
npm ci                      # once, or after a dependency change (no browser download — uses the
                             # pre-installed Chromium the print pipeline auto-detects)
npm run build                # incremental — only content-changed docs re-render
npm run build:force          # rebuild every doc from scratch
node build.mjs <path/to/doc.md>   # render one file
node build-html.mjs           # separately renders ALL 16 HTML pages to their _print/ PDFs
node build-png.mjs            # re-screenshots 11-brand/print/*.html to the 300dpi catalogue PNGs
node check.mjs                # the CI gate itself — front-matter + Markdown-PDF coverage +
                               # staleness + HTML-PDF coverage; no browser needed, safe anytime
```

(`tools/print/package.json` also exposes `npm run build:html` and `npm run check` aliases.)
Adding or renaming **any** `.html` in the tree without running `build-html.mjs` fails CI, same as
an unrebuilt `.md`.

`node check.mjs` is cheap, dependency-free and the single best thing to run before you commit —
it reports exactly which docs are missing or stale (currently: 245 markdown + 20 brand-HTML docs
in scope — it prints the live figures, so quote the command rather than copying these numbers). Forgetting the rebuild is the most common way this repo goes red; it has already
happened once (four PDFs, fixed in `016f1b2`), so make the build part of the same commit as the
doc edit rather than a follow-up.

`build.mjs` hashes each source file (folded with a hash of `theme.css` + `build.mjs` itself) into
`tools/print/.buildcache.json`; `check.mjs` recomputes that hash and fails if it doesn't match the
committed PDF, i.e. if you edited a doc but didn't rebuild its PDF. **Commit the regenerated PDF
and the updated `.buildcache.json` together with the `.md` change** — a doc edit without a rebuilt
PDF fails CI (`.github/workflows/docs-check.yml` — the only workflow — runs on push to `main` and
on PRs touching `**/*.md`, `**/*.html`, `_print/**`, `tools/print/**`, or the workflow file
itself; CI runs Node 20).

> [!WARNING]
> **Editing `build.mjs` marks every PDF in the repo stale**, because its own bytes are folded into
> the shared `themeHash`. For a change that genuinely alters rendering, that's correct — rebuild.
> But for a change that *cannot* alter output (adding a `SKIP_DIRS` entry, a comment, a log line),
> re-rendering all 265 PDFs is pure churn: Chromium restamps `CreationDate` on every one, so all
> 265 show up as modified binaries. In that case re-stamp `.buildcache.json` with the new `themeHash`
> instead — recompute `sha256(themeHash + source)` per existing key and write it back with
> `JSON.stringify(cache, null, 1) + '\n'`. Verify with `node check.mjs` **and** a clean
> `git status _print/`.

Styling is the "Falcon Theme" documented in `11-brand/fly-gaca-document-style-guide.md`: Inter body
· Cairo headings (and all Arabic text) · JetBrains Mono code, A4 page, 0.75in margins (0.9in
bottom for the footer), footer page
numbers, cover block generated from the front-matter. Fonts are vendored under `tools/print/fonts/`
so the whole pipeline runs offline; it auto-detects Chromium via `$PLAYWRIGHT_BROWSERS_PATH`
(default `/opt/pw-browsers`) or `$CHROMIUM_PATH`. Requires Node 18+ and **Chromium ≥ 131**
(CSS `@page` margin boxes drive the footer page numbers).

## The family contract

`contracts/flygaca-family.json` is the one artifact the three active repos share. It is committed
**byte-identically** to `iflygaca/Office`, `iflygaca/FlyGACA` and `iflygaca/Captain-Adel`, and it exists because
the family's cross-repo claims used to live only in prose and drifted without anything failing.

It holds three blocks, each naming the repo that **owns** it — only the owner edits its block, the
other two copies are mirrors:

| Block | Owner | Source of truth | Mirrored into |
| --- | --- | --- | --- |
| `entity` | **this repo** | `01-governance/company-facts.md` | `iflygaca/FlyGACA`'s `src/lib/seo/jsonld.ts` + both i18n bundles; `iflygaca/Captain-Adel`'s `footer.js`, `terms.html`, `privacy.html`, `package.json`, `LICENSE` |
| `chat` | `iflygaca/FlyGACA` | `server/src/contract.ts` | the answer shape both brains must honour |
| `repos` | **this repo** | this file's repo table | the real roster — supersedes any prose citing a `FlyGACA/…` org |

Each repo gates its own half in its existing CI: here it is `node tools/print/check-facts.mjs`
(wired into `docs-check.yml`, aliased as `npm run check:facts`), which asserts every `entity` value
against the `company-facts.md` table it was copied from — and asserts the IBAN and account number
from that same doc are *absent* from the manifest, since the manifest travels to both product repos.
The product repos run `tests/family-contract.test.ts` and `test/family-contract.test.js`.

**To change it:** edit the owning repo's copy, bump `version`, re-stamp the self-hash with
`node tools/contracts/stamp-manifest.mjs contracts/flygaca-family.json`, copy the file verbatim into
the other two repos, and open all three PRs together. Editing without re-stamping fails every repo's
gate immediately.

> Known limitation: nothing offline can prove the three copies are the same revision — `version` and
> `sha` only reduce that to a visible one-line diff. Closing it fully needs a scheduled cross-repo
> workflow, which does not exist yet.

## Conventions

- **Bilingual, English-authoritative.** New or materially changed content docs should eventually
  get an `ar/` counterpart at the same path, translated per `ar/_GLOSSARY.md`'s terminology — but
  unlike the product repos, CI here does **not** hard-gate on EN/AR parity (only front-matter + PDF
  freshness are checked independently per file), so an EN-only doc won't fail CI. Still keep the
  mirror in sync as a matter of practice; don't let it drift silently for long.
- **Sensitive-content discipline.** Legal, financial, HR, and investor documents in this repo are
  real operating material, not samples — quote or restate the minimum necessary for the task.
- **Governance is the source of policy**, not this file. `01-governance/CONTRIBUTING.md` is now a
  repo-native guide (rewritten 2026-08-09 — it used to be a vendored copy of the application
  repo's guide; its `npm run check:*` commands never applied here). `01-governance/SECURITY.md`
  is filled in and current — for security or data-isolation concerns email the maintainer
  directly (address in `SECURITY.md`). `01-governance/CODE_OF_CONDUCT.md` is real.
  `01-governance/company-facts.md` is the canonical entity-facts doc the *product* repos
  consume — check it before restating company facts anywhere.
- **`01-governance/CLAUDE.md`** used to be a stale vendored copy of a *different* repo's Claude
  guidance (the product monorepo's, describing `functions/`, routing, etc. — none of which exists
  here); it has been replaced with a short pointer back to this file. If you find it drifting
  again, fix the pointer, don't restore old content.
- License: Apache 2.0 (`01-governance/LICENSE`) for the repo's own material; regulatory content
  quoted anywhere belongs to GACA and is not covered by that license.

## Where to look

> 📖 **Family context:** [The Book of Fly GACA](00-strategy/the-book-of-fly-gaca.html) — the founder's
> canon: the origin story, the tenets, and the voice the whole family is written in. It is a
> manifesto, not a spec. For the machine-readable side of the family — the repo roster, the
> legal-entity facts and the shared chat contract — see **`contracts/flygaca-family.json`**,
> which is committed byte-identically to all three active repos and gated by
> `tools/print/check-facts.mjs`.

- **`_INDEX.md`** — the readable master index across all 12 sections (and `ar/_INDEX.md` for the
  mirror). Note it defers to `00-strategy/00-master-office-paperwork-index.gsheet` as the
  authoritative master index.
- **`00-strategy/roadmap.md`** — current phase status and what's next.
- **`06-operations-it/agent-workforce-plan.md`** — the internal agent layer: what the four
  subagents are for, the earn-its-place test that caps the roster, the target rosters for
  `iflygaca/FlyGACA` and `iflygaca/Captain-Adel`, and what agents explicitly do **not** replace.
  Adopted as DEC-012.
- **`tools/print/README.md`** — full print-pipeline usage/config detail beyond the summary above.
- **`01-governance/`** — `company-facts.md`, `CODE_OF_CONDUCT.md`, `decision-log.md`,
  `CONTRIBUTING.md`, `SECURITY.md`.
- **`ar/_GLOSSARY.md`** — EN↔AR terminology, use it before translating anything.
