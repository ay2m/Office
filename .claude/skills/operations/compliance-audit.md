---
name: compliance-audit
description: Quarterly compliance audit — PDPL, ZATCA, Nitaqat/Tamheer, decision log, data residency
---

# Compliance-Audit Workflow

**Orchestrator:** operations-orchestrator  
**Cadence:** 1st Sunday of Q2, Q3, Q4, Q1 at 09:00 UTC (unattended)  
**Manual trigger:** `/compliance-audit`  
**Duration target:** 45 minutes  
**Participants:** ksa-compliance, flight-data-pipeline-engineer, entity-facts-guardian, governance-auditor

## Pre-flight checks

- [ ] All three repos accessible (Office, FlyGACA, Captain-Adel)
- [ ] MCP server running
- [ ] No ongoing feature-ship workflows (compliance audit can run in parallel with full-sync)

## Workflow Steps

### Step 1: PDPL Compliance Check (ksa-compliance)
**Duration:** 10-12 minutes

1. Fetch `04-compliance-ksa/compliance-roadmap.md` (source of PDPL status)
2. Parse compliance checklist:
   - [ ] Lawful basis documented (contract/ToS covers processing)
   - [ ] Data minimization: only collect what's needed (name, email, progress; no passport, no address)
   - [ ] Retention policy: 2 years post-closure for personal data, 7 years max for quiz scores
   - [ ] Right to be forgotten: deletion procedure exists and tested
   - [ ] Data residency: data stays in Kingdom (me-central2 Dammam) or anonymized
   - [ ] Breach notification: 72-hour procedure documented and rehearsed
   - [ ] Audit trail: immutable logging of all data mutations
3. Check for open PDPL risks:
   - **Current open risk:** Cloud SQL in Singapore (not in-Kingdom) — document mitigation timeline
   - **Current open risk:** Gemini inference outside Kingdom (US/EU) — document in RAG spec, not hidden
4. Verify audit trail implementation:
   - Fetch sample audit log entries from flight-data-pipeline-engineer
   - Verify all mutations have who/what/when/why fields
   - Verify audit log is encrypted at rest and immutable
5. Check breach notification procedure:
   - Verify contact list is current (founder, ZATCA, affected learners)
   - Verify 72-hour timeline documented (not post-facto)
6. Generate PDPL audit:
   - Compliant: ✅/❌ for each checkbox
   - Open risks: list with mitigation timeline
   - Last tested: date of last breach drill or audit

**Outcomes:**
- ✅ PDPL compliant, all checks pass, risks documented
- ⚠️ One or two minor gaps (e.g., breach procedure not recently tested) — remediate within 30 days
- ❌ Critical gaps (e.g., data residency violated, audit trail missing) — URGENT: remediate within 7 days

### Step 2: ZATCA Readiness (ksa-compliance)
**Duration:** 5-6 minutes

1. Check `04-compliance-ksa/fatoora-phase2-decision-2026-07.md` for current status
2. Verify Fatoora Phase 2 readiness:
   - Is Phase 2 mandatory yet? (check ZATCA deadline)
   - Are invoices formatted per Phase 2 spec? (ZATCA XML schema)
   - Is the tax-invoice template in `03-finance/tax-invoice-template.html` compliant?
3. Verify VAT compliance:
   - VAT effective date: 2025-11-01 (quarterly returns)
   - Are VAT calculations correct in invoice template?
   - Is VAT return worksheet in `03-finance/vat-return-worksheet.html` up-to-date?
4. Verify ZATCA registration:
   - Tax ID (TIN) in company-facts.md matches ZATCA registry
   - Business classification correct
5. Generate ZATCA audit:
   - Phase 2 readiness: on-track / at-risk / complete
   - VAT compliance: ✅/❌
   - Next action: date of next ZATCA compliance review

**Outcomes:**
- ✅ ZATCA ready, invoices compliant, VAT calculated correctly
- ⚠️ Phase 2 deadline approaching — prioritize template updates
- ❌ ZATCA registration out of sync — URGENT: update TIN and business classification

### Step 3: Nitaqat/Tamheer/Doroob Status (ksa-compliance)
**Duration:** 3-4 minutes

1. Check `05-people/` for current headcount:
   - If 0 employees (founder only) → N/A, log as "pre-hire status"
   - If 1+ employees → check Nitaqat tier (based on Saudi headcount %):
     - Tier 4: 30% Saudi staff
     - Tier 3: 50% Saudi staff
     - Tier 2: 75% Saudi staff
     - Tier 1: 100% Saudi staff
