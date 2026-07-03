---
title: CLAUDE.md
section: 01-governance
doc_type: document
status: active
owner: Founder
last_updated: 2026-07-03
lang: ar
---

# CLAUDE.md

> **نسخة منقولة** — هذا الملف هو إرشادات Claude الخاصة بمستودع التطبيق (`FlyGACA/flygaca`)،
> محفوظ هنا للمرجعية. المسارات مثل `functions/` و`docs/` و`office/` تشير إلى بنية ذلك
> المستودع، لا إلى مستودع الوثائق هذا.

يقدّم هذا الملف إرشادات إلى Claude Code (claude.ai/code) عند العمل على الكود في هذا المستودع.

## ما هذا المشروع

Fly GACA منصة تعليمية مستقلة ومكتبة تنظيمية مفتوحة للطيران المدني
السعودي (GACAR، AIP، الخرائط، أدوات الدراسة، ومُدرّب طيران بالذكاء الاصطناعي). وهو **غير
تابع للهيئة العامة للطيران المدني**؛ فكل واجهة تُرسّخ قاعدة واحدة — التحقّق من أحدث
منشور رسمي للهيئة العامة للطيران المدني، والمنتج يساعدك على إيجاد التنظيمات ودراستها، ولا يحلّ محلّها
أبدًا. عامِل هذا القيد على أنه أساسي عند المساس بالنصوص الموجَّهة للمستخدم أو بسلوك
المساعد: فالمساعد يستشهد بالجزء/القسم على وجه الدقة ويمتنع عن الإجابة بدلًا من التخمين.

الواجهة الأمامية هي **تطبيق ويب تقدّمي (PWA) ثابت بلا إطار عمل** — جافاسكربت خام (ES2022)، وHTML5، وCSS3.
ولا يوجد **مُجمِّع (bundler) ولا خطوة بناء للموقع نفسه**؛ فالصفحات ملفات `.html` عادية
تُقدَّم مباشرةً. و"البناء" الوحيد هو أداة ختم تنشر الترويسة/التذييل المشترك
(انظر أدناه).

## الأوامر

```bash
# End-to-end tests (Playwright; auto-starts a python static server on :4178)
npm test
npx playwright test tests/smoke.spec.js          # one file
npx playwright test -g "bilingual"               # one test by title
npm run test:headed                              # watch it run
npm run test:report                              # open the last HTML report

# Fast unit tests (node --test, zero deps) — Cloud Functions entitlement/webhook
# invariants (entitlements-core / revenuecat-core / stripe-core) + quota date math
npm run test:unit

# Firestore security-rules tests (spins up the emulator; needs Java 21+)
npm run test:rules

# Integrity / guard checks (all run in CI; no browser, no deps)
npm run check:data          # library index counts, quiz/ground-school structure, README figures
npm run check:i18n          # bilingual coverage — every data-en has a data-ar (and vice versa)
npm run check:links         # internal hrefs/srcs resolve, firebase.json routes + sw.js precache + sitemap
npm run check:content       # triage aid: flags OCR/extraction artifacts in the regulation corpus
npm run check:sources       # is the local GACA corpus in sync with sources.json manifest?
npm run update:sources      # fetch + apply official-source updates (see RUNBOOK-source-updates.md)

# Generated data — definitions/abbreviations glossary index
npm run build:defs
# Fast unit tests (node --test, zero deps): Cloud Functions entitlement/webhook
# core, KSA daily-quota date math, and gateway↔captadel guard/limiter parity
npm run test:unit

# Firestore security-rules tests (firebase-tools emulators:exec; needs Java 21+)
npm run test:rules

# Repo guards — each exits non-zero on a violation (these are the CI checks)
npm run check:data          # library index counts, quiz/ground-school structure, README figures
npm run check:i18n          # every data-en has a matching data-ar (and vice versa)
npm run check:links         # internal links, firebase routes, sw precache, sitemap all resolve
npm run check:content       # OCR/extraction-defect triage over the GACAR corpus (reports, exit 0)
npm run check:sources       # drift-check the GACA source manifest (exit 1 if a source changed)
npm run update:sources      # download new/changed official docs into library/ staging + refresh indexes

# Generated artifacts (run after editing their inputs)
npm run build:chrome        # stamp nav/footer across all pages from partials/ — see "Shared chrome"
npm run check:chrome        # CI guard: exit 1 if any page is out of sync
npm run build:defs          # rebuild assets/data/definitions-index.json from GACAR Part 1

# iOS / Capacitor wrapper (an Android wrapper also exists under android/)
# iOS / Capacitor wrapper (ios/ is primary; android/ scaffold exists)
npm run build:ios           # assemble the web payload into www/
npm run cap:sync            # build:ios + npx cap sync ios
npm run cap:open

# Serve locally (pages fetch JSON, so file:// will NOT work)
python3 -m http.server 8000        # then open http://localhost:8000/flygaca.html
firebase serve                     # also applies the firebase.json rewrites
firebase emulators:start           # needed to exercise Captain Adel locally

# Deploy (default project flygaca-app; prod is flygaca.com)
firebase deploy                                   # hosting + functions + rules
firebase deploy --only hosting,firestore:rules
```

