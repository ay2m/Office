---
title: جولة اتساق ضمان الجودة — 2026-06-14
section: 06-operations-it
doc_type: document
status: active
owner: Founder
last_updated: 2026-06-14
lang: ar
---

# جولة اتساق ضمان الجودة — 2026-06-14

**النطاق:** القضية أ (وسم إقليم GCP) والقضية ب (تعارضات عدّ المتن) عبر شجرة المشروع كاملةً، باستثناء `node_modules/` و`.git/`. وتُجرَد git worktrees تحت `flygaca/.claude/worktrees/` لكنها تُعامَل بوصفها غير معتمدة (تحاكي المستودع الرئيسي عند نقاط أقدم وليست محرَّرة باستقلال).

---

## نتيجة حرجة — موجز القضية أ يحتوي حقيقة معكوسة

> ينصّ موجز المهمّة على: *"me-central2 هي قطر (الدوحة)؛ وإقليم المملكة العربية السعودية (الدمام) هو me-central1"*

**هذا مقلوب. قاعدة شيفرة المشروع وجغرافيا GCP صحيحتان كما هما مكتوبتان:**

| إقليم GCP | الموقع | دور المشروع |
|---|---|---|
| `me-central1` | **الدوحة، قطر** | حوسبة مؤقتة (Cloud Run لم يُمنَح بعد في الدمام) |
| `me-central2` | **الدمام، المملكة العربية السعودية** | هدف PDPL — Firestore هنا أصلًا؛ الحوسبة معلَّقة |

الدليل من قاعدة الشيفرة:
- `flygaca/functions/region.js` السطر 21: `module.exports = 'me-central1'; // interim (Doha); target me-central2 (Dammam)`
- `library/06-product-eng/runbooks/runbook-pdpl-me-central2.md` العنوان وفي كل مكان: *"الانتقال إلى me-central2 (الدمام)"*؛ *"تعمل الحوسبة مؤقتًا في me-central1 (الدوحة)"*
- `library/06-product-eng/hosting-facts.md`: *"`me-central1` (الدوحة، قطر) ليست داخل المملكة"*؛ والجدول يدرج `me-central2 (الدمام)` لـ Firestore وCloud Functions
- قاعدة بيانات Firestore الحيّة مؤكَّدة في `me-central2 (الدمام)` وفق قائمة تحقّق RUNBOOK
- رابط Cloud Run المستخدَم: `https://captadel-30479965011.me-central1.run.app` — المؤكَّد بوصفه المؤقت في قطر/الدوحة

الوثيقتان اللتان فيهما التخطيط **معكوس** (وينبغي تصحيحهما) هما:

1. **`book-of-fly-gaca-review-2026-06-14.md` السطر 60** — يقول *"me-central2 هي قطر"* (خطأ)
2. **`.claude/agents/flygaca-qa-reviewer.md` السطر 15** — يقول *"إقليم GCP السعودي هو me-central1 = الدمام، لا me-central2 = قطر"* (خطأ — الطرفان معكوسان معًا)

لا ملف آخر في المشروع فيه التخطيط خاطئ. والـ170 ورودًا أخرى تقريبًا لـ `me-central` تستخدم باتساق وصحّة `me-central2 = الدمام` و`me-central1 = الدوحة`.

---

## القضية أ — ورود إقليم GCP ("me-central")

### 1أ. الجرد

إجمالي الملفات المحتوية على `me-central` (باستثناء node_modules وgit.): **نحو 50 ملفًا معتمدًا فريدًا** (إضافةً إلى نسخ worktree). الملفات الرئيسية غير worktree:

