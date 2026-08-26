---
name: security-hardening
description: On-demand security audit — XSS/injection/data residency/PDPL review across frontend, backend, data pipeline, compliance
---

# Security-Hardening Workflow

**Orchestrator:** operations-orchestrator  
**Trigger:** Manual command `/security-hardening` (can run anytime; recommended quarterly or post-incident)  
**Duration target:** 60 minutes  
**Participants:** react-19-architect, express-backend-pro, flight-data-pipeline-engineer, ksa-compliance

## Pre-flight checks

- [ ] All three repos accessible (Office, FlyGACA, Captain-Adel)
- [ ] MCP server running
- [ ] No ongoing feature-ship or compliance-audit workflows (security review can run in parallel with full-sync)

## Workflow Steps

### Step 1: React Frontend Security Review (react-19-architect)
**Duration:** 15 minutes

1. Audit React components in FlyGACA:
   - TypeScript strict mode enabled (no `any` types anywhere)
   - All user input sanitized before render (no raw HTML injection via `dangerouslySetInnerHTML`)
   - RTL logical properties enforced (margin-inline, padding-inline, not margin-left/right, padding-left/right)
   - No sensitive data (tokens, credentials, PII) stored in localStorage
   - No third-party libraries loading from CDNs without subresource integrity (SRI) attributes
   - XSS attack surface: trace data flow from user input → React components → DOM

2. Run linter + typecheck:
   - `npm run lint` on all changed files
   - `npm run type-check` to catch unsafe type coercions

3. Check for deprecated or insecure patterns:
   - No usage of `eval()` or `new Function()`
   - No inline scripts or event handlers (onclick, onload, etc.)
   - No hardcoded secrets in source code (API keys, tokens)

4. Generate findings:
   - List all XSS vulnerabilities by severity
   - Estimate impact and remediation effort per finding

**Outcomes:**
- ✅ No XSS vulnerabilities; all user input sanitized; TypeScript strict mode enforced
- ⚠️ Minor XSS risk (e.g., third-party library with outdated dependency) — remediation available, < 1 day effort
- ❌ Critical XSS vector (e.g., raw HTML injection, unescaped user input) — URGENT: block merge until fixed

### Step 2: Express Backend Security Review (express-backend-pro)
**Duration:** 15 minutes

1. Audit Express API in FlyGACA and Captain-Adel:
   - Parameterized queries mandatory (no string concatenation in SQL)
   - HttpOnly JWT cookies only (no localStorage tokens; no bearer tokens in URLs)
   - Server-owned entitlements (backend verifies access; frontend never trusts user roles)
   - me-central2 region confirmed for all data reads/writes (no data leaks to Doha or US)
   - Error responses generic to client (no stack traces, no SQL error messages, no file paths leaked)
   - CORS origin whitelist enforced (not `*`; specific domains listed)
   - Request rate limiting in place (protect against brute force)
   - Database connection pool limits enforced (prevent resource exhaustion)

2. Run linter + typecheck on API code:
   - `npm run lint`
   - `npm run type-check`

3. Check for injection vulnerabilities:
   - SQL injection: audit all database query calls
   - NoSQL injection (if using Mongo): validate all object paths
   - Command injection: audit all shell commands or external process calls
   - LDAP/XML/XPath injection if applicable

4. Verify secrets management:
   - No hardcoded secrets in source code
   - All secrets loaded from Secret Manager (Google Cloud Secret Manager)
   - Rotation policy enforced (JWT keys, database passwords, API keys)

5. Generate findings:
   - List all injection/auth/data-residency vulnerabilities by severity

**Outcomes:**
- ✅ No SQL injection, no auth bypass, no data-residency violation; HttpOnly JWT enforced
- ⚠️ Minor injection risk (e.g., outdated library patch available) — remediation available, < 1 day
- ❌ Critical injection vector or auth bypass — URGENT: block merge until fixed

### Step 3: Data Residency & Pipeline Security Review (flight-data-pipeline-engineer)
**Duration:** 15 minutes

1. Verify learner data never exported:
   - No learner data sent to US/EU cloud services (no Google Analytics with learner IDs, no third-party tracking)
   - Confirm all data processing stays in-Kingdom (me-central2 Dammam)
   - Check for data exfiltration via logs, metrics, or telemetry

2. Verify audit trail security:
   - Audit trail immutable (no edits to historical entries)
   - Audit trail encrypted at rest (database encryption enabled)
   - Audit trail includes who/what/when/why fields for all data mutations
   - Audit entries cannot be deleted retroactively (soft-delete only if needed, with tombstone record)

3. Verify anonymization procedures:
   - Breach scenario documented: how PII is stripped vs. scores retained
   - Anonymization reversible only by authorized staff (no deterministic hash; use one-way salt + hash)
   - Testing of anonymization performed and documented

4. Generate findings:
   - List data-residency violations, audit trail gaps, anonymization weaknesses by severity

**Outcomes:**
- ✅ Learner data stays in-Kingdom; audit trail immutable and encrypted; anonymization tested
- ⚠️ Minor data-residency risk (e.g., metrics exporter inadvertently includes sampling of IDs) — remediate < 7 days
- ❌ Critical data leak (learner data in US service, audit trail editable, anonymization broken) — URGENT

