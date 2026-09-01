---
title: Print pipeline — markdown to branded PDF
section: tools
doc_type: readme
status: active
owner: Founder
last_updated: 2026-08-25
lang: en
---

<div align="center">

# 🖨️ Headless Print Pipeline — Markdown & HTML → Branded A4 PDF
### High-Fidelity Automated Publishing, Typography Engine & Offline PDF Generation
#### خط إنتاج وثائق PDF الطباعية · خطوط متوافقة مع الهوية · دعم اللغة العربية RTL

<p align="center">
  <img src="https://img.shields.io/badge/Made%20in-Saudi%20Arabia-006C35?style=for-the-badge&labelColor=0a0e12" alt="صنع في السعودية" />
  <img src="https://img.shields.io/badge/Engine-Headless%20Chromium-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white&labelColor=0a0e12" alt="Chromium" />
  <img src="https://img.shields.io/badge/Layout-A4%20%40page%20Boxes-0D96F6?style=for-the-badge&labelColor=0a0e12" alt="A4 Layout" />
  <img src="https://img.shields.io/badge/Bilingual-Cairo%20RTL%20%2B%20Inter-C8A04A?style=for-the-badge&labelColor=0a0e12" alt="Bilingual" />
</p>

</div>

---

## 🧭 Purpose & Architecture

The **Print Pipeline** renders every Markdown document in `Office/` (both the English tree and the Arabic `ar/` mirror) into a print-ready, branded A4 PDF under `_print/`, maintaining an exact 1:1 directory structure.

### Typography & Styling Rules
- **English Typography:** Inter (Body) and JetBrains Mono (Code/Paths).
- **Arabic Typography:** Cairo (Headings & RTL Arabic Body).
- **Page Layout:** Standard A4 (210 × 297 mm) with 0.75-inch margins, dynamic header rules, and `@page` footer page counters.
- **Draft Watermarks:** Automatic diagonal watermarks for documents with `status: draft` or `scaffold`.

---

## ⚡ CLI Commands & Workflow

```bash
cd tools/print
npm ci                 # Install dependencies (18 packages, zero external downloads)

# 1. Incremental build (renders only modified .md files)
npm run build

# 2. Force rebuild of all ~260+ markdown documents
npm run build:force

# 3. Render a single markdown document
node build.mjs 02-legal/terms-of-use-draft-2026-06-14.md

# 4. Render all 20 standalone HTML showcase pages
node build-html.mjs

# 5. Re-screenshot brand collateral to 300 DPI PNGs
node build-png.mjs

# 6. CI validation guards (freshness & YAML frontmatter checks)
node check.mjs
node check-facts.mjs
```

---

## 🛡️ Caching & CI Guardrails

- **`.buildcache.json`:** Stores SHA-256 content hashes of source files to prevent Chromium from re-stamping CreationDate timestamps on unchanged PDFs.
- **`check.mjs`:** Verifies that no `.md` or `.html` file was edited without its corresponding PDF being committed.
- **`check-facts.mjs`:** Validates that `contracts/flygaca-family.json` entity values exactly match `01-governance/company-facts.md`.

---

<div align="center">

<sub>🇸🇦 صنع في السعودية · Made in Saudi Arabia</sub>

</div>
