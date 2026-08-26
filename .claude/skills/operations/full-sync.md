---
name: full-sync
description: Weekly heartbeat workflow — verify entity facts, contract SHA, decision log consistency across three repos
---

# Full-Sync Workflow

**Orchestrator:** operations-orchestrator  
**Cadence:** Sunday 18:00 UTC (runs unattended)  
**Duration target:** 15 minutes  
**Participants:** entity-facts-guardian, cross-repo-sync, governance-auditor

## Pre-flight checks

- [ ] MCP server is running (required for state reads/writes)
- [ ] All three repos are accessible (ay2m/Office, ay2m/FlyGACA, ay2m/Captain-Adel)
- [ ] No ongoing feature-ship or orchestrator workflows (avoid conflicts)

## Workflow Steps

### Step 1: Entity Facts Verification (entity-facts-guardian)
**Duration:** 3-4 minutes

1. Fetch `01-governance/company-facts.md` from ay2m/Office (source of truth)
2. Parse the entity facts table and extract 12 fields:
   - Legal entity name
   - Founder name
   - Registration number
   - Tax ID (ZATCA)
   - Domain
   - Website URL
   - Contact email
   - HQ region (me-central2 Dammam)
   - Cloud provider (Google Cloud)
   - Billing account ID
   - Data residency (me-central2)
   - IBAN (verify NOT in manifest entity block — hard rule)
3. **CRITICAL CHECK:** Assert IBAN and account number are **NOT** in `contracts/flygaca-family.json` entity block
   - If found, FAIL immediately and alert founder
4. Read MCP state `office-entity-facts-v1` (last known good facts)
5. Compare current facts vs. cached facts:
   - If mismatch in non-sensitive fields (website, email), update cache and proceed
   - If mismatch in sensitive fields (founder name, domain, region), escalate to manual review
6. Write updated facts to MCP state `office-entity-facts-v1`

**Outcomes:**
- ✅ Facts verified, no drift
- ⚠️ Minor drift detected (website, email) — auto-update cache, log change
- ❌ CRITICAL drift or IBAN leak — FAIL workflow, alert founder

### Step 2: Contract SHA Verification (cross-repo-sync)
**Duration:** 5-6 minutes

1. Fetch `contracts/flygaca-family.json` from all three repos:
   - ay2m/Office (primary, owns entity block)
   - ay2m/FlyGACA (mirror, owns chat block)
   - ay2m/Captain-Adel (mirror, owns repos block)
2. Compute SHA256 hash of each file
3. Compare SHAs:
   - All three match → ✅ manifest in sync
   - Two match, one differs → ⚠️ one repo out of sync (manual re-stamp required)
   - All three differ → ❌ FAIL, possible corruption or manual edits
4. Read MCP state `cross-repo-health-v1` (last known good SHAs)
5. If SHAs match cached SHAs → report "no changes since last sync"
6. If SHAs differ from cache → check git log to see who changed it:
   - If changed by family-warden agent → expected, update cache
   - If changed by other agent → escalate (family-warden is sole owner)
7. Check version field in each manifest:
   - All three versions match → ✅
   - Versions differ → ⚠️ out of sync, need re-stamp
8. Write updated SHAs and version to MCP state `cross-repo-health-v1`

**Outcomes:**
- ✅ All three manifests byte-identical, versions match
- ⚠️ Versions differ by 1 (partial sync in progress) — wait 5 min, re-check
- ❌ SHAs mismatch or versions diverge — FAIL workflow, alert cross-repo-sync

### Step 3: Decision Log Audit (governance-auditor)
**Duration:** 3-4 minutes

1. Fetch `01-governance/decision-log.md` from ay2m/Office
2. Parse all DEC-NNN entries (extract decision ID, date, reversibility, owner, stakeholders)
3. Verify format compliance:
   - Each decision has format "**DEC-NNN:** Decision title" (✅ if all match)
   - Each has Date, Decision, Reversibility, Owner, Stakeholders, Review Date fields (✅ if all present)
   - Reversibility values are one of: "Fully Reversible", "Reversible with cost", "Point-of-no-return" (❌ if any other value)
4. Check for compliance-related decisions (keywords: PDPL, ZATCA, MISA, Nitaqat, breach, audit):
   - Extract dates and status
   - Alert if open compliance decision > 90 days old without resolution
5. Verify decision log was updated recently (last entry < 30 days old):
   - If no recent entries, log warning "decision log may be stale"
6. Write decision log audit to MCP state (timestamp, entry count, compliance flag)

**Outcomes:**
- ✅ All decisions properly formatted, no orphaned compliance decisions
- ⚠️ Format issues (typos, missing fields) — log warnings, don't fail
- ❌ Orphaned compliance decision > 90 days — FAIL, escalate to CEO

### Step 4: Summary and Report
**Duration:** 2-3 minutes

1. Aggregate results from steps 1-3:
   - Entity facts: pass/warn/fail
   - Contract SHAs: pass/warn/fail
   - Decision log: pass/warn/fail
2. Determine overall workflow status:
   - If all pass → ✅ HEALTHY
   - If 1-2 warn → ⚠️ AT RISK (log details, continue)
   - If any fail → ❌ CRITICAL (abort, alert)
3. Generate report:
   ```yaml
   full-sync-run:
     timestamp: 2026-08-26T18:00:00Z
     duration_minutes: 14
     status: healthy  # or at-risk, or critical
     
     entity-facts:
       status: pass
       fields-verified: 12
       drift: none
     
     contract:
       status: pass
       sha-office: abc123...
       sha-flygaca: abc123...
       sha-adel: abc123...
       all-match: true
     
     decision-log:
       status: pass
       entries: 42
       last-updated: 2026-08-20
       compliance-decisions-open: 0
     
     blockers: []
   ```
4. If HEALTHY or AT RISK:
   - Post report to Slack #operations
   - Store report in `06-operations-it/logs/full-sync-YYYY-MM-DD-HHMM.yaml`
5. If CRITICAL:
   - Post URGENT alert to Slack + email founder
   - Store report with CRITICAL flag
   - Halt any pending workflows

## Decision Tree

```
Entity facts verified?
├─ Yes → Continue to Step 2
└─ No (CRITICAL) → FAIL: alert founder, abort workflow

Contract SHAs match?
├─ Yes → Continue to Step 3
├─ Partial (2 of 3) → WARN: log out-of-sync repo, continue
└─ No (0-1 match) → FAIL: alert cross-repo-sync, abort workflow

Decision log formatted?
├─ Yes → Continue to Step 4
├─ Minor issues (typos) → WARN: log issues, continue
└─ Critical issues (wrong format) → FAIL: alert governance-auditor, abort

Workflow complete?
├─ HEALTHY → Post to Slack, store report
├─ AT RISK → Post to Slack with warnings, store report
└─ CRITICAL → Email founder, page on-call, store critical report
```

## Rollback (if needed)

If workflow detects corruption (e.g., IBAN in manifest or manifest SHAs all different):

1. **Do not attempt to fix automatically.** This is a family-level integrity issue.
2. **Alert founder immediately** with the exact problem (file path, line number, corrupted value)
3. **Halt all feature-ship and compliance-audit workflows** until resolved
4. **Manual recovery:** family-warden agent will manually inspect and re-stamp the manifest

## Idempotency

Running full-sync twice in a row should produce identical reports (assuming no intervening changes):
- Entity facts haven't changed → same report
- Contract hasn't been edited → same report
- Decision log hasn't been updated → same report

This allows full-sync to be re-run safely without side effects.
