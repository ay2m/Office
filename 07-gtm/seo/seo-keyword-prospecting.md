---
title: Fly GACA — keyword prospecting brief
section: 07-gtm
doc_type: document
status: active
owner: Founder
last_updated: 2026-06-16
lang: en
---

# Fly GACA — keyword prospecting brief

A starting seed list of the words and phrases people use when looking for what Fly
GACA does, grouped by what the searcher actually wants. Use it to seed organic SEO,
to pick social topics, and to frame flight-school (B2B) outreach.

Companion file: **`flygaca-keyword-seeds.csv`** — every seed with language, intent
group, funnel stage, a suggested landing page on the site, and a priority.

> **Volumes not included.** Live search-volume / difficulty data was not available
> (Semrush MCP isn't on the current plan — see https://www.semrush.com/mcp-access).
> When you have a volume source (Semrush, Google Keyword Planner, or Search Console),
> set the database/region to **Saudi Arabia (`sa`)** and pull **both English and
> Arabic**. The Arabic terms almost certainly face less competition.

## How to read intent

Searchers fall into a few buckets. The closer to "bottom" of the funnel, the closer
to signing up — but the "top" terms are where the *reach* is.

| Intent group | What they want | Best surface | Funnel |
|---|---|---|---|
| Regulation lookup | The actual rule / Part | `library.html` | Bottom — our moat |
| Get licensed | The path to a licence | `guides/saudi-ppl-requirements.html` | Top → Middle |
| Convert licence | Move a foreign licence to GACA | `guides/foreign-license-conversion-to-gaca.html` | Bottom — high value |
| Exam prep | Pass a written / ELPT | `guides/icao-english-saelpt.html`, `study/groundschool.html` | Middle |
| Medical | Class 1 / aeromedical | `guides/gaca-medical-class-1.html` | Middle |
| Schools / B2B | A flight school / academy | `schools.html` | Top |
| Flight tools | A specific calculator/decoder | `tools/*` | Middle |
| Brand / product | The AI instructor itself | `chat.html` | Top |

## The wedge: where Fly GACA can rank fastest

Lead with **`GACAR`** and the **Part-specific** terms (`GACAR Part 61`, `GACAR PDF`,
`لوائح الطيران المدني السعودي`). They're low volume but near-zero competition and they
*are literally our content* — the cleanest, fastest path to ranking, and the most
credible thing to share. Build out one indexable page per GACAR Part and per guide
topic; that long tail compounds.

The high-value money terms are **licence conversion** (`convert FAA license to GACA`,
`تحويل رخصة طيار للسعودية`) — low-ish volume, but the searcher is a working pilot
ready to pay, and we have both a guide and a Prep Pack for them.

---

## Tailored by channel

### 1. Organic SEO
- **One page = one intent.** The site already has the landing pages (see the CSV);
  make sure each guide's `<title>`/`<h1>`/meta-description carries its head term in
  both languages. The pages are bilingual already, which is a ranking asset for the
  Arabic terms most competitors ignore.
- **Programmatic long tail:** a thin-but-real page per GACAR Part and per aerodrome
  (`tools/aerodromes.html` data) captures dozens of zero-competition queries.
- **Questions → guides.** "how to become a pilot in Saudi Arabia", "how to read
  METAR" are top-of-funnel question queries that map onto existing guides — answer
  the question in the first paragraph.
- **Keep the disclaimer framing.** "verify against the official GACA publication"
  isn't just compliance — it's the trust signal that separates us from scrapers.

### 2. Social (the @flygaca / @flygacax accounts)
- Mine the **"Get licensed"** and **"Exam prep"** groups for content — these are the
  emotionally charged, shareable topics (becoming a pilot, passing the ELPT). Top-of-
  funnel keywords = top-of-funnel content.
- Arabic-forward for the domestic audience: `كيف تصبح طيار في السعودية` and `أسئلة اختبار الهيئة العامة للطيران المدني` form a multi-part social video series across TikTok, X, and Instagram.
- Turn each **guide** into a carousel/Short; turn each **flight tool** into a quick
  demo (Captain Adel answering a GACAR question is the hero clip).
- Every post still routes through the compliance check (not-affiliated disclaimer,
  no fabricated citations) before it ships.

### 3. Flight-school / B2B outreach & Brand Search
- The B2B intent terms (**`OxfordSaudia Dammam`**, **`Saudi Aviation Academy tuition`**, **`مدرسة طيران السعودية`**) serve dual roles:
  (a) Content targeting for landing pages (`schools.html`) capturing inbound queries from academy prospects.
  (b) Direct prospect intelligence for outbound GTM sales outreach.
- High-intent brand terms (**`Fly GACA AI`**, **`Captain Adel aviation AI`**, **`تطبيق فلاي جاكا`**) capture pilots looking for interactive AI study assistance; ensure dedicated structured schema and meta descriptions are set.

---

## Arabic-Forward High-Intent Wedge Strategy

In Saudi General Aviation, English is the regulatory language for flight operations, but **Arabic is the dominant search medium for career discovery, medical inquiries, and initial exam research.**

1. **High-Intent Arabic License Conversion (`تحويل رخصة طيار للسعودية` / `معادلة رخصة الطيران`):**
   - High conversion rate: Foreign-trained Saudi cadets returning from the US, UK, or South Africa searching for GACAR written exam conversion prep.
   - Action: Optimize `guides/foreign-license-conversion-to-gaca.html` with explicit step-by-step FAQ schema covering GACAR Part 61 conversion.
2. **Arabic Exam Prep & Question Banks (`نماذج اختبارات GACA` / `اختبار السايلبت للطيران`):**
   - Direct purchase intent for SAELPT and Groundschool Prep Packs (`packs/elpt.html`, `study/groundschool.html`).
   - Action: Add interactive quiz previews and bilingual term glossaries.
3. **Medical Certification (`فحص طبي طيران الرياض` / `مراكز الفحص الطبي المعتمدة للطيران المدني`):**
   - High monthly volume with zero dedicated competitors explaining GACAR Class 1/2 medical standards.

---

## Suggested next steps
1. Ingest expanded **`flygaca-keyword-seeds.csv`** (75+ seeds across 8 intent clusters) into Google Keyword Planner & Semrush set to **Saudi Arabia (`sa`)**.
2. Prioritize landing page optimization for High Priority / Bottom-Funnel terms: Regulation lookup (`GACAR Part 141`, `GACAR Part 91`) and Conversion (`FAA to GACA`).
3. Ensure all guide pages feature GFM metadata, JSON-LD FAQ schema, and canonical H1/title tags reflecting EN + AR primary search terms.
4. Distribute the "Get licensed" + "Exam prep" rows to the content marketing team for weekly social calendar execution.