2. If applicable:
   - Verify Nitaqat status registered with MOHRSD
   - Verify Tamheer (training fund) contributions current
   - Verify Doroob (scholarship program) participation documented
3. Generate status:
   - Nitaqat: N/A / Tier 4/3/2/1
   - Tamheer: compliant / overdue
   - Doroob: participating / not required

**Outcomes:**
- ✅ Nitaqat/Tamheer compliant (or N/A pre-hire)
- ⚠️ Approaching a tier transition — plan hiring to maintain compliance
- ❌ Out of compliance — URGENT: file correction with MOHRSD

### Step 4: Learner Data Audit (flight-data-pipeline-engineer)
**Duration:** 10-12 minutes

1. Verify learner data pipeline compliance:
   - Fetch audit trail sample from learner database (100-200 recent mutations)
   - Verify each entry has: learner_id, timestamp, action (insert/update/delete), field, old_value, new_value, who, why
   - Verify audit trail is immutable (no edits to historical entries)
   - Verify encryption at rest is enabled (Cloud SQL instance configuration)
2. Verify data residency:
   - Confirm learner data is stored in me-central2 (Dammam) or anonymized
   - **Document open risk:** Cloud SQL currently in Singapore (not in-Kingdom PDPL violation) with mitigation timeline
   - Verify no learner queries sent to US/EU services (no Google Analytics with learner IDs, etc.)
3. Verify retention policy implementation:
   - Sample active accounts: verify no PII purge
   - Sample closed accounts (deleted 2+ years ago): verify PII purged, only anonymized scores retained
   - Verify 7-year retention ceiling for quiz scores enforced
4. Verify currency calculation accuracy:
   - Sample 5-10 learners at various certification levels
   - Verify PPL currency (3 takeoffs/landings in 90d) calculated correctly
   - Verify CPL currency (dual instruction annually) calculated correctly
   - Verify IR currency (6 approaches in 6 months) calculated correctly
5. Generate data audit:
   - Audit trail: complete and immutable ✅/❌
   - Data residency: compliant / open risk documented
   - Retention policy: enforced ✅/❌
   - Currency accuracy: validated ✅/❌

**Outcomes:**
- ✅ Learner data pipeline compliant, audit trail immutable, retention policy enforced, currency accurate
- ⚠️ Minor issues (e.g., 1-2 audit entries missing a field, retention cleanup overdue by <30 days)
- ❌ Critical issues (e.g., learner data in wrong region, retention policy not enforced, currency calculation wrong) — URGENT

### Step 5: Entity Facts Verification (entity-facts-guardian)
**Duration:** 3-4 minutes

1. Fetch company-facts.md and cross-check with MCP state `office-entity-facts-v1`
2. Verify 12 entity fields:
   - Legal entity name consistent
   - Founder name consistent (resolve ambiguity: "Adel Al-Subaie" vs "Adel Yahya A. Madkhali")
   - Tax ID (ZATCA) matches ZATCA registry
   - Domain current and valid
   - Contact email monitored
   - HQ region is me-central2 (Dammam, in-Kingdom)
3. **HARD RULE CHECK:** IBAN and account number NOT in manifest
4. Generate entity audit:
   - All 12 fields verified ✅
   - IBAN protection confirmed ✅
   - ZATCA match confirmed ✅

**Outcomes:**
- ✅ Entity facts consistent, no drift
- ⚠️ Minor drift (email changed) — auto-update
- ❌ CRITICAL drift or IBAN leak — FAIL, alert founder

### Step 6: Decision Log Compliance (governance-auditor)
**Duration:** 3-4 minutes

1. Fetch `01-governance/decision-log.md`
2. Extract all compliance-related decisions (keywords: PDPL, ZATCA, MISA, Nitaqat, breach, audit, risk, security)
3. For each decision:
   - Verify reversibility field populated (Fully Reversible / Reversible with cost / Point-of-no-return)
   - Verify owner assigned
   - Verify stakeholders listed
   - Verify review date set
4. Flag any orphaned decisions:
   - Decision > 90 days old without resolution or review date → escalate
5. Generate decision audit:
   - Compliance decisions: N found
   - Orphaned (> 90d): N found
   - Format compliance: ✅/❌

