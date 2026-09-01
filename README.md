<div align="center">

# 🏢 Fly GACA — The Office
### The Operational Operating System for Saudi Arabia's Aviation Platform
#### نظام إدارة وتشغيل منصة فلاي جاكا · الحوكمة · الامتثال السعودي

<p align="center">
  <img src="https://img.shields.io/badge/Made%20in-Saudi%20Arabia-006C35?style=for-the-badge&labelColor=0a0e12" alt="صنع في السعودية" />
  <img src="https://img.shields.io/badge/Status-Active%20OS-C8A04A?style=for-the-badge&labelColor=0a0e12" alt="Active OS" />
  <img src="https://img.shields.io/badge/Sections-12%20Domains-0D96F6?style=for-the-badge&labelColor=0a0e12" alt="12 Domains" />
  <img src="https://img.shields.io/badge/Print%20PDFs-263%20Generated-8E75B2?style=for-the-badge&labelColor=0a0e12" alt="263 PDFs" />
  <img src="https://img.shields.io/badge/Languages-EN%20%7C%20AR%20Mirror-2D6E8A?style=for-the-badge&labelColor=0a0e12" alt="Bilingual OS" />
</p>

[**📖 Master Index (`_INDEX.md`)**](_INDEX.md) · [**🗺 Strategy & OKRs**](00-strategy/) · [**🇸🇦 KSA Compliance**](04-compliance-ksa/) · [**🖨 Headless Print Pipeline**](tools/print/)

</div>

---

> [!IMPORTANT]
> **Internal Operating Documents.** ay2m/Office houses the internal governance, strategy, legal contracts, and Saudi regulatory compliance blueprints for Fly GACA. It contains no application source code.

---

## 📂 The 12 Operating Domains

```
┌───────────────────────────────────────┬───────────────────────────────────────┐
│ 00 🗺️ Strategy & Roadmap               │ 01 ⚖️ Governance & Founders           │
│ Annual OKRs, CEO Sprints, Market Moat │ SHA, ESOP, Board Packs, Code of Conduct│
├───────────────────────────────────────┼───────────────────────────────────────┤
│ 02 📜 Legal & Contracts               │ 03 💰 Finance & Treasury              │
│ NDAs, EULA, SLA, PDPL Privacy, IP Policy│ Budgeting, Expense Policy, Moyasar Gate│
├───────────────────────────────────────┼───────────────────────────────────────┤
│ 04 🇸🇦 KSA Compliance & ZATCA          │ 05 👥 People & HR                     │
│ ZATCA Phase 2 Fatoora XML, MISA, DPIA │ Saudi Labor Contracts, Handbooks, KPIs│
├───────────────────────────────────────┼───────────────────────────────────────┤
│ 06 ⚙️ Operations & IT                 │ 07 📈 Go-to-Market & Sales            │
│ Product Specs, Runbooks, Infra Design │ Part 141 ATO Proposals, SEO Strategy  │
├───────────────────────────────────────┼───────────────────────────────────────┤
│ 08 🤝 Customer Success                │ 09 💼 Investor Relations              │
│ Academy Onboarding, NPS, Churn Defense│ Pitch Deck, Financial Models, DD Pack │
├───────────────────────────────────────┼───────────────────────────────────────┤
│ 10 🎓 Curriculum & Academy            │ 11 🎨 Brand & Falcon Design           │
│ GACAR Part 141 Stage Checks, Mock Exams│ Design Tokens, RTL Typography, Badges │
└───────────────────────────────────────┴───────────────────────────────────────┘
```

---

## ⚡ Quickstart

### 1. Browse Master Documentation
```bash
# macOS
open _INDEX.md

# Linux
xdg-open _INDEX.md
```

### 2. Rebuild Print-Ready PDFs
The repo includes a 100% offline, branded A4 Chromium PDF generator:

```bash
cd tools/print
npm ci                  # Install dependencies (Node 20+)
npm run build           # Incrementally compile modified .md docs to branded A4 PDFs
npm run check           # Run CI freshness and front-matter integrity check
```

---

## 🌐 Full Arabic (MSA) Mirror

Every single document across all 12 domains is mirrored in native Saudi Business Arabic under the [`ar/`](ar/) directory with identical file structure and front-matter schemas.

---

## 🛡️ License

Internal documentation and business assets are proprietary to **Fly GACA**. Public starter templates are licensed under Apache 2.0.
