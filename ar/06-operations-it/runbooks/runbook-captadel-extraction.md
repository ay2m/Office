---
title: "دليل تشغيل — ترقية الكابتن عادل إلى مستودعه الخاص (`FlyGACA/captadel`)"
section: 06-operations-it
doc_type: runbook
status: active
owner: Founder
last_updated: 2026-06-21
lang: ar
---

# دليل تشغيل — ترقية الكابتن عادل إلى مستودعه الخاص (`FlyGACA/captadel`)

> **الحالة — مُنجَز (2026-06-13).** فُصل الكابتن عادل إلى
> **[`FlyGACA/Captain-Adel`](https://github.com/FlyGACA/Captain-Adel)** (كلقطة، لا كـ
> `git subtree split`) وأُزيلت الشجرة الفرعية `captadel/` من هذا المستودع. ويُحتفظ بالإجراء
> أدناه للرجوع إليه. لاحظ أن المستودع الحيّ اسمه **`Captain-Adel`**، لا `captadel`،
> وأن التاريخ لم يُحفَظ.

تقع خدمة الكابتن عادل في هذا المستودع كـ**شجرة فرعية جاهزة للاستخراج** في
`captadel/`. كل ما تحتاج إليه — الخادم والدماغ ومجموعة النصوص والتقييمات وDockerfile،
وسير عمل CI الخاص بها — يقع تحت تلك البادئة الواحدة ولا يشير إلى أي شيء خارجها.
يقسّم دليل التشغيل هذا تلك الشجرة الفرعية إلى مستودع **`FlyGACA/captadel`**
مستقل (لـ **captadel.com**)، مع الحفاظ على خيار إبقاء كليهما متزامنين.

لا يعتمد فلاي قاكا **على** بقاء الشجرة الفرعية هنا: تستدعي دالة `chat`
السحابية الخدمة بالفعل عبر الشبكة (`ADEL_API_URL`)، لذا بمجرد
نشر `captadel` من مستودعه الخاص، يمكن أن تبقى النسخة `captadel/` هنا
كمرآة أو تُتقاعد لاحقًا — وهذا قرار منفصل، لا جزء من هذا القطع.

> نفّذ هذا من نسخة مستنسخة عادية مصادَق عليها على جهازك — لا يمكن إنجازه
> من بيئة Claude Code على الويب، التي يقتصر وصول Git/GitHub فيها على
> `flygaca/flygaca`.

---

## ما تحتاج إليه أولًا

1. **صلاحيات المؤسسة** لإنشاء مستودع تحت مؤسسة `FlyGACA`.
2. **واجهة سطر أوامر GitHub** (`gh auth login`) — أو استخدم واجهة الويب فقط للخطوة 2.
3. **نسخة نظيفة مستنسخة من `flygaca/flygaca`**. يُوصى بفعل هذا **بعد دمج PR رقم 18
   في `main`**، لكي يُبذَر تاريخ المستودع المستقل من `main`
   (المصدر المرجعي) بدلًا من فرع ميزة.

---

## استخراج لمرة واحدة

> **أنشئ المستودع فارغًا.** **لا** تضِف README أو `.gitignore` أو ترخيصًا عند
> الإنشاء. تشحن الشجرة الفرعية تلك بالفعل، وأي إيداع مبدئي تُجريه GitHub
> سيعرقل دفع `subtree split` أدناه. مع `gh repo create` أنت بخير
> (فهو ينشئ مستودعًا فارغًا)؛ وفي **واجهة الويب**، اترك "Add a README" و"Add
> .gitignore" و"Choose a license" جميعها **غير محدّدة**.

```bash
# 0. From your flygaca/flygaca clone, get on the seed commit.
git checkout main && git pull            # (or the branch you want to seed from)

# 1. Create the EMPTY repo (or do this in the GitHub web UI). Keep it private —
#    it carries the GACAR corpus + system prompt and serves PDPL-sensitive traffic.
gh repo create FlyGACA/captadel --private \
  --description "Captain Adel — independent AI flight instructor for Saudi civil aviation (captadel.com). Standalone RAG service and the brain Fly GACA plugs into." \
  --homepage "https://captadel.com"

# 2. Split the captadel/ subtree into a branch whose root IS captadel/.
#    This produces a clean history containing only the commits that touched
#    captadel/, with the prefix stripped (src/, evals/, package.json … at root).
git subtree split --prefix=captadel -b captadel-export

# 3. Push that history as the new repo's main.
git push https://github.com/FlyGACA/captadel.git captadel-export:main

# 4. Tidy up the local export branch.
git branch -D captadel-export
```

