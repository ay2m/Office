# دليل تشغيل — الاستضافة على Cloudflare

استضافة الإنتاج لـ `flygaca.com` هي **Cloudflare Worker** تخدم الموقع
الثابت وتمرّر `/api/*` إلى Firebase Cloud Functions. تبقى الواجهة الخلفية
(بوابة الكابتن عادل، والمحتوى، والفوترة) **على Firebase me-central2** — إذ لا
تعالج الـ Worker أبدًا أسئلة المستخدمين أو بياناتهم، بل تكتفي بإعادة توجيه الطلب،
ومن ثَمّ يبقى وضع بقاء البيانات داخل المملكة بموجب نظام حماية البيانات الشخصية (PDPL) دون تغيير.

## المكوّنات

| الملف | الدور |
| --- | --- |
| `wrangler.jsonc` | إعداد الـ Worker: الاسم `flygaca`، و`main` worker، و`assets` = `./dist`، وخطّاف البناء. |
| `worker/index.js` | التوجيه (روابط نظيفة + عمليات إعادة التوجيه)، ووكيل `/api/*`، وترويسات الأمان/CSP. |
| `scripts/build-cloudflare.js` | يجمّع `dist/` — مجموعة الملفات نفسها التي كانت تخدمها Firebase (تطابق `firebase.json` في `public`/`ignore`). يُشغَّل عبر `npm run build:cloudflare`. |
| `firebase.json` | محتفظ به من أجل `firebase serve` (التطوير المحلي) وبوصفه مضيف التراجع. أبقِ عمليات إعادة الكتابة/التوجيه/الترويسات فيه متوافقة مع `worker/index.js`. |

`dist/` مُولَّد (مستثنى من git) — لا تُدرجه أبدًا في الالتزامات.

## إعدادات مشروع Cloudflare (لمرة واحدة)

تنشر تكامل Git في **Workers Builds** الـ Worker المسمّى `flygaca` عند كل
دفعة (push). في لوحة تحكم Cloudflare الخاصة بالـ Worker:

1. **أمر البناء:** `npm run build:cloudflare` (مربوط أيضًا كخطّاف `build`
   في `wrangler.jsonc`، بحيث يُشغّله الأمر الافتراضي `npx wrangler deploy`).
2. **أمر النشر:** `npx wrangler deploy` (الافتراضي).
3. **المتغيرات** (Settings → Variables) — اضبط نقطتي نهاية الدالتين:
   - `CHAT_FUNCTION_URL` ← عنوان URL لدالة `chat` المنشورة
   - `CONTENT_FUNCTION_URL` ← عنوان URL لدالة `protectedContent` المنشورة

   تجدها في لوحة تحكم Firebase/GCP (Cloud Functions / Cloud Run، المنطقة
   me-central2؛ والمؤقتة me-central1). وإلى أن تُضبط، يُرجع `/api/*` رمز 503
   لكن الموقع الثابت يعمل بكامله.

## النطاق المخصص (flygaca.com)

الـ Worker مرتبطة بنطاق الإنتاج في `wrangler.jsonc` كي تخدم
`flygaca.com` بدلًا من الاكتفاء بعنوان `flygaca.flygaca.workers.dev` الافتراضي:

```jsonc
"routes": [
  { "pattern": "flygaca.com", "custom_domain": true },
  { "pattern": "www.flygaca.com", "custom_domain": true }
]
```

- **المتطلب المسبق:** يجب أن يكون نطاق `flygaca.com` نشطًا في حساب Cloudflare
  نفسه. ينشئ `custom_domain: true` تلقائيًا سجلات DNS الموكَّلة لكلٍّ من
  النطاق الجذر و`www` عند `npx wrangler deploy` — دون أي خطوة DNS يدوية.
- **المضيف الأساسي:** يجري `worker/index.js` إعادة توجيه 301 لـ `www.flygaca.com`
  ولمضيف `*.workers.dev` المتبقّي إلى النطاق الجذر `https://flygaca.com`، بحيث يتطابق عنوان
  URL المُقدَّم مع وسوم `<link rel="canonical">` / `og:url` / JSON-LD (التي تشير جميعها
  إلى النطاق الجذر). أمّا مضيفات التطوير المحلي فمعفاة من إعادة التوجيه.
- يربط مضيف التراجع على Firebase نطاقه المخصص الخاص به على نحو منفصل عبر
  لوحة تحكم Firebase (Hosting → Add custom domain) — وهو غير متأثر بهذا الربط.

## محليًا

```bash
npm run build:cloudflare      # assemble dist/
npx wrangler dev              # run the Worker + assets locally
# or, against the Firebase config instead:
firebase serve                # legacy/rollback host
```

## النشر / التراجع

- **النشر:** ادفع إلى الفرع الذي يتتبّعه مشروع Workers (يقوم تكامل Git
  بالبناء + النشر). أو يدويًا: `npm run build:cloudflare && npx
  wrangler deploy`.
- **التراجع:** لوحة تحكم Cloudflare ← الـ Worker ← Deployments ← التراجع إلى
  إصدار سابق. وكاحتياط كامل، لا يزال `firebase deploy --only hosting`
  يخدم الموقع نفسه من Firebase Hosting.

## ما الذي لا يزال قائمًا على Firebase

- **Cloud Functions** (`chat`، و`protectedContent`، والفوترة، وخطافات الويب) — تُنشر
  من `office/runbook-deploy.md` (إذ تحتاج إلى أسرار Gemini/عادل).
- **Firestore + قواعد الأمان** — تُنشر القواعد من CI (`firebase deploy --only
  firestore:rules`) عند الدفع إلى `main`.

## أبقِ المكوّنات متوافقة

يرمّز كلٌّ من `worker/index.js` و`firebase.json` التوجيه وعمليات إعادة التوجيه
والترويسات/CSP نفسها. عند تغيير أحدهما (رابط نظيف جديد، أو أصل CSP، أو إعادة توجيه)،
غيّر الآخر. ويجب إضافة أي أصول خارجية جديدة إلى CSP في **كليهما**.
