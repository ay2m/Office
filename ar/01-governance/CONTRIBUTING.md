---
title: المساهمة في Fly GACA
section: 01-governance
doc_type: document
status: active
owner: Founder
last_updated: 2026-08-05
lang: ar
---

# المساهمة في Fly GACA

> **نسخة منقولة** — هذا الملف هو دليل المساهمة الخاص بمستودع التطبيق (`FlyGACA/flygaca`)،
> محفوظ هنا للمرجعية. خطوات الإعداد والمسارات تشير إلى بنية ذلك المستودع، لا إلى
> مستودع الوثائق هذا.

شكرًا لاهتمامك بتحسين Fly GACA — وهو منصة تعليمية مستقلة ومكتبة تنظيمية مفتوحة
للطيران المدني السعودي. يغطّي هذا الدليل كيفية الإعداد، والأعراف التي
يقوم عليها هذا المشروع، والفحوص التي يجب أن يجتازها كل تغيير.

**ابدأ من [`CLAUDE.md`](CLAUDE.md)** — فهو المرجع الموثوق للبنية المعمارية وأعراف
المشروع. وهذا الملف هو الرفيق التشغيلي المختصر له.

## الإعداد

```bash
npm install
# the site is a no-build static PWA — just serve it over HTTP:
python3 -m http.server 8000      # then open http://localhost:8000/flygaca.html
```

تجلب الصفحات بيانات JSON من `assets/data/` أثناء التشغيل، لذا يجب تقديمها عبر HTTP — وفتح
ملف مباشرةً (`file://`) لن يعمل. ولتشغيل Captain Adel محليًا، استخدم محاكي Firebase
(`firebase emulators:start`).

## الأعراف التي يقوم عليها المشروع

هذه ليست تفضيلات أسلوبية — فالإخلال بها يُخلّ بالمنتج:

- **غير تابع للهيئة العامة للطيران المدني.** كل واجهة موجَّهة للمستخدم تُرسّخ قاعدة واحدة: التحقّق من
  أحدث منشور رسمي للهيئة العامة للطيران المدني. المنتج يساعدك على إيجاد التنظيمات ودراستها، ولا
  يحلّ محلّها أبدًا. لا تُوحِ مطلقًا بصفة رسمية للهيئة العامة للطيران المدني، ولا تختلق مرجعًا تنظيميًا أبدًا.
- **ثنائي اللغة + RTL.** الإنجليزية/العربية متطلّب من الدرجة الأولى. أي نصّ جديد موجَّه للمستخدم يحتاج
  إلى **كليهما**: سمة `data-en` وسمة `data-ar` مطابقة (يفرضه `npm run check:i18n`).
- **لا تُحرّر العناصر المشتركة (chrome) يدويًا أبدًا.** كتلتا `<header class="site-nav">` و
  `<footer class="site-footer">` مُولَّدتان. حرّر `partials/header.html` /
  `partials/footer.html`، ثم شغّل `npm run build:chrome`. ويُخفِق نظام التكامل المستمر (CI) إذا انحرفت الصفحات.
- **الاستحقاقات من جهة الخادم فقط.** لا يجوز للعملاء أبدًا الكتابة في حقل `entitlement`؛ فالوصول المدفوع
  يُمنَح حصريًا بواسطة Cloud Functions عبر Admin SDK. لا تُضِف أي وسائل تجاوز من جهة العميل.
- **حداثة عامل الخدمة (service worker).** إذا غيّرت الأصول المخزّنة مؤقتًا، فارفع رقم الإصدار في `sw.js`.
- **رؤوس الأمن / سياسة أمن المحتوى (CSP)** موجودة في `firebase.json`. ويجب إضافة أي مصادر خارجية جديدة هناك
  صراحةً.

## قبل فتح طلب سحب (PR)

> **في مستودع الوثائق هذا، البوّابة الفعلية قبل طلب السحب هي `node tools/print/check.mjs`.** فهي
> تتحقّق من أن كل ملف محتوى `.md` يحمل البيانات الوصفية (front-matter) القياسية وله ملف PDF محدَّث
> تحت `_print/` (أعِد توليده عبر `cd tools/print && npm run build`). أما أوامر `npm run check:*`
> أدناه فهي خاصّة بمستودع **التطبيق** — ولا يمكن تشغيلها هنا، وهي محفوظة فقط كجزء من هذه النسخة
> المنقولة للمرجعية. راجع [`CLAUDE.md`](../../CLAUDE.md) في الجذر لمعرفة الأعراف الفعلية لهذا المستودع.

شغّل الفحوص التي سيشغّلها نظام التكامل المستمر (CI). يُنهي كلٌّ منها بحالة غير صفرية عند وقوع مخالفة:

```bash
npm run check:data       # library index counts + the README headline figures
npm run check:i18n       # bilingual parity (every data-en has a data-ar)
npm run check:links      # internal links, firebase routes, sw precache, sitemap
npm run check:chrome     # shared header/footer in sync across all pages
npm run test:unit        # fast node --test units (no external deps)
npm test                 # Playwright E2E (smoke-loads every page + key flows)
```

إذا عدّلت محتوى المكتبة، فحدّث الأعداد في `scripts/check-data.js` **و**الجدول في
[`README.md`](README.md) معًا — فالحارس موجود للإبقاء عليهما متزامنَين.

أسلوب اختياري للكود (غير مفروض بعد في نظام التكامل المستمر):

```bash
npm run format:check     # Prettier, scoped to source
npm run format           # auto-fix
```

يتوفّر ملف [`.editorconfig`](.editorconfig)؛ يُرجى الإبقاء على الملفات منتهية بسطر LF، وبترميز UTF-8، مع
سطر جديد ختامي.

## طلبات السحب (Pull requests)

- أبقِ التغييرات مركّزة؛ واشرح ماذا ولماذا. وعبّئ
  [قالب طلب السحب](.github/pull_request_template.md).
- يجب أن تكون جميع فحوص نظام التكامل المستمر خضراء.
- بمساهمتك، فإنك توافق على ترخيص مساهماتك بموجب
  [رخصة Apache الإصدار 2.0](LICENSE). لاحظ أن **المحتوى** التنظيمي في هذا المستودع مملوك للهيئة العامة للطيران المدني
  وغير مشمول بتلك الرخصة (انظر [`NOTICE`](NOTICE)).

## الإبلاغ عن المشكلات

استخدم قوالب المشكلات الموجودة تحت [`.github/ISSUE_TEMPLATE/`](.github/ISSUE_TEMPLATE/). وبالنسبة لأي أمر
قد يكون شاغلًا أمنيًا أو متعلّقًا بعزل البيانات، يُرجى **عدم** فتح مشكلة عامة — وبدلًا من ذلك راسل
القائم على الصيانة عبر البريد ay2m@hotmail.com.