### Step 4: Compliance Security Review (ksa-compliance)
**Duration:** 10 minutes

1. Verify PDPL boundaries:
   - Lawful basis for processing documented (contract/ToS covers learner data, not unrelated processing)
   - Data minimization: only collect name, email, progress (no passport, no address, no biometrics)
   - Retention policy enforced: 2 years post-closure for active PII, 7 years max for quiz scores
   - Right to be forgotten: deletion procedure exists and has been tested
   - Data residency: data stays in Kingdom (me-central2 Dammam) or anonymized

2. Verify Gemini inference safety:
   - **OPEN RISK documented:** Gemini inference runs in US/EU (outside Kingdom) — this is known and documented in compliance roadmap, not hidden
   - RAG grounding: all responses grounded in curriculum + learner data (no hallucinations about regulations)
   - Prompt injection: chat input sanitized to prevent jailbreak attempts

3. Verify breach notification procedure:
   - Contact list current (founder, ZATCA, affected learners)
   - 72-hour timeline documented and feasible (not post-facto)
   - Breach response plan tested (tabletop drill or incident simulation)

4. Generate findings:
   - PDPL compliance checklist (✅/⚠️/❌ per item)
   - Open risks documented with mitigation timeline

**Outcomes:**
- ✅ PDPL compliant, Gemini risk documented, breach procedure tested
- ⚠️ One or two minor gaps (e.g., deletion procedure not tested recently) — remediate < 30 days
- ❌ Critical PDPL violation or hidden risk — URGENT: escalate to founder

### Step 5: Summary and Report
**Duration:** 5 minutes

1. Aggregate security findings from all four agents:
   - React XSS findings (count by severity)
   - Express injection/auth findings (count by severity)
   - Data-residency findings (count by severity)
   - PDPL/compliance findings (count by severity)

2. Determine overall security rating:
   - 🟢 GREEN: no critical findings; all issues have < 7 day remediation path
   - 🟡 YELLOW: 1-2 critical findings with clear remediation plan; OR multiple high-severity issues
   - 🔴 RED: critical finding with no clear fix; OR active data breach; OR PDPL violation unaddressed

3. Generate security audit report:
   ```
   Fly GACA Security Audit — [date]
   
   Executive Summary:
   - Overall rating: [GREEN/YELLOW/RED]
   - Critical findings: [N]
   - High-severity findings: [N]
   - Medium-severity findings: [N]
   - Low-severity findings: [N]
   
   React Frontend:
   - Status: [pass/warn/fail]
   - XSS findings: [N] critical, [N] high, [N] medium, [N] low
   - Key recommendations: [list]
   
   Express Backend:
   - Status: [pass/warn/fail]
   - Injection findings: [N] critical, [N] high, [N] medium, [N] low
   - Auth/data-residency findings: [list by severity]
   - Key recommendations: [list]
   
   Data Pipeline:
   - Status: [pass/warn/fail]
   - Data-residency violations: [list]
   - Audit trail status: [secure/issues]
   - Key recommendations: [list]
   
   PDPL & Compliance:
   - Status: [pass/warn/fail]
   - Compliance gaps: [list]
   - Open risks: [list with mitigation timeline]
   
   Remediation Plan:
   - Critical: [items with fix by date]
   - High: [items with fix by date]
   - Medium: [items with fix by date]
   - Low: [items with fix by date]
   ```

4. Store report in `04-compliance-ksa/security-hardening-YYYY-MM-DD.md`

5. Post to Slack #security:
   - If GREEN: "Security audit passed ✅ — no critical findings"
   - If YELLOW: "Security audit at-risk ⚠️ — [N] findings require remediation"
   - If RED: "Security audit CRITICAL 🔴 — [N] critical findings block merge"

6. If RED:
   - Email founder with full report and blocking items
   - Halt any pending feature-ship or full-sync workflows until critical findings resolved
   - Schedule follow-up audit in 7 days

## Decision Tree

```
React XSS secure?
├─ Yes → Continue to Express review
├─ At-risk → Flag for remediation, continue
└─ No (CRITICAL) → FAIL, block merge

Express injection/auth secure?
├─ Yes → Continue to data residency check
├─ At-risk → Flag for remediation, continue
└─ No (CRITICAL) → FAIL, block merge

Data stays in-Kingdom?
├─ Yes → Continue to PDPL check
├─ At-risk (metrics include sample IDs) → Flag, continue
└─ No (CRITICAL) → FAIL, escalate

PDPL compliant?
├─ Yes → Generate report, post to Slack
├─ At-risk (minor gaps) → Log issues, generate report
└─ No (CRITICAL) → FAIL, email founder

Overall security rating?
├─ GREEN → Post to Slack, no action required
├─ YELLOW → Post to Slack with remediation items, <7 day deadline
└─ RED → Email founder, block workflows, 7-day follow-up
```

## Escalation Contacts

- React/frontend security → react-19-architect, escalate to CTO
- Express/backend security → express-backend-pro, escalate to CTO
- Data-residency/pipeline security → flight-data-pipeline-engineer, escalate to founder
- PDPL/compliance security → ksa-compliance, escalate to founder
- CRITICAL findings → Email founder immediately (flygaca@gmail.com per CLAUDE.md)