---

## في المستودع الجديد — فكّ تداخل CI

تشحن الخدمة سير عملها الخاص في `captadel/.github/workflows/ci.yml`. وبينما
عاش داخل هذا المستودع الأحادي كان مقصورًا على الشجرة الفرعية؛ وبمجرد أن يصبح `captadel`
جذر المستودع، أسقِط ذلك التقييد (يقول تعليق الترويسة الخاص بسير العمل ذلك):

```bash
git clone https://github.com/FlyGACA/captadel.git
cd captadel
```

في `.github/workflows/ci.yml`:

- أزِل مرشّحات `on.push.paths:` و`on.pull_request.paths:`
  (سطور `- 'captadel/**'`)، كي يُشغَّل عند كل دفع/طلب سحب؛ و
- أزِل الكتلة `defaults: { run: { working-directory: captadel } }`،
  لأن جذر المستودع أصبح الآن `captadel/`.

أودِع وادفع:

```bash
git add .github/workflows/ci.yml
git commit -m "ci: un-nest workflow now that captadel is the repo root"
git push
```

---

## إعدادات مستودع GitHub (بعد أول دفع)

- **About → Description / Website:** مضبوطة بالفعل في الخطوة 1 (سطر captadel.com).
  إذا أنشأت المستودع عبر واجهة الويب بدلًا من ذلك، الصق الوصف هناك
  واضبط الموقع على `https://captadel.com`.
- **About → Topics:** `aviation`, `gacar`, `saudi-arabia`, `rag`, `llm`, `gemini`,
  `allam`, `express`, `cloud-run`.
- **Settings → Secrets and variables → Actions → `GEMINI_API_KEY`:** أضفه كي تعمل
  مهمة `eval` الحيّة. ويبقى فحص بنية `--dry` أخضر بدونه، فلا تفشل
  الفروع المتشعّبة/التي بلا مفتاح.
- **Settings → Branches → حماية الفرع على `main`:** اشترط طلب سحب وفحص
  `captain-adel ci` قبل الدمج.
- اختياري: أوقِف **Wiki** و**Projects** ضمن Settings إذا كانتا غير مستخدمتين.

---

## الإعداد والتحقق

```bash
# Deps + the offline checks (no API key needed):
npm install
npm run smoke          # server module loads
npm run eval:dry       # cases.json validates
node evals/checks/citation-faithfulness.js --selftest
docker build -t captadel .   # optional: container builds

# Live, when you have a key / endpoint:
GEMINI_API_KEY=…  npm run eval
ALLAM_BASE_URL=…  npm run eval:allam     # needs a GPU vLLM/TGI endpoint
```

اضبط إعداد وقت تشغيل الخدمة من `.env.example` (`GEMINI_API_KEY`،
`MODEL_PROVIDER`، `ADEL_API_KEY`، `ALLOWED_ORIGINS`، و`ALLAM_*` الاختياري). انشر
إلى **منطقة سعودية** (Cloud Run `me-central1`) — أسئلة المستخدمين الحقيقية بيانات
شخصية بموجب نظام حماية البيانات الشخصية (PDPL)؛ لا تستخدم أبدًا خادم VPS الأوروبي. راجع `README.md` و`deploy/allam-vllm.md`.

عندما يوجّه فلاي قاكا إلى الخدمة المنشورة، اضبط أسرار البوابة في
`flygaca/flygaca`: `ADEL_API_URL` (عنوان URL للخدمة) و`ADEL_API_KEY` (مطابقًا
لـ `ADEL_API_KEY` الخاص بالخدمة، يُرسَل بصفته `X-Adel-Api-Key`).

---

## إبقاء الاثنين متزامنين (اختياري، لاحقًا)

إذا أبقيت `captadel/` هنا كمرآة، فيمكنك نقل التغييرات بينهما بالبادئة
نفسها:

```bash
# push new flygaca-side captadel/ commits up to the standalone repo:
git subtree push --prefix=captadel https://github.com/FlyGACA/captadel.git main

# pull standalone changes back into the monorepo subtree:
git subtree pull --prefix=captadel https://github.com/FlyGACA/captadel.git main --squash
```

اختر أحدهما مصدرًا للحقيقة (المستودع المستقل هو الخيار الطبيعي بمجرد أن
تصبح captadel.com حيّة) لتجنّب التباعد.
