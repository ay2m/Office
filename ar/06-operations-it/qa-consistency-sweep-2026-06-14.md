# مسح اتساق ضمان الجودة — 2026-06-14

**النطاق:** المسألة A (وسم منطقة GCP) والمسألة B (تعارضات عدّ المدوّنة) عبر شجرة المشروع الكاملة، باستثناء `node_modules/` و`.git/`. أُحصِيت أشجار عمل git تحت `flygaca/.claude/worktrees/` لكنها عُومِلت بوصفها غير معيارية (فهي تعكس المستودع الرئيسي عند نقاط أقدم ولا تُحرَّر باستقلال).

---

## نتيجة حرجة — موجز المسألة A يحتوي حقيقة معكوسة

> ينص موجز المهمة على: *"me-central2 هي قطر (الدوحة)؛ ومنطقة المملكة العربية السعودية (الدمام) هي me-central1"*

**هذا معكوس. قاعدة أكواد المشروع وجغرافيا GCP صحيحتان كما هما مكتوبتان:**

| منطقة GCP | الموقع | دور المشروع |
|---|---|---|
| `me-central1` | **الدوحة، قطر** | حساب مؤقت (لم تُمنح Cloud Run بعد في الدمام) |
| `me-central2` | **الدمام، المملكة العربية السعودية** | هدف نظام حماية البيانات الشخصية (PDPL) — Firestore هنا أصلًا؛ الحساب مُعلَّق |

أدلة من قاعدة الأكواد:
- `flygaca/functions/region.js` السطر 21: `module.exports = 'me-central1'; // interim (Doha); target me-central2 (Dammam)`
- `library/06-product-eng/runbooks/runbook-pdpl-me-central2.md` في العنوان وعبر الملف: *"move to me-central2 (Dammam)"*؛ *"Compute runs interim in me-central1 (Doha)"*
- `library/06-product-eng/hosting-facts.md`: *"`me-central1` (Doha, Qatar) is NOT in-Kingdom"*؛ يُدرج الجدول `me-central2 (Dammam)` لـ Firestore وCloud Functions
- تأكيد قاعدة بيانات Firestore الحية في `me-central2 (Dammam)` وفق قائمة تحقق دليل التشغيل
- رابط Cloud Run المُستخدَم: `https://captadel-30479965011.me-central1.run.app` — وهو مؤكَّد بوصفه المؤقت في قطر/الدوحة

الوثيقتان اللتان فيهما التخطيط **معكوس** (والواجب تصحيحهما) هما:

1. **`book-of-fly-gaca-review-2026-06-14.md` السطر 60** — يقول *"me-central2 is Qatar"* (خطأ)
2. **`.claude/agents/flygaca-qa-reviewer.md` السطر 15** — يقول *"Saudi GCP region is me-central1 = Dammam, not me-central2 = Qatar"* (خطأ — الطرفان معكوسان كلاهما)

لا يوجد ملف آخر في المشروع فيه التخطيط خاطئ. وحالات `me-central` الأخرى البالغة ~170 تستخدم باطّراد وبصحة `me-central2 = Dammam` و`me-central1 = Doha`.

---

## المسألة A — حالات منطقة GCP ("me-central")

### 1A. الجرد

إجمالي الملفات المحتوية على `me-central` (باستثناء node_modules و.git): **~50 ملفًا معياريًا فريدًا** (إضافةً إلى مرايا أشجار العمل). الملفات الرئيسية خارج أشجار العمل:

