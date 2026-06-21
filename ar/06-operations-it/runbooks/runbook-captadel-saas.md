# دليل تشغيل — الكابتن عادل SaaS (الحسابات والفوترة والحصص على captadel.com)

> **ملاحظة (2026-06-13):** أصبح الكابتن عادل الآن في مستودعه الخاص،
> **[`FlyGACA/Captain-Adel`](https://github.com/FlyGACA/Captain-Adel)**. الكود المُشار إليه بـ
> `captadel/…` أدناه يقع الآن في جذر ذلك المستودع.

شغّل طبقة اشتراك التجربة على captadel.com: **مشروع Captadel
Firebase منفصل** للحسابات، وStripe للفوترة، وحصة يومية مجانية مع
طبقة Pro غير محدودة. الكود موجود بالفعل في `captadel/` و**يُطلق بوضع معطّل** — مع
عدم تنفيذ أيٍّ من الخطوات أدناه، يكون الموقع تمامًا كما كان (مجاني للجميع،
بلا تسجيل دخول، بلا جدار دفع). كل خطوة تفعّل جزءًا واحدًا.

> **نظام حماية البيانات الشخصية (PDPL) (عنصر حاسم).** أسئلة المستخدمين الحقيقية والحسابات بيانات شخصية ويجب
> معالجتها داخل المملكة. ضع Firestore في **me-central2 (الدمام)** وأبقِ
> خدمة Cloud Run في منطقة سعودية (راجع `runbook-captadel-deploy.md`).

> **البنية المعمارية.** تقع الفوترة **داخل خدمة Express** (`captadel/src/billing/`)،
> لا في Cloud Functions. لا يتحدث المتصفح أبدًا إلا إلى Firebase **Auth**؛ وتأتي الخطة
> والحصة من `GET /v1/me` التابع للخدمة (Admin SDK). يرفض `firestore.rules`
> كل قراءة/كتابة مباشرة من العميل. انشر خدمة Cloud Run داخل
> **مشروع GCP نفسه** الخاص بمشروع Firebase لكي يستخدم `firebase-admin` آلية ADC دون
> أي إعداد.

---

## 0. أين توجد الأشياء

| الجزء | المسار |
|---|---|
| مسارات الفوترة (checkout/webhook/portal/me/config) | `captadel/src/billing/routes.js` |
| كاتب الاستحقاقات + الأنوية النقية | `captadel/src/billing/entitlements*.js`, `stripe-core.js`, `tier-core.js` |
| الحصة (Firestore) + حسابات التقويم | `captadel/src/quota/quota.js`, `quota-core.js` |
| نسخة Admin SDK الوحيدة | `captadel/src/firebase.js` |
| وسيط هوية المُستدعي (ذاكرة مؤقتة 60 ثانية) | `captadel/src/middleware/auth.js` |
| مصادقة العميل / الفوترة / الحساب | `captadel/public/assets/js/{auth,billing,account}.js` |
| إعداد الويب (يُملأ في الخطوة 1) | `captadel/public/assets/js/firebase-config.js` |
| قسم التسعير | `captadel/public/index.html` (`#pricing`)، صفحة الحساب `account.html` |
| ملفات مشروع Firestore | `captadel/firebase.json`, `firestore.rules`, `.firebaserc` |
| النشر | `captadel/deploy/deploy.sh`, `.github/workflows/deploy-captadel.yml` |

---

## 1. إنشاء مشروع Captadel Firebase

هذا **مشروع جديد**، منفصل عن `flygaca-app` التابع لـ فلاي قاكا — تحتفظ captadel.com
بقاعدة مستخدميها وفوترتها الخاصة بها.

1. وحدة تحكم Firebase ← **Add project** (مثلًا `captadel-app`). حدّث المعرّف في
   `captadel/.firebaserc` إذا اخترت معرّفًا مختلفًا.
2. **Firestore Database** ← Create ← **Location `me-central2`** (نظام حماية البيانات الشخصية — لا يمكن
   تغييرها لاحقًا). وضع الإنتاج.
3. **Authentication** ← Sign-in method ← فعّل **Email/Password** و**Google**.
4. **Authentication → Settings → Authorized domains** ← أضف `captadel.com`،
   `www.captadel.com` (ومضيف `*.run.app` الخاص بـ Cloud Run لديك للاختبار).
5. **Project settings → Your apps → Web app** ← سجّل تطبيقًا، وانسخ الإعداد
   إلى `captadel/public/assets/js/firebase-config.js` (استبدِل
   العناصر النائبة `REPLACE_WITH_*`). مفتاح واجهة برمجة تطبيقات الويب عام بحكم التصميم.
6. **Firestore → TTL** ← أنشئ سياسة على المجموعة `adelQuota`، الحقل
   `expireAt`، بحيث تُنظَّف عدّادات الحصة المُستهلكة تلقائيًا.

أودِع `firebase-config.js` المملوء. بمجرد اختفاء العناصر النائبة، تُظهر
صفحة الحساب تسجيل دخول حقيقيًا بدلًا من حالة "ستُفتح الحسابات قريبًا".

### نشر قواعد الرفض الكامل

```bash
cd captadel
firebase deploy --only firestore:rules --project captadel-app
```

---

## 2. توجيه خدمة Cloud Run إلى هذا المشروع

يستخدم `firebase-admin` آلية ADC، لذا يجب أن تعمل الخدمة **في مشروع GCP نفسه** الخاص
بمشروع Firebase أعلاه.

```bash
gcloud config set project captadel-app
cd captadel && ./deploy/deploy.sh secrets     # re-create model secrets here
./deploy/deploy.sh                            # deploy (me-central2; me-central1 fallback)
```

ثم اربط `captadel.com` (راجع `runbook-captadel-deploy.md §5`)، وإذا تغيّر عنوان URL
للخدمة، حدّث `ADEL_API_URL` على بوابة Fly GACA كي تظل دردشة
flygaca.com المُضمّنة تصل إلى الدماغ نفسه.

> تكتشف الخدمة المشروع تلقائيًا من `GOOGLE_CLOUD_PROJECT` على Cloud Run.
> للتطوير المحلي: `export FIREBASE_PROJECT_ID=captadel-app` و
> `gcloud auth application-default login`.

---

## 3. Stripe

1. أنشئ منتجًا باسم **"Captain Adel Pro"** بسعرين متكرّرين:
   - **سنوي** — 299 ريالًا سعوديًا/سنة (السعر التأسيسي). (السعر العادي 349 ريالًا سعوديًا/سنة — ارفعه عند الاستعداد.)
   - **شهري** — 35 ريالًا سعوديًا/شهر.
   يجب أن يطابق نص التسعير الثابت في `index.html` الأرقام الموجودة في لوحة التحكم.
2. انسخ معرّفات الأسعار والمفتاح السرّي إلى Secret Manager:
   ```bash
   printf '%s' "sk_live_…"   | gcloud secrets create STRIPE_SECRET_KEY     --data-file=-
   printf '%s' "price_…ann"  | gcloud secrets create STRIPE_PRICE_ANNUAL   --data-file=-
   printf '%s' "price_…mon"  | gcloud secrets create STRIPE_PRICE_MONTHLY  --data-file=-
   ```
3. **Webhook**: لوحة تحكم Stripe ← Developers ← Webhooks ← أضف نقطة النهاية
   `https://captadel.com/v1/billing/webhook`، الأحداث:
   `checkout.session.completed`, `customer.subscription.created`,
   `customer.subscription.updated`, `customer.subscription.deleted`.
   انسخ سرّ التوقيع:
   ```bash
   printf '%s' "whsec_…" | gcloud secrets create STRIPE_WEBHOOK_SECRET --data-file=-
   ```
4. **بوابة العملاء**: Stripe ← Settings ← Billing ← Customer portal ← فعّلها
   (تتيح للمشاركين في التجربة الإلغاء/الإدارة من `account.html`).
5. أعد تشغيل `./deploy/deploy.sh` لكي تُربط الأسرار الجديدة. يُرجع الـ checkout الرمز 503
   حتى يتوفّر كلٌّ من `STRIPE_SECRET_KEY` والمشروع.

---

## 4. نشر GitHub Actions

سير العمل النشط هو `.github/workflows/deploy-captadel.yml` (دفع إلى main،
المسارات `captadel/**`؛ أو يدويًا عبر `workflow_dispatch`). وهو خامل حتى يُهيَّأ.

1. أنشئ حساب خدمة للناشر في مشروع Captadel بالأدوار
   `roles/run.admin`, `roles/cloudbuild.builds.editor`,
   `roles/iam.serviceAccountUser`, `roles/secretmanager.secretAccessor`. وأصدِر
   مفتاح JSON.
2. المستودع ← Settings ← Secrets and variables ← Actions:
   - **Secret** `GCP_SA_KEY` = مفتاح JSON.
   - **Variables** `CAPTADEL_PROJECT_ID` = `captadel-app`، `CAPTADEL_REGION` =
     `me-central2` (أو `me-central1`).
3. ادفع إلى main (مع لمس `captadel/**`) أو شغّل سير العمل يدويًا. يؤكّد فحص
   السلامة أن `/health` يُرجع `status:ok`.

> **مسار الترقية (بلا مفتاح):** استبدل مفتاح حساب الخدمة بـ Workload Identity Federation —
> أضف `permissions: { id-token: write }` واستخدم `google-github-actions/auth@v2`
> مع `workload_identity_provider` + `service_account`. أزِل `GCP_SA_KEY` بمجرد
> التحقّق من WIF.

---

## 5. تسلسل الإطلاق

تُطلق الطبقة بوضع **معطّل**. فعّلها بتروٍّ:

1. **معطّل (افتراضي):** انشر بـ `ADEL_LAUNCH_MODE=free`. الجميع غير محسوب عليهم؛
   يعمل تسجيل الدخول (بمجرد إتمام الخطوة 1) لكنه اختياري؛ يُرجع الـ checkout الرمز 503 حتى تُربط
   Stripe. مناسب لإطلاق ناعم للحسابات دون جدار دفع.
2. **اختبار الفوترة:** في **وضع الاختبار** بـ Stripe، نفّذ checkout ببطاقة `4242 4242
   4242 4242`؛ وأكّد أن `users/{uid}.entitlement.plan === 'pro'` وأن صفحة
   الحساب تُظهر شارة Pro. ألغِ من لوحة التحكم ← يهبط الاستحقاق إلى free.
3. **الانتقال إلى الإنتاج:** ألغِ ضبط `ADEL_LAUNCH_MODE`، واضبط البدلات، وأعد النشر:
   ```bash
   ADEL_DAILY_FREE=5 ADEL_DAILY_ANON=5 ADEL_FREE_PERIOD=day \
   SITE_URL=https://captadel.com ./deploy/deploy.sh
   ```
   يحصل الآن المشارك المجاني المسجّل دخوله على 5 أسئلة موثّقة/يوم؛ ويُرجع السؤال السادس الرمز 402
   مع رسالة الترقية اللطيفة ثنائية اللغة؛ وPro غير محدود (مُحدِّد إساءة الاستخدام ما زال مفعّلًا).

---

## 6. التراجع

- **"كل شيء مجاني" فورًا:** اضبط `ADEL_LAUNCH_MODE=free` وأعد النشر — تخمد
  الحصة فورًا، دون أي تغيير في الكود.
- **الكود:** تراجع عن مراجعة Cloud Run
  (`gcloud run services update-traffic captadel --to-revisions REV=100 …`).
- **الفوترة فقط:** أزِل أسرار `STRIPE_*` وأعد النشر — يُرجع الـ checkout الرمز 503 ويعود
  الموقع إلى حالته المجانية أثناء الإطلاق؛ وتبقى الاستحقاقات القائمة.

---

## 7. التحقق (محليًا)

```bash
cd captadel
npm run test:unit        # cores + the raw-body webhook signature test
npm run smoke            # loads with zero billing env (proves dark-launch safety)

# Live billing loop (Stripe test mode):
export FIREBASE_PROJECT_ID=captadel-app
gcloud auth application-default login
export STRIPE_SECRET_KEY=sk_test_…  STRIPE_WEBHOOK_SECRET=whsec_…  \
       STRIPE_PRICE_ANNUAL=price_…  SITE_URL=http://localhost:8787
npm start &
stripe listen --forward-to localhost:8787/v1/billing/webhook
# → sign up on /account.html, checkout with 4242, watch the entitlement flip.

# Gateway contract unchanged (flygaca embed):
curl -s -XPOST localhost:8787/v1/chat -H 'X-Adel-Api-Key: …' \
  -H 'Content-Type: application/json' -d '{"message":"hi","product":"flygaca"}'
```
