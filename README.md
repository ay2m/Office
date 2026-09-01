---
title: Fly GACA — The Master Office
section: root
doc_type: readme
status: active
owner: Founder
last_updated: 2026-09-01
lang: en
---

<div align="center">

# 🏢 **Fly GACA Office**
> *The version-controlled operating system for a modern aviation platform*

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/DOCS-263_PDFs-00ff88?style=for-the-badge&labelColor=0a0e12&fontColor=ffffff">
  <img alt="Docs: 263 PDFs" src="https://img.shields.io/badge/DOCS-263_PDFs-8E75B2?style=for-the-badge&labelColor=0a0e12">
</picture>

**12 Domains** · **Bilingual** · **PDPL Compliant** · **ZATCA Ready** · **Version Controlled**

</div>

---

## 🎯 What's this?

The **Office** is the digital nervous system of Fly GACA. Every operating document lives here in version control:
- 📊 Strategy, OKRs, roadmaps
- ⚖️ Governance, board packs, contracts
- 💰 Finance, KPIs, budgeting
- 🇸🇦 Saudi compliance (PDPL, ZATCA, MISA)
- 👥 People, HR, handbooks
- 🎓 Curriculum, academy design
- 🎨 Brand, design system
- 📈 GTM, sales playbook
- 🤝 Customer success, retention
- 💼 Investor relations, pitch decks
- ⚙️ Operations, IT specs, runbooks

