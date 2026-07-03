---
title: دليل تشغيل — تشغيل نموذج عربي جديد خلف الكابتن عادل
section: 06-operations-it
doc_type: runbook
status: active
owner: Founder
last_updated: 2026-06-21
lang: ar
---

# دليل تشغيل — تشغيل نموذج عربي جديد خلف الكابتن عادل

يأتي عقل الكابتن عادل (`captadel/`) مزوّداً بعدة *خيارات* لنماذج عربية / داخل المملكة
— ALLaM (الافتراضي)، Jais، Fanar، Qwen، Command R — لكن **كل واحد منها
معطّل حتى توجّهه إلى نقطة نهاية قيد التشغيل.** فمن دون تعيين نقطة نهاية، لا يُستخدم المسار
العربي إطلاقاً ولا يتغير شيء. يأخذ دليل التشغيل هذا نموذجاً عربياً واحداً
من حالة "مدعوم في الشيفرة" إلى حالة "يجيب عن أسئلة حقيقية في بيئة الإنتاج"، بأمان.

وهو الدليل المرافق للخانة العربية بجانب `runbook-captain-adel.md` (دالة
البوابة) و`deploy/allam-vllm.md` في مستودع captadel (تقديم ALLaM).

> **نظام حماية البيانات الشخصية (PDPL).** أسئلة المستخدمين الحقيقية بيانات شخصية ويجب معالجتها
> داخل المملكة. استضِف نقطة نهاية النموذج **و** خدمة captadel في
> منطقة داخل المملكة العربية السعودية. لا توجّه حركة المرور العربية إلى نموذج يُقدَّم خارج المملكة.

---

## 0. حدّد أي نموذج

راجع `captadel/docs/models.md` للاطلاع على ترتيب الخانة B الكامل. النسخة المختصرة:

- **ALLaM-7B** — الافتراضي؛ أفضل عربية فصحى حديثة سعودية + أقوى سردية للسيادة. ابدأ من هنا.
- **Qwen2.5-14B/32B** — إذا كان اتّباع ALLaM للتعليمات ضعيفاً جداً؛ الأفضل في
  الالتزام بعقد الاقتباس فقط؛ ترخيص متساهل.
- **Jais / Fanar** — بدائل قوية ذات أولوية عربية تستحق التقييم.
- **Command R** — أفضل سلوك في الاقتباس المُسنَد، **لكنه CC-BY-NC**: للتقييم
  فقط ما لم تكن تملك ترخيصاً تجارياً. **لا** تطرحه على أوزان NC.

تستخدم الخطوات أدناه `<name>` ∈ `allam | jais | fanar | qwen | commandr`
وبادئة متغيرات البيئة المطابقة `<PREFIX>` (مثل `QWEN`).

---

## 1. قدّم النموذج (vLLM، وحدة معالجة رسومية داخل المملكة)

يعمل أي خادم متوافق مع OpenAI على `/chat/completions` (vLLM أو TGI). باستخدام vLLM:

```bash
# On a KSA GPU box (A100/H100-class for 13B+; a 7B/9B fits a single 24–48 GB card)
pip install vllm
python -m vllm.entrypoints.openai.api_server \
  --model Qwen/Qwen2.5-14B-Instruct \
  --served-model-name Qwen/Qwen2.5-14B-Instruct \
  --port 8000
# Endpoint is then  http://<host>:8000/v1
```

ضعه خلف TLS + رمز مصادقة إذا كان قابلاً للوصول عبر الشبكة. يجب أن يطابق اسم النموذج
المُقدَّم القيمة `<PREFIX>_MODEL` (القيم الافتراضية في `captadel/.env.example`).

---

## 2. اختبار التدخين لنقطة النهاية (≈2 ث)

من `captadel/` على أي جهاز يستطيع الوصول إلى نقطة النهاية:

```bash
QWEN_BASE_URL=http://<host>:8000/v1  QWEN_API_KEY=<token-if-any> \
  node evals/provider-smoke.js qwen
```

توقّع `PASS … response: "pong"`. إذا أخفق فسيخبرك بالسبب (مسار/مضيف
خاطئ، عدم تطابق اسم النموذج، رمز مفقود). أصلِح المشكلة قبل المتابعة.

---

## 3. اجتياز بوابة التكافؤ (هذا هو قرار المضي/عدم المضي الحقيقي)

لا توجّه العربية إلى نموذج بناءً على الانطباعات. تشغّل البوابة كل حالة تقييم عبر
Gemini **و** المرشّح، ولا تنجح إلا إذا طابق المرشّح Gemini أو تفوّق عليه على
**المجموعة الفرعية العربية** دون تراجع إجمالي:

