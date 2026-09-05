---
title: حقائق الاستضافة (حدود PDPL، الأقاليم، النطاقات)
section: 06-operations-it
doc_type: document
status: active
owner: Founder
last_updated: 2026-08-19
lang: ar
---

# حقائق الاستضافة (حدود PDPL، الأقاليم، النطاقات)

مرجع من صفحة واحدة لموضع التشغيل الفعلي لـ Fly GACA. كل ما عداه في `06-operations-it/`
يستند إلى هذه الصفحة — راجعها قبل اللجوء إلى وثائق التخطيط الأطول، وقبل إعادة ذكر إقليم
أو مخزن بيانات أو مسار مستودع في أي موضع آخر من الشجرة.

## المنظومة في جدول واحد

| الجانب | ما يشغّله |
|---|---|
| تطبيق الصفحة الواحدة (`dist/`) | **حاوية Cloud Storage** خلف **موازن أحمال HTTPS** |
| واجهة البرمجة (`server/`) | خدمة **Cloud Run** — تطبيق Express 5 واحد، الإقليم **`me-central2`** |
| مخزن البيانات | **Cloud SQL for PostgreSQL**، في الإقليم ذاته |
| الجلسات | رمز JWT بخوارزمية HS256 داخل ملف تعريف ارتباط HttpOnly، موقَّع من واجهة البرمجة (`SESSION_SECRET`) |
| تسجيل الدخول | البريد الإلكتروني وكلمة المرور (scrypt) وGoogle، عبر **OAuth من جهة الخادم** |
| المدفوعات | **Moyasar** — مدى، Apple Pay، البطاقات (أداة مستضافة + تأكيد خادم إلى خادم) |
| التجديدات | **Cloud Scheduler** ← `POST /api/billing/renew`، حاملًا `CRON_SECRET` |
| الذكاء الاصطناعي (الكابتن عادل) | **Gemini عبر Genkit**، توليد معزّز بالاسترجاع (RAG) فوق متن GACAR |
| البريد المعاملاتي | أي نقطة نهاية متوافقة مع Resend (`MAIL_ENDPOINT` / `MAIL_API_KEY`) |
| الأسرار | **Google Secret Manager**، مُحمَّلة داخل مراجعة Cloud Run |

> [!IMPORTANT]
> **لا وجود لـ Firebase في هذا المنتج إطلاقًا** — لا Hosting، ولا Auth، ولا Functions، ولا
> Firestore، ولا App Check، ولا خطة Blaze/Spark. فالمصادقة ومخزن البيانات وواجهة البرمجة
> والاستضافة كلها إما من صنعنا أو GCP الاعتيادي. وأي وثيقة ما تزال تقول غير ذلك فهي قديمة؛
> تُصحَّح وفق هذه الصفحة. والمدفوعات عبر **Moyasar**، وليست Stripe أبدًا.

## النطاقات

| النطاق | الحالة | ملاحظات |
|---|---|---|
| `flygaca.com` | مملوك، معتمد | المنتج الرئيسي. وإليه تتجمّع نطاقات التسويق. |
| `api.flygaca.com` | مصدر واجهة البرمجة | خدمة Cloud Run. وتوجّه إليه المرايا مسار `/api/*`. |
| `captadel.com` | مملوك (تأمَّن في 2026-05-23) | واجهة التسويق / الباب الأمامي المستقل للكابتن عادل؛ يحوّل إلى `flygaca.com` للزيارات التي ما تزال تصل إلى مرآة Vercel. **لم يُسجَّل أمين السجل بعد** — دوِّنه هنا متى عُرف. |
| `flygaca.sa` | **غير معطّل** (الكيان موجود) — انظر `flygaca-sa-registration-readiness.md` | سجّله **بعد** رأي الاسم P0-2؛ وقد يثير مقطع "gaca" مراجعة اسم لدى SaudiNIC. تحويل فقط ← `flygaca.com`. |

## حدود بيانات PDPL — القاعدة الحاملة للعبء