| الملف | الأسطر | السياق / الوسم المُستخدَم | صحيح؟ |
|---|---|---|---|
| `the-book-of-fly-gaca.html` | 642, 664 | `me-central2` موضوعة في الدمام | ✅ صحيح |
| `flygaca-resume-briefing-2026-05-23.md` | 91, 101, 148, 174 | `me-central2 (Dammam)` | ✅ صحيح |
| `01-governance/CLAUDE.md` | 107, 126–129, 143–144 | `me-central1` (Doha) مؤقت؛ `me-central2` (Dammam) هدف | ✅ صحيح |
| `library/06-product-eng/setup/setup-vps.md` | 27, 36 | `me-central2 / Cloud Functions` | ✅ صحيح |
| `library/06-product-eng/setup/setup-firebase.md` | 15, 18–19 | `me-central2 (Dammam, Saudi Arabia)` | ✅ صحيح |
| `library/06-product-eng/runbooks/runbook-cloudflare.md` | 5, 33 | `me-central2` هدف؛ `me-central1` مؤقت | ✅ صحيح |
| `library/06-product-eng/runbooks/runbook-captain-adel.md` | 55, 107, 207 | `me-central1` للنقطة الحية (الدوحة المؤقتة) | ✅ صحيح |
| `library/06-product-eng/runbooks/runbook-captadel-deploy.md` | 21–22, 94–96, 123–124, 151, 160–161 | `me-central2` هدف الدمام؛ `me-central1` مؤقت الدوحة | ✅ صحيح |
| `library/06-product-eng/runbooks/runbook-security-rollout.md` | 94 | `me-central1` للدالة الحالية | ✅ صحيح (يعكس المؤقت الحي) |
| `library/06-product-eng/runbooks/runbook-launch.md` | 148 | `me-central2 / Dammam` | ✅ صحيح |
| `library/06-product-eng/runbooks/runbook-ios.md` | 68 | رابط `me-central1` (المؤقت الحي) | ✅ صحيح |
| `library/06-product-eng/runbooks/runbook-captadel-saas.md` | 14, 50, 81, 133 | `me-central2 (Dammam)` هدف | ✅ صحيح |
| `library/06-product-eng/runbooks/runbook-captadel-extraction.md` | 129 | `me-central1` لـ Cloud Run الحالي | ✅ صحيح (مؤقت) |
| `library/06-product-eng/runbooks/runbook-pdpl-me-central2.md` | الكل | `me-central2` = الدمام؛ `me-central1` = الدوحة | ✅ صحيح في كل الملف |
| `library/06-product-eng/hosting-facts.md` | 17, 24–26, 30–32, 40, 42, 64, 66 | `me-central2 (Dammam)` بوصفها معيارية | ✅ صحيح |
| `flygaca-claude-briefing.md` | 110, 120, 151 | `me-central2 (Dammam)` | ✅ صحيح |
| `00-strategy/roadmap.md` | 172, 207, 255 | `me-central2` لـ Firestore | ✅ صحيح |
| `00-strategy/phase0.md` | 193, 195, 201, 212–215, 234 | `me-central2 (Dammam)` | ✅ صحيح |
| `master-paperwork-template-index-2026-06-14.md` | 195 | مرجع لاسم دليل التشغيل فقط | ✅ صحيح |
| `02-legal/privacy-notice-full-stage-draft-2026-06-14.md` | 145–146, 189 | `me-central2` (Dammam, KSA) | ✅ صحيح |
| `flygaca-antigravity-agents.md` | 102, 113, 131 | `me-central2 (Dammam)` | ✅ صحيح |
| `flygaca-phase0-status-2026-05-23.md` | 81, 109, 121, 135 | `me-central2 (Dammam)` | ✅ صحيح |
| `flygaca/assistant/captain_adel.py` | 25, 172 | `me-central2` بوصفها الافتراضية | ✅ صحيح |
| `flygaca/functions/region.js` | 9, 21 | `me-central1` (Doha) مؤقت؛ التعليق يُسمّي الدمام هدفًا | ✅ صحيح |
| `flygaca/functions/.env.flygaca-app` | في كل الملف | `me-central1` للنشر الحالي؛ يُسمّي الدمام هدفًا | ✅ صحيح |
| `flygaca/firebase.json` | rewrites | `me-central1` (المؤقت الحي) | ✅ صحيح |
| `flygaca/privacy.html` | 115 | `me-central2 (Dammam)` | ✅ صحيح |
| `flygaca/roadmap.md` | 207 | `me-central1 (Doha — closest CF v2 region` | ✅ صحيح |
| **`book-of-fly-gaca-review-2026-06-14.md`** | **60, 107** | **"me-central2 is Qatar" — خطأ** | ❌ غير صحيح |
| **`.claude/agents/flygaca-qa-reviewer.md`** | **15** | **"Saudi GCP region is me-central1 = Dammam, not me-central2 = Qatar" — خطأ (الطرفان معكوسان)** | ❌ غير صحيح |

