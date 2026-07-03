---
title: دليل تشغيل — إطلاق Fly GACA
section: 06-operations-it
doc_type: runbook
status: active
owner: Founder
last_updated: 2026-06-21
lang: ar
---

# دليل تشغيل — إطلاق Fly GACA

كل ما بُني حتى الآن مُتحقَّق منه محلياً. يأخذ دليل التشغيل هذا المنتج إلى البيئة الحية.
تُنفَّذ الخطوات الثلاث أدناه **على جهاز Mac الخاص بك، بحساباتك الخاصة** — فهي تحتاج إلى
عمليات تسجيل دخولك إلى GitHub وGoogle/Firebase وVercel، ولذلك لا يمكن تشغيلها من هنا.

شغّلها من جذر المستودع:

```sh
cd ~/Documents/Claude/flygaca/flygaca
```

---

## ما الذي يُطرَح

موقع ثابت كامل — صفحة هبوط، ومكتبة من أربعة أقسام (74 جزءاً من GACAR، و21
دليلاً، و61 مطاراً، و13 خريطة)، وواجهة محادثة الكابتن عادل، و24 أداة طيران،
و10 أدلة إرشادية، وقسم الدراسة (المدرسة الأرضية + الاختبارات القصيرة + الاختبار التجريبي)، والصفحات القانونية،
وعامل الخدمة دون اتصال، و`404.html`، و`sitemap.xml`، و`robots.txt`.

**هناك أمران غير حيَّين بعد عن قصد:**

- **إجابات الكابتن عادل** تحتاج إلى Cloud Function، التي تحتاج إلى خطة Firebase
  **Blaze** ومفتاح Gemini — راجع `office/runbook-captain-adel.md`. حتى
  ذلك الحين تُظهر المحادثة رسالة صادقة "ليس على رأس العمل بعد".
- **الصفحات القانونية** (إخلاء المسؤولية، الشروط، الخصوصية) **مسودات** بانتظار
  مراجعة المحامي السعودي — راجع `office/lawyer-brief.md`.

ولا يحول أيٌّ منهما دون إطلاق مبدئي.

---

## 1 — الدفع إلى GitHub  (github.com/FlyGACA/flygaca)

المستودع موجود بالفعل. أودِع عمل هذه الجلسة وادفعه:

```sh
git add -A
git status                     # sanity-check what's staged
git commit -m "Library handbooks, 17 tools, guides, Study + Ground School, launch polish"
git push origin main
```

يُبقي `.gitignore` بالفعل `node_modules/` ومجموعة `library/` التي تبلغ ~1 جيجابايت
والأسرار خارج الإيداع. أما مجموعة RAG `functions/rag/_chunks.json.gz` (~4 ميجابايت)
**فهي** مودَعة عن قصد — إذ تحتاجها Cloud Function.

---

## 2 — النشر إلى Firebase  (المضيف الأساسي)

Firebase هي البيت المُصمَّم: الاستضافة، وCloud Function الخاص بالكابتن عادل،
وFirestore جميعها تعيش في مشروع `flygaca-firebase` الواحد.

```sh
# One-time, if not already done:
npm install -g firebase-tools
firebase login

# Confirm the CLI is on the right project BEFORE deploying:
firebase use flygaca-firebase

# Deploy hosting first — this has no dependencies and works immediately:
firebase deploy --only hosting

# Then the Firestore security rules (needs a Firestore database to exist —
# see Troubleshooting if this 400s):
firebase deploy --only firestore:rules
```

ينشر نشر الاستضافة الموقع على `https://flygaca-firebase.web.app`. ويفعّل
نشر القواعد قاعدة Firestore الخاصة بـ `waitlist` (للكتابة فقط — لا يمكن
قراءة عناوين البريد الإلكتروني المُرسَلة من العميل). فصل الاثنين يعني
أن مشكلة في القواعد لن تحجب أبداً انطلاق الموقع.

- **محرك الكابتن عادل** خطوة منفصلة مرهونة بخطة Blaze — اتّبع
  `office/runbook-captain-adel.md` عند الاستعداد (`firebase deploy --only functions`).
- يجب تمكين **Firestore** في المشروع كي تحفظ قائمة الانتظار عناوين البريد الإلكتروني.

### نطاق مخصص — flygaca.com

Firebase Console ← Hosting ← **Add custom domain** ← `flygaca.com` ← أضف سجلات
DNS التي يمنحك إياها عند مُسجِّل النطاق الخاص بك. يُوفَّر SSL تلقائياً.

---

## 3 — النشر إلى Vercel  (مضيف ثابت/متوازٍ اختياري)

يستطيع Vercel استضافة الموقع **الثابت** (كل شيء عدا Cloud Function الخاص
بالكابتن عادل، وهي حصرية على Firebase). `vercel.json` و`.vercelignore` موجودان بالفعل
في المستودع — ويُبقي ملف التجاهل `office/` و`assistant/` و`functions/` ومجموعة
`library/` **خارج** المضيف العام.

```sh
npm install -g vercel
vercel            # first run links the project — accept the defaults
vercel --prod     # promote to production
```

على Vercel، لا توجد دالة لـ `/api/chat`، لذا يُظهر الكابتن عادل الرسالة نفسها "ليس على رأس
العمل"؛ ولا تزال قائمة الانتظار تعمل (يُستدعى Firestore مباشرة من المتصفح).