| الملف | الأسطر | السياق / الوسم المستخدَم | صحيح؟ |
|---|---|---|---|
| `the-book-of-fly-gaca.html` | 642، 664 | `me-central2` موضوعة في الدمام | ✅ صحيح |
| `flygaca-resume-briefing-2026-05-23.md` | 91، 101، 148، 174 | `me-central2 (الدمام)` | ✅ صحيح |
| `01-governance/CLAUDE.md` | 107، 126–129، 143–144 | `me-central1` (الدوحة) مؤقت؛ `me-central2` (الدمام) هدف | ✅ صحيح |
| `library/06-product-eng/setup/setup-vps.md` | 27، 36 | `me-central2 / Cloud Functions` | ✅ صحيح |
| `library/06-product-eng/setup/setup-firebase.md` | 15، 18–19 | `me-central2 (الدمام، المملكة العربية السعودية)` | ✅ صحيح |
| `library/06-product-eng/runbooks/runbook-cloudflare.md` | 5، 33 | `me-central2` هدف؛ `me-central1` مؤقت | ✅ صحيح |
| `library/06-product-eng/runbooks/runbook-captain-adel.md` | 55، 107، 207 | `me-central1` لنقطة النهاية الحيّة (الدوحة المؤقتة) | ✅ صحيح |
| `library/06-product-eng/runbooks/runbook-captadel-deploy.md` | 21–22، 94–96، 123–124، 151، 160–161 | `me-central2` هدف الدمام؛ `me-central1` الدوحة المؤقتة | ✅ صحيح |
| `library/06-product-eng/runbooks/runbook-security-rollout.md` | 94 | `me-central1` للدالة الحالية | ✅ صحيح (يعكس المؤقت الحيّ) |
| `library/06-product-eng/runbooks/runbook-launch.md` | 148 | `me-central2 / الدمام` | ✅ صحيح |
| `library/06-product-eng/runbooks/runbook-ios.md` | 68 | رابط `me-central1` (المؤقت الحيّ) | ✅ صحيح |
| `library/06-product-eng/runbooks/runbook-captadel-saas.md` | 14، 50، 81، 133 | هدف `me-central2 (الدمام)` | ✅ صحيح |
| `library/06-product-eng/runbooks/runbook-captadel-extraction.md` | 129 | `me-central1` لـ Cloud Run الحالي | ✅ صحيح (مؤقت) |
| `library/06-product-eng/runbooks/runbook-pdpl-me-central2.md` | الكل | `me-central2` = الدمام؛ `me-central1` = الدوحة | ✅ صحيح في كل مكان |
| `library/06-product-eng/hosting-facts.md` | 17، 24–26، 30–32، 40، 42، 64، 66 | `me-central2 (الدمام)` بوصفها المعتمدة | ✅ صحيح |
| `flygaca-claude-briefing.md` | 110، 120، 151 | `me-central2 (الدمام)` | ✅ صحيح |
| `00-strategy/roadmap.md` | 172، 207، 255 | `me-central2` لـ Firestore | ✅ صحيح |
| `00-strategy/phase0.md` | 193، 195، 201، 212–215، 234 | `me-central2 (الدمام)` | ✅ صحيح |
| `master-paperwork-template-index-2026-06-14.md` | 195 | مرجع اسم runbook فقط | ✅ صحيح |
| `02-legal/privacy-notice-full-stage-draft-2026-06-14.md` | 145–146، 189 | `me-central2` (الدمام، المملكة العربية السعودية) | ✅ صحيح |
| `flygaca-antigravity-agents.md` | 102، 113، 131 | `me-central2 (الدمام)` | ✅ صحيح |
| `flygaca-phase0-status-2026-05-23.md` | 81، 109، 121، 135 | `me-central2 (الدمام)` | ✅ صحيح |
| `flygaca/assistant/captain_adel.py` | 25، 172 | `me-central2` بوصفها الافتراضية | ✅ صحيح |
| `flygaca/functions/region.js` | 9، 21 | `me-central1` (الدوحة) مؤقت؛ التعليق يسمّي الدمام هدفًا | ✅ صحيح |
| `flygaca/functions/.env.flygaca-app` | في كل مكان | `me-central1` للنشر الحالي؛ يسمّي الدمام هدفًا | ✅ صحيح |
| `flygaca/firebase.json` | rewrites | `me-central1` (المؤقت الحيّ) | ✅ صحيح |
| `flygaca/privacy.html` | 115 | `me-central2 (الدمام)` | ✅ صحيح |
| `flygaca/roadmap.md` | 207 | `me-central1 (الدوحة — أقرب إقليم CF v2` | ✅ صحيح |
| **`book-of-fly-gaca-review-2026-06-14.md`** | **60، 107** | **"me-central2 هي قطر" — خطأ** | ❌ غير صحيح |
| **`.claude/agents/flygaca-qa-reviewer.md`** | **15** | **"إقليم GCP السعودي هو me-central1 = الدمام، لا me-central2 = قطر" — خطأ (الطرفان معكوسان)** | ❌ غير صحيح |