### 1B. الملفات المُصلَحة

#### مُصلَح: `.claude/agents/flygaca-qa-reviewer.md` (السطر 15)
- **قبل:** `correct region facts (Saudi GCP region is me-central1 = Dammam, not me-central2 = Qatar)`
- **بعد:** `correct region facts (Saudi GCP region is me-central2 = Dammam; me-central1 = Doha, Qatar — the current interim compute region)`
- **أُنشئت نسخة احتياطية:** `.claude/agents/flygaca-qa-reviewer.md.bak-2026-06-14`

#### مُصلَح: `book-of-fly-gaca-review-2026-06-14.md` (السطران 60 و107)
- **السطر 60 قبل:** `However, me-central2 is Qatar — the Saudi hosting intent (Dammam) would be me-central1.`
- **السطر 60 بعد:** `However, this is correct as written: me-central2 IS Dammam (Saudi Arabia) and me-central1 IS Doha (Qatar). The project codebase is accurate throughout. The confusion was in this review document, not the source.`
- **السطر 107 قبل:** `Verify and correct GCP region — confirm me-central2 vs me-central1 (Qatar vs KSA) across the whole codebase and all docs`
- **السطر 107 بعد:** `GCP region verified — me-central2 = Dammam (Saudi Arabia, PDPL target, Firestore live here); me-central1 = Doha (Qatar, current compute interim). Codebase is correct; erroneous statements were only in this review doc and the QA agent definition.`
- **أُنشئت نسخة احتياطية:** `book-of-fly-gaca-review-2026-06-14.md.bak-2026-06-14`

جميع حالات `me-central` الأخرى: **لا تتطلب تعديلات** — فهي متسقة داخليًا وصحيحة واقعيًا.

---

## المسألة B — تعارضات عدّ المدوّنة

### 2A. الأرقام الموثوقة (مبنية على الأدلة)

| العنصر | العدد الموثوق | الدليل الأساسي |
|---|---|---|
| أجزاء GACAR | **74** | `library/GACAR-Source-Corpus/` = 74 مجلدًا؛ `gacar-index.json` count=74؛ `assets/data/parts/` = 74 ملفًا |
| الأدلة (كتب موضوعية إلكترونية) | **21** | `assets/data/ebooks/` = 21 ملف HTML؛ `ebooks-index.json` count=21؛ مصدر الهيئة العامة للطيران المدني: كتب GACAR الموضوعية |
| ملفات PDF لأدلة الهيئة العامة للطيران المدني الإرشادية | **17** | `library/GACA/Guidance-Manuals/` = 17 ملف PDF (Vol 1–17) — وهذه **ملفات PDF مصدرية**، لا كتب التطبيق الإلكترونية |
| المطارات | **61** | `airports.json` count=61؛ `aerodromes-index.json` documents=61؛ `assets/data/aerodromes-index.json` |
| مخططات VFR | **13** | `assets/data/charts/` = 13 ملف صورة |
| الوثائق المرجعية | **190** | `reference-index.json` count=190؛ `_extracted/` = 190 ملف TXT |
| الأدوات (أدوات الطيران) | **35** (ملفات HTML)، وظيفيًا **24** أداة تفاعلية | `flygaca/tools/` = 35 HTML تشمل الفهرس + المرافق؛ صدر `flygaca.html` يقول "24 flight tools"؛ تؤكّد خطة العمل "24 tool pages exist" |
| الأدلة | **10** (HTML غير الفهرس) | `flygaca/guides/` = 10 ملفات HTML غير الفهرس؛ خطة العمل: "guide count corrected 11→10" |
| مقاطع RAG (الحالية) | **47,361** | `runbook-captain-adel.md` (74 جزءًا + 21 دليلًا + 190 وثيقة مرجعية) |
| مقاطع RAG (رقم الكتاب القديم) | ~~29,749~~ | متقادم — كان 74 جزءًا + 17 ملف PDF لكتب إلكترونية فقط (قبل دمج الأدلة) |

