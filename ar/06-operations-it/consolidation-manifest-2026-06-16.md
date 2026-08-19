---
title: بيان توحيد 06-product-eng — 2026-06-16
section: 06-operations-it
doc_type: document
status: active
owner: Founder
last_updated: 2026-08-19
lang: ar
---

# بيان توحيد 06-product-eng — 2026-06-16


> [!NOTE]
> **مُتجاوَز بتاريخ 2026-08-19 — محفوظ كسجل، ولم يُصحَّح.** يوثّق هذا المستند الوضع كما كان في
> تاريخه. تغيّرت منذ ذلك الحين لوحة الأسعار ونموذج التسعير للمؤسسات وبنية المنصّة؛ راجع
> [`01-governance/decision-log.md`](../01-governance/decision-log.md) القرار **DEC-011** و
> [`03-finance/monetization.md`](../03-finance/monetization.md) لمعرفة الوضع الحالي. لم يُعدَّل أي شيء أدناه — فقيمته
> أنه يسجّل ما تقرَّر أو لوحظ حينها، بما في ذلك ما تبيّن لاحقًا أنه غير صحيح.

يُغلق هذا البيان الفجوة **GAP-1** في الفهرس الرئيسي: كانت وثائق الهندسة مُصنَّفة خطأً تحت `library/` (الذي يجب أن يضم المتن التنظيمي فقط) ومكرَّرة داخل التطبيق في `flygaca/office/`. وقد جرى الآن توحيد الوثائق ضمن هذا المجلد. نسخ فقط — تُركت النسخ الأصلية في مكانها لأن هذا المجلد يمنع عمليات الحذف بالنسبة للوكيل (راجع MOVED.md في الجذر).

## نُسخت إلى 06-product-eng/ من library/06-product-eng/
- content-integration-plan.md، content-qa.md، diff-tracker-scope.md، hosting-facts.md، improvement-audit.md، test-ready.md، robots.txt
- spec-crm.md، spec-freshness-pipeline.md، spec-instructor-dashboard.md
- runbooks/ (المجموعة الكاملة: deploy، ios، launch، cloudflare، captadel-*، arabic-provider، captain-adel، security، vps-hardening، pdpl، وغيرها)
- setup/ (setup-entity.md، setup-firebase.md، setup-vps.md)

تمت كتابتها مباشرةً في هذا المجلد (ضمن هذا العمل): spec-currency-tracker.md، spec-captain-adel-refusal-protocol.md، diagrams/ (licensing-journey، airac-editorial-sync، captain-adel-fallback، workflows.md)، وQA-Consistency-Sweep.

## استُبعدت عمدًا من النقل (مع الأسباب)
- **library/06-product-eng/cloudflare-agents/** — 812 ميغابايت من شيفرة Cloudflare Worker الحيّة بما فيها node_modules (sales-agents، captadel-agent). هذه شيفرة تطبيق، لا أوراق عمل. وينبغي أن تقيم مع قاعدة الشيفرة، لا ضمن المتن ولا ضمن مجلد المكتب. حدِّد موطنها كجزء من بنية المستودع، لا ضمن هذه التنظيفة.
- **flygaca/office/** — النسخة العاملة الخاصة بمستودع التطبيق من وثائق المكتب (LAWYER-BRIEF، RUNBOOKs، SPEC-crm، SETUP-*، إضافةً إلى نسخ مكرَّرة بصيغة " 2"). تُركت دون مساس: فهي تقع داخل شجرة التطبيق (مع git worktrees) ونقلها يهدِّد بكسر مراجع التطبيق/البناء. وإذا أردت مصدرًا واحدًا للحقيقة، فعامِل هذا المجلد بوصفه المرجع المعتمد ودَع التطبيق يشير إليه أو ينسخ منه.

## خطوتك اليدوية (الوكيل لا يستطيع الحذف هنا)
بمجرد تأكُّدك من سلامة النسخ في هذا المجلد، احذف النسخ الأصلية المكرَّرة الآن من **library/06-product-eng/** (مع الإبقاء على `cloudflare-agents/` إلى أن تقرِّر موطنها)، بحيث يضم `library/` المتن التنظيمي فقط. أما نسخة `flygaca/office/` فهي قرار منفصل وفق ما سبق.

## ملاحظة
- وردت نسختان احتياطيتان مصحَّحتا العدّ من `runbook-launch.md` (.bak-counts-2026-06-14) مع runbooks/ — غير ضارّتين؛ يمكنك حذف ملفات .bak في أي وقت.
