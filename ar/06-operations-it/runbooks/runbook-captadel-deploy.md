---
title: دليل تشغيل — نشر captadel.com (الكابتن عادل بشكل مستقل)
section: 06-operations-it
doc_type: runbook
status: active
owner: Founder
last_updated: 2026-06-21
lang: ar
---

# دليل تشغيل — نشر captadel.com (الكابتن عادل بشكل مستقل)

> **ملاحظة (2026-06-13):** أصبح الكابتن عادل الآن في مستودعه الخاص،
> **[`FlyGACA/Captain-Adel`](https://github.com/FlyGACA/Captain-Adel)**. نفّذ هذه الخطوات من
> ذلك المستودع (جذره هو `captadel/` السابق)؛ وأي مسار `captadel/…` أدناه يُطابق ذلك الجذر.
> تجري عمليات النشر الآن من ملف `.github/workflows/deploy.yml` الخاص بالمستودع بمجرد ضبط `GCP_SA_KEY`.

شغّل خدمة الكابتن عادل على **captadel.com**: ابنِ الصورة، واربط بيانات اعتماد
النموذج/التضمينات، وانشر إلى منطقة داخل المملكة، واربط النطاق، ثم
صِل بوابة Fly GACA. مسار الأمر الواحد هو `captadel/deploy/deploy.sh`؛
وكل ما يلي يشرح ما يفعله والخطوات اليدوية المحيطة به.

> **الحسابات والفوترة والحصص** (اشتراكات التجربة على captadel.com) هي
> طبقة منفصلة لها إعدادها الخاص — مشروع Captadel Firebase مخصّص،
> وStripe، ونشر GitHub Actions. راجع **`runbook-captadel-saas.md`**. تلك
> الطبقة تُطلق بوضع معطّل، لذا يعمل هذا النشر دون تغيير سواء جرى إعدادها أم لا.
> ولكي يستخدم `firebase-admin` آلية ADC، انشر هذه الخدمة **داخل مشروع GCP نفسه**
> الخاص بمشروع Captadel Firebase.

> **نظام حماية البيانات الشخصية (PDPL) (عنصر حاسم).** أسئلة المستخدمين الحقيقية بيانات شخصية ويجب
> معالجتها داخل المملكة. انشر الخدمة إلى منطقة سعودية (me-central2 الدمام —
> الهدف؛ me-central1 الدوحة — مرحلي) واستضف نموذج ALLaM داخل المملكة
> للإنتاج. توفّر نقاط نهاية Hugging Face (الولايات المتحدة/الاتحاد الأوروبي) خيارًا ممتازًا لـ**التطوير والتقييمات**، لكنها
> خارج المملكة — مناسبة لمجموعة نصوص GACAR العامة (التضمينات)، لا
> لنموذج الدردشة على حركة المرور الحقيقية. راجع `runbook-pdpl-me-central2.md`.

---

## 0. المتطلبات المسبقة (لمرة واحدة)

```bash
gcloud --version                      # install the Google Cloud SDK if missing
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
# billing must be ENABLED for Cloud Run:
gcloud billing projects describe "$(gcloud config get-value project)" --format='value(billingEnabled)'
gcloud services enable run.googleapis.com artifactregistry.googleapis.com \
                       cloudbuild.googleapis.com secretmanager.googleapis.com
```

ما تحتاج إلى توفّره في متناول يدك:
- **`GEMINI_API_KEY`** — مطلوب. مسار اللغة الإنجليزية للكابتن عادل + مُقيّم الترسّخ.
- **`ADEL_API_KEY`** — سرّ مشترك تبتكره؛ ترسله بوابة Fly GACA لكي تتخطّى استدعاءاتها
  من خادم إلى خادم مُحدِّد معدّل الطلبات في المتصفح. مطلوب لربط الخطوة 6.
- **`ALLAM_BASE_URL` (+ `ALLAM_API_KEY`)** — اختياري الآن. الصوت العربي داخل المملكة
  (متوافق مع OpenAI `/v1`). بدونه، تظل اللغة العربية تُجاب عبر Gemini.
- **`EMBEDDINGS_BASE_URL` (+ `EMBEDDINGS_API_KEY`)** — اختياري الآن. الاسترجاع الكثيف
  متعدّد اللغات (BGE-M3). بدونه، يعتمد الاسترجاع على BM25 فقط. راجع `captadel/.env.example` للحصول على
  وصفة Hugging Face.

---

## 1. تخزين الأسرار

إمّا أن تنشئها يدويًا:
```bash
printf '%s' "YOUR_GEMINI_KEY" | gcloud secrets create GEMINI_API_KEY --data-file=-
printf '%s' "YOUR_ADEL_KEY"   | gcloud secrets create ADEL_API_KEY   --data-file=-
# optional, when ready:
printf '%s' "https://xxx.endpoints.huggingface.cloud/v1" | gcloud secrets create ALLAM_BASE_URL --data-file=-
printf '%s' "hf_xxx"          | gcloud secrets create ALLAM_API_KEY  --data-file=-
printf '%s' "https://yyy.endpoints.huggingface.cloud/v1" | gcloud secrets create EMBEDDINGS_BASE_URL --data-file=-
printf '%s' "hf_xxx"          | gcloud secrets create EMBEDDINGS_API_KEY --data-file=-
```

…أو صدّرها واترك السكربت يحدّثها أو ينشئها:
```bash
export GEMINI_API_KEY=…  ADEL_API_KEY=…  ALLAM_BASE_URL=…  ALLAM_API_KEY=…
cd captadel && ./deploy/deploy.sh secrets
```
يربط النشر **الأسرار الموجودة فقط**، لذا فإن أول نشر بمفتاح Gemini وحده أمر سليم —
أضف الباقي لاحقًا وأعد التشغيل لتفعيلها.

---

## 2. (اختياري) بناء الفهرس متعدّد اللغات — لمرة واحدة

يُشحن الفهرس الكثيف **داخل الصورة** (يقع تحت `src/brain/`، ويلتقطه
أمر `COPY . .` في Dockerfile). ابنِه قبل النشر، موجِّهًا إلى نقطة نهاية التضمينات لديك:
```bash
cd captadel
EMBEDDINGS_BASE_URL="https://yyy.endpoints.huggingface.cloud/v1" \
EMBEDDINGS_API_KEY="hf_xxx" \
npm run build:embeddings        # writes src/brain/_embeddings.json.gz
```
تخطَّ هذا لأول نشر يعتمد على BM25 فقط؛ شغّله وأعد النشر عندما تجهز نقطة النهاية لديك.

---

## 3. النشر

```bash
cd captadel
./deploy/deploy.sh                       # region defaults to me-central2 (Dammam)
# if the region is rejected for your project:
REGION=me-central1 ./deploy/deploy.sh    # interim (Doha)
```
يبني السكربت من المصدر، ويربط الأسرار الموجودة، ويضبط
`MODEL_PROVIDER=auto` + `ARABIC_PROVIDER=allam`، ويشغّل `--min-instances 1` (يبقي فهرس
BM25 دافئًا)، ويطبع عنوان URL للخدمة.

**التحقق:**
```bash
curl -s https://captadel-xxxx.run.app/health      # {status:ok …; allam:true once ALLaM is wired}
```
افتح عنوان URL في متصفح ← ينبغي أن تُحمَّل صفحة الهبوط **بالعربية أولًا (من اليمين إلى اليسار)**؛ وينبغي
أن تبثّ الدردشة إجابة موثّقة بالمصادر.

---

## 4. (إذا قسّمت المستودع) المصدر

يُطوَّر `captadel/` هنا كشجرة فرعية git ويمكن تقسيمه إلى `FlyGACA/captadel`
(`runbook-captadel-extraction.md`). يعمل النشر بالطريقة نفسها من أيّ من المستودعين — يحتاج السكربت
فقط إلى شجرة `captadel/` مع ملف `Dockerfile` الخاص بها.

---

## 5. ربط captadel.com

**الخيار أ — ربط نطاق Cloud Run:**
```bash
gcloud run domain-mappings create --service captadel --domain captadel.com --region me-central2
gcloud run domain-mappings create --service captadel --domain www.captadel.com --region me-central2
```
ثم أضف السجلات التي يطبعها لدى مزوّد DNS الخاص بك.

**الخيار ب — Cloudflare في المقدّمة (أنت تستخدم Cloudflare بالفعل):** أضف `CNAME` لـ
`captadel.com` (و`www`) إلى مضيف `run.app`، مع التوجيه عبر الوكيل. أبقِ TLS = Full (strict).

في كلتا الحالتين، يدرج `config.js` بالفعل `captadel.com` / `www.captadel.com` في قائمة السماح لـ CORS.

---

## 6. ربط بوابة Fly GACA بالخدمة الحيّة

لكي توجّه الدردشة المُضمّنة (flygaca.com) وكيلًا إلى الدماغ نفسه:
```bash
# on the chat Cloud Function (Firebase) — see runbook-captain-adel.md:
ADEL_API_URL = https://captadel.com          # or the run.app URL
ADEL_API_KEY = <the same value as the ADEL_API_KEY secret>
```
أعد نشر دالة `chat`. ترسل البوابة `X-Adel-Api-Key` من خادم إلى خادم.

---

## 7. استكشاف الأخطاء وإصلاحها

| العَرَض | الإصلاح |
|---|---|
| `LOCATION_POLICY_VIOLATED` / تم رفض المنطقة | استخدم `REGION=me-central1 ./deploy/deploy.sh` حتى يُمنح me-central2. |
| `/health` يُظهر `allam:false` | سرّ `ALLAM_BASE_URL` مفقود/فارغ، أو نقطة النهاية معطّلة — تعود اللغة العربية احتياطيًا إلى Gemini. |
| اللغة العربية تُجيب لكن المصادر ضعيفة/غير ذات صلة | الاسترجاع متعدّد اللغات معطّل — ابنِ الفهرس (§2) + اضبط `EMBEDDINGS_BASE_URL`، وأعد النشر. |
| أول طلب بطيء / تنتهي مهلته | يبني الإقلاع البارد فهرس BM25؛ يبقي `--min-instances 1` (الافتراضي) نسخة واحدة دافئة. |
| أخطاء دردشة flygaca المُضمّنة | لم تُضبط `ADEL_API_URL`/`ADEL_API_KEY` على دالة `chat` (الخطوة 6). |

## 8. التراجع

```bash
gcloud run revisions list --service captadel --region me-central2
gcloud run services update-traffic captadel --region me-central2 --to-revisions REVISION=100
```

## 9. بوابة جودة ما قبل الإطلاق (شغّلها بمفاتيحك)

```bash
cd captadel
GEMINI_API_KEY=…                       npm run eval          # English path, keyword gate
GEMINI_API_KEY=… ALLAM_BASE_URL=…      npm run eval:allam    # Arabic path
GEMINI_API_KEY=… ALLAM_BASE_URL=…      npm run eval:parity   # Arabic must match/beat EN, no regression
```
أن يكون كل شيء أخضر هنا = آمنٌ لتوجيه حركة المرور إليه.