**No application code here.** Product code lives in sibling repos:
- **[ay2m/FlyGACA](https://github.com/ay2m/FlyGACA)** — React 19 web app + Express backend
- **[ay2m/Captain-Adel](https://github.com/ay2m/Captain-Adel)** — AI flight instructor
- **[ay2m/FlyGACA-ios](https://github.com/ay2m/FlyGACA-ios)** — Native SwiftUI apps

---

## 📂 The 12 Operating Domains

```
├─ 00 🗺️  STRATEGY & ROADMAP
│   Annual OKRs, master roadmap, CEO sprints, phase trackers
│
├─ 01 ⚖️  GOVERNANCE & FOUNDERS
│   SHA, ESOP, board packs, decision log, Code of Conduct
│
├─ 02 📜 LEGAL & CONTRACTS
│   NDAs, EULA, SLA, PDPL privacy, IP policy, DPA
│
├─ 03 💰 FINANCE & TREASURY
│   Budgeting, KPI dashboard, expense policy, Moyasar gate
│
├─ 04 🇸🇦 KSA COMPLIANCE & ZATCA
│   ZATCA Phase 2 (Fatoora), MISA, PDPL DPIA, BCP/DR
│
├─ 05 👥 PEOPLE & HR
│   Employment contracts, handbook, onboarding, KPIs
│
├─ 06 ⚙️  OPERATIONS & IT
│   Product specs, runbooks, infra design, diagrams
│
├─ 07 📈 GO-TO-MARKET & SALES
│   Sales playbook, demo script, B2B pipeline, SEO strategy
│
├─ 08 🤝 CUSTOMER SUCCESS
│   Onboarding, health scoring, NPS, QBR templates
│
├─ 09 💼 INVESTOR RELATIONS
│   Pitch deck, FAQ, DD questionnaire, investor updates
│
├─ 10 🎓 ACADEMY & CURRICULUM
│   Curriculum map, mock exams, learner paths
│
└─ 11 🎨 BRAND & FALCON DESIGN
    Design tokens, style guide, logos, print collateral (EN + RTL AR)
```

---

## 🔥 Key Capabilities

### **📋 263 Automated PDFs**
Every Markdown document compiles to a branded A4 PDF. Headless pipeline (Chromium ≥131). No human intervention.

### **🌍 100% Bilingual**
English content mirrors to Arabic (Saudi MSA) under `ar/`. Same filenames, same structure, full parity.

### **🇸🇦 PDPL-First Architecture**
- Data residency: Saudi Arabia only
- DPIA (Data Protection Impact Assessment) complete
- Breach notification procedures documented
- Right-to-be-forgotten implemented in product repos

### **🛠️ 25+ Subagents**
Specialized Claude agents for each domain. Each understands its slice of the business deeply.

### **📄 ZATCA E-Invoicing Ready**
UBL 2.1 XML templates, SHA-256 hashing, ECDSA signatures, TLV QR encoding.

### **💼 Family Contract Enforcement**
Entity facts, company roster, API chat contract—byte-identical across all three product repos.

---

## 🚀 Quick Start

### View the Docs
```bash
# Start here
cat _INDEX.md              # Master index of everything

# Explore a domain
cat 00-strategy/roadmap.md          # What's next
cat 04-compliance-ksa/pdpl-dpia.md  # Compliance docs
cat 11-brand/design-system.html     # Brand system (interactive)
```

### Edit & Rebuild
```bash
cd tools/print

# Install dependencies (first time only)
npm ci

# Edit a .md file
vim ../00-strategy/my-plan.md

# Rebuild its PDF
npm run build

# Or rebuild everything (slow)
npm run build:force

# Check for issues
npm run check            # Front-matter, PDF freshness, links
```

---

## 📖 Key Documents

### Strategy & Vision
- **[The Book of Fly GACA](./00-strategy/the-book-of-fly-gaca.html)** — Founder's canon & manifesto
- **[00-strategy/roadmap.md](./00-strategy/roadmap.md)** — Current phase & next moves
- **[00-strategy/annual-okrs.md](./00-strategy/annual-okrs.md)** — Q3/Q4 targets

### Governance & Compliance
- **[01-governance/company-facts.md](./01-governance/company-facts.md)** — Source of truth for entity facts
- **[01-governance/decision-log.md](./01-governance/decision-log.md)** — Record of all major decisions
- **[04-compliance-ksa/pdpl-dpia.md](./04-compliance-ksa/pdpl-dpia.md)** — Privacy impact assessment
- **[02-legal/](./02-legal/)** — Contracts (EULA, SLA, DPA, terms)

### Operations
- **[06-operations-it/agent-workforce-plan.md](./06-operations-it/agent-workforce-plan.md)** — AI agent strategy
- **[06-operations-it/runbooks/](./06-operations-it/runbooks/)** — Operational playbooks
- **[06-operations-it/runbooks/runbook-claude-plugins.md](./06-operations-it/runbooks/runbook-claude-plugins.md)** — Agent setup

### GTM & Product
- **[07-gtm/sales-playbook.md](./07-gtm/sales-playbook.md)** — Sales process & objection handling
- **[08-customer-success/](./08-customer-success/)** — Onboarding, NPS, at-risk playbooks
- **[09-investor-relations/pitch-deck.pptx](./09-investor-relations/pitch-deck.pptx)** — Investor materials

### Brand & Design
- **[11-brand/design-system.html](./11-brand/design-system.html)** — Interactive Falcon theme
- **[11-brand/fly-gaca-document-style-guide.md](./11-brand/fly-gaca-document-style-guide.md)** — PDF styling

---

## 🌍 Bilingual Mirror

All 126 Markdown files are mirrored in Arabic (Saudi MSA) under `ar/`:

```
├── 00-strategy/          (English)
├── ar/00-strategy/       (العربية)
├── 01-governance/        (English)
├── ar/01-governance/     (العربية)
└── ...all 12 sections
```

**Translation discipline:** [ar/_GLOSSARY.md](./ar/_GLOSSARY.md) keeps terminology consistent across all documents.

---

## 🖨️ PDF Pipeline (Automated)

Every `.md` compiles to a branded A4 PDF in `_print/`:

```bash
# All PDFs
_print/00-strategy/roadmap.pdf
_print/01-governance/company-facts.pdf
_print/04-compliance-ksa/pdpl-dpia.pdf
_print/11-brand/design-system.pdf
```

**Fonts:** Inter (body) + Cairo (Arabic) + JetBrains Mono (code)  
**Theme:** Falcon Theme (Fly GACA brand)  
**Output:** 0.75" margins, footer page numbers, A4 size  

---

## 📊 Monitoring & CI

### Freshness Check
```bash
npm run check:facts        # Verify family contract parity
npm run check              # Front-matter, PDF staleness, HTML
```

### GitHub Actions
`.github/workflows/docs-check.yml` runs on every commit:
- ✅ YAML front-matter validation
- ✅ PDF freshness (must match .md)
- ✅ Family contract consistency
- ✅ No broken internal links

**Status:** Passing ✅ (blue badge on main)

---

## 🧑‍💻 Who Works Here?

### Territory Agents (25 subagents)
Each domain has a dedicated Claude agent:
- **doc-smith** → Any `.md`/`.html` editing, PDFs, front-matter
- **ar-mirror** → Arabic translations, RTL PDF rebuilds
- **ksa-compliance** → PDPL, ZATCA, regulatory review
- **family-warden** → Family contract, cross-repo sync
- **strategy-analyst** → OKRs, roadmap, phase plans
- **legal-scribe** → Contracts, policies, briefs
- **finance-steward** → Budgets, KPIs, pricing
- **people-ops** → HR policies, onboarding
- ... and 17 more

**Load:** Use them proactively. They understand their domain deeply and move fast.

---

## 🤝 Contributing

### How to Edit Documents

1. **Edit the Markdown**
   ```bash
   vim 00-strategy/my-doc.md
   ```

2. **Rebuild its PDF**
   ```bash
   cd tools/print && npm run build
   ```

3. **Commit both files**
   ```bash
   git add 00-strategy/my-doc.md _print/00-strategy/my-doc.pdf
   git commit -m "Docs: update roadmap"
   ```

### Guidelines
- **Front-matter required:** Every `.md` needs YAML headers (title, section, status, owner, date, lang)
- **Bilingual:** Consider adding an `ar/` version when you create EN content
- **Commit PDF+source together:** The CI gate checks PDF freshness against .md
- **No HTML in Markdown:** Use proper Markdown; the pipeline handles styling

See [01-governance/CONTRIBUTING.md](./01-governance/CONTRIBUTING.md).

---

## 🔐 Sensitive Content

This repo contains:
- ✅ Real contracts (EULA, SLA, NDAs)
- ✅ Financial data (budgets, KPIs, pricing)
- ✅ HR records (salaries, evaluations)
- ✅ Investor materials (pitch, financials)

**Treat contents as sensitive.** Don't quote financial/legal/HR material into chat, other repos, or external tools beyond what the task requires. Security concerns → [01-governance/SECURITY.md](./01-governance/SECURITY.md).

---

## 📜 License

Apache 2.0 for Fly GACA materials. Regulatory content (GACAR references) belongs to GACA and is not covered by this license.

---

## 🔗 Cross-Repo Coordination

**Family Contract:** `contracts/flygaca-family.json`
- Entity facts (Fly GACA legal name, founder, domain, HQ region)
- API chat contract shape (both brains must honor)
- Repo roster (source of truth)

**Byte-identical** across all three product repos. Updated via `tools/contracts/stamp-manifest.mjs`.

---

<div align="center">

**Governance as Code. Strategy as Text. Compliance as Automation.**

[View Roadmap](./00-strategy/roadmap.md) · [Report Issues](https://github.com/ay2m/Office/issues) · [Contribute](./01-governance/CONTRIBUTING.md) · [Star ⭐](https://github.com/ay2m/Office)

🇸🇦 صنع في السعودية · Made in Saudi Arabia

</div>
