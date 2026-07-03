# دليل تشغيل — إقامة بيانات نظام حماية البيانات الشخصية (PDPL): الانتقال إلى me-central2 (الدمام)

**الحالة:** تطبيق الويب + الخلفية الذكية يعملان مباشرةً على `flygaca-app` — Firestore في الدمام؛
البيانات + Auth + الاستضافة + بوابة `chat` + خدمة الكابتن عادل كلها مُنشورة وتم
التحقق منها. تعمل الحوسبة **مؤقتًا في me-central1 (الدوحة)** (Cloud Run في me-central2 لم
يُمنح بعد). المتبقي: أسرار الفوترة، مزوّدو OAuth، DNS النطاق المخصص، iOS،
وترحيل منطقة me-central2.
**أُنشئ:** 2026-06-01

> **تاريخ المشروع (مهم):** المحاولة الأولى وفّرت `flygaca-ksa`؛
> ثم حُذف لاحقًا وأُعيد العمل على **`flygaca-app`** (المُبقى). كما
> حُذف `flygaca-firebase` الأصلي أيضًا. كان الحذفان مقصودين.
> ولأن `flygaca-firebase` لم يعد موجودًا، تعذّر استرداد `GEMINI_API_KEY` الخاص به
> ويجب إعادة توفيره (انظر الخطوة 3a). البيانات + Auth تبقى فقط في النسخة الاحتياطية
> المحلية `_pdpl_migration_backup/` (مستعادة إلى `flygaca-app`).

## قيد منطقة الحوسبة (me-central2 غير متاح بعد)

`gcloud run deploy ... --region me-central2` على هذا الحساب يفشل بـ
`LOCATION_POLICY_VIOLATED` / "contact sales" — وهذه ليست سياسة مؤسسية
(`gcp.resourceLocations` = ALLOW)، بل قائمة سماح إقليمية على مستوى الحساب لا يستطيع
رفعها إلا Google. تعمل Cloud Functions v2 على Cloud Run، لذا يحجب هذا كل الحوسبة
في الدمام، لا خدمة عادل فقط. **القرار:** تشغيل الحوسبة في me-central1
(الدوحة) على أساس مؤقت وطلب وصول me-central2؛ ترحيل الحوسبة إلى
الدمام بمجرد المنح. Firestore me-central2 غير متأثر (متاح للعموم).

- المنطقة مُدارة بالإعدادات: `functions/region.js` يتخذ me-central2 افتراضيًا لكن
  `functions/.env.flygaca-app` يثبّت `FUNCTIONS_REGION=me-central1` في الوقت الحالي. للترحيل:
  اضبطه إلى me-central2 (أو احذف السطر)، اقلب إعادتي توجيه `firebase.json`
  + `assets/js/billing.js`، وأعد النشر.
- **الإجراء المطلوب منك:** طلب وصول Cloud Run في me-central2 لـ `flygaca-app`
  عبر دعم/مبيعات Google Cloud (لا يستطيع ذلك إلا صاحب الحساب).

## المُنجز على flygaca-app (2026-06-01)

- [x] إنشاء Firestore `(default)` في **me-central2 (الدمام)** — تم التحقق.
- [x] **استُعيدت 8 وثائق** من النسخة الاحتياطية المحلية (3 قائمة انتظار + 5 مستخدمين)؛ نُشرت القواعد.
- [x] **استُورد 5 مستخدمي Auth** مع الحفاظ على UIDs + كلمات المرور (3 Google + 2 بريد/
      كلمة مرور)؛ تهيئة Identity Platform، تفعيل البريد/كلمة المرور، ضبط النطاقات
      المُخوّلة (`flygaca-app.web.app`، `.firebaseapp.com`، `flygaca.com`، `www`).
- [x] **نُشرت الاستضافة** ← `https://flygaca-app.web.app` (HTTP 200).
- [x] سُكّ `ADEL_API_KEY` المشترك في Secret Manager؛ مُنح حساب الخدمة وقت التشغيل secretAccessor.
- [x] **استُرد `GEMINI_API_KEY`** (إلغاء حذف قصير لـ flygaca-firebase ← نُسخ ←
      أُعيد حذفه) وخُزّن في Secret Manager الخاص بـ flygaca-app.
