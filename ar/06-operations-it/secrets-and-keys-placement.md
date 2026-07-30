---
title: "الأسرار والمفاتيح — أين يذهب كل واحد (المنتجان)"
section: 06-operations-it
doc_type: document
status: active
owner: Founder
last_updated: 2026-07-29
lang: ar
---

# الأسرار والمفاتيح — أين يذهب كل واحد (المنتجان)

فهرس واحد لـ**مكان** ضبط كل سر ومفتاح وسعر عبر الخادمين. **لا توجد أي قيمة سر هنا**
— أسماء ومواقع فقط. الخطوات التفصيلية في الـrunbooks الموثوقة (روابط في الأسفل)؛
هذه الصفحة خريطة فوقها.

## قواعد ذهبية

- **لا** تضع قيمة سر في git أو الشات أو الكود. الأسرار تعيش فقط في مخزن الأسرار
  (Google Secret Manager)؛ والكود يقرأها وقت التشغيل.
- متغيرات `VITE_*` قيم **عامة وقت البناء** تُرسل للمتصفح — **ليست أسراراً** (المفتاح
  المنشور، مفتاح موقع reCAPTCHA). آمنة للكشف.
- الآيبان لا يغادر هذا المستودع (انظر `01-governance/company-facts.md`).

## أ) flygaca.com — FlyGACA-app · Firebase Cloud Functions · مشروع `flygaca-app` · منطقة `me-central1`

**أسرار** ← `firebase functions:secrets:set NAME` (يسأل عن القيمة، ويخزّنها في Secret Manager):

| السر | ما هو / من أين | مطلوب |
|---|---|---|
| `GOOGLE_GENAI_API_KEY` | مفتاح Gemini — Google AI Studio (aistudio.google.com) | ✅ الدردشة |
| `MOYASAR_SECRET_KEY` | لوحة ميسر ← Developers ← API keys (`sk_live_…`) | ✅ الفوترة |
| `MOYASAR_WEBHOOK_SECRET` | السر المشترك لويبهوك ميسر | ○ backstop |

**مُعاملات (ليست أسراراً)** ← في `functions/.env.flygaca-app` (أو موجّه النشر):

- `APP_ORIGIN=https://flygaca.com` (مطلوب — يبني رابط رجوع ميسر)
- الأسعار: `MOYASAR_PRICE_PRO_MONTHLY_SAR`، `_PRO_ANNUAL_SAR`، `_STUDENT_MONTHLY_SAR`،
  `_STUDENT_ANNUAL_SAR`، `_PASS_SAR`، `_CREDITS_SAR` (**بلا افتراضي — لازم تحدده**)، `_PREP_PACK_SAR`
- اختيارية: `ENFORCE_APP_CHECK`، `FREE_DAILY_LIMIT`، `RETRIEVE_K`، `REFUSE_SCORE`،
  `GROUNDED_SCORE`، `CORPUS_URL`

**عامة (ليست أسراراً)** ← `.env` الجذري كـ`VITE_*`: `VITE_MOYASAR_PUBLISHABLE_KEY`
(`pk_live_…`)، `VITE_RECAPTCHA_ENTERPRISE_SITE_KEY`.

**أسرار GitHub Actions** (النشر/CI، في إعدادات المستودع ← Secrets): `FIREBASE_SERVICE_ACCOUNT`،
`CLOUDFLARE_API_TOKEN`، `CLOUDFLARE_ACCOUNT_ID`.

## ب) captadel.com — Captain-Adel · Cloud Run · مشروع `captadel-app` · منطقة `me-central2` (بديل `me-central1`)

**أسرار** ← Google Secret Manager، عبر `printf '%s' "VALUE" | gcloud secrets create NAME --data-file=-`،
أو الاختصار الدُفعي `export NAME=… … && ./deploy/deploy.sh secrets`:

| السر | ما هو / من أين | مطلوب |
|---|---|---|
| `GEMINI_API_KEY` | مفتاح Gemini — Google AI Studio (نفس مفتاح flygaca، باسم مختلف) | ✅ |
| `MOYASAR_SECRET_KEY` · `MOYASAR_PUBLISHABLE_KEY` · `MOYASAR_WEBHOOK_SECRET` | لوحة ميسر | ✅ الفوترة |
| `MOYASAR_PRICE_MONTHLY_SAR` (35) · `MOYASAR_PRICE_ANNUAL_SAR` (299) | تحددها | ✅ |
| `CRON_SECRET` | تولّده (`openssl rand -hex 32`) — يحرس مسار التجديدات | ✅ التجديد |
| `ADEL_API_KEY` | سر مشترك تخترعه (طبقة API الموثوقة) | ○ |
| `ALLAM_*`، `EMBEDDINGS_*`، `RERANK_*` | مزوّد عربي داخل المملكة / استرجاع كثيف | ○ لاحقاً |

**بيئة غير سرّية** ← `--set-env-vars` في `deploy.sh`: `SITE_URL=https://captadel.com`،
`MODEL_PROVIDER`، `ARABIC_PROVIDER`، `ADEL_LAUNCH_MODE`، `ADEL_DAILY_*`.

**أسرار GitHub Actions**: `GCP_SA_KEY`.

## أربع نقاط انتباه

1. **مفتاح Gemini واحد باسمين** — `GOOGLE_GENAI_API_KEY` (flygaca) مقابل `GEMINI_API_KEY`
   (captadel). نفس القيمة من Google AI Studio، بمخزن كل منتج.
2. **حساب ميسر واحد، مخزنان + ويبهوكان** — اضبط مفاتيح ميسر في المخزنين، وسجّل **ويبهوكين**
   في لوحة ميسر: `https://flygaca.com/api/moyasar-webhook` و`https://captadel.com/v1/billing/webhook`.
3. **المفتاح المنشور** — متغير عام في flygaca (`VITE_MOYASAR_PUBLISHABLE_KEY`)، لكنه سرّ
   مخزَّن في captadel (`MOYASAR_PUBLISHABLE_KEY`، يُخدَم عبر `/v1/config`).
4. **لا Stripe** — أي ذكر لـStripe في وثائق قديمة متقادم؛ كلا المنتجين على ميسر.

## الخطوات التفصيلية الموثوقة

- flygaca.com: `FlyGACA-app/docs/BILLING.md` (ضبط الأسرار)، `docs/APP-CHECK-BACKEND.md`،
  `docs/RUNBOOK-deploy.md` (أسرار CI).
- captadel.com: `Captain-Adel/docs/RUNBOOK-captadel-saas.md` §3 (مفاتيح ميسر، الويبهوك،
  Apple Pay، التجديدات)، `docs/RUNBOOK-captadel-deploy.md` (Gemini + المشروع + النشر).
