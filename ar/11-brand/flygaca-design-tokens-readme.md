---
title: فلاي قاكا (Fly GACA) — رموز التصميم (استيراد Tokens Studio)
section: 11-brand
doc_type: readme
status: active
owner: Founder
last_updated: 2026-06-21
lang: ar
---

<div align="center">

# 🎨 فلاي قاكا (Fly GACA) — رموز التصميم (استيراد Tokens Studio)
### مواصفات 130 رمز تصميم لنظام الصقر واستيراد Figma عبر Tokens Studio
#### رموز التصميم لمنظومة فلاي جاكا · نظام الألوان والطباعة · استيراد Figma

<p align="center">
  <img src="https://img.shields.io/badge/Made%20in-Saudi%20Arabia-006C35?style=for-the-badge&labelColor=0a0e12" alt="صنع في السعودية" />
  <img src="https://img.shields.io/badge/Tokens-130%20رمزًا-0D96F6?style=for-the-badge&labelColor=0a0e12" alt="130 رمزًا" />
  <img src="https://img.shields.io/badge/Figma-Tokens%20Studio-F24E1E?style=for-the-badge&logo=figma&logoColor=white&labelColor=0a0e12" alt="Tokens Studio" />
  <img src="https://img.shields.io/badge/Themes-داكن%20وفاتح-C8A04A?style=for-the-badge&labelColor=0a0e12" alt="السمات" />
</p>

</div>

---

## 🧭 نظرة عامة

مُستخرَجة من `flygaca/assets/css/tokens.css` + `base.css`. استورِدها إلى Figma باستخدام إضافة **Tokens Studio** (مجانية) — دون أيّ قيود على Figma MCP.

---

## 📦 ما الذي يتضمنه الملف

`flygaca-design-tokens.json` — 130 رمزًا عبر 8 مجموعات:

| المجموعة | الرموز | ملاحظات |
|:---|:---|:---|
| `primitives` | لوحة الصقر، amber، الحالة، ink (نص داكن)، paper (محايدات فاتحة) | قيم خام؛ مُشار إليها، غير مُنسَّقة بثيم |
| `spacing` | `space.1`–`space.16` | أساس 4px، بوحدة px |
| `radius` | sm/md/lg/xl/pill | نصف قطر الزوايا |
| `typography` | الخط، الوزن، الحجم، ارتفاع السطر، التتبّع | الأحجام هي الحدّ الأعلى لسطح المكتب من مقياس `clamp()` في CSS |
| `text` | display، h1–h3، lead، body، small، eyebrow، mono-label | أنماط طباعة مركّبة → تصبح أنماط نص في Figma |
| `shadow` | sm، card، pop، amber، amber-strong | → أنماط تأثير في Figma |
| `color-dark` | مجموعة دلالية كاملة | مُستخرَجة من الكود (داكن أولًا) |
| `color-light` | مجموعة دلالية كاملة | ثيم فاتح **مؤلَّف حديثًا** |

عُرِّف ثيمان — **داكن** و**فاتح** — ضمن مجموعة `mode`. ويُفعِّل كلٌّ منهما مجموعة ألوانه الخاصة ويتشارك مجموعات primitives، والمقياس، والطباعة، والظلال.

---

## ⚡ كيفية الاستيراد إلى Figma

1. في Figma، ثبِّت **Tokens Studio for Figma** (Plugins ← find more ← "Tokens Studio").
2. افتحها ← **Settings ← استخدم "Single file"**، أو ببساطة **Tools ← Import ← Import from file** واختر `flygaca-design-tokens.json`.
3. تُحمِّل Tokens Studio جميع المجموعات الثماني وكلا الثيمين.
4. افتح قائمة **Themes** المنسدلة ← لكل ثيم (داكن، فاتح) اضغط **Export to Figma** (أو "Create variables"). يُولِّد ذلك مجموعات متغيرات Figma حقيقية + أوضاعًا، إضافةً إلى أنماط النص والتأثير.
5. حقول `$figmaCollectionId` / `$figmaModeId` تُترَك فارغة (null) عمدًا — تملؤها Tokens Studio عند أول تصدير بحيث تُحدِّث عمليات إعادة الاستيراد في مكانها بدلًا من التكرار.

---

<div align="center">

<sub>🇸🇦 صنع في السعودية · المملكة العربية السعودية</sub>

</div>
