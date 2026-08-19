---
title: "الأسرار والمفاتيح — أين يذهب كل واحد (المنتجان)"
section: 06-operations-it
doc_type: document
status: active
owner: Founder
last_updated: 2026-08-19
lang: ar
---

# الأسرار والمفاتيح — أين يذهب كل واحد (المنتجان)

فهرس واحد لـ**مكان** ضبط كل سر ومفتاح وسعر عبر الخادمين. **لا توجد أي قيمة سر هنا**
— أسماء ومواقع فقط. الخطوات التفصيلية في الـrunbooks الموثوقة (روابط في الأسفل)؛
هذه الصفحة خريطة فوقها.

## قواعد ذهبية

- **لا** تضع قيمة سر في git أو المحادثة أو الشيفرة. فالأسرار تعيش فقط في
  **Google Secret Manager**؛ وتقرأها الخدمة وقت التشغيل كمتغيّرات بيئة محمَّلة.
- متغيرات `VITE_*` قيم **عامة وقت البناء** تُرسل للمتصفح — **ليست أسرارًا** (المفاتيح
  المنشورة، عناوين المواقع، معرّفات التحليلات). آمنة للكشف.
- الآيبان لا يغادر هذا المستودع (انظر `01-governance/company-facts.md`).
- لا يستخدم أيٌّ من المنتجين Firebase. فلم تعد هناك خطوة `firebase functions:secrets:set`،
  ولا ملف `functions/.env.*` — فكل شيء إعداد على مراجعة Cloud Run. انظر
  [`hosting-facts.md`](hosting-facts.md).

## أ) flygaca.com — ‏`ay2m/FlyGACA` · خدمة Cloud Run ‏`flygaca-api` · الإقليم `me-central2` (الدمام)

**الأسرار** ← Google Secret Manager، سرٌّ واحد لكل قيمة:

```bash
printf '%s' 'VALUE' | gcloud secrets create NAME --data-file=-
```

ثم تُحمَّل على المراجعة عبر `gcloud run deploy --set-secrets=ENV_VAR=secret-name:latest`.
امنح حساب خدمة Cloud Run الدور `roles/secretmanager.secretAccessor` (والدور
`roles/cloudsql.client` لقاعدة البيانات).

| متغيّر البيئة | الاسم في Secret Manager | ما هو / من أين | مطلوب |
|---|---|---|---|
| `DATABASE_URL` | `database-url` | عنوان مقبس unix الخاص بـ Cloud SQL — `postgresql://…@/flygaca?host=/cloudsql/PROJECT:REGION:INSTANCE` | ✅ الإقلاع |
| `SESSION_SECRET` | `session-secret` | تولّده أنت (`openssl rand -base64 48`) — يوقّع رمز JWT للجلسة؛ **32 محرفًا على الأقل** | ✅ الإقلاع |
| `GOOGLE_OAUTH_CLIENT_SECRET` | `google-oauth-secret` | GCP ← APIs & Services ← Credentials ← عميل تطبيق الويب | ✅ الدخول بـ Google |
| `GOOGLE_GENAI_API_KEY` | `genai-api-key` | مفتاح Gemini — Google AI Studio ‏(aistudio.google.com) | ✅ المحادثة |
| `MOYASAR_SECRET_KEY` | `moyasar-secret-key` | لوحة Moyasar ← Developers ← API keys ‏(`sk_live_…`) | ✅ الفوترة |
| `MOYASAR_WEBHOOK_SECRET` | `moyasar-webhook` | السر المشترك لويبهوك Moyasar (يُتحقَّق من التوقيع على الجسم الخام) | ○ خط دفاع احتياطي |
| `MAIL_API_KEY` | `mail-api-key` | مفتاح البريد المعاملاتي المتوافق مع Resend. وغيابه ⇐ تُسجَّل الرسائل ولا تُرسَل | ○ |
| `CRON_SECRET` | `cron-secret` | تولّده أنت (`openssl rand -hex 32`) — يحرس `POST /api/billing/renew` | ✅ التجديدات |

تعمل `assertRequiredConfig()` قبل ارتباط المستمع، فالمراجعة التي ينقصها `DATABASE_URL` —
أو تحمل `SESSION_SECRET` أقصر من اللازم — تفشل في فحص سلامتها بدل أن ترجع خطأ 500 لاحقًا.

**المُعاملات (ليست أسرارًا)** ← `gcloud run deploy --set-env-vars=…`. و`server/src/config.ts`
هو الموضع الوحيد الذي يقرأ فيه الخادم `process.env`:

