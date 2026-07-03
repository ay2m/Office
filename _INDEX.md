---
title: The Office — Master Index
section: root
doc_type: index
status: active
owner: Founder
last_updated: 2026-07-03
lang: en
---

# The Office — Master Index

_Fly GACA operating documents. Last reorganized: 2026-06-16._

This folder holds every internal document for running Fly GACA, organized into 12 numbered
sections (00–11). Numbered prefixes keep sections in order; open any section folder to see
its files. Polished deliverables are mostly `.docx` / `.xlsx`; working notes, specs, and
drafts are `.md`. Filenames are lowercase kebab-case (ASCII) — see the naming convention in
`06-operations-it/repo-health-report-2026-06-16.md` §6.

> The authoritative master index is also kept as a Google Sheet:
> `00-strategy/00-master-office-paperwork-index.gsheet`. This `_INDEX.md` is the quick,
> readable map. A repo-health overview lives at `06-operations-it/repo-health-report-2026-06-16.md`.

---

## 00 — Strategy
Vision, plan, OKRs, and the strategic brainstorm set.

- annual-strategic-plan-and-okrs-fy2026-2027.docx
- fly-gaca-master-plan.docx / .pdf
- the-book-of-fly-gaca.html / .pdf
- book-of-fly-gaca-review-2026-06-14.md · fly-gaca-review-action-plan.md
- master-paperwork-template-index-2026-06-14.md
- roadmap.md · project.md · phase0.md · original-request.md
- 00-master-office-paperwork-index.gsheet
- **brainstorms/** — numbered explorations 00–10 (index + dashboard, First Academy, Investor
  Narrative, Captain Adel Flywheel, Killer Feature, Co-founder vs Hires, Adjacent & GCC
  Expansion, Partnerships, 10-Year Vision, Pre-Mortem)

## 01 — Governance
Founding, board, and conduct documents.

- founders-agreement.docx · shareholders-agreement-sha.docx · esop-plan-stock-option-plan.docx
- code-of-conduct.docx · anti-bribery-aml-and-whistleblower-policy.docx
- board-pack-template.docx · decision-log-template.docx
- Live: decision-log.md (DEC-006…009) · board-pack-2026-07.md — the go-to-company decisions
- Repo governance: CLAUDE.md · CODE_OF_CONDUCT.md · CONTRIBUTING.md · SECURITY.md · LICENSE

## 02 — Legal
Contracts, policies, and lawyer-facing briefs.

- Agreements: mutual-nda · one-way-nda · ip-assignment-agreement · confidentiality-and-non-compete-agreement ·
  customer-agreement-eula · service-level-agreement-sla · 60-day-pilot-agreement · influencer-creator-partnership-agreement (.docx)
- Public policies (DRAFT, 2026-06-14, .md): terms-of-use · privacy-notice-full-stage ·
  acceptable-use-policy · cookie-and-tracking-notice · disclaimer-and-educational-use-notice ·
  b2b-data-processing-agreement · pdpl-breach-notification-procedure · ip-and-takedown-procedure
- Counsel: lawyer-brief (.docx/.md) · lawyer-shortlist.md · lawyer-brief-corpus-rights-2026-06-14.md ·
  lawyer-brief-name-opinion-2026-06-14.md · brief-defensible-naming.md
- Audits/memos: legal-gap-audit-2026-06-14.md · launch-gate-legal-checklist-2026-06-14.md ·
  risk-memo.md · email-routing.md

## 03 — Finance
Policies, trackers, and dashboards.

- Policies: banking-and-treasury-policy · procurement-policy · expense-and-travel-policy ·
  petty-cash-policy · capital-expenditure-capex-policy · chart-of-accounts-saudi-specific (.docx)
- monthly-close-checklist.docx
- Trackers: budget-vs-actual-tracker.xlsx · financial-dashboard-kpis.xlsx
- monetization.md · finance-strategy.md _(scaffold)_

## 04 — Compliance (KSA)
Saudi regulatory registrations and compliance programs.

- Licensing/registration: misa-investment-license-application-bundle · monshaat-sme-registration-kit ·
  ntdp-application · tamheer-and-doroob-program-application-pack (.docx)
- Tax/invoicing: vat-compliance-memo · zatca-fatoora-e-invoicing-compliance-pack ·
  saudi-tax-and-compliance-calendar (.docx)
- Workforce: saudization-nitaqat-compliance-plan.docx
- Data/security: pdpl-compliance-program-and-dpia · information-security-policy ·
  sub-processor-list-and-dpa-register · vendor-management-policy ·
  business-continuity-and-disaster-recovery-plan-bcp-dr (.docx)
- compliance-roadmap.md _(scaffold)_

## 05 — People
HR templates, policies, and operating rhythm.

- Contracts/handbook: saudi-compliant-employment-contract-template · employee-handbook · job-descriptions-pack (.docx)
- Policies: compensation-philosophy · social-media-policy (.docx) · leave-pto-policy-2026-06-14.md
- Templates: offer-letter-template-2026-06-14.md · performance-review-template · 1-on-1-meeting-template ·
  30-60-90-day-new-hire-plan-template · daily-standup-template · monthly-all-hands-template · founder-calendar-and-time-audit-template (.docx)
- hr-pack-gap-audit-2026-06-14.md

## 06 — Operations / IT  _(renamed from 06-product-eng)_
Digital office setup **plus** product/engineering specs, runbooks, and infra notes.

> The specs and runbooks here document the product/engineering work; the actual
> **code** — the `cloudflare-agents/` Workers project (Captain Adel + sales agents)
> — lives in the workspace sibling `../Product-Engineering/`, not in this repo.

- Office setup (01–08, .docx/.xlsx): 01-digital-office-setup-master-checklist ·
  02-tooling-stack-selection-guide · 03-drive-folder-structure · 04-email-aliases-map ·
  05-slack-workspace-blueprint · 06-hubspot-crm-configuration-guide · 07-calendar-and-operating-rhythm ·
  08-setup-progress-tracker.xlsx
- Product specs: spec-crm · spec-currency-tracker · spec-freshness-pipeline · spec-instructor-dashboard ·
  spec-captain-adel-refusal-protocol · captadel-plan
- Eng/ops notes: hosting-facts · content-integration-plan · consolidation-manifest-2026-06-16 ·
  content-qa · diff-tracker-scope · improvement-audit · qa-consistency-sweep-2026-06-14 ·
  test-coverage-analysis-2026-06-16 · test-ready · repo-health-report-2026-06-16 ·
  flygaca-* briefings · robots.txt
- **runbooks/** — runbook-deploy · runbook-launch · runbook-cloudflare · runbook-ios ·
  runbook-vps-hardening · runbook-security-rollout · runbook-captain-adel ·
  runbook-captadel-(deploy/extraction/saas) · runbook-arabic-provider · runbook-pdpl-me-central2 · runbook-source-updates
- **setup/** — setup-entity · setup-firebase · setup-vps
- **diagrams/** — airac-editorial-sync · captain-adel-fallback · licensing-journey (SVG) + workflows.md

## 07 — Go-To-Market
Sales and marketing playbooks and content.

- Sales: sales-playbook · demo-script · objection-handling-guide · cold-outreach-templates-pack (.docx) ·
  b2b-pipeline.md · gtm-schools.md
- Marketing/PR: press-kit-media-kit · press-release-templates-pack · case-study-template ·
  content-calendar-strategy (.docx) · content-calendar.xlsx
- strategy-competitive-teardown.md
- **seo/** — seo-keyword-prospecting.md · flygaca-keyword-seeds.csv

## 08 — Customer Success
Onboarding, health, retention, and support.

- Playbooks (.docx): renewal-and-churn-reduction-playbook · crisis-communications-playbook ·
  support-operations-manual · individual-pilot-onboarding-flow
- Frameworks (.docx): customer-health-score-framework · nps-survey-and-analysis-pack · quarterly-business-review-qbr-template
- Dashboards: customer-health-dashboard.xlsx
- Working notes (.md): customer-success · onboarding-playbook · renewal-playbook · expansion-playbook ·
  at-risk-playbook · customer-health-scoring · health-dashboard-spec · qbr-template · voice-of-customer

## 09 — Investor Relations
Fundraising materials and investor reporting.

- fly-gaca-pitch-deck-2026-06-16.pptx (+ slide-01…15.jpg exports)
- investor-faq.docx · due-diligence-questionnaire.docx · monthly-investor-update-template.docx
- saudi-investor-target-list.xlsx · risk-register.xlsx
- investor-thesis.md _(scaffold)_

## 10 — Academy & Curriculum
Course content, instructor/cadet materials, and learning paths.

- Curriculum: captain-adel-curriculum-map.docx · aviation-curriculum-coverage-matrix.xlsx ·
  ground-school-curriculum-gap-audit-2026-06-14.md · mock-exam-ppl-set-a-2026-06-14.md · b2c-self-study-learner-path-2026-06-16.md
- Onboarding: academy-onboarding-playbook · instructor-onboarding-pack · cadet-welcome-pack (.docx)
- Other: course-completion-certificate-template · aviation-industry-and-conference-calendar-2026-2027 ·
  captain-adel-personal-content-calendar (.docx)

## 11 — Brand
Visual identity, design system, and print assets.

- design-system.html / .pdf · design-token-map-2026-06-16.md · flygaca-design-tokens-readme.md
- fly-gaca-document-style-guide.md · flygaca-document-style-and-design-guideline.md
- fly-gaca-brand-identity-sheet.pdf
- tidal-reckoning.html · tidal-reckoning-philosophy.md
- **logos/** — fly-gaca-logo (PNG + PSD) · fly-gaca.png · mark-mono-ink · mark-reverse-on-falcon-night
- **print/** — letterheads (EN + Arabic RTL), business cards, envelopes, invoice, internal memo,
  press release, folder/contract covers, compliments slip, notepad, sticker pack

---

## templates/
Reusable document starters: tpl-fin-report · tpl-hr-policy · tpl-legal-memo · tpl-ops-runbook · tpl-strat-proposal (.md)

## ar/
Parallel **Arabic (Saudi MSA)** localization of the office — 101 files mirroring the
same 00–11 sections plus `templates/`. Has its own `ar/_INDEX.md` (Arabic master
map), `ar/_GLOSSARY.md` (EN↔AR term glossary), and `ar/README.md`. Keep the English
tree here and the Arabic tree in `ar/` in sync when documents change.