**التمييز الرئيسي:** "17 administration eBooks" في الكتاب تشير إلى ملفات PDF الـ 17 لأدلة الهيئة العامة للطيران المدني الإرشادية في `library/GACA/Guidance-Manuals/`. أما "21 handbooks" في التطبيق فهي كتب HTML الموضوعية الإلكترونية الـ 21 في `assets/data/ebooks/` (مجموعة مختلفة وأكبر مُستمدة من كتب الهيئة الموضوعية). وليست هاتان الشيء نفسه. ووصف المدوّنة في الكتاب يسبق دمج الأدلة.

### 2B. جدول التعارضات

كل رقم متعارض وُجِد، مع الملف والسطر والقيمة الحالية والتصحيح المُوصى به:

| الملف | السطر | الحالي | المُوصى به | ملاحظات |
|---|---|---|---|---|
| `the-book-of-fly-gaca.html` | 771 | "96 documents — 75 GACAR Parts, 17 administration eBooks" | "74 GACAR Parts · 21 handbooks · 190 reference documents (+ 61 aerodromes · 13 charts)" | أعداد متقادمة قبل الأدلة. "75" خطأ (74)؛ و"17 admin eBooks" يخلط ملفات PDF للأدلة الإرشادية بأدلة HTML الـ 21 في التطبيق؛ وحساب "96" لا يتوافق مع أي مجموعة حالية |
| `the-book-of-fly-gaca.html` | 771 | "29,749 chunks" | "47,361 chunks" | عدد المقاطع المتقادم يسبق دمج الأدلة وفق `runbook-captain-adel.md` |
| `library/06-product-eng/runbooks/runbook-launch.md` | 18–19 | "17 Flight Tools, 7 Guides" | "24 flight tools, 10 guides" (أو الإشارة إليه بوصفه لقطة ما قبل الإطلاق) | متقادم؛ الموقع الحي وخطة العمل يؤكّدان 24 أداة و10 أدلة |
| `flygaca/office/runbook-launch.md` | 18–19 | "17 Flight Tools, 7 Guides" | كما أعلاه | مرآة لنسخة المكتبة؛ يلزم التصحيح نفسه |
| `book-of-fly-gaca-review-2026-06-14.md` | 53–55 | يقتبس "96 documents — 75 GACAR Parts, 17 eBooks" ويصفه بالمتعارض | يبقى دقيقًا بوصفه ملاحظة مراجعة — لكن الحل موثّق هنا الآن | لا حاجة لتعديل (إنه يشير إلى التعارض) |

### 2C. الأرقام المتسقة عبر المصادر الموثوقة

تظهر الأرقام التالية متطابقةً في الموقع الحي (`flygaca.html`، `pricing.html`، `library.html`)، وخارطة الطريق، وخطة العمل، وRUNBOOK-captain-adel، وملف المنتج:

- **74 جزء GACAR** — متسق في كل مكان عدا الكتاب (يقول 75)
- **21 دليلًا** — متسق في كل مكان عدا الكتاب (يقول 17)
- **61 مطارًا** — متسق في كل مكان
- **13 مخططًا** — متسق في كل مكان
- **190 وثيقة مرجعية** — متسق في كل مكان
- **24 أداة طيران** — متسق في الموقع الحي؛ RUNBOOK-launch متقادم عند 17
- **10 أدلة** — متسق في الموقع الحي؛ RUNBOOK-launch متقادم عند 7

### 2D. الإصلاحات المُطبَّقة

**لم تُجرَ تعديلات جماعية على وثائق النصوص.** ويتطلب ملفا العدّ المتقادم تأكيدًا بشريًا قبل التحرير:

**التعديلات البشرية المُوصى بها (لم تُصلَح آليًا):**

