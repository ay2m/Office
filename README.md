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

**FlyGACA/Office** ("The Office") is the internal document repository for [Fly GACA](https://flygaca.com) — an independent educational platform and open regulatory library for Saudi civil aviation (GACAR, AIP, charts, ground school, and Captain Adel, the AI flight instructor).

This repository stores every operating document that runs the company: strategy and OKRs, governance rules, legal contracts, finance policies, Saudi compliance bundles (PDPL, ZATCA, MISA, Nitaqat), HR frameworks, GTM playbooks, investor materials, brand assets, and product/engineering specifications.

**It contains no application source code** — Fly GACA's product software lives in separate dedicated repositories:

| Repo | Role & Description |
| --- | --- |
| **FlyGACA/Office** (this repo) | The business operating system — strategy, governance, legal, finance, KSA compliance, HR & GTM docs |
| [FlyGACA/FlyGACA-app](https://github.com/FlyGACA/FlyGACA-app) | flygaca.com — React 19 + Vite 8 PWA web app, Firebase backend (`me-central1`), regulatory corpus + content pipelines |
| [FlyGACA/Captain-Adel](https://github.com/FlyGACA/Captain-Adel) | The AI flight instructor service (captadel.com) + RAG engine behind chat, function calling & evals |
| [ay2m/FlyGACA](https://github.com/ay2m/FlyGACA) | The native iOS app family — shared `FlyGACAKit` package + ELPT and AIP App Store targets |
| [FlyGACA/ELPT](https://github.com/FlyGACA/ELPT) · [AIP](https://github.com/FlyGACA/AIP) · [PPL](https://github.com/FlyGACA/PPL) · [CPL](https://github.com/FlyGACA/CPL) · [IR](https://github.com/FlyGACA/IR) · [ATPL](https://github.com/FlyGACA/ATPL) | Per-app App Store metadata repos — store listing copy, localized screenshots, and per-app roadmaps |

Fly GACA is a family of ten repositories; this is the internal-docs operating system. [**The Book of Fly GACA**](https://github.com/ay2m/FlyGACA/blob/main/THE-BOOK-OF-FLY-GACA.md) maps all surfaces, shared principles, and data contracts in one place.

> [!IMPORTANT]
> **Fly GACA is not affiliated with GACA** (Saudi General Authority of Civil Aviation). Every document and user-facing surface reinforces one rule: verify against the latest official GACA publication. This platform helps you *find and study* regulation — it never replaces it.

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/FlyGACA/Office.git
cd Office

# Browse the Master Index
open _INDEX.md          # macOS
xdg-open _INDEX.md      # Linux

# Rebuild print-ready PDFs after editing any .md
cd tools/print
npm ci                  # one-time install (uses pre-installed Chromium)
npm run build           # incremental build — re-renders only changed docs
npm run check           # verify front-matter & PDF freshness (CI gate)
```

> [!NOTE]
> The print pipeline uses **Node 20+** and headless **Chromium ≥ 131**. Typography fonts are vendored in `tools/print/fonts/`, enabling 100% offline rendering. Full usage guide: [`tools/print/README.md`](tools/print/README.md).

---

## 📂 Repository Structure

The repository is organized into twelve numbered sections (`00–11`), each independently structured and browsable:

| Section | Title | Contents & Scope |
|---|---------|---------------|
| [`00`](00-strategy/) | **Strategy** | Master roadmap, annual strategic plan & OKRs, CEO execution plan (Sprints 0–3), Phase 0 tracker, and strategic brainstorms (00–10) |
| [`01`](01-governance/) | **Governance** | Founders' agreement, SHA, ESOP plan, Code of Conduct, decision log, board packs, repo governance (`CLAUDE.md`, `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE`) |
| [`02`](02-legal/) | **Legal** | NDAs, EULA, SLA, pilot agreement, PDPL privacy policy, DPA, IP & takedown procedure, refund policy, and Saudi lawyer briefs |
| [`03`](03-finance/) | **Finance** | Banking & treasury policy, procurement, expense policy, budget-vs-actual trackers, financial dashboards, ZATCA e-invoicing templates |
| [`04`](04-compliance-ksa/) | **Compliance (KSA)** | MISA investment license, ZATCA e-invoicing pack, PDPL DPIA & compliance program, Nitaqat plan, BCP/DR plans |
| [`05`](05-people/) | **People** | Saudi-compliant employment contracts, employee handbook, job descriptions, onboarding/offboarding checklists, performance review templates |
| [`06`](06-operations-it/) | **Operations / IT** | Digital office setup, product specs (CRM, Captain Adel, Instructor Dashboard), runbooks, infrastructure diagrams, setup kits |
| [`07`](07-gtm/) | **Go-To-Market** | Sales playbooks, demo scripts, objection handling, cold outreach templates, B2B pipeline, SEO strategy & keyword prospecting |
| [`08`](08-customer-success/) | **Customer Success** | Onboarding playbooks, customer health score framework, NPS survey packs, QBR templates, churn prevention playbooks |
| [`09`](09-investor-relations/) | **Investor Relations** | Pitch deck, investor FAQ, due diligence questionnaire, monthly investor update templates, risk register, Saudi investor targets |
| [`10`](10-academy-curriculum/) | **Academy & Curriculum** | Curriculum map, coverage matrix, PPL mock exams, B2C learner paths, instructor onboarding, cadet welcome packs |
| [`11`](11-brand/) | **Brand** | Falcon design system, design tokens, style guide, logos, print collateral (EN + RTL AR letterheads, business cards, covers) |

**Support directories:**

| Directory | Purpose |
|---|---|
| [`_INDEX.md`](_INDEX.md) | Readable master index across all 12 sections |
| [`templates/`](templates/) | Reusable Markdown starters (`tpl-fin-report`, `tpl-hr-policy`, `tpl-legal-memo`, `tpl-ops-runbook`, `tpl-strat-proposal`) |
| [`ar/`](ar/) | Full **Arabic (Saudi MSA)** mirror of all 12 sections and templates — identical structure and ASCII filenames |
| [`tools/print/`](tools/print/) | Markdown & HTML → branded A4 PDF render pipeline (Falcon document theme, offline fonts, EN + RTL AR) |
| [`_print/`](_print/) | Generated print-ready PDFs mirroring the exact file tree (tracked in git) |

---

## ✨ Key Capabilities

| Capability | Detail |
|-----------|--------|
| 🗂 **Version-Controlled Operations** | Every policy, contract, and technical spec is tracked in Git — full diff history and blame. |
| 🖨 **Automated Print Pipeline** | Any `.md` edit re-renders to a branded, watermarked A4 PDF via standard headless Chromium. |
| 🌍 **Bilingual Native (EN / AR)** | Parallel Arabic (Saudi MSA) mirror under `ar/`; ASCII kebab-case filenames remain identical for diffing. |
| 📋 **YAML Front-Matter Metadata** | Standardized `title / section / doc_type / status / owner / last_updated / lang` on every document. |
| 🔒 **KSA Regulatory Stack** | Purpose-built for Saudi legal frameworks: PDPL, ZATCA e-invoicing, MISA licensing, and Nitaqat. |
| 🤖 **Captain Adel Technical Specs** | Full AI flight instructor specs, refusal protocol, deployment runbooks, and evaluation suite. |
| 📐 **Falcon Design System** | Inter body font, Cairo headings & Arabic text, JetBrains Mono code, and Falcon Blue accent palette. |

---

## 🌍 Arabic Localization (`ar/`)

The [`ar/`](ar/) directory is a complete, parallel Arabic translation of the document tree — same folder structure, same ASCII filenames, written in **Modern Standard Arabic (Saudi official register)**.

- 118 `.md` files maintained in sync with the English source
- Unified terminology using [`ar/_GLOSSARY.md`](ar/_GLOSSARY.md) (EN↔AR term glossary)
- Arabic PDFs automatically render **right-to-left** (Cairo typography, RTL margin boxes)
- Latin code paths, identifiers, and file names remain LTR inside Arabic text

> [!NOTE]
> English is the authoritative source. In case of any ambiguity, the English document governs.

---

## 🖨 Print Pipeline & CI Gate

Every `.md` document generates a **branded, print-ready PDF** under `_print/`, mirroring the folder tree. The pipeline uses `markdown-it` + headless Chromium with the Falcon document theme:

- **Fonts:** Inter (body) · Cairo (headings + Arabic) · JetBrains Mono (code) — vendored offline under `tools/print/fonts/`
- **Layout:** A4, 0.75 in margins, footer page numbers, cover block generated from YAML front-matter
- **Watermarks:** `status: draft` or `scaffold` automatically stamps a DRAFT/SCAFFOLD watermark
- **Incremental:** `.buildcache.json` tracks content hashes — unchanged docs are skipped

```bash
cd tools/print
npm run build        # incremental rebuild
npm run build:force  # rebuild all PDFs from scratch
node build.mjs 02-legal/terms-of-use-draft-2026-06-14.md   # render a single document
node check.mjs       # run CI freshness & front-matter validation gate
```

---

## 🎨 Brand Identity

The Falcon design system, logo assets, and print templates in [`11-brand/`](11-brand/) give every Fly GACA document a uniform identity.

<p align="center">
  <img src="11-brand/logos/fly-gaca-logo.png" alt="Fly GACA logo" height="70" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="11-brand/logos/mark-mono-ink.png" alt="Fly GACA mark" height="70" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="11-brand/print/business-card-front-capt-adel.png" alt="Captain Adel business card" height="70" />
</p>

---

## 🏗 Roadmap & Execution Status

*Phases tracked in [`00-strategy/roadmap.md`](00-strategy/roadmap.md).*

| Phase | Title | Status | Summary |
|-------|-------|--------|---------|
| **0** | Foundations | 🟡 In progress | Technical stack live; Saudi legal entity registration open |
| **1** | Open Library | ✅ Shipped | GACAR regulations, aerodromes, and chart index live |
| **2** | Captain Adel AI | ✅ Shipped | RAG flight instructor live on Gemini 2.5 Flash |
| **3** | Pilot Accounts | 🟡 Built | Firebase Auth & Firestore live; PDPL DPIA pending |
| **4** | Arabic & Polish | 🟡 In progress | Bilingual engine live; inner page translations underway |
| **5** | Monetization & Schools | ⬜ Planned | Gated on legal entity registration |
| **6** | Native Apps | 🟡 In progress | iOS ELPT & AIP targets built; store submission pending |
| **7** | Training Platform | ✅ Shipped | 162-question bank, flashcards, and exam analytics live |
| **8** | Library Platform | ✅ Shipped | Whole-library search, safety lessons, and reading paths live |
| **9** | Launch & Visibility | 🟡 Deployed | Web app deployed; custom domain & GTM active |
| **10** | Captain Adel Prod | 🟡 In progress | Input guards, rate limits & evals shipped |
| **11** | Practical Depth | ✅ Shipped | 21 flight tools, 11 guides, full study bank complete |

---

## 🤝 Governance & Contributing

This repository strictly follows the governance guidelines in [`01-governance/`](01-governance/):

- **[CONTRIBUTING.md](01-governance/CONTRIBUTING.md)** — setup, doc conventions, pre-PR checklist
- **[CODE_OF_CONDUCT.md](01-governance/CODE_OF_CONDUCT.md)** — community standards
- **[SECURITY.md](01-governance/SECURITY.md)** — security & responsible disclosure policy
- **[CLAUDE.md](CLAUDE.md)** — AI assistant guidelines and architecture documentation

All custom operational documents are licensed under [Apache License 2.0](01-governance/LICENSE). Regulatory texts quoted belong to GACA and are excluded from this license.

---

<div align="center">

*Built for Saudi skies. Operated from The Office.*

</div>
