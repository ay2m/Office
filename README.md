---
title: Fly GACA — The Master Office
section: root
doc_type: readme
status: active
owner: Founder
last_updated: 2026-08-25
lang: en
---

<div align="center">

# 🏢 Fly GACA — The Master Office
### The Version-Controlled Operating System for Saudi Arabia's Aviation Platform
#### نظام إدارة وتشغيل منصة فلاي جاكا · الحوكمة المؤسسية · الامتثال للأنظمة السعودية

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
> **Internal Operating Documents.** `iflygaca/Office` houses the complete corporate governance, legal contracts, business blueprints, financial models, and Saudi regulatory compliance suites for Fly GACA. It contains no application source code.

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

## 🇸🇦 Saudi Regulatory & Compliance Suite

1. **ZATCA Phase 2 E-Invoicing (Fatoora):** Standardized UBL 2.1 XML invoicing templates, SHA-256 canonical hashing, ECDSA signatures, and TLV QR encoding for B2B flight school billing.
2. **PDPL (Personal Data Protection Law):** Full Data Protection Impact Assessment (DPIA), privacy notices, and consent management frameworks aligned with SDAIA requirements.
3. **MISA & Commercial Registration:** Foreign investment blueprints, Articles of Association, and Ministry of Commerce commercial registrations.
4. **Saudi Labor Law:** Bilingual employment agreements, IP assignment contracts, and Nitaqat localization quota tracking.

---

## 🖨 Headless A4 Branded PDF Pipeline

The repository includes a 100% offline, branded A4 Chromium PDF generator:

```bash
cd tools/print
npm ci                  # Install dependencies (Node 20+)
npm run build           # Incrementally compile modified .md docs to branded A4 PDFs
npm run check           # Run CI freshness and front-matter integrity check
npm run check:facts     # Verify family contract facts against company-facts.md
```

---

## 🌐 Full Arabic (MSA) Mirror

Every document across all 12 domains is mirrored in native Saudi Business Arabic under the [`ar/`](ar/) directory with identical file naming and YAML frontmatter schemas.

---

<div align="center">

<sub>🇸🇦 صنع في السعودية · Made in Saudi Arabia</sub>

</div>