- [x] **نُشرت خدمة الكابتن عادل** إلى Cloud Run me-central1:
      `https://captadel-30479965011.me-central1.run.app` — health 200، `/v1/chat`
      يعيد إجابات مع مصادر RAG.
- [x] **نُشرت بوابة `chat`** إلى me-central1 (`region.js` يرمّز المنطقة المؤقتة
      بشكل ثابت — قراءة process.env تُقيَّم قبل تحميل firebase لـ .env). تم التحقق
      من البداية للنهاية: `https://flygaca-app.web.app/api/chat` ← chat ← Adel ← Gemini+RAG.
- [x] أُنشئت مدخلات **نائبة** في Secret Manager لأسرار الفوترة الخمسة
      (STRIPE_*، REVENUECAT_WEBHOOK_AUTH) كي ينجح تحليل النشر — القيمة هي
      `PLACEHOLDER-…`؛ **استبدلها بقيم حقيقية قبل نشر دوال الفوترة.**

**لا يزال محجوبًا / يحتاج إليك:** (2) مزوّدو OAuth جوجل/آبل/GitHub/Twitter
(البريد/كلمة المرور يعمل فعلًا)؛ (3) قيم أسرار Stripe + RevenueCat الحقيقية، ثم
انشر `--only functions` (الفوترة)؛ (5) عناوين webhook؛ (8) قلب DNS النطاق المخصص
(`flygaca.com` ← flygaca-app)؛ (9) iOS `GoogleService-Info.plist`؛ اطلب
**وصول Cloud Run me-central2** ثم اقلب `region.js` لنقل الحوسبة داخل المملكة.

## سبب وجود هذا

المشروع الأصلي **`flygaca-firebase`** أُنشئت قاعدة بيانات Cloud Firestore `(default)`
الخاصة به في **`nam5` (متعددة المناطق في الولايات المتحدة)** — لا في المملكة. موقع
Firestore **دائم ولا يمكن تغييره**، لذا تعذّر نقل القاعدة في مكانها. وفي الوقت نفسه [privacy.html](../privacy.html) §4 يخبر
الجمهور بأن البيانات الشخصية "تُخزّن داخل المملكة العربية السعودية … في
منطقة me-central2 (الدمام)." لم تكن تلك العبارة **صحيحة** بشأن النظام المباشر،
وهو ما يمثّل مشكلة إقامة بيانات بموجب نظام حماية البيانات الشخصية (PDPL) وإشعار خصوصية غير دقيق.

كما عملت Cloud Functions في **`me-central1` (الدوحة، قطر)** — خارج المملكة،
لذا كانت *معالجة* البيانات الشخصية أيضًا نشاطًا عابرًا للحدود بموجب نظام حماية البيانات الشخصية (PDPL).

**العلاج:** مشروع جديد، **`flygaca-app`**، مع Firestore *و* Cloud
Functions كلاهما في **`me-central2` (الدمام، المملكة العربية السعودية)**. ما قبل الإطلاق و8 سجلات
شخصية فقط، لذا هذا أرخص وقت لإصلاحه بنظافة.

## حقائق المشروع الجديد

| | القيمة |
|---|---|
| Project ID | `flygaca-app` (رقم المشروع `30479965011`) |
| Billing | `010F96-1D57E6-773AF0` (نفس حساب المشروع القديم) |
| Firestore `(default)` | **me-central2 (الدمام)**، وضع Native — مؤكَّد |
| منطقة Cloud Functions | الهدف **me-central2**؛ **مؤقتًا me-central1 (الدوحة)** حتى مُنح وصول Cloud Run (مُدار بالإعدادات عبر `functions/region.js` + `.env.flygaca-app`) |
| خدمة عادل (Cloud Run) | **مُنشورة** `https://captadel-30479965011.me-central1.run.app` (me-central1، مؤقتة) |
| بوابة `chat` | **مُنشورة** me-central1 ← `https://flygaca-app.web.app/api/chat` (مؤكَّدة) |
| Web app ID | `1:30479965011:web:7764f29e44c7e365b91fa6` |
| نطاقات الاستضافة | `flygaca-app.web.app`، `flygaca-app.firebaseapp.com` |