- المصادر (مطلوبة): `APP_ORIGIN=https://flygaca.com`، `API_ORIGIN=https://api.flygaca.com`
  — ويجب أن يطابق `API_ORIGIN` عنوان تحويل OAuth مطابقةً تامة وإلا فشل النداء الراجع بخطأ
  `redirect_uri_mismatch`. كما يبني `APP_ORIGIN` رابط رجوع Moyasar.
- ومطلوبة كذلك في حكم العادة: `NODE_ENV=production`، `GOOGLE_OAUTH_CLIENT_ID`، `MAIL_FROM`.
- **الأسعار** (أعداد صحيحة بالريال، **بلا قيم افتراضية — وغياب أحدها يرمي خطأً عند السداد**،
  ولا يفرض مبلغ 0 ريال صامتًا): `PRICE_PRO_MONTHLY`، `PRICE_PRO_ANNUAL`، `PRICE_PASS`،
  `PRICE_CREDITS`، `PRICE_PREP_PACK_ESSENTIAL`، `PRICE_PREP_PACK_STANDARD`،
  `PRICE_PREP_PACK_COMPLETE`، `PRICE_BUNDLE`، `PRICE_COHORT`.
  (ويوجد كذلك `PRICE_PREP_PACK` بوصفه السعر العام للحزمة المفردة.)
- ضبط اختياري: `CHAT_FREE_DAILY_LIMIT`، `ANON_DAILY_LIMIT`، `CHAT_CREDIT_PACK_SIZE`،
  `CHAT_ENABLED`، `RETRIEVE_K`، `REFUSE_SCORE`، `GROUNDED_SCORE`، `CORPUS_URL`،
  `SESSION_TTL_DAYS`، `SESSION_COOKIE_DOMAIN`، `DATABASE_POOL_MAX`، `EXTRA_ALLOWED_ORIGINS`.

**عامة (ليست أسرارًا)** ← ملف `.env.local` الجذري، تُخبز في بناء تطبيق الصفحة الواحدة كـ`VITE_*`:
`VITE_API_BASE_URL` (أو `VITE_API_SAME_ORIGIN=1` حين يقدّم موازن الأحمال الاثنين من مصدر
واحد)، `VITE_MOYASAR_PUBLISHABLE_KEY` ‏(`pk_live_…`)، إضافةً إلى الاختيارية
`VITE_DATA_BASE_URL`، `VITE_SITE_URL`، `VITE_GA_MEASUREMENT_ID`.

> من دون `VITE_API_BASE_URL` يتجاهل التطبيق واجهة البرمجة كليًا ويعمل بنهج المحلي أولًا —
> فالمتن والأدوات والدراسة وسجل الطيران كلها تعمل؛ بينما تبقى الحسابات والمزامنة والفوترة
> معطّلة. وهذا هو الوضع الافتراضي لـ CI ولبناء المعاينة، ولهذا لا تحتاج أي وظيفة CI إلى
> أسرار الإنتاج.

**اعتمادات النشر / CI** (إعدادات المستودع ← Secrets): اعتماد حساب خدمة GCP لأمر
`gcloud run deploy` ومزامنة الحاوية (`GCP_SA_KEY` / Workload Identity)، و
`CLOUDFLARE_API_TOKEN` · `CLOUDFLARE_ACCOUNT_ID` لمرآة العامل. *(ولا وجود لـ
`FIREBASE_SERVICE_ACCOUNT` — فذلك الاعتماد كان يخص المستودع السلف المؤرشف.)*

## ب) captadel.com — ‏`ay2m/Captain-Adel` · Cloud Run · الإقليم `me-central2` (الدمام)

**الأسرار** ← Google Secret Manager، عبر `printf '%s' "VALUE" | gcloud secrets create NAME --data-file=-`،
أو الاختصار الدُفعي `export NAME=… … && ./deploy/deploy.sh secrets`:

| السر | ما هو / من أين | مطلوب |
|---|---|---|
| `GEMINI_API_KEY` | مفتاح Gemini — Google AI Studio (نفس مفتاح flygaca، باسم مختلف) | ✅ |
| `MOYASAR_SECRET_KEY` · `MOYASAR_PUBLISHABLE_KEY` · `MOYASAR_WEBHOOK_SECRET` | لوحة Moyasar | ✅ الفوترة |
| `MOYASAR_PRICE_MONTHLY_SAR` (35) · `MOYASAR_PRICE_ANNUAL_SAR` (299) | تحددها أنت | ✅ |
| `CRON_SECRET` | تولّده (`openssl rand -hex 32`) — يحرس مسار التجديدات | ✅ التجديد |
| `ADEL_API_KEY` | سر مشترك تخترعه (طبقة API الموثوقة) | ○ |
| `ALLAM_*`، `EMBEDDINGS_*`، `RERANK_*` | مزوّد عربي داخل المملكة / استرجاع كثيف | ○ لاحقًا |

