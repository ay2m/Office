---
title: P0-5 دليل تنفيذي — إنشاء مشروع Firebase (متقاعد)
section: 06-operations-it
doc_type: setup-guide
status: draft
owner: Founder
last_updated: 2026-08-19
lang: ar
---

# P0-5 دليل تنفيذي — إنشاء مشروع Firebase (متقاعد)

> [!WARNING]
> **أُحيلت هذه الوثيقة إلى التقاعد في 2026-08-19 —** لا يوجد مشروع Firebase. فقد نُقل المنتج عن
> Firebase بالكامل: لا Hosting، ولا Auth، ولا Cloud Functions، ولا Firestore، ولا App Check، ولا
> خطة Blaze/Spark. أما المشاريع التي كان هذا الدليل سيُنشئها (`flygaca-firebase`، ثم
> `flygaca-app`) فقد حُذفت، ولوحة تحكم Firebase ليست واجهة يستخدمها أحد هنا.
>
> **ما الذي حلّ محلّها:** مشروع Google Cloud عادي — Cloud Run (واجهة Express البرمجية)، وCloud SQL
> for PostgreSQL (مخزن البيانات)، ودلو Cloud Storage خلف موازن تحميل HTTPS (تطبيق الصفحة الواحدة)،
> وSecret Manager، وCloud Scheduler — وكلها في **`me-central2` (الدمام)**.
>
> **اذهب بدلًا منها إلى:** `docs/RUNBOOK-deploy.md` في
> [`ay2m/FlyGACA`](https://github.com/ay2m/FlyGACA) للاطّلاع على تسلسل التزويد الحقيقي، و
> [`../hosting-facts.md`](../hosting-facts.md) للصورة المختصرة عمّا يعمل وأين.

## ما الذي لا يزال صحيحًا من هذه الصفحة

شيء واحد فقط، وقد نجا من عملية النقل: **قرار الإقليم.** تبقى البيانات الشخصية داخل المملكة، ولذلك
فإن Cloud SQL وCloud Run والدِلاء كلها في `me-central2` (الدمام). أما `me-central1` فهي الدوحة،
قطر — و**ليست** داخل المملكة، ويجب ألّا توصَف أبدًا بأنها آمنة وفق نظام حماية البيانات الشخصية
(PDPL).

وكل ما عدا ذلك في هذه الصفحة — تثبيت موقع Firestore، وAuthentication، وApp Check، وHosting،
والترقية إلى Blaze — يصف خدمات لا يستخدمها المنتج.

## ما الذي يعنيه P0-5 الآن

يُقرأ البند P0-5 في [`../../00-strategy/phase0.md`](../../00-strategy/phase0.md) بوصفه «إنشاء
المشروع السحابي المُدار». وهذه لا تزال مهمة حقيقية؛ غير أنها مشروع Google Cloud لا مشروع Firebase،
وتسلسلها يقيم مع الشيفرة. سجّل معرّف المشروع الناتج والإقليم المؤكَّد في البند P0-5 كما كان الحال.

> [!NOTE]
> لا يزال `00-strategy/phase0.md` يسرد تاريخ مشاريع حقبة Firebase (`flygaca-firebase`،
> و`flygaca-app`، وحادثة إقليم Firestore). وذلك سجلّ مؤرَّخ لما جرى، وقد تُرك كما كُتب — لكن لا
> تقرأه بوصفه بنية تحتية قائمة.