## أُنجز بالفعل (بواسطة الترحيل حتى الآن)

- [x] إنشاء `flygaca-app`، ربط الفوترة، تفعيل واجهات API.
- [x] إنشاء Firestore `(default)` في **me-central2**.
- [x] تسجيل تطبيق الويب؛ التقاط الإعدادات إلى [assets/js/firebase-config.js](../assets/js/firebase-config.js).
- [x] إعادة توجيه `.firebaserc` (الافتراضي ← `flygaca-app`؛ القديم مُبقى كاسم مستعار `legacy-us`).
- [x] جعل إعداد `region` في Cloud Functions مُدارًا بالإعدادات عبر [functions/region.js](../functions/region.js)
      (الافتراضي me-central2؛ مؤقتًا me-central1 عبر `.env.flygaca-app`)؛ ضبط
      إعادات توجيه الاستضافة في [firebase.json](../firebase.json) + منطقة العميل في
      [assets/js/billing.js](../assets/js/billing.js) إلى me-central1؛ قوائم سماح CORS
      مُحدّثة في `functions/index.js` + `functions/content.js`.
- [x] نشر قواعد أمان Firestore إلى `flygaca-app`.
- [x] ترحيل وثائق البيانات الشخصية الثماني (3 قائمة انتظار + 5 مستخدمين) إلى قاعدة بيانات
      الدمام. الأدوات: **[scripts/migrate-firestore.js](../scripts/migrate-firestore.js)**
      (مصدر مباشر←وجهة) و**[scripts/restore-firestore-from-backup.js](../scripts/restore-firestore-from-backup.js)**
      (من النسخة الاحتياطية المحلية، استُخدمت هنا لأن المصدر المباشر حُذف).
- [x] أخذ نسخة احتياطية من بيانات المصدر المباشر إلى `_pdpl_migration_backup/` **خارج
      مستودع git** (لم تُودَع قط — فهي بيانات شخصية محدِّدة للهوية).

## خطوات التحويل المتبقية

معظم هذه يحتاج أسرارًا/بيانات اعتماد أو وحدات تحكم Firebase/الطرف الثالث، لذا
ليست مؤتمتة. شغّلها تقريبًا بالترتيب. **نفّذ استيراد Auth قبل
إعادة تشغيل نسخ البيانات عند التحويل**، كي تتطابق وثائق `users/{uid}` مع UIDs
حقيقية في Auth.

### 1. ترحيل مستخدمي المصادقة (الحفاظ على UIDs)
يستخدم التطبيق **البريد/كلمة المرور + جوجل + آبل + GitHub + Twitter**.

```bash
firebase auth:export users-legacy.json --format=json --project flygaca-firebase
# Federated users (Google/Apple/etc.) import with no password.
# Email/password users need the SOURCE project's password-hash params:
#   Firebase console (flygaca-firebase) → Authentication → Users → ⋮
#   → "Password hash parameters" (algo=SCRYPT, signer key, salt separator, rounds, mem cost)
firebase auth:import users-legacy.json --project flygaca-app \
  --hash-algo=SCRYPT --hash-key=<KEY> --salt-separator=<SEP> --rounds=8 --mem-cost=14
rm users-legacy.json   # contains password hashes — do not keep / commit
```

### 2. إعادة تفعيل مزوّدي تسجيل الدخول لـ Auth في `flygaca-app`
Console → Authentication → Sign-in method. فعّل Email/Password، Google، Apple،
GitHub، Twitter. يحتاج كل مزوّد فيدرالي إعادة إدخال **OAuth client ID/secret**
الخاص به (لا تُعاد قيم المشروع القديم). أضف **Authorized domains**:
`flygaca-app.web.app`، `flygaca-app.firebaseapp.com`، و`flygaca.com` /
`www.flygaca.com` بمجرد إلحاق النطاق المخصص.