**بيئة غير سرّية** ← `--set-env-vars` في `deploy.sh`: `SITE_URL=https://captadel.com`،
`MODEL_PROVIDER`، `ARABIC_PROVIDER`، `ADEL_LAUNCH_MODE`، `ADEL_DAILY_*`.

> ما يزال `deploy.sh` يعرض `REGION=me-central1` بديلًا احتياطيًا إن رفضت الدمام النشر.
> **لا تأخذ به للإنتاج.** فـ`me-central1` هي الدوحة، قطر — خارج المملكة — وcaptadel يعالج
> استعلامات مستخدمين حقيقية، وهي بيانات شخصية بموجب PDPL. وإن لم يكن `me-central2` متاحًا
> فصعّد الأمر بدل النشر غربًا.

**GitHub Actions**: `GCP_SA_KEY`.

## خمس نقاط انتباه

1. **مفتاح Gemini واحد باسمين** — `GOOGLE_GENAI_API_KEY` ‏(flygaca) مقابل `GEMINI_API_KEY`
   ‏(captadel). نفس القيمة من Google AI Studio، تُضبط في مخزن كل منتج على حدة.
2. **الأسعار مسمّاة على نحو مختلف في كل منتج.** يستخدم flygaca متغيّرات `PRICE_*` المجرّدة
   (أعدادًا صحيحة بالريال) على مراجعة Cloud Run؛ بينما ما يزال captadel يستخدم
   `MOYASAR_PRICE_*_SAR`. أما أسماء `MOYASAR_PRICE_*_SAR` القديمة في flygaca — وكل مفتاح سعر
   يحمل `*_STUDENT_*` — فلم تعد موجودة؛ وإن وجدتها في وثيقة أو نص برمجي فهي متقادمة.
3. **حساب Moyasar واحد، مخزنان + ويبهوكان** — اضبط مفاتيح Moyasar في المخزنين، وسجّل
   **ويبهوكين** في لوحة Moyasar:
   `https://api.flygaca.com/api/billing/webhook/moyasar` و
   `https://captadel.com/v1/billing/webhook`. وفي flygaca يكون الويبهوك دفاعًا في العمق —
   إذ يستدعي مسار الرجوع في المتصفح `POST /api/billing/confirm`، الذي يجلب الدفعة من خادم
   إلى خادم؛ ويصبّ الاثنان في الدالة `fulfil()` نفسها المحصّنة ضد التكرار.
4. **المفتاح المنشور** — متغيّر بناء عام في flygaca ‏(`VITE_MOYASAR_PUBLISHABLE_KEY`)، لكنه
   سرّ مخزَّن في captadel ‏(`MOYASAR_PUBLISHABLE_KEY`، يُخدَم عبر `/v1/config`).
5. **لا Stripe، ولا Firebase، ولا App Check.** فأي ذكر لـ"Stripe" أو
   `firebase functions:secrets:set` أو `functions/.env.*` أو `ENFORCE_APP_CHECK` أو
   `ADEL_APPCHECK_MODE` في وثيقة أقدم فهو متقادم — فكلا المنتجين على Moyasar، وأسرار flygaca
   مدخلات اعتيادية في Secret Manager محمَّلة على مراجعة Cloud Run.

## الخطوات التفصيلية الموثوقة

- flygaca.com: ‏`FlyGACA/docs/RUNBOOK-deploy.md` (إعداد المشروع، مدخلات Secret Manager، سطر
  النشر `--set-secrets` / `--set-env-vars`، ووظيفة التجديد في Cloud Scheduler) و
  `FlyGACA/docs/BILLING.md` (السداد ← التأكيد ← الويبهوك ← التجديد).
- captadel.com: `Captain-Adel/docs/RUNBOOK-captadel-saas.md` §3 (مفاتيح Moyasar، الويبهوك،
  Apple Pay، التجديدات)، `docs/RUNBOOK-captadel-deploy.md` ‏(Gemini + المشروع + النشر).