**Outcomes:**
- ✅ All decisions formatted, no orphaned compliance decisions
- ⚠️ Format issues (typos, missing fields) — log and continue
- ❌ Orphaned compliance decision (> 90d) — ALERT: require CEO resolution

### Step 7: Summary and Report
**Duration:** 3-5 minutes

1. Aggregate results from steps 1-6:
   - PDPL: compliant/at-risk/non-compliant
   - ZATCA: ready/at-risk/non-compliant
   - Nitaqat/Tamheer: compliant/N/A/at-risk
   - Learner data: compliant/at-risk/non-compliant
   - Entity facts: consistent/drift/critical
   - Decision log: compliant/issues/orphaned
2. Determine overall audit rating:
   - ✅ GREEN: all compliant, no critical risks
   - ⚠️ YELLOW: 1-2 at-risk items with <30 day remediation timeline
   - 🔴 RED: critical non-compliance or orphaned decisions >90d
3. Generate formal audit report (PDF):
   ```
   Fly GACA Compliance Audit — Q[N] [YYYY]
   
   Executive Summary:
   - Overall rating: [GREEN/YELLOW/RED]
   - Date: [YYYY-MM-DD]
   - Duration: X minutes
   - Auditor agents: [list]
   
   PDPL Compliance:
   - Status: [pass/at-risk/fail]
   - Checks: X/Y passed
   - Open risks: [list with mitigation timeline]
   
   ZATCA Readiness:
   - Phase 2 status: [on-track/at-risk/complete]
   - VAT compliance: [✅/❌]
   
   Nitaqat/Tamheer/Doroob:
   - Status: [compliant/N/A/at-risk]
   
   Learner Data Security:
   - Audit trail: [immutable/issues]
   - Data residency: [in-Kingdom/open risk]
   - Retention policy: [enforced/issues]
   - Currency accuracy: [validated/issues]
   
   Entity Facts:
   - Consistency: [consistent/drift/critical]
   - IBAN protection: [confirmed/VIOLATED]
   
   Decision Log:
   - Format compliance: [✅/⚠️]
   - Orphaned decisions: [0 / N]
   
   Recommendations & Next Steps:
   - [List remediation items with deadlines]
   - [List for next quarter's audit]
   ```
4. Store report in `04-compliance-ksa/compliance-audit-Q[N]-[YYYY].md`
5. Post report to Slack #compliance:
   - If GREEN: "Q[N] compliance audit passed ✅"
   - If YELLOW: "Q[N] audit at-risk ⚠️ — [X] items for remediation within 30 days"
   - If RED: "Q[N] audit CRITICAL 🔴 — [X] items require urgent action"
6. If RED:
   - Email founder with full report and required actions
   - Schedule follow-up audit in 7 days

## Decision Tree

```
PDPL compliant?
├─ Yes → Continue to ZATCA check
├─ At-risk → Flag for remediation, continue
└─ No (CRITICAL) → FAIL, alert founder

ZATCA ready?
├─ Yes → Continue to Nitaqat check
├─ At-risk (deadline approaching) → Flag, continue
└─ No → FAIL, alert founder

Nitaqat/Tamheer compliant?
├─ Yes/N/A → Continue to learner data audit
└─ No → Flag, continue

Learner data secure?
├─ Yes → Continue to entity facts check
├─ At-risk (remediation available) → Flag, continue
└─ No (CRITICAL) → FAIL, alert founder

Entity facts consistent?
├─ Yes → Continue to decision log check
└─ No → FAIL, alert founder

Decision log compliant?
├─ Yes → Generate report, post to Slack
├─ Minor issues → Log issues, generate report
└─ Orphaned decisions (>90d) → ALERT: require CEO decision

Overall audit rating?
├─ GREEN → Post to Slack, no action required
├─ YELLOW → Post to Slack with remediation items, 30-day deadline
└─ RED → Email founder, alert CEO, 7-day follow-up audit
```

## Idempotency

Running compliance-audit twice in the same quarter (without intervening code/data changes) should produce the same results:
- Same entity facts → same consistency check
- Same learner data → same residency/retention/currency checks
- Same decision log → same compliance check

## Escalation Contacts

- PDPL/data security issues → ksa-compliance agent, escalate to founder
- ZATCA issues → ksa-compliance agent, escalate to CFO (finance team)
- Learner data security → flight-data-pipeline-engineer, escalate to founder
- Governance/decision log → governance-auditor, escalate to CEO
- CRITICAL findings → Email founder immediately (flygaca@gmail.com per CLAUDE.md)