### 3. ضبط أسرار Cloud Functions
`ADEL_API_KEY` مسكوك فعلًا في Secret Manager. لا يزال يُحتاج:
```bash
# Billing functions (values from the Stripe + RevenueCat dashboards — not yet supplied):
for S in STRIPE_SECRET_KEY STRIPE_WEBHOOK_SECRET STRIPE_PRICE_MONTHLY \
         STRIPE_PRICE_ANNUAL REVENUECAT_WEBHOOK_AUTH; do
  firebase functions:secrets:set "$S" --project flygaca-app
done
```
`ADEL_API_URL` (عنوان URL الأساسي لخدمة عادل) مُعامل غير سرّي، مضبوط فعلًا في
[functions/.env.flygaca-app](../functions/.env.flygaca-app) بمجرد إنجاز 3a.
مفاتيح بيئة اختيارية (انظر [functions/README.md](../functions/README.md)):
`ADEL_PROTECTED_CONTENT`، `ADEL_RC_REQUIRE_BINDING`، `ADEL_APPCHECK_MODE`.

### 3a. توفير GEMINI_API_KEY + نشر خدمة الكابتن عادل (Cloud Run)
فُقد `GEMINI_API_KEY` مع `flygaca-firebase` المحذوف ويجب إعادة توفيره:
```bash
printf '%s' "<gemini-key>" | gcloud secrets create GEMINI_API_KEY \
  --project flygaca-app --replication-policy=automatic --data-file=-
# Deploy the Adel brain (interim me-central1 until me-central2 access):
gcloud run deploy captadel --source captadel/ --region me-central1 \
  --project flygaca-app --memory 2Gi --cpu 2 --port 8787 --allow-unauthenticated \
  --set-env-vars MODEL_PROVIDER=gemini,CAPTAIN_ADEL_MODEL=gemini-2.5-flash \
  --set-secrets GEMINI_API_KEY=GEMINI_API_KEY:latest,ADEL_API_KEY=ADEL_API_KEY:latest \
  --max-instances 4
# Put the resulting URL into functions/.env.flygaca-app ADEL_API_URL.
```
> **ملاحظة نظام حماية البيانات الشخصية (PDPL):** أسئلة المستخدمين الحقيقية بيانات شخصية. me-central1 (الدوحة)
> خارج المملكة — هذه هي الفجوة المؤقتة الموثّقة الواجب إغلاقها بمجرد منح Cloud Run في me-central2.
> بحسب [phase0.md](../phase0.md) يجب ألا تخزّن الخدمة أي بيانات شخصية محدِّدة للهوية.

### 4. نشر الدوال إلى `flygaca-app` (مؤقتًا me-central1)
```bash
firebase deploy --only functions:chat --project flygaca-app   # AI gateway (needs 3a)
# Billing/other functions once their secrets exist:
# firebase deploy --only functions --project flygaca-app
```
تُنشر الدوال إلى me-central1 (بحسب `.env.flygaca-app`). دوّن عناوين `chat`
و`stripeWebhook` و`revenuecatWebhook` الناتجة للخطوة التالية.

### 5. تحديث webhooks الخاصة بـ Stripe + RevenueCat
- **Stripe** dashboard → Developers → Webhooks: وجّه نقطة النهاية إلى عنوان
  `stripeWebhook` الجديد؛ انسخ سر التوقيع الجديد إلى `STRIPE_WEBHOOK_SECRET`
  (أعد تشغيل الخطوة 3 لذلك السر، ثم أعد النشر).
- **RevenueCat** dashboard → integrations/webhooks: وجّه إلى عنوان
  `revenuecatWebhook` الجديد؛ أعد ضبط `REVENUECAT_WEBHOOK_AUTH` ليتطابق.