### 1ب. الملفات المُصلَحة

#### أُصلح: `.claude/agents/flygaca-qa-reviewer.md` (السطر 15)
- **قبل:** `correct region facts (Saudi GCP region is me-central1 = Dammam, not me-central2 = Qatar)`
- **بعد:** `correct region facts (Saudi GCP region is me-central2 = Dammam; me-central1 = Doha, Qatar — the current interim compute region)`
- **نُسخة احتياطية أُنشئت:** `.claude/agents/flygaca-qa-reviewer.md.bak-2026-06-14`

#### أُصلح: `book-of-fly-gaca-review-2026-06-14.md` (السطران 60 و107)
- **السطر 60 قبل:** `However, me-central2 is Qatar — the Saudi hosting intent (Dammam) would be me-central1.`
- **السطر 60 بعد:** `However, this is correct as written: me-central2 IS Dammam (Saudi Arabia) and me-central1 IS Doha (Qatar). The project codebase is accurate throughout. The confusion was in this review document, not the source.`
- **السطر 107 قبل:** `Verify and correct GCP region — confirm me-central2 vs me-central1 (Qatar vs KSA) across the whole codebase and all docs`
- **السطر 107 بعد:** `GCP region verified — me-central2 = Dammam (Saudi Arabia, PDPL target, Firestore live here); me-central1 = Doha (Qatar, current compute interim). Codebase is correct; erroneous statements were only in this review doc and the QA agent definition.`
- **نُسخة احتياطية أُنشئت:** `book-of-fly-gaca-review-2026-06-14.md.bak-2026-06-14`

كل ورود `me-central` الأخرى: **لا تعديلات مطلوبة** — فهي متّسقة داخليًا وصحيحة واقعيًا.

---

## القضية ب — تعارضات عدّ المتن

### 2أ. الأرقام المعتمدة (مبنية على الدليل)

| البند | العدد المعتمد | الدليل الأساسي |
|---|---|---|
| أجزاء GACAR | **74** | `library/GACAR-Source-Corpus/` = 74 مجلدًا؛ `gacar-index.json` count=74؛ `assets/data/parts/` = 74 ملفًا |
| الأدلة (كتب إلكترونية موضوعية) | **21** | `assets/data/ebooks/` = 21 ملف HTML؛ `ebooks-index.json` count=21؛ مصدر GACA: كتب GACAR الموضوعية |
| ملفات PDF لأدلة إرشادات GACA | **17** | `library/GACA/Guidance-Manuals/` = 17 ملف PDF (Vol 1–17) — هذه **ملفات PDF مصدرية**، لا الكتب الإلكترونية للتطبيق |
| المطارات | **61** | `airports.json` count=61؛ `aerodromes-index.json` documents=61؛ `assets/data/aerodromes-index.json` |
| خرائط VFR | **13** | `assets/data/charts/` = 13 ملف صورة |
| وثائق المرجع | **190** | `reference-index.json` count=190؛ `_extracted/` = 190 ملف TXT |
| الأدوات (أدوات الطيران) | **35** (ملفات HTML)، وظيفيًا **24** أداة تفاعلية | `flygaca/tools/` = 35 HTML شاملةً الفهرس والأدوات المساعدة؛ `flygaca.html` يقول في البطل "24 أداة طيران"؛ تؤكّد خطة العمل "وجود 24 صفحة أداة" |
| الأدلة | **10** (HTML غير الفهرس) | `flygaca/guides/` = 10 ملفات HTML غير فهرس؛ خطة العمل: "صُحِّح عدّ الأدلة 11←10" |
| مقاطع RAG (الحالية) | **47,361** | `runbook-captain-adel.md` (74 جزءًا + 21 دليلًا + 190 وثيقة مرجع) |
| مقاطع RAG (رقم الكتاب القديم) | ~~29,749~~ | قديم — كان 74 جزءًا + 17 ملف PDF كتاب إلكتروني فقط (قبل دمج الأدلة) |