أصبحت خدمة Captain Adel المستقلّة الآن في **مستودعها الخاص**،
[`FlyGACA/Captain-Adel`](https://github.com/FlyGACA/Captain-Adel) (captadel.com).
استنسخها على حدة؛ وتُشغَّل أوامرها من جذر ذلك المستودع:

```bash
git clone https://github.com/FlyGACA/Captain-Adel.git
cd Captain-Adel
npm start                          # Express server on :8787
npm run eval:dry                   # eval structure check, no API key needed
GEMINI_API_KEY=… npm run eval      # full live eval (English/Gemini path)
npm run eval:allam                 # eval the Arabic/ALLaM path (also :jais, :fanar, :qwen, :commandr)
npm run eval:parity                # EN/AR answer-parity check across providers
npm run test:unit                  # Captain Adel unit tests (node --test)
```

## البنية المعمارية

يضمّ المستودع **وحدتَين قابلتَين للنشر إضافةً إلى الموقع الثابت**:

1. **تطبيق الويب التقدّمي الثابت (the static PWA)** (جذر المستودع) — استضافة الإنتاج هي **عامل Cloudflare**
   (`wrangler.jsonc` + `worker/index.js`): فهو يقدّم صفحات `*.html` على المستوى الأعلى إضافةً إلى
   الصفحات الفرعية `tools/` و`guides/` و`study/` و`packs/` من `dist/` مُجمَّعة
   (`scripts/build-cloudflare.js`)، ويطبّق إعادة كتابة عناوين URL النظيفة (`/library` →
   `/library.html`)، وعمليات إعادة التوجيه، ورؤوس الأمن/سياسة أمن المحتوى (CSP)، و**يُوكِّل** `/api/chat`
   ← وظيفة Cloud Function المسمّاة `chat`، و`/api/content` ← `protectedContent` (وتبقى الوظائف على
   Firebase me-central2). ويعكس `firebase.json` مجموعة التوجيه/التجاهل نفسها ويُحتفَظ به
   من أجل `firebase serve` (التطوير المحلّي) وبصفته مضيف الرجوع (rollback)؛ ويجب الإبقاء على العامل و`firebase.json`
   متزامنَين. وكل ما هو خارج الصفحات المُقدَّمة تقريبًا (`functions/`،
   و`library/`، و`office/`، و`assistant/`، و`docs/`، و`partials/`، و`scripts/`،
   و`tests/`، وجميع ملفات `*.md`) مُستبعَد من `dist/` (ومن قائمة `ignore` في الاستضافة) ولا يُنشَر
   أبدًا. انظر `office/RUNBOOK-cloudflare.md`.

2. **`functions/` — بوّابة Fly GACA** (Firebase Cloud Functions، Node 20). يُصدِّر `index.js`
   الوظيفة `chat` إضافةً إلى وظائف الفوترة/الحساب/الإشعارات: `createCheckoutSession` +
   `stripeWebhook` (فوترة الويب)، و`revenuecatWebhook` + `linkRevenueCatIdentity` (مشتريات تطبيق iOS ←
   الاستحقاق)، و`expiryReminders` (إشعارات الفحص الطبي/مراجعة الطيران)، و`grantSchoolLicence` +
   `revokeSchoolLicence` (B2B)، و`protectedContent` (الأصول المُقيَّدة). والوظيفة `chat` بوّابة
   رفيعة: فهي تتولّى المصادقة (تتحقّق من رمز هوية Firebase)، وفحوص الاستحقاق، والحصة اليومية
   للفئة المجانية (`rag/dailyquota.js`)، ومحدِّد معدّل إساءة الاستخدام (`rag/ratelimit.js`)
   وحواجز المُدخلات (`rag/guards.js`)، ثم **توكِّل الجولة من خادم إلى خادم** إلى
   خدمة Captain Adel المستقلّة (سرّ `ADEL_API_URL` + `ADEL_API_KEY`). وهي **لا**
   تُشغّل دماغ RAG نفسه. وتعيش الأنوية الصافية الخالية من التبعيات لمنطق الفوترة/الاستحقاق
   في `*-core.js` (`entitlements-core.js`، و`revenuecat-core.js`، و`stripe-core.js`) حتى تتمكّن
   مجموعة `npm run test:unit` من اختبار الثوابت دون Admin SDK. **والمنطقة مصدر
   موثوق وحيد في `functions/region.js`**: وهي حاليًا `me-central1` (الدوحة) كحلٍّ
   مؤقّت، مع `me-central2` (الدمّام، داخل المملكة) باعتبارها هدف نظام حماية البيانات الشخصية (PDPL) — ويعني الترحيل
   قلب تلك القيمة الحرفية إضافةً إلى إعادة كتابة firebase.json و`billing.js` (انظر
   `office/RUNBOOK-pdpl-me-central2.md`).
   يُصدِّر `chat` وعدّة وظائف للفوترة/الحساب. والوظيفة `chat` بوّابة رفيعة:
   فهي تتولّى المصادقة (تتحقّق من رمز هوية Firebase)، وفحوص الاستحقاق، والحصة اليومية
   للفئة المجانية (`rag/dailyquota.js`)، ومحدِّد معدّل إساءة الاستخدام (`rag/ratelimit.js`) وحواجز
   المُدخلات (`rag/guards.js`)، ثم **توكِّل الجولة من خادم إلى خادم** إلى خدمة Captain Adel
   المستقلّة (سرّ `ADEL_API_URL` + `ADEL_API_KEY`). وهي **لا** تُشغّل
   دماغ RAG نفسه. أما الصادرات الأخرى: `content.js` (`protectedContent` — تسليم ملفات PDF/المكتبة
   المُقيَّدة)، و`stripe.js` (فوترة الويب)، و`revenuecatWebhook.js` (مشتريات تطبيق iOS ← الاستحقاق +
   `linkRevenueCatIdentity`)، و`reminders.js` (إشعارات الفحص الطبي/مراجعة الطيران)، و`school.js` (تراخيص
   B2B)، و`staff.js` (قائمة سماح صغيرة من جهة الخادم للمالك/الموظفين تؤول إلى وصول كامل
   دون منحة فوترة — انظر الملاحظة الأمنية أدناه). أما أشقّاء `*-core.js`
   (`entitlements-core.js`، و`stripe-core.js`، و`revenuecat-core.js`) فيحملون المنطق الصافي الذي
   يختبره `tests/unit/` دون بيئة تشغيل Firebase. والمنطقة القابلة للنشر هي المصدر
   الموثوق الوحيد في `functions/region.js`:
   الهدف هو **me-central2** (الدمّام، داخل المملكة)، مع رجوع مؤقّت إلى **me-central1**
   حتى تمنح Google صلاحية الوصول إلى me-central2 — ويجب أن تطابقه إعادة كتابة الوظائف في `firebase.json`.

3. **Captain Adel، "الدماغ"** (خدمة RAG مستقلّة مبنية على Node/Express،
   `captadel.com`). وهذا هو المصدر الموثوق الوحيد للمساعد. وأصبح الآن يعيش في
   **مستودعه الخاص**، [`FlyGACA/Captain-Adel`](https://github.com/FlyGACA/Captain-Adel) — وكان
   في السابق شجرة git فرعية `captadel/` هنا. والتخطيط الرئيسي تحت `src/brain/` الخاص به:
   `answer.js` (المنسّق)، و`retrieve.js` + `bm25.js` + `embeddings.js` (استرجاع BM25
   ثم القراءة)، و`grounding.js` (إنفاذ الاستشهاد/التأصيل)، و`guards.js` +
   `ratelimit.js` (النسختان من جهة الخدمة اللتان تعكسان نظيرتيهما في البوّابة)، و`route.js`
   (توجيه اللغة/المزوِّد)، و`providers/` (`gemini` لاستدعاء الدوال الوكيلي للإنجليزية؛
   ومجموعة من مزوّدي العربية داخل المملكة — `allam`، و`jais`، و`fanar`، و`qwen`، و`commandr`، وكلها على
   قاعدة `openai-compatible` لاسترجاع ثم القراءة)، و`system-prompt.js` + `tenants.js`
   (نواة موجِّهات محايدة للمنتج مع تأطير لكل منتج لـ `captadel` مقابل `flygaca`)،
   و`_chunks.json.gz` (مجموعة نصوص GACAR). أما التوجيه (`route.js`): فإن `provider` الصريح
   يُحترَم؛ بينما يرسل `auto`/غير المُحدَّد الأسئلة ذات الغلبة العربية (≥40% أحرف عربية) إلى أول
   مزوّد عربي داخل المملكة مُهيّأ (`ARABIC_PROVIDERS`، وALLaM أولًا) وكل ما عداه
   إلى Gemini. **وRAG هو المصدر الموثوق للحقائق** — فالنموذج يجيب فقط من المقاطع
   المُسترجَعة. وكل تغيير **محكوم بالتقييم** (`captadel/evals/`).
   `answer.js` (المنسّق)، و`retrieve.js` + `bm25.js` (استرجاع BM25 ثم القراءة)،
   و`route.js` (توجيه اللغة/المزوِّد)، و`grounding.js`/`guards.js`/`ratelimit.js`،
   و`providers/` (الإنجليزية ← `gemini` لاستدعاء الدوال الوكيلي؛ العربية/داخل المملكة ← `allam`
   استرجاع ثم قراءة؛ إضافةً إلى وسائل رجوع `fanar`، و`jais`، و`qwen`، و`commandr`، و`openai-compatible`)،
   و`system-prompt.js` + `tenants.js` (نواة موجِّهات محايدة للمنتج مع
   تأطير لكل منتج لـ `captadel` مقابل `flygaca`)، و`_chunks.json.gz` (مجموعة نصوص GACAR).
   **وRAG هو المصدر الموثوق للحقائق** — فالنموذج يجيب فقط من المقاطع المُسترجَعة.
   وكل تغيير **محكوم بالتقييم** (`captadel/evals/`).

عقد `/v1/chat` هو `{ message, history, product, provider, session }` ←
`{ answer, sources: [{ citation, url }] }`. وتتحدّث البوّابة والمتصفّح (`assets/js/chat.js`)
بهذا الشكل كلاهما.

### تدفّق البيانات والمحتوى

- **`assets/data/`** تحتفظ بالمكتبة على هيئة JSON (فهرس GACAR، والمطارات، والخرائط، والكتب الإلكترونية،
  والمدرسة الأرضية، والتعريفات، وفهرس البحث، إضافةً إلى `parts/` — وثائق GACAR الأربع والسبعون — و
  `library/` المراجع الأجنبية). وتجلب الصفحات هذه أثناء التشغيل — ومن هنا قاعدة وجوب التقديم عبر HTTP.
  ويفرض `scripts/check-data.js` أعداد الفهرس والبنية التي يعلن عنها README؛
  فإن غيّرت محتوى المكتبة، فشغّل `npm run check:data` وحدّث كليهما. والمجموعة
  مُستخرَجة آليًا من ملفات GACA بصيغة PDF، لذا يقوم `check:content` بفرز عيوب التعرّف الضوئي على الحروف (OCR)/الاستخراج، ويقوم
  `update:sources` بإبقاء البيان (`assets/data/sources.json`) متزامنًا مع منشورات GACA؛
  ويشتقّ `build:defs` ملف `definitions-index.json` من `parts/part-1.html`.
- **`assets/js/`** هي وحدة واحدة لكل صفحة/خاصية — وحدات الصفحات (`library.js`، و`chat.js`،
  و`logbook.js`، و`dashboard.js`، و`settings.js`…)، والخدمات المشتركة (`entitlements.js`،
  و`billing.js`، و`firebase-config.js`، و`auth.js`، و`native-bridge.js`)، وعائلة
  `tools-*.js` الكبيرة الداعمة لنحو 36 حاسبة/أداة طيران تحت `tools/`
  (مثل `tools-e6b.js`، و`tools-crosswind.js`، و`currency.js` لسريان GACAR الجزء 61).
  لا بناء — فالملفات تُحمَّل مباشرةً بواسطة الصفحات.
- **`assistant/`** هو المصدر الموثوق المُحرَّر يدويًا لشخصية Captain Adel وموجِّه النظام
  ونطاق قاعدة المعرفة (`captain_adel_system_prompt.md`، و`knowledge_base_scope.md`،
  و`CHARACTER_SHEET.md`). والموجِّه المنشور يعيش في `captadel/src/brain/`؛ أبقِهما متزامنَين.

### نموذج بيانات الواجهة الخلفية والأمن

يستخدم Firestore (منطقة الدمّام) **عزلًا صارمًا لكل مستخدم** — فلا يستطيع الطيّار القراءة/الكتابة إلا
في الشجرة الواقعة تحت `users/{uid}` الخاصة به (الملف الشخصي + مجموعة `logbook/` الفرعية). والثابت
الحاسم في `firestore.rules`: أن **حقل `entitlement` من جهة الخادم فقط** — فلا يجوز للعملاء
أبدًا إضافته أو إزالته أو تغييره، حتى لا يستطيع أحد منح نفسه خطة مدفوعة؛ فالاستحقاقات تُكتَب
فقط بواسطة Cloud Functions عبر Admin SDK. و`waitlist/` للإنشاء فقط ولا يمكن للعميل قراءتها أبدًا.
والمجموعات الخاصة بالخادم فقط (مثل `adelQuota`) ممنوعة على جميع العملاء. ويغطّي `tests/rules.test.js`
هذه الضمانات.

والطريقة الوحيدة المُصرَّح بها لمنح الوصول دون سجلّ فوترة هي قائمة سماح المالك/الموظفين في
`functions/staff.js` — وهي تحافظ على الثابت نفسه: إذ تُقيَّم **فقط مقابل
رمز هوية Firebase مفكوك التشفير و`email_verified`** (وليس مُدخلات العميل أبدًا)، فلا يستطيع العميل إضافة
نفسه. ولها نظير في تجربة المستخدم من جهة العميل في `assets/js/store.js` (`TESTER_EMAILS`)؛ أبقِ
القائمتين متزامنتين.

**نظام حماية البيانات الشخصية (PDPL):** أسئلة المستخدمين الحقيقية بيانات شخصية ويجب معالجتها داخل المملكة — فيُنشَر Captain
Adel في منطقة سعودية. ضع هذا في الحسبان في أي أمر يمسّ بيانات المستخدم أو استدعاءات النموذج.

## الأعراف

- **العناصر المشتركة (chrome) مُولَّدة — لا تُحرّرها يدويًا أبدًا.** كتلتا `<header class="site-nav">` و
  `<footer class="site-footer">` في كل صفحة مختومتان من `partials/header.html`
  و`partials/footer.html` بواسطة `scripts/build-chrome.js`. حرّر العناصر الجزئية (partials)، ثم شغّل
  `npm run build:chrome`. ويُخفِق نظام التكامل المستمر (`check:chrome`) طلب السحب إذا انحرفت الصفحات. وتُصلِح أداة الختم
  عمق المسار النسبي وعلامة التنقّل النشط لكل صفحة، وتتخطّى صفحات الكعب/إعادة التوجيه التي
  لا تحمل أي عناصر مشتركة. وهي تمسّ فقط الصفحات في `.`، و`tools/`، و`guides/`، و`study/`، و`packs/`.
- **ثنائي اللغة + RTL** متطلّب من الدرجة الأولى (الإنجليزية / العربية). ويترجم الموقع
  على الفور من سمتَي `data-en` / `data-ar` (المحرّك في `assets/js/landing.js`)، لذا يحتاج أي نصّ
  جديد موجَّه للمستخدم إلى **كليهما** — ويُخفِق `npm run check:i18n` طلب السحب عند أي نصّ نصف مترجَم.
  وتُوجَّه مسار العربية في المساعد تلقائيًا إلى مزوّد عربي داخل المملكة (ALLaM
  افتراضيًا).
- **عامل الخدمة (service worker)** (`sw.js`) واعٍ بالحداثة ويُقدَّم بـ `no-cache`؛ ارفع رقم إصداره عند
  تغيير الأصول المخزّنة مؤقتًا حتى يُحدَّث تطبيق الويب التقدّمي.
- **رؤوس الأمن / سياسة أمن المحتوى (CSP)** معرّفة في `firebase.json` (سياسة أمن محتوى صارمة، و`frame-ancestors none`،
  وHSTS). ويجب إضافة أي مصادر خارجية جديدة (سكربتات، اتصال، إطارات) هناك صراحةً.

## نظام التكامل المستمر (CI)

يعمل `.github/workflows/ci.yml` عند كل طلب سحب:
- `chrome` — حارس تزامن العناصر المشتركة (`build-chrome.js --check`)
- `data` — سلامة المكتبة (`check-data.js`)
- `links` — فحوص سريعة: `test:unit` + `check-i18n.js` + `check-links.js`
- `e2e` — يحمّل Playwright كل صفحة تحميلًا اختباريًا + التدفّقات الحرجة؛ وينشر الاختبارات المُخفِقة على هيئة تعليق على طلب السحب
- `rules` — قواعد Firestore مقابل المحاكي (Java 21+)؛ وينشر ذيل السجلّ عند الإخفاق

(أما تقييم/دماغ Captain Adel الخاص فيعمل الآن في مستودعه [`FlyGACA/Captain-Adel`](https://github.com/FlyGACA/Captain-Adel)، وليس هنا.)

أما وظيفة `deploy` (الاستضافة + القواعد) فتعمل عند الدفع إلى `main` فقط متى ضُبِط سرّ `FIREBASE_TOKEN`؛
وتُنشَر الوظائف يدويًا من `office/RUNBOOK-*.md` لأنها تحتاج إلى أسرار Gemini/
Adel. ويُبقي سير عمل ثانٍ، `.github/workflows/update-sources.yml`، مجموعة نصوص GACA
متزامنة عبر `update-sources.js`.
يعمل `.github/workflows/ci.yml` عند كل طلب سحب: `chrome` (حارس تزامن العناصر المشتركة)، و`data`
(`check-data.js`)، و`links` (حُزمة الحُرّاس السريعة — اختبارات node عبر `test:unit`، ثم `check:i18n`
و`check:links`)، و`e2e` (يحمّل Playwright كل صفحة تحميلًا اختباريًا + التدفّقات الحرجة؛ وينشر الاختبارات
المُخفِقة على هيئة تعليق على طلب السحب)، و
`rules` (محاكي Firestore؛ وينشر ذيل سجلّ عند الإخفاق). أما وظيفة `deploy` (الاستضافة + القواعد،
المشروع `flygaca-app`) فتعمل عند الدفع إلى `main` فقط متى ضُبِط سرّ `FIREBASE_TOKEN`؛
وتُنشَر الوظائف يدويًا من `office/RUNBOOK-*.md` لأنها تحتاج إلى أسرار Gemini/Adel.
ويقوم سير عمل منفصل، `update-sources.yml`، دوريًا بفحص انحراف بيان مصدر GACA.

## مراجع

- **`ROADMAP.md`** — خطة المنتج/المراحل الكاملة؛ **`PHASE0.md`** — ملاحظات الأصل/المرحلة.
- **`office/`** — أدلّة التشغيل والمواصفات. النشر/العمليات: `RUNBOOK-deploy.md`، و`RUNBOOK-captain-adel.md`،
  و`RUNBOOK-arabic-provider.md`، و`RUNBOOK-ios.md`، و`RUNBOOK-launch.md`، و`RUNBOOK-source-updates.md`،
  و`RUNBOOK-security-rollout.md`، و`RUNBOOK-vps-hardening.md`. نظام حماية البيانات الشخصية/المنطقة: `RUNBOOK-pdpl-me-central2.md`.
  الإعداد: `SETUP-firebase.md`، و`SETUP-vps.md`، و`SETUP-entity.md`. الاستخراج:
  `RUNBOOK-captadel-extraction.md` (كيف فُصِل `captadel/` إلى `FlyGACA/Captain-Adel`). راجِع هذه قبل
  أعمال النشر/الإعداد.
- **`docs/`** — أدلّة نجاح العملاء (الإعداد الأولي، والتجديد، والمعرّضون للخطر، والتوسّع، ومراجعة الأعمال الفصلية (QBR)،
  وتسجيل الصحّة)؛ انظر `CUSTOMER_SUCCESS.md` للفهرس.
- **`functions/README.md`**، و**`tests/README.md`**، و**`assets/README.md`**
  — تفصيل لكل منطقة.
- **`office/`** — أدلّة التشغيل والمواصفات: `RUNBOOK-deploy.md`، و`RUNBOOK-captain-adel.md`،
  و`RUNBOOK-ios.md`، و`RUNBOOK-launch.md`، و`SETUP-firebase.md`، و`RUNBOOK-captadel-extraction.md`
  (كيف فُصِل `captadel/` إلى `FlyGACA/Captain-Adel`). راجِع هذه قبل أعمال النشر/الإعداد.
- **`docs/`** — أدلّة نجاح العملاء (الإعداد الأولي، والتجديد، والتوسّع، والمعرّضون للخطر، ومراجعة الأعمال الفصلية (QBR)،
  وتسجيل الصحّة)؛ انظر أيضًا `CUSTOMER_SUCCESS.md` و`CONTENT-QA.md` في الجذر.
- **`functions/README.md`**، و**`tests/README.md`** — تفصيل لكل منطقة.