1. **`the-book-of-fly-gaca.html` السطر 771** — غيّر "96 documents — 75 GACAR Parts, 17 administration eBooks, and the references that bind them. It is rebuilt by `build_library.py` and indexed by BM25 across **29,749 chunks**." لتعكس الأرقام الحالية. مقترح: *"The corpus spans 74 GACAR Parts, 21 topical handbooks, 190 reference documents, 61 aerodromes and 13 charts — indexed by BM25 across **47,361 chunks**."* تأطير "96 documents" خاطئ ومُربك معًا (الإجمالي الفعلي للأجزاء + الأدلة + المراجع وحدها هو 285).

2. **`library/06-product-eng/runbooks/runbook-launch.md` السطر 18** — غيّر "17 Flight Tools, 7 Guides" إلى "24 flight tools, 10 guides" ليطابق الموقع الحي. (هذه لقطة دليل تشغيل إطلاق؛ والتباين شأن صيانة لا خطأ في الموقع الحي.)

3. **`flygaca/office/runbook-launch.md` السطر 18** — التصحيح نفسه أعلاه (هذه مرآة لنسخة المكتبة).

---

## ملخص الملفات المُحرَّرة مقابل المُعلَّمة

### الملفات المُحرَّرة (مع نسخ احتياطية)

| الملف المُحرَّر | النسخة الاحتياطية | التغيير |
|---|---|---|
| `/sessions/nice-quirky-pasteur/mnt/Fly GACA /.claude/agents/flygaca-qa-reviewer.md` | أُنشئت `.bak-2026-06-14` | إصلاح وسوم المنطقة المعكوسة في السطر 15 |
| `/sessions/nice-quirky-pasteur/mnt/Fly GACA /book-of-fly-gaca-review-2026-06-14.md` | أُنشئت `.bak-2026-06-14` | تصحيح ادعاء المنطقة المعكوس في السطرين 60 و107 |

### الملفات المُعلَّمة لقرار بشري

| الملف | المسألة | الإجراء المُوصى به |
|---|---|---|
| `the-book-of-fly-gaca.html` | السطر 771: "96 documents — 75 GACAR Parts, 17 admin eBooks, 29,749 chunks" — الأرقام الثلاثة متقادمة | يُحدّثه البشري إلى 74 جزءًا · 21 دليلًا · 190 مرجعًا / 47,361 مقطعًا |
| `library/06-product-eng/runbooks/runbook-launch.md` | السطر 18: "17 Flight Tools, 7 Guides" — لقطة إطلاق متقادمة | يُحدّثه البشري إلى 24 أداة / 10 أدلة |
| `flygaca/office/runbook-launch.md` | السطر 18: الأرقام المتقادمة نفسها | التصحيح نفسه أعلاه |

### الملفات ذات وسم me-central الصحيح (لا تتطلب تعديلات)

كل الملفات المتبقية البالغة ~48 ملفًا محتويةً على `me-central` — بما فيها كل الشيفرة المصدرية وأدلة التشغيل والإحاطات وإشعار الخصوصية وPHASE0 وROADMAP وCLAUDE.md — تُخطّط بصحة `me-central2 = Dammam (Saudi Arabia, PDPL target)` و`me-central1 = Doha (Qatar, interim compute)`.

---

## جدول حقيقة المنطقة (للمرجع)

| الادعاء | الحُكم |
|---|---|
| GCP `me-central1` = الدوحة، قطر | ✅ صحيح |
| GCP `me-central2` = الدمام، المملكة العربية السعودية | ✅ صحيح |
| Firestore `(default)` في `me-central2 (Dammam)` | ✅ مؤكَّد (قائمة تحقق دليل التشغيل، privacy.html) |
| Cloud Functions / Cloud Run في `me-central1 (Doha)` | ✅ مؤكَّد مؤقتًا — بانتظار منح الوصول لحساب Google لحساب me-central2 |
| هدف نظام حماية البيانات الشخصية (PDPL) للحساب هو `me-central2 (Dammam)` | ✅ صحيح (تعليق region.js، RUNBOOK-pdpl-me-central2) |

---

*أُنشئ التقرير: 2026-06-14 بواسطة وكيل مسح اتساق ضمان الجودة.*