> النشر إلى كلٍّ من Firebase وVercel زائد عن الحاجة لمنتج واحد. الموصى به:
> **Firebase كمضيف حي** (يشغّل الكابتن عادل وFirestore معاً)؛
> واستخدم Vercel فقط إذا أردت عنوان معاينة/تجهيز منفصلاً.

---

## 4 — اختبار تدخين بعد النشر

على العنوان الحي، تحقق مما يلي:

- صفحة الهبوط، وأن شريط التنقّل يصل إلى Library · Captain Adel · Tools · Guides · Study · About.
- أن المكتبة تحمّل علاماتها التبويبية الأربع جميعها؛ افتح Part وHandbook في القارئ.
- أن أداتين تحسبان (E6B، Weight & Balance)؛ وأن أداة AIRAC تُظهر الدورة الحالية.
- أن اختباراً قصيراً في قسم الدراسة يعمل وأن الاختبار التجريبي يُوقِّت ويُصحِّح.
- أن المدرسة الأرضية تؤشّر على الدروس وأن شريط التقدّم يتحرك.
- أن عنوان URL مختلَقاً يُظهر `404.html` ذا الهوية.
- أن قائمة الانتظار تقبل بريداً إلكترونياً (تأكّد من ظهور مستند في Firestore ← `waitlist`).

---

## استكشاف الأخطاء وإصلاحها

### فشل نشر `firestore:rules` — HTTP 400، معرّف مشروع خاطئ

العرَض:

```
Error: Request to https://firebaserules.googleapis.com/v1/projects/<id>/rulesets
had HTTP Error: 400, Request contains an invalid argument.
```

إذا كان `<id>` في ذلك العنوان **ليس** `flygaca-firebase`، فإن واجهة سطر الأوامر تنشر إلى
المشروع الخاطئ. تحتفظ واجهة سطر أوامر Firebase بتجاوز مشروع نشط لكل دليل
(في `~/.config/configstore/`) يتجاوز `.firebaserc`. أعِد ضبطه:

```sh
firebase projects:list      # list every project; confirm flygaca-firebase exists
firebase use                # show which project the CLI is currently using
firebase use flygaca-firebase    # point it back at the right project
```

حتى على المشروع الصحيح، **لا يمكن نشر قواعد Firestore حتى توجد قاعدة بيانات
Firestore.** في Firebase Console الخاصة بـ `flygaca-firebase`: Build ← Firestore
Database ← **Create database** (وضع الإنتاج، المنطقة `me-central2` / الدمام).

ليس للاستضافة مثل هذا الاعتماد، لذا افصل النشر — اجعل الموقع حياً أولاً،
ثم أضف القواعد بمجرد وجود قاعدة البيانات:

```sh
firebase deploy --only hosting              # works immediately
firebase deploy --only firestore:rules      # after the database is created
```

## التحديث لاحقاً

أعِد تشغيل أمر النشر للمضيف الذي غيّرته. **كلما غيّرت شيفرة
الموقع، ارفع `VERSION` في `sw.js`** (حالياً `flygaca-v11`) كي يحصل الزوّار العائدون
على التحديث بدلاً من نسخة مخزَّنة قديمة.

## وضع الإطلاق — كل شيء مجاني (مؤقت)

ريثما تكتمل أوراق الشركة/الأعمال المصرفية، يكون المنتج بأكمله مفتوحاً
للجميع. مفتاحان، واحد لكل جانب:

- **العميل** — `window.FG_LAUNCH_MODE` افتراضه `true` في أعلى
  `assets/js/entitlements.js`. وكل بوابة (الأدوات، الدراسة، الحزم، سجل الطيران،
  لوحة المعلومات، نافذة جدار الدفع، تلميح عميل الكابتن عادل) ترتكز عليه.
- **الخادم** — `ADEL_LAUNCH_MODE=free` في `functions/.env.flygaca-app`. تعامل بوابة
  المحادثة كل متصل على أنه Pro وتتخطّى حصة المستوى المجاني. ويبقى محدِّد معدل
  إساءة الاستخدام (`functions/rag/ratelimit.js`) فعّالاً — فهو يحمي إنفاق النموذج،
  لا مستوى المنتج.

تحمل `pricing.html` لافتة خضراء "جميع المزايا مجانية حالياً"
(`.pricing-notice-launch`) — أزِلها مع الأعلام معاً.

**لإنهاء وضع الإطلاق (التراجع):**

1. في `assets/js/entitlements.js`، اقلِب الافتراضي إلى
   `window.FG_LAUNCH_MODE = false` (أو احذف الكتلة).
2. أزِل سطر `ADEL_LAUNCH_MODE=free` من `functions/.env.flygaca-app`.
3. أزِل كتلة لافتة الإطلاق في `pricing.html` (وقاعدتها
   `.pricing-notice-launch` في `assets/css/pricing.css`).
4. ارفع `VERSION` في `sw.js`، وأعِد نشر الاستضافة + دالة `chat`، وأسقِط
   كتلة وصف `launch mode` في `tests/entitlements-gating.spec.js`.

*جزء من جولة إطلاق فلاي قاكا الإرشادية. ليس استشارة قانونية.*