```bash
GEMINI_API_KEY=<key>  QWEN_BASE_URL=http://<host>:8000/v1 \
  node evals/parity.js --provider qwen
```

- الخروج 0 + `PARITY OK` ← آمن لتوجيه العربية إلى هذا النموذج.
- الخروج 1 + `PARITY FAIL` ← أبقِ `MODEL_PROVIDER=gemini`؛ جرّب نموذجاً آخر
  (الخطوة 0) أو حسّن الاسترجاع (الخطوة 6) أولاً.

نصيحة: `--arabic-only` يركّز التشغيل؛ `--tol 1` يسمح بتراجع إجمالي بمقدار حالة واحدة.

---

## 4. فعّله على خدمة captadel

عيّن هذه على خدمة **captadel.com** (متغيرات بيئة مضيفها / مدير الأسرار — وليس
دالة Firebase):

```bash
QWEN_BASE_URL=http://<host>:8000/v1
QWEN_MODEL=Qwen/Qwen2.5-14B-Instruct      # optional; default in .env.example
QWEN_API_KEY=<token-if-any>               # optional
ARABIC_PROVIDER=qwen                      # make `auto` prefer this Arabic model
MODEL_PROVIDER=auto                       # Arabic-dominant → Arabic model, else Gemini
```

ترك `ARABIC_PROVIDER` غير معيّن يُبقي ALLaM أولاً في ترتيب التفضيل.
يبقى المسار الإنجليزي/الوكيلي على Gemini بصرف النظر عن ذلك.

---

## 5. النشر + التحقق

انشر خدمة captadel (راجع `runbook-captadel-extraction.md` /
`deploy/` للحاوية + الهدف ضمن منطقة داخل المملكة)، ثم:

```bash
# health
curl https://captadel.com/health      # -> { status:"ok", ... }

# an Arabic turn should now answer in Arabic with Latin GACAR citations
curl -XPOST https://captadel.com/v1/chat -H 'Content-Type: application/json' \
  -d '{"message":"ما هو الحد الأدنى لسن رخصة الطيار الخاص؟","provider":"auto"}'
```

لا حاجة إلى تغيير الواجهة الأمامية — فإن `chat.html` / البوابة تتحدثان بالفعل عقد
`{ message, history, product, provider, session }`. تراجع فوراً
بإلغاء تعيين `<PREFIX>_BASE_URL` (أو `MODEL_PROVIDER=gemini`).

---

## 6. اختياري — الاسترجاع الهجين (مفتاح التحرّر العابر للغات)

مجموعة GACAR في جوهرها إنجليزية، لذا يسترجع سؤال عربي القليل
عبر BM25 المعجمي وحده — وسيرفض نموذج عربي (عن حق) الكثير. يصلح الاسترجاع
الكثيف متعدد اللغات هذا. وهو **معطّل افتراضياً**؛ فعّله فقط
بعد بناء الفهرس:

```bash
# 1. Serve an embeddings model (BGE-M3) the same OpenAI-compatible way, then
#    build the dense index once (writes captadel/src/brain/_embeddings.json.gz):
EMBEDDINGS_BASE_URL=http://<host>:8080/v1  npm run build:embeddings

# 2. Ship the generated _embeddings.json.gz with the service, and set at runtime:
EMBEDDINGS_BASE_URL=http://<host>:8080/v1     # BGE-M3
RERANK_BASE_URL=http://<host>:8081/v1         # optional: bge-reranker-v2-m3
```

مع عدم تعيين أي منهما، يكون الاسترجاع BM25 خالصاً وبلا تغيير. أعِد تشغيل بوابة التكافؤ
(الخطوة 3) مع تفعيل الهجين — يُفترض أن يقفز الاستدعاء العربي، وأن تجتاز المزيد
من الحالات العربية.

---

## قائمة التحقق

- [ ] النموذج مُقدَّم في منطقة داخل المملكة، خلف TLS/المصادقة.
- [ ] `provider-smoke.js <name>` ← PASS.
- [ ] `parity.js --provider <name>` ← PARITY OK (المجموعة الفرعية العربية).
- [ ] `<PREFIX>_BASE_URL` (+ `ARABIC_PROVIDER`، `MODEL_PROVIDER=auto`) معيّنة على captadel.
- [ ] captadel منشورة في منطقة داخل المملكة؛ `/health` سليمة؛ دور عربي يجيب بالعربية مع اقتباسات لاتينية.
- [ ] (اختياري) فهرس التضمينات مبني + `EMBEDDINGS_BASE_URL` معيّن؛ أُعيد فحص التكافؤ.
- [ ] التراجع متحقَّق منه: إلغاء تعيين `<PREFIX>_BASE_URL` يعيد إلى Gemini فقط.
