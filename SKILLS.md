---
title: Claude Marketplace Skills — Evaluation & Recommendations
section: root
doc_type: document
status: active
owner: Founder
last_updated: 2026-08-31
lang: en
---

# Claude Marketplace Skills — Evaluation & Recommendations

## Why this document exists

A viral X thread ([@S0N_IA](https://x.com/S0N_IA/status/2093745814241747046), building on
[@silvanrec](https://x.com/silvanrec/status/2090280285623464099)) catalogued Anthropic's official
Claude plugin marketplace by department and pitched it as a way to "run departments of a company
on Claude." That thread is promotional content, not a technical source, so nothing below is
copied from it. Instead, this evaluation was built from the actual marketplace catalog (Anthropic's
`knowledge-work-plugins` marketplace, queried directly — skill counts below match the thread's
claimed 8 / 31 / 9, which at least confirms the thread described the real catalog) and from what
this repository actually is.

**What this repo actually is, and why that matters for the verdict below.** `ay2m/Office` is a
git-versioned tree of Markdown, `.docx`/`.xlsx`, and rendered PDFs — not a live operating system.
There is no QuickBooks, Stripe, PayPal, Square, HubSpot, DocuSign, or Canva connection anywhere in
this repo (checked — none referenced), and the "CRM" and payroll/currency-tracker documents under
`06-operations-it/` are **specs**, not connected systems. Most of the marketplace's Small Business
skills are built to act *through* exactly those connectors (chase a real invoice, clean a real CRM,
run a real payroll cycle). Installed here, with nothing behind them, they're just prompt templates —
no more capable than describing the task to Claude directly. Separately, this repo already runs a
25-agent roster (`.claude/agents/`) purpose-built for its own conventions — `finance-steward`,
`legal-scribe`, `governance-clerk`, `ksa-compliance`, `people-ops`, `ops-it-spec` — each of which
knows the Falcon Theme print pipeline, the bilingual `ar/` mirror, PDPL/ZATCA/MISA (not SOX — this
is a private Saudi company, not a US public one), and the sensitive-content handling rules the
generic marketplace skills know nothing about. Because of both of these, the honest read is that
**most of the 48 skills evaluated add little here**; a small number are genuinely useful as a
second-opinion drafting pass, called out below.

**How to read the verdict column:** ✅ Recommend = worth enabling and using in this repo's context.
🟡 Situational = only useful once a precondition holds (a real connector, a live audit, a specific
one-off need) — not worth enabling by default. ⛔ Skip = wrong fit for this repo (needs a connector
we don't have, assumes a legal/regulatory regime that doesn't apply, or duplicates a territory
agent that already does this better with local context).

## Installing

All three plugins live in Anthropic's first-party `knowledge-work-plugins` marketplace at
[claude.com/plugins/finance](https://claude.com/plugins/finance),
[claude.com/plugins/small-business](https://claude.com/plugins/small-business), and
[claude.com/plugins/legal](https://claude.com/plugins/legal) — install (or check status) via the
**Add** button on those pages, or **claude.ai → Settings → Capabilities → Plugins**. This is a
different mechanism from the `flygaca-family` marketplace this repo hosts itself (see
`06-operations-it/runbooks/runbook-claude-plugins.md`): `flygaca-family` is a GitHub-hosted
marketplace added with `/plugin marketplace add ay2m/Office`, while `knowledge-work-plugins` is an
Anthropic-hosted catalog with no public git source to point `/plugin marketplace add` at — install
it through the claude.ai UI, not the CLI. As of this evaluation, `finance`, `small-business`, and
`legal` (plus `operations` — see below) already show as **enabled** on the connected claude.ai
account; that toggle is account-wide, not scoped to this repo, so confirm in your own plugin
settings rather than assuming it carries over to a teammate's session. A plugin installs as a
whole — there's no way to enable one skill from `small-business` without pulling in all 31.

Each plugin also wants MCP connectors (QuickBooks/Stripe/PayPal/HubSpot/DocuSign/Canva for
Small Business; BigQuery/Snowflake/Databricks for Finance; Atlassian/Box/Egnyte/DocuSign for
Legal) to do anything beyond producing a generic document — none are configured for this repo, and
connecting them is a decision for the owner, not something to do as part of a docs-repo skill
evaluation.

## Finance (8 skills) — `claude.com/plugins/finance`

| Skill | Verdict | Why |
| --- | --- | --- |
| `reconciliation` | 🟡 Situational | Genuinely the right shape of task (matching ledger to bank/ZATCA invoices), but needs a connected ledger or bank feed to reconcile *against* — there isn't one here. Worth revisiting once one exists. |
| `variance-analysis` | 🟡 Situational | Closest fit to `03-finance/budget-vs-actual-tracker` — could be tried as a second-opinion narrative pass over that tracker's numbers, but `finance-steward` already owns and maintains that document with this repo's own format. |
| `close-management` | 🟡 Situational | Generic month-end close checklist; only useful once monthly close is a formal recurring process here, which it isn't yet. |
| `financial-statements` | 🟡 Situational | Drafts P&L/balance-sheet narrative from ledger data; nothing to draft from without a connected ledger. |
| `audit-support` | 🟡 Situational | Only relevant once an external audit is actually underway. |
| `journal-entry` / `journal-entry-prep` | ⛔ Skip | Assumes a live general ledger (QuickBooks-class system) to post entries into. None exists in this repo. |
| `sox-testing` | ⛔ Skip | Sarbanes-Oxley is a US public-company regime. Fly GACA is a private Saudi (KSA) company — the applicable controls regime is PDPL/ZATCA, owned by `ksa-compliance`, not SOX. |

## Small Business (31 skills) — `claude.com/plugins/small-business`

| Skill | Verdict | Why |
| --- | --- | --- |
| `plan-payroll` | 🟡 Situational | Payroll planning is real work here (`05-people/`), but the skill's default framing is generic/US payroll — it doesn't know GOSI, Nitaqat/Saudization quotas, or WPS. Would need heavy adaptation; `people-ops` and `finance-steward` already carry that KSA context. |
| `margin-analyzer` / `price-check` | 🟡 Situational | Could sanity-check `03-finance/monetization.md` band pricing as a second opinion; low-stakes to try, low expected value since the bands are already deliberate strategy, not raw margin math. |
| `job-post-builder` | 🟡 Situational | Could help draft postings alongside `05-people/` offer-letter and onboarding docs; marginal value over `people-ops`. |
| `friday-brief` / `monday-brief` / `month-heads-up` | 🟡 Situational | Generic weekly-brief templates; `strategy-analyst` already produces owner-decision briefs in this repo's format. |
| `quarterly-review` | 🟡 Situational | Overlaps `strategy-analyst`'s phase-status/OKR review work. |
| `close-month` / `month-end-prep` | 🟡 Situational | Duplicates of Finance's `close-management` within the same marketplace; same verdict. |
| `cash-flow-snapshot` | 🟡 Situational | Needs a connected bank/payment feed to snapshot; none configured. |
| `contract-review` | 🟡 Situational | Duplicate of Legal's `review-contract` (see below), bundled again in this plugin. |
| `review-contract` | 🟡 Situational | Same skill name as Legal's, see the Legal section for the actual recommendation. |
| `business-pulse` | ⛔ Skip | Needs connected data sources (sales, support, finance feeds) to produce a "pulse"; this repo holds static documents, not live metrics. |
| `call-list` | ⛔ Skip | Sales-call list generation belongs to GTM outreach (`07-gtm/`, `schools-acquisition` agent), not this evaluation's scope, and needs a live lead source. |
| `canva-creator` | ⛔ Skip | Brand assets go through `11-brand/`'s Falcon Theme pipeline and `brand-keeper`, not Canva. |
| `content-strategy` | ⛔ Skip | Owned by `seo-strategist`/GTM agents; out of Finance/Legal/Ops scope. |
| `crm-cleanup` / `crm-maintenance` | ⛔ Skip | No CRM connector exists; the CRM material in `06-operations-it/` is a product spec, not a live system to clean. |
| `customer-pulse` / `customer-pulse-check` | ⛔ Skip | `customer-success` agent already owns NPS/health-scoring in `08-customer-success/`; needs live customer data this repo doesn't hold. |
| `handle-complaint` | ⛔ Skip | Needs a live support-ticket connector; the process is already documented in prose in `08-customer-success/`. |
| `invoice-chase` | ⛔ Skip | Needs a live invoicing/payment connector (Stripe/PayPal/QuickBooks); ZATCA invoicing here is template-based (`03-finance/tax-invoice-template.html`), not a live payable/receivable system. |
| `lead-triage` / `sales-brief` | ⛔ Skip | Need a live CRM/pipeline feed; `07-gtm/b2b-pipeline` is a document, not a system. |
| `run-campaign` | ⛔ Skip | Needs live ad/email connectors; owned by GTM agents when it becomes relevant. |
| `smb-onboard` / `smb-router` | ⛔ Skip | Meta-skills for routing within this plugin itself — not content, nothing to adopt. |
| `tax-prep` / `tax-season-organizer` | ⛔ Skip | Framed around US "tax season"; KSA VAT/ZATCA compliance is a different shape of problem, already owned by `04-compliance-ksa/zatca-phase-2-e-invoicing.md` and `finance-steward`. |
| `ticket-deflector` | ⛔ Skip | Needs a live support-ticket connector. |

## Legal (9 skills) — `claude.com/plugins/legal`

| Skill | Verdict | Why |
| --- | --- | --- |
| `review-contract` | ✅ Recommend (as a second opinion) | Genuinely useful for a fast, generic first pass on vendor/pilot agreements before `legal-scribe`'s KSA-aware drafting — but never as a substitute for it: this skill has no PDPL or Saudi-law context, so treat its output as a checklist prompt, not final legal judgment. |
| `triage-nda` | ✅ Recommend (as a second opinion) | Fast first-pass triage of inbound NDAs (school pilots, vendor NDAs) against `02-legal/` templates before `legal-scribe` finalizes. Low risk since it's triage, not execution — nothing it produces should be signed without review. |
| `vendor-check` | 🟡 Situational | Overlaps `03-finance/procurement.md` and the `operations` plugin's `vendor-review` skill (see below) — worth trying once, redundant if either of those is already in use. |
| `legal-risk-assessment` | 🟡 Situational | Generic risk-severity triage; overlaps the risk registers already maintained in `01-governance/` and `09-investor-relations/risk-register.md`. |
| `legal-response` | 🟡 Situational | Drafts responses to legal requests; a reasonable first-draft scaffold, but `legal-scribe` should still own final language given the sensitive-content handling this repo requires. |
| `brief` / `meeting-briefing` | 🟡 Situational | Generic meeting-prep briefing generator; could assist `governance-clerk`'s board-pack assembly, marginal value over what that agent already does. |
| `compliance-check` | 🟡 Situational | Generic compliance-check playbook with no PDPL/ZATCA/MISA awareness — `ksa-compliance` is the better tool for anything Saudi-regulatory; only useful as a rough first pass on non-KSA-specific policy gaps. |
| `signature-request` | ⛔ Skip | Needs a DocuSign-class e-signature connector, not configured in this repo. |

## A discovery worth flagging (not one of the three requested sources)

The same catalog query surfaced an **`operations`** plugin (`claude.com/plugins/operations`,
9 skills: `vendor-review`, `process-doc`, `runbook`, `compliance-tracking`, `risk-assessment`,
`change-request`, `capacity-plan`, `status-report`, `process-optimization`) that fits
`06-operations-it/` — vendor evaluation and runbook drafting in particular — arguably better than
most of the 31 Small Business skills do. It wasn't one of the three sources named for this
evaluation, so it isn't formally recommended here, but it's worth a look if the owner wants to
extend this evaluation.

## Bottom line

Two skills are worth actually turning on and using: **`legal:review-contract`** and
**`legal:triage-nda`**, both strictly as a second-opinion first pass ahead of `legal-scribe`, never
as a substitute for it. Everything else is either blocked on a connector this repo doesn't have,
assumes a regulatory regime (SOX, US tax season) that doesn't apply to a private KSA company, or
duplicates ground a territory agent already covers with this repo's own conventions. That's a much
narrower result than "run three departments on Claude" — which is what a promotional thread would
say regardless of fit.