**التمييز الرئيسي:** يشير "17 كتابًا إلكترونيًا إداريًا" في الكتاب إلى ملفات PDF الـ17 لأدلة إرشادات GACA في `library/GACA/Guidance-Manuals/`. أما "21 دليلًا" في التطبيق فهي 21 كتابًا إلكترونيًا موضوعيًا بصيغة HTML في `assets/data/ebooks/` (مجموعة مختلفة أكبر مشتقّة من كتب GACA الموضوعية). وهما ليسا الشيء ذاته. ويسبق وصف الكتاب للمتن دمج الأدلة.

### 2ب. جدول التعارض

كل رقم متعارض وُجد، مع الملف والسطر والقيمة الحالية والتصحيح المُوصى به:

| الملف | السطر | الحالي | المُوصى به | ملاحظات |
|---|---|---|---|---|
| `the-book-of-fly-gaca.html` | 771 | "96 وثيقة — 75 جزء GACAR، 17 كتابًا إلكترونيًا إداريًا" | "74 جزء GACAR · 21 دليلًا · 190 وثيقة مرجع (+ 61 مطارًا · 13 خريطة)" | أعداد قديمة قبل الأدلة. "75" خطأ (74)؛ "17 كتابًا إلكترونيًا إداريًا" يخلط ملفات PDF لأدلة الإرشادات بأدلة التطبيق الـ21 بصيغة HTML؛ حساب "96" لا يُوائم أي مجموعة حالية |
| `the-book-of-fly-gaca.html` | 771 | "29,749 مقطعًا" | "47,361 مقطعًا" | عدّ مقاطع قديم يسبق دمج الأدلة وفق `runbook-captain-adel.md` |
| `library/06-product-eng/runbooks/runbook-launch.md` | 18–19 | "17 أداة طيران، 7 أدلة" | "24 أداة طيران، 10 أدلة" (أو وسمها بوصفها لقطة ما قبل الإطلاق) | قديم؛ يؤكّد الموقع الحيّ وخطة العمل 24 أداة و10 أدلة |
| `flygaca/office/runbook-launch.md` | 18–19 | "17 أداة طيران، 7 أدلة" | المثل أعلاه | نسخة من نسخة المكتبة؛ التصحيح ذاته مطلوب |
| `book-of-fly-gaca-review-2026-06-14.md` | 53–55 | يقتبس "96 وثيقة — 75 جزء GACAR، 17 كتابًا إلكترونيًا" ويصفه متعارضًا | يبقى دقيقًا بوصفه ملاحظة مراجعة — لكن الحلّ موثَّق الآن هنا | لا تعديل مطلوب (إنه يلاحظ التعارض) |

### 2ج. الأرقام المتّسقة عبر المصادر المعتمدة

تظهر الأرقام التالية متطابقة في الموقع الحيّ (`flygaca.html`، `pricing.html`، `library.html`)، وفي خارطة الطريق، وخطة العمل، وRUNBOOK-captain-adel، وملف المنتج:

- **74 جزء GACAR** — متّسق في كل مكان عدا الكتاب (يقول 75)
- **21 دليلًا** — متّسق في كل مكان عدا الكتاب (يقول 17)
- **61 مطارًا** — متّسق في كل مكان
- **13 خريطة** — متّسق في كل مكان
- **190 وثيقة مرجع** — متّسق في كل مكان
- **24 أداة طيران** — متّسق في الموقع الحيّ؛ RUNBOOK-launch قديم عند 17
- **10 أدلة** — متّسق في الموقع الحيّ؛ RUNBOOK-launch قديم عند 7

### 2د. الإصلاحات المطبَّقة

**لم تُجرَ تعديلات جماعية على وثائق النثر.** يتطلب ملفّا العدّ القديمين تأكيدًا بشريًا قبل التحرير:

**التحريرات البشرية المُوصى بها (لم تُصلَح آليًا):**