> تبقى كل البيانات الشخصية — الحسابات، الملفات الشخصية، سجل الطيران، **استعلامات المستخدمين الحقيقية** —
> داخل المملكة (Cloud SQL + Cloud Run، `me-central2`). أما العمل على المتن العام
> فيمكن أن يجري على VPS الأوروبي.  — `phase0.md`، P0-6، معادًا صياغته وفق المنظومة الحالية

وهذا يجعل الخيار قاطعًا:

| ماذا | أين | لماذا |
|---|---|---|
| Cloud SQL (Postgres) | **`me-central2` (الدمام)** | يحتوي كل سجلات الحسابات والملفات الشخصية وسجل الطيران والاستحقاقات. |
| Cloud Run (واجهة برمجة Fly GACA وبوابة الكابتن عادل) | **`me-central2` (الدمام)** | تستقبل بيانات شخصية (استعلامات المستخدمين). |
| Cloud Storage (حاوية تطبيق الصفحة الواحدة وحاوية المتن) | **`me-central2` (الدمام)** | مخرجات عامة، لكنها تبقى في الإقليم ذاته لخفض زمن الاستجابة وللتبسيط. |
| خط أنابيب المتن العام / بناء مقاطع RAG / التقييمات / البيئة التجريبية | VPS الأوروبي (باريس) — Hostinger | **بيانات عامة فقط**؛ ولا بيانات شخصية صراحةً أبدًا. |
| نقطة نهاية ALLaM على وحدات المعالجة الرسومية (مخطَّطة) | مضيف GPU في المملكة / داخل المملكة | السبب ذاته كالبوابة — راجع `iflygaca/Captain-Adel` ‏`deploy/allam-vllm.md`. |

> [!WARNING]
> **`me-central1` هي الدوحة، قطر — وهي ليست داخل المملكة.** لا تصفها أبدًا بالرياض أو
> بالسعودية أو بـ"الصندوق داخل المملكة". وأي صياغة في وثيقة سابقة تقرن `me-central1` بادعاء
> يخص PDPL فهي خاطئة من وجهها. و`me-central2` (الدمام) هي الإجابة المعتمدة.

يجب أن تبقى Cloud Run وCloud SQL في **الإقليم ذاته**: فالخدمة تصل إلى قاعدة البيانات عبر
مقبس unix خاص بـ Cloud SQL (`/cloudsql/PROJECT:REGION:INSTANCE`)، فلا قائمة عناوين مسموح بها
ولا وكيل جانبي. ولا يوجد ثابت إقليم في الشيفرة يلزم إبقاؤه متوائمًا — فكلاهما موردان إقليميان
يُحدَّدان عند النشر.

## Google Cloud

| البند | القيمة |
|---|---|
| المشروع | يُحدَّد عند النشر؛ ويهيّئ دليل التشغيل مشروع `flygaca` (أما مشاريع `flygaca-firebase` و`flygaca-com` و`fly-gaca-495116` القديمة فميتة — لا تُذكر) |
| الإقليم | **`me-central2`** (الدمام) لـ Cloud Run وCloud SQL والحاويات |
| خدمة Cloud Run | `flygaca-api` — مبنية من `server/` في جذر المستودع |
| نسخة Cloud SQL | `flygaca-db` (POSTGRES_16)؛ قاعدة البيانات `flygaca`؛ المخطط في `server/migrations/` |
| حاوية تطبيق الصفحة الواحدة | `flygaca-web` خلف موازن أحمال HTTPS (خلفية الحاوية على `/*`، وserverless NEG على `/api/*`) |
| حاوية المتن | يُنقل متن JSON التنظيمي إلى حاوية ويُقدَّم بنهج **الشبكة أولًا** |
| الأسرار | Secret Manager: `session-secret`، `database-url`، `google-oauth-secret`، `genai-api-key`، `moyasar-secret-key`، `moyasar-webhook`، `mail-api-key`، `cron-secret` |
| المجدول | `flygaca-renewals` — طلب `POST /api/billing/renew` يوميًا مع `X-Cron-Secret` |
| سطح الإعدادات | متغيّرات بيئة اعتيادية على مراجعة Cloud Run (`server/src/config.ts` هو الموضع الوحيد الذي يقرأ فيه الخادم `process.env`) |

