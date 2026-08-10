<div align="center">

# ✈️ Fly GACA — The Office

**The complete operating system for Saudi Arabia's independent civil aviation education platform.**

*Every document, policy, playbook, and specification that runs Fly GACA — in one version-controlled repository.*

[![Status](https://img.shields.io/badge/status-active-brightgreen?style=flat-square)](00-strategy/roadmap.md)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue?style=flat-square)](01-governance/LICENSE)
[![Languages](https://img.shields.io/badge/languages-EN%20%7C%20AR-orange?style=flat-square)](ar/)
[![Sections](https://img.shields.io/badge/sections-12-informational?style=flat-square)](_INDEX.md)
[![PDFs](https://img.shields.io/badge/print--ready%20PDFs-_print%2F-lightgrey?style=flat-square)](_print/)

**[📖 Master Index](_INDEX.md)** · **[🗺 Roadmap](00-strategy/roadmap.md)** · **[🖨 Print Pipeline](tools/print/README.md)** · **[🌐 Arabic Mirror](ar/_INDEX.md)**

</div>

---

## What is this?

**FlyGACA/Office** is the internal documents repository ("The Office") for [Fly GACA](https://flygaca.com) — an independent educational platform and open regulatory library for Saudi civil aviation (GACAR, AIP, charts, ground school, and Captain Adel, the AI flight instructor).

This repo stores every operating document that runs the company: legal contracts, compliance programs, HR policies, GTM playbooks, investor materials, brand assets, and engineering specs. **It holds no application source code** — Fly GACA's product code lives in four separate repos (see the table below). Polished deliverables live as `.docx` / `.xlsx`; working notes, specs, and drafts are `.md`. Every `.md` file has a **print-ready branded PDF** under [`_print/`](_print/).

Fly GACA is a family of ten repositories; this is the internal-docs one. [**The Book of Fly GACA**](https://github.com/ay2m/FlyGACA/blob/main/THE-BOOK-OF-FLY-GACA.md) maps them all — product surfaces, shared principles, and the glossary — in one place.

| Repo | What it holds |
| --- | --- |
| **FlyGACA/Office** (this repo) | The business operating system — strategy, governance, legal, finance, GTM docs |
| [FlyGACA/FlyGACA-app](https://github.com/FlyGACA/FlyGACA-app) | flygaca.com — the React/Vite web app, Firebase backend, regulatory corpus + content pipelines |
| [FlyGACA/Captain-Adel](https://github.com/FlyGACA/Captain-Adel) | The AI flight-instructor service (captadel.com) + the shared brain behind chat |
| [ay2m/FlyGACA](https://github.com/ay2m/FlyGACA) | The native iOS app family — FlyGACAKit + the ELPT and AIP App Store targets |
| [FlyGACA/ELPT](https://github.com/FlyGACA/ELPT) · [AIP](https://github.com/FlyGACA/AIP) · [PPL](https://github.com/FlyGACA/PPL) · [CPL](https://github.com/FlyGACA/CPL) · [IR](https://github.com/FlyGACA/IR) · [ATPL](https://github.com/FlyGACA/ATPL) | Per-app App Store metadata repos — store listing copy, screenshots, per-app roadmap |

> [!IMPORTANT]
> Fly GACA is **not affiliated with GACA** (Saudi General Authority of Civil Aviation). Every user-facing surface reinforces one rule: verify against the latest official GACA publication. This platform helps you *find and study* regulation — it never replaces it.

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/FlyGACA/Office.git
cd Office

# Start from the master index
open _INDEX.md          # macOS
xdg-open _INDEX.md      # Linux

# Rebuild print-ready PDFs after editing any .md
cd tools/print
npm ci                  # one-time install (no browser download)
npm run build           # incremental — only changed docs re-render
```

> [!NOTE]
> The print pipeline needs **Node 18+** and **Chromium ≥ 131**. Fonts are vendored in `tools/print/fonts/`, so rendering runs fully offline. Full usage: [`tools/print/README.md`](tools/print/README.md).

---

## 📂 Repository Structure

Twelve numbered sections (00–11), each independently browsable:

| # | Section | What's Inside |
|---|---------|---------------|
| [`00`](00-strategy/) | **Strategy** | Annual plan & OKRs, master roadmap, CEO execution plan (Sprints 0–3), Phase 0 tracker, 10 numbered brainstorms |
| [`01`](01-governance/) | **Governance** | Founders' agreement, SHA, ESOP, Code of Conduct, board pack, live decision log |
| [`02`](02-legal/) | **Legal** | NDA templates, EULA, SLA, pilot agreement, PDPL policies, DPA, IP & takedown procedure |
| [`03`](03-finance/) | **Finance** | Banking policy, procurement, expense policy, budget-vs-actual tracker, KPI dashboard |
| [`04`](04-compliance-ksa/) | **Compliance (KSA)** | MISA license, ZATCA e-invoicing, PDPL DPIA, BCP/DR, Nitaqat plan, compliance roadmap |
| [`05`](05-people/) | **People** | Employment contracts, employee handbook, offer letters, onboarding/offboarding, HR policies |
| [`06`](06-operations-it/) | **Operations / IT** | Digital office setup, product specs (CRM, Captain Adel, Instructor Dashboard), runbooks, architecture diagrams |
| [`07`](07-gtm/) | **Go-To-Market** | Sales playbook, demo script, objection handling, cold outreach, B2B pipeline, SEO strategy |
| [`08`](08-customer-success/) | **Customer Success** | Onboarding playbook, health scoring, NPS, QBR templates, at-risk & expansion playbooks |
| [`09`](09-investor-relations/) | **Investor Relations** | Pitch deck, FAQ, due diligence questionnaire, investor update template, risk register |
| [`10`](10-academy-curriculum/) | **Academy & Curriculum** | Curriculum map, coverage matrix, PPL mock exams, B2C learner paths, instructor onboarding |
| [`11`](11-brand/) | **Brand** | Design system, design tokens, style guide, Falcon theme, logos, print assets (EN + RTL AR) |

**Support directories:**

| Path | Purpose |
|------|---------|
| [`_INDEX.md`](_INDEX.md) | The readable master index across all 12 sections |
| [`templates/`](templates/) | Reusable `.md` starters: finance report, HR policy, legal memo, ops runbook, strategy proposal |
| [`ar/`](ar/) | Full **Arabic (Saudi MSA)** mirror of all 12 sections — same structure, translated content |
| [`tools/print/`](tools/print/) | Markdown → branded A4 PDF pipeline (Falcon document theme, EN + RTL Arabic) |
| [`_print/`](_print/) | Generated print-ready PDFs, mirroring the full tree |

---

## ✨ Key Capabilities

| Capability | Detail |
|-----------|--------|
| 🗂 **Version-controlled operations** | Every policy, contract, and spec is a Git commit — full history, diffs, and blame |
| 🖨 **Automated print pipeline** | Any `.md` edit → one command → branded, watermarked A4 PDF, no design tool needed |
| 🌍 **Bilingual from day one** | Full Arabic (MSA) mirror under `ar/`; filenames stay ASCII kebab-case for easy diffing |
| 📋 **YAML front-matter on every doc** | `title / section / doc_type / status / owner / last_updated / lang` — machine-readable metadata |
| 🔒 **KSA-compliant legal stack** | PDPL, ZATCA e-invoicing, MISA, Nitaqat — purpose-built for Saudi regulatory requirements |
| 🤖 **Captain Adel specs included** | Full AI flight instructor spec, refusal protocol, deployment runbooks, and eval harness |
| 📐 **Design system baked in** | Falcon Theme: Inter body · Cairo headings · JetBrains Mono · Falcon Blue accents |

---

## 🌍 Arabic Localization

The [`ar/`](ar/) directory is a complete, parallel Arabic translation of the entire document tree — same folder structure, same filenames, translated content in **Modern Standard Arabic (Saudi official register)**.

- 118 `.md` files translated and maintained in sync
- Unified terminology via [`ar/_GLOSSARY.md`](ar/_GLOSSARY.md) (EN↔AR term glossary)
- Arabic PDFs render **right-to-left** (Cairo font, RTL layout) via the print pipeline
- Latin code paths and file names remain LTR inside Arabic documents

> [!NOTE]
> English is the authoritative source. On any conflict, the English tree governs.

---

## 🖨 Print Pipeline

Every `.md` document generates a **branded, print-ready PDF** under `_print/`, mirroring the folder tree. The pipeline uses markdown-it + headless Chromium and the Falcon document theme:

- **Fonts:** Inter (body) · Cairo (headings + Arabic) · JetBrains Mono (code) — all vendored offline
- **Layout:** A4, 0.75 in margins, footer page numbers, branded cover block from YAML front-matter
- **Watermarks:** `status: draft` or `scaffold` → automatic DRAFT/SCAFFOLD watermark on every page
- **Incremental:** `.buildcache.json` tracks content hashes — unchanged docs are skipped

```bash
cd tools/print
npm run build        # incremental rebuild
npm run build:force  # rebuild everything from scratch
node build.mjs 02-legal/terms-of-use-draft-2026-06-14.md   # render one document
```

See [`tools/print/README.md`](tools/print/README.md) for full usage and configuration.

---

## 🎨 Brand

The Falcon design system, logo marks, and print collateral in [`11-brand/`](11-brand/) give every Fly GACA document — including this repo's generated PDFs — a consistent identity.

<p align="center">
  <img src="11-brand/logos/fly-gaca-logo.png" alt="Fly GACA logo" height="80" />
  &nbsp;&nbsp;&nbsp;
  <img src="11-brand/logos/mark-mono-ink.png" alt="Fly GACA mark (mono ink)" height="80" />
  &nbsp;&nbsp;&nbsp;
  <img src="11-brand/print/business-card-front-capt-adel.png" alt="Captain Adel business card, front" height="80" />
</p>

---

## 🏗 Current Status

*Phases as numbered in [`00-strategy/roadmap.md`](00-strategy/roadmap.md).*

| Phase | Title | Status |
|-------|-------|--------|
| 0 | Foundations | 🟡 Legal track in progress |
| 1 | Library live | ✅ Live |
| 2 | Captain Adel | ✅ Live (RAG on Gemini 2.5 Flash) |
| 3 | Pilot accounts | 🟡 Built; PDPL DPIA pending |
| 4 | Arabic & polish | 🟡 Bilingual engine live; inner pages in progress |
| 5 | Money & flight schools | ⬜ Not started |
| 7 | Training platform | 🟡 162-question bank, flashcards, analytics shipped |
| 8 | Library as a platform | ✅ All 6 features shipped |
| 9 | Launch & visibility | 🟡 Deployed; custom domain & GTM pending |
| 10 | Captain Adel (prod-grade) | 🟡 Rate limits & evals shipped; App Check pending |
| 11 | Depth — practical sections | ✅ 21 tools, 11 guides, study bank complete |

The **legal track** (entity registration, lawyer engagement) is now the critical path to public launch.

---

## 🤝 Contributing & Governance

This repo follows the governance documents in [`01-governance/`](01-governance/):

- **[CONTRIBUTING.md](01-governance/CONTRIBUTING.md)** — setup, conventions, pre-PR checklist
- **[CODE_OF_CONDUCT.md](01-governance/CODE_OF_CONDUCT.md)** — community standards
- **[SECURITY.md](01-governance/SECURITY.md)** — responsible disclosure
- **[CLAUDE.md](CLAUDE.md)** — AI assistant context and architecture guide (root; `01-governance/CLAUDE.md` points here)

All contributions are licensed under [Apache License 2.0](01-governance/LICENSE). Regulatory content belongs to GACA and is not covered by that license.

> For security issues or data-isolation concerns, **do not open a public issue** — email the maintainer directly (see [SECURITY.md](01-governance/SECURITY.md)).

---

<div align="center">

*Built for Saudi skies. Operated from The Office.*

</div>
