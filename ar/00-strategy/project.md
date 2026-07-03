---
title: "المشروع: نظام Fly GACA متعدد الوكلاء لتمكين المبيعات"
section: 00-strategy
doc_type: document
status: active
owner: Founder
last_updated: 2026-06-21
lang: ar
---

# المشروع: نظام Fly GACA متعدد الوكلاء لتمكين المبيعات

## البنية المعمارية
يُنفَّذ النظام كحزمة بايثون معيارية `sales_agents/` تستخدم SDK الخاص بـ `google-genai` لتفاعلات نماذج اللغة الكبيرة (LLM). ويتضمن:
- وكلاء متخصصين مرتكزين على أدلة عمل ما قبل البيع.
- بوابة توجيه لتحليل الاستفسارات، والتفويض إلى الوكلاء، ومزج الردود.
- واجهة سطر أوامر للمحاكاة التفاعلية.
- مشغِّل اختبارات لتنفيذ الاستفسارات المحددة مسبقًا وتقييمها.

## المعالم الرئيسية
| # | الاسم | النطاق | التبعيات | الحالة | معرّف المحادثة |
|---|------|-------|-------------|--------|---------|
| 1 | مسار الاختبار الشامل (E2E) | تعريف مجموعة الاختبارات والمشغِّل، ونشر test-ready.md | لا يوجد | DONE | 63c8ee12-cacf-4115-95c1-40fe70792733 |
| 2 | إعداد قاعدة الشيفرة والشخصيات | إنشاء الأدلة، والإعداد المشترك، والترسيخ، وموجِّهات الوكلاء | لا يوجد | DONE | df0ac967-6ffb-4e7d-9d56-2da85374601d |
| 3 | بوابة التوجيه | تصنيف الاستفسارات، والتوجيه إلى الوكلاء، ومزج الردود، وإدراج إخلاء المسؤولية | M2 | IN_PROGRESS | df0ac967-6ffb-4e7d-9d56-2da85374601d |
| 4 | واجهة سطر الأوامر التفاعلية | محاكاة معالجة الاستفسارات الحوارية وتوليد وثيقة RFP | M3 | PLANNED | TBD |
| 5 | اجتياز الاختبار الشامل (E2E) | تشغيل مشغِّل الاختبارات على بوابة التوجيه، واجتياز 100% من الاختبارات | M1, M4 | PLANNED | TBD |
| 6 | التدقيق الجنائي والتحصين | اختبار الصندوق الأبيض، وثغرات Challenger، وفحص Auditor | M5 | PLANNED | TBD |

## عقود الواجهة
### بوابة التوجيه
- `RoutingGateway.process_and_combine(query: str, history: list = None) -> dict`
  - تُرجِع: `{"routing": list, "response": str, "classification_reason": str}`
- `RoutingGateway.classify_query(query: str) -> dict`
  - تُرجِع: `{"agents": list, "reasoning": str, "is_b2b": bool, "is_regulatory": bool}`

## تخطيط الشيفرة
- `sales_agents/config.py`: إعدادات نماذج اللغة الكبيرة المشتركة وتهيئة العميل.
- `sales_agents/agents/base_agent.py`: فئة الوكيل الأساسية.
- `sales_agents/agents/enrollment.py`: مستشار التسجيل (التأهيل، الاعتراضات).
- `sales_agents/agents/cfi.py`: كبير مدربي الطيران (المرجع التنظيمي).
- `sales_agents/agents/b2b_owner.py`: مالك حساب الأعمال B2B (عرض RFP).
- `sales_agents/routing/gateway.py`: بوابة التوجيه.
- `sales_agents/cli/interactive.py`: واجهة محاكاة سطر الأوامر.
- `sales_agents/main.py`: نقطة دخول واجهة سطر الأوامر التفاعلية.
- `sales_agents/tests/test_cases.json`: السيناريوهات المحددة.
- `sales_agents/tests/test_runner.py`: سكربت التحقق.