تسلسل التهيئة الكامل: `docs/RUNBOOK-deploy.md` في مستودع المنتج، ومرآته هنا
[`runbooks/runbook-deploy.md`](runbooks/runbook-deploy.md). أما **أسماء** الأسرار والأسعار
فمخطَّطة في [`secrets-and-keys-placement.md`](secrets-and-keys-placement.md).

## المرايا (وكلها توجّه إلى مصدر Cloud Run ذاته)

يقدّم عامل Cloudflare ومرآتا Netlify / Vercel البناء `dist/` نفسه، وتعيد كتابة `/api/*`
إلى `https://api.flygaca.com` عبر وكيل من المصدر نفسه — فيبقى المحادثة والحساب عاملين، ولا
تتغيّر سياسة CSP المشدَّدة (`connect-src 'self'`). أبقِ أي سطح جديد لواجهة البرمجة تحت
`/api/*` كي يظل ذلك صحيحًا. وتضع المرايا الترويسة `X-Robots-Tag: noindex` على أي مضيف غير
`flygaca.com`.

## VPS الأوروبي (باريس) — صندوق البيانات العامة

| البند | القيمة |
|---|---|
| المزوِّد | Hostinger KVM 2 (2 vCPU / 8 GB / 100 GB) |
| IP | 72.62.20.20 |
| اسم المضيف | srv1209075.hstgr.cloud |
| الإقليم | باريس، إيل-دو-فرانس (Hostinger، AS47583) |
| نظام التشغيل | Ubuntu 24.04 LTS، مُصلَّب (SSH بالمفتاح فقط، ufw، fail2ban) |
| الدور | استيعاب المتن / بناء مقاطع RAG / منظومة التقييم / البيئة التجريبية — **بيانات عامة فقط** |

## GitHub

جميع شيفرات المنتج تحت حساب **`ay2m`**. ولا وجود لمؤسسة `FlyGACA` — فتلك المسارات تحويلات قديمة.

| المستودع | | ما هو |
|---|---|---|
| [`iflygaca/FlyGACA`](https://github.com/iflygaca/FlyGACA) | خاص | **المنتج.** تطبيق الويب ثنائي اللغة (React 19 + Vite) *و* خلفيته على Express فوق Cloud Run. والمتن التنظيمي وخطوط أنابيب المحتوى هنا أيضًا. |
| [`iflygaca/Captain-Adel`](https://github.com/iflygaca/Captain-Adel) | خاص | خدمة مدرّب الطيران بالذكاء الاصطناعي خلف captadel.com |
| [`iflygaca/FlyGACA-ios`](https://github.com/iflygaca/FlyGACA-ios) | عام | عائلة SwiftUI الأصلية — حزمة مشتركة واحدة، وتطبيق واحد على App Store لكل وحدة اختبار |
| [`iflygaca/Office`](https://github.com/iflygaca/Office) | خاص | هذا المستودع — شجرة وثائق الشركة |
| [`iflygaca/FlyGACA-app`](https://github.com/iflygaca/FlyGACA-app) | عام، **مؤرشف** | السلف المتقاعد لـ `iflygaca/FlyGACA`. للقراءة فقط. لا تُذكر بوصفها الحالية. |

> [!NOTE]
> مستودعات بيانات App Store الستة لكل وحدة (`PPL`، `CPL`، `IR`، `ATPL`، `ELPT`، `AIP`) التي
> تشير إليها وثائق أقدم **غير موجودة**. فبيانات كل تطبيق تعيش داخل `iflygaca/FlyGACA-ios`.

## المصادر
- `FlyGACA/docs/RUNBOOK-deploy.md` — تسلسل التهيئة والنشر المعتمد
- `FlyGACA/docs/DATA-HOSTING.md` — كيفية تقديم حاوية المتن
- `FlyGACA/server/migrations/0001_init.sql` — المخطط، مع ذكر سلف كل جدول في حقبة Firestore
- `00-strategy/phase0.md` — P0-2 (قرارات النطاق)، P0-6 (VPS + حدود PDPL)
- `flygaca-resume-briefing-2026-05-23.md` — ملخّص الاستضافة وPDPL (يسبق النقل إلى Cloud Run؛ الأقاليم ما تزال صحيحة، أما إشارات Firebase فلا)