1. **`the-book-of-fly-gaca.html` السطر 771** — غيِّر "96 documents — 75 GACAR Parts, 17 administration eBooks, and the references that bind them. It is rebuilt by `build_library.py` and indexed by BM25 across **29,749 chunks**." لتعكس الأرقام الحالية. المقترح: *"يمتدّ المتن عبر 74 جزء GACAR، و21 دليلًا موضوعيًا، و190 وثيقة مرجع، و61 مطارًا و13 خريطة — مفهرسًا بـ BM25 عبر **47,361 مقطعًا**."* وتأطير "96 وثيقة" خاطئ ومربك معًا (الإجمالي الفعلي للأجزاء + الأدلة + المراجع وحدها 285).

2. **`library/06-product-eng/runbooks/runbook-launch.md` السطر 18** — غيِّر "17 Flight Tools, 7 Guides" إلى "24 flight tools, 10 guides" لمطابقة الموقع الحيّ. (هذه لقطة runbook إطلاق؛ والتباين شأن صيانة، لا خطأ في الموقع الحيّ.)

3. **`flygaca/office/runbook-launch.md` السطر 18** — التصحيح ذاته أعلاه (هذه نسخة من نسخة المكتبة).

---

## ملخّص الملفات المُحرَّرة مقابل المُعلَّمة

### الملفات المُحرَّرة (مع نُسخ احتياطية)

| الملف المُحرَّر | النُّسخة الاحتياطية | التغيير |
|---|---|---|
| `/sessions/nice-quirky-pasteur/mnt/Fly GACA /.claude/agents/flygaca-qa-reviewer.md` | أُنشئت `.bak-2026-06-14` | أُصلحت أوسمة الإقليم المعكوسة في السطر 15 |
| `/sessions/nice-quirky-pasteur/mnt/Fly GACA /book-of-fly-gaca-review-2026-06-14.md` | أُنشئت `.bak-2026-06-14` | صُحِّح ادّعاء الإقليم المعكوس في السطرين 60 و107 |

### الملفات المُعلَّمة لقرار بشري

| الملف | القضية | الإجراء المُوصى به |
|---|---|---|
| `the-book-of-fly-gaca.html` | السطر 771: "96 وثيقة — 75 جزء GACAR، 17 كتابًا إلكترونيًا إداريًا، 29,749 مقطعًا" — الأرقام الثلاثة قديمة | على البشري التحديث إلى 74 جزءًا · 21 دليلًا · 190 مرجعًا / 47,361 مقطعًا |
| `library/06-product-eng/runbooks/runbook-launch.md` | السطر 18: "17 أداة طيران، 7 أدلة" — لقطة إطلاق قديمة | على البشري التحديث إلى 24 أداة / 10 أدلة |
| `flygaca/office/runbook-launch.md` | السطر 18: الأرقام القديمة ذاتها | التصحيح ذاته أعلاه |

### الملفات ذات وسم me-central الصحيح (لا تعديلات مطلوبة)

كل الملفات المتبقية البالغة نحو 48 ملفًا المحتوية على `me-central` — بما فيها كل الشيفرة المصدرية، وrunbooks، والموجزات، وإشعار الخصوصية، وPHASE0، وROADMAP، وCLAUDE.md — تخطِّط بشكل صحيح `me-central2 = الدمام (المملكة العربية السعودية، هدف PDPL)` و`me-central1 = الدوحة (قطر، حوسبة مؤقتة)`.

---

## جدول حقيقة الإقليم (للمرجع)

| الادّعاء | الحكم |
|---|---|
| GCP `me-central1` = الدوحة، قطر | ✅ صحيح |
| GCP `me-central2` = الدمام، المملكة العربية السعودية | ✅ صحيح |
| Firestore `(default)` في `me-central2 (الدمام)` | ✅ مؤكَّد (قائمة تحقّق RUNBOOK، privacy.html) |
| Cloud Functions / Cloud Run في `me-central1 (الدوحة)` | ✅ مؤكَّد مؤقتًا — بانتظار منح وصول حساب Google لحوسبة me-central2 |
| هدف PDPL للحوسبة هو `me-central2 (الدمام)` | ✅ صحيح (تعليق region.js، RUNBOOK-pdpl-me-central2) |

---

*التقرير مُولَّد: 2026-06-14 بواسطة وكيل جولة اتساق ضمان الجودة.*
