---
title: Content QA — processed GACAR corpus vs. official source
section: 06-operations-it
doc_type: document
status: active
owner: Founder
last_updated: 2026-06-16
lang: en
---

# Content QA — processed GACAR corpus vs. official source

The regulation corpus in `assets/data/parts/` is machine-extracted from GACA's published
PDFs. This note records a spot-check of that extraction against the **official source**
(<https://gaca.gov.sa/>) and what it found, so the result is reproducible and the next person
doesn't have to redo it.

## Method

1. `npm run check:content` triages every Part/library doc for extraction defects
   (`scripts/check-content.js`).
2. For high-stakes numeric rules, the processed `assets/data/parts/part-N.html` was compared
   verbatim against the official GACAR PDF for that Part, downloaded from gaca.gov.sa and
   text-extracted. The official Part PDFs live under:
   `https://gaca.gov.sa/-/media/Files/PDF/LawsAndRegulation/Aviation-Safety-and-Environmental-Sustainability/GACAR-Safety-Regulations/`
   (e.g. `Part-091---General-Operating-and-Flight-Rules.pdf`).

## Result — numbers are accurate

Every regulatory figure checked matches the official source exactly, **including the
Saudi-specific values that differ from the FAA baseline** the content is modelled on:

| Rule | Official GACAR | Processed corpus | Verdict |
|------|----------------|------------------|---------|
| §91.65 max IAS < 10,000 ft MSL | 250 kt (463 km/h) | 250 kt (463 km/h) | ✅ |
| §91.65 max IAS near Class C/D, under Class B | 200 kt (370 km/h) | 200 kt (370 km/h) | ✅ |
| Supplemental O₂ — crew, entire flight, above | **13,000 ft MSL** (not FAA 14,000) | 13,000 ft MSL | ✅ |
| Supplemental O₂ — pressurized, mask above | **FL 250** (not FAA FL 350) | FL 250 | ✅ |
| §91.155 VFR vis, Class B / ≥10,000 ft | 5 KM clear of cloud / 8 KM, 1,500 m | same | ✅ |
| Part 61 PPL minimum age (non-glider/balloon) | 17 years | 17 years | ✅ |

Conclusion: the corpus is **substantively trustworthy**. No numeric corrections were needed
from this spot-check.

## Defects found — presentation, not content

The extraction left cosmetic scarring that does **not** change the regulatory numbers but
hurts readability and, in one case, navigation. `scripts/check-content.js` now detects each
class (run it for the current per-file list; `--strict` exits non-zero on structural defects):

- **Math-OCR scarring** (53/74 Part files, ~1,000 hits): bold section numbers were read as
  LaTeX, leaving `mathbf§91.33`, `bfxi91-19`, `bfdeltadelta91-21`. This also **mangles the
  `id="sec-…"` anchors** that `assets/js/document.js` deep-links to (a link to `#sec-91-41`
  misses the actual id `sec-bf-91-41`) — the highest-impact defect.
- **Stray `<html>/<body>` table wrappers** (32 files): extracted reg tables wrapped as
  standalone documents inside `<figure>`; `innerHTML` strips the wrappers so they still
  render, but cell text carries OCR noise (`1000 f` for "ft").
- **Duplicate `id`s** (29 files): repeated `sub-a`/`sub-f` etc. break deep-link targeting.
- **Char-level OCR** spotted in spot-checks: `4o`→40, `3e`→Be, lost spaces (`2 500ft`),
  `ICAo`, `rajectory`, `ACAS IHI`.

## Recommendation

Content accuracy is good enough to ship. The remaining work is a **presentation cleanup**,
best done by re-ingesting from the now-located source PDFs with a math-mode-aware extractor
(or a targeted transform that strips the `mathbf/bf*` tokens and regenerates `sec-…` ids).
Track progress with `node scripts/check-content.js --strict` — it goes green when a Part is
clean.