### 6. App Check — تم لـ web (وضع المراقبة)
✅ مُوصّل: مفتاح reCAPTCHA Enterprise `6Lelugct…015P` مُسجّل لتطبيق الويب عبر
App Check Admin API؛ تهيئة العميل في [assets/js/firebase-init.js](../assets/js/firebase-init.js)
(يستخدمها auth/waitlist/schools + chat)؛ وُسّعت CSP لـ `www.google.com`؛ دالة
الدردشة تشغّل `ADEL_APPCHECK_MODE=monitor` (تسجّل صلاحية الرمز، لا تحجب أبدًا —
تم التحقق من أن `/api/chat` بلا رمز لا يزال يُجيب).
**للإنهاء:** (a) تأكد من أن النطاقات المسموحة لمفتاح reCAPTCHA تتضمن
`flygaca-app.web.app` / `flygaca.com` / `localhost`؛ (b) راقب سجلات دالة الدردشة
بحثًا عن رموز صالحة من متصفحات حقيقية؛ (c) بمجرد النظافة، اضبط
`ADEL_APPCHECK_MODE=enforce` و(اختياريًا) فعّل فرض App Check لـ
Firestore/Functions في الـ console. لا يزال iOS يحتاج DeviceCheck/App Attest.

### 7. نشر الاستضافة + التحقق على النطاق المؤقت
```bash
firebase deploy --only hosting --project flygaca-app
```
اختبار دخان على `https://flygaca-app.web.app`: تسجيل الدخول، تقديم قائمة الانتظار، كتابة
سجل الطيران، `/api/chat`، الدفع. تأكد من أن عمليات القراءة/الكتابة تصل إلى قاعدة بيانات الدمام.

### 8. نقل النطاق المخصص
Firebase console (`flygaca-app`) → Hosting → Add custom domain → `flygaca.com`
(+`www`). حدّث DNS لدى المُسجّل إلى السجلات التي يعرضها Firebase. هذا هو
التحويل الحقيقي: يُخدَم الآن الترافيك من المشروع داخل المملكة.

### 9. iOS / Capacitor
نزّل **GoogleService-Info.plist** جديدًا لـ `flygaca-app`، استبدله في
مشروع `ios/`، حدّث مخطط URL لـ reversed-client-ID، وأعد البناء
(انظر [office/runbook-ios.md](runbook-ios.md)). يستخدم تسجيل الدخول الأصلي عبر جوجل/آبل
إعداد OAuth الخاص بالمشروع الجديد.

### 10. مزامنة البيانات النهائية عند التحويل
قبيل قلب DNS مباشرةً (وبعد استيراد Auth)، أعد تشغيل النسخ لالتقاط
أي اشتراكات وصلت في الأثناء:
```bash
node scripts/migrate-firestore.js --dry-run   # review
node scripts/migrate-firestore.js             # apply
```

### 11. إخراج مشروع الولايات المتحدة القديم من الخدمة
بمجرد أن يخدم `flygaca.com` من `flygaca-app` ويُتحقق منه لمدة آمنة:
- عطّل مسارات قائمة الانتظار/الكتابة القديمة (أو اكتفِ بأن DNS قد نُقل فعلًا).
- احذف البيانات الشخصية في المشروع القديم، ثم المشروع نفسه:
  ```bash
  # confirm nothing still points at it, then:
  gcloud projects delete flygaca-firebase
  ```
  (حذف المشروع هو أنظف طريقة لمحو بيانات nam5 الشخصية.
  أبقِ النسخة الاحتياطية المحلية حتى تتيقن من سلامة المشروع الجديد.)
- احذف أيضًا المشروع الفارغ الشارد `fly-gaca-495116` (مُلاحَظ في PHASE0 P0-5).

### 12. سياسة الخصوصية + الوثائق
- ادعاء [privacy.html](../privacy.html) §4 (البيانات في me-central2/الدمام)
  يصبح **صحيحًا فقط بعد الخطوة 8 (تحويل DNS)** — وحتى ذلك الحين يُخدَم الموقع المباشر
  ما زال من مشروع nam5. لا تعتبر الادعاء محقّقًا قبل أوانه.
- صُحّح PHASE0 P0-5 ليسجّل تاريخ المنطقة الحقيقي.

## التراجع

حتى الخطوة 8 (DNS)، يبقى الموقع المباشر دون مساس على `flygaca-firebase`؛ والتخلّي عن
الترحيل لا يكلّف شيئًا سوى المشروع الجديد (الرخيص، الخامل). بعد تحويل DNS،
التراجع = إعادة توجيه DNS إلى المشروع القديم (بياناته سليمة حتى الخطوة 11).
**لا** تشغّل الخطوة 11 حتى تكون واثقًا.
