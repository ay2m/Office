# Fly GACA — Launch-Gate Legal Checklist
**Document:** Launch-Gate-Legal-Checklist-2026-06-14.md
**Version:** 1.0 — 2026-06-14
**Prepared by:** AI assistant (Claude) — for founder review
**Status:** Living document — update as items complete. Cross-referenced against: Legal-Gap-Audit-2026-06-14.md, Fly-GACA-Review-Action-Plan.md §6–7, and ROADMAP launch gate.

> **NOT LEGAL ADVICE.** This checklist is a business-operations tracking document only. It does not substitute for advice from a qualified Saudi-licensed lawyer. All items marked "needs lawyer" must receive professional legal review before they are treated as complete.

---

## Overview — Launch Gate Summary

Three distinct launch events have different legal requirements:

| Launch Event | Description | Legal Gate |
|-------------|-------------|-----------|
| **L0 — Soft open (library, no accounts)** | Public access to free library; no accounts; no payments | Minimal — terms + disclaimer + pending name opinion |
| **L1 — Accounts launch** | User registration, free tier, waitlist conversion | Full P0 list complete; Privacy Notice updated; Cookie Notice live |
| **L2 — Payments launch (Pro / Exam Pass)** | Paid subscriptions via Moyasar; ZATCA VAT | L1 complete + entity + ZATCA + refund policy + B2B DPA |
| **L3 — Academy B2B launch** | Signed Academy agreements; cadet processing | L2 complete + B2B DPA signed with each customer |

---

## Table 1 — Absolute Launch Blockers (Nothing Ships Without These)

| # | Item | Document / Deliverable | Status | Owner | Blocks | What Unblocks It |
|---|------|----------------------|--------|-------|--------|-----------------|
| **P0-1** | **Corpus rights legal opinion** | Written opinion from Saudi IP counsel on whether Fly GACA may host Tier A GACA documents | OUTSTANDING — brief drafted | Founder → Saudi IP lawyer | **All launches (L0–L3)** | Receive written opinion; act on counsel's advice (host / link-only / request GACA permission) |
| **P0-2** | **"Fly GACA" name legal opinion** | Written trade mark / passing-off opinion from Saudi IP counsel | OUTSTANDING — brief drafted | Founder → Saudi IP lawyer | **Entity formation → bank → payments → L2** | Receive opinion; lock name; commence SAIP trade mark application |
| **P0-3** | **Terms of Use (public website)** | Terms-of-Use-DRAFT-2026-06-14.md — lawyer reviewed and published | DRAFTED — awaiting lawyer review | Founder → lawyer | **L0** | Lawyer sign-off; email contact updated (`hello@` → `i@`); published at flygaca.com/terms |
| **P0-4** | **Disclaimer and Educational Use Notice** | Disclaimer-and-Educational-Use-Notice-DRAFT-2026-06-14.md — lawyer reviewed and published | DRAFTED — awaiting lawyer review | Founder → lawyer | **L0** | Lawyer sign-off; published at flygaca.com/disclaimer; replaces existing draft |
| **P0-5** | **Privacy Notice (pre-account, current)** | privacy.html — existing draft covers pre-account stage | EXISTING DRAFT adequate for L0 only — email needs update | Founder | **L0** | Fix `hello@` → `i@` or `privacy@` in existing privacy.html; no lawyer required for this specific fix |
| **P0-6** | **PDPL DPIA — lawyer/specialist review** | PDPL Compliance Program & DPIA.docx (04-compliance-ksa/) — internally complete; needs PDPL counsel review | INTERNALLY DRAFTED — awaiting PDPL specialist review | Founder → PDPL counsel | **L1 (accounts + AI)** | PDPL counsel or SDAIA-qualified consultant signs off on DPIA before AI features go live |

---

## Table 2 — Required Before Account Launch (L1 — within 30 days of L0)

| # | Item | Document / Deliverable | Status | Owner | Blocks | What Unblocks It |
|---|------|----------------------|--------|-------|--------|-----------------|
| **P1-1** | **Privacy Notice — full account stage** | Privacy-Notice-Full-Stage-DRAFT-2026-06-14.md — covers accounts, AI, payments | DRAFTED — awaiting lawyer review | Founder → lawyer | **L1** | Lawyer review; published to replace pre-account privacy.html before first account is created |
| **P1-2** | **Cookie and Tracking Notice** | Cookie-and-Tracking-Notice-DRAFT-2026-06-14.md | DRAFTED — awaiting lawyer review | Founder → lawyer | **L1** | Lawyer review; published at flygaca.com/cookies; linked from footer and Privacy Notice |
| **P1-3** | **Acceptable Use Policy (AUP)** | Acceptable-Use-Policy-DRAFT-2026-06-14.md | DRAFTED — awaiting lawyer review | Founder → lawyer | **L1** | Lawyer review; published at flygaca.com/aup; linked from Terms of Use |
| **P1-4** | **PDPL Breach Notification Procedure** | PDPL-Breach-Notification-Procedure-DRAFT-2026-06-14.md | DRAFTED — awaiting lawyer review | Founder → lawyer | **L1** | Lawyer review; SDAIA notification channel confirmed; document operational before first account |
| **P1-5** | **IP and Takedown Procedure** | IP-and-Takedown-Procedure-DRAFT-2026-06-14.md | DRAFTED — awaiting lawyer review | Founder → lawyer | **L1** | Lawyer review; published at flygaca.com/ip-policy or linked from Terms of Use |
| **P1-6** | **Contact email consistency** | All legal docs currently show `hello@flygaca.com` — audit confirmed correct address is `i@flygaca.com` and `legal@flygaca.com` | OPEN — quick fix | Founder | **L0** (low risk but should be fixed) | Update all draft documents and live terms.html / disclaimer.html / privacy.html |
| **P1-7** | **Sub-Processor Register — current** | Sub-Processor List & DPA Register.docx (04-compliance-ksa/) — confirm Cloudflare Web Analytics, Moyasar are listed | PARTIAL — review needed | Founder | **L1** | Review and update register; ensure all active sub-processors listed before accounts go live |

---

## Table 3 — Required Before Payments Launch (L2 — ~30 days post L1)

| # | Item | Document / Deliverable | Status | Owner | Blocks | What Unblocks It |
|---|------|----------------------|--------|-------|--------|-----------------|
| **P2-1** | **Entity formation (MISA / Monshaat)** | MISA Investment License Application Bundle.docx (04-compliance-ksa/) — in progress | IN PROGRESS — not yet incorporated | Founder | **L2 (required for bank account and ZATCA registration)** | Entity incorporated; CR issued; legal entity name confirmed (depends on P0-2 name opinion) |
| **P2-2** | **ZATCA VAT registration** | Saudi Tax & Compliance Calendar.docx (04-compliance-ksa/) | NOT STARTED — depends on entity | Founder | **L2** | Entity formed; VAT registration submitted to ZATCA; VAT number obtained before first paid transaction |
| **P2-3** | **ZATCA e-invoicing (Fatoora) compliance** | ZATCA Fatoora E-Invoicing Compliance Pack.docx (04-compliance-ksa/) | DRAFTED — not yet implemented | Founder | **L2** | Fatoora Phase 1 compliance enabled; QR-code invoices issued for each transaction |
| **P2-4** | **Public Refund and Cancellation Policy** | Covered in Terms-of-Use §5.4 — but may also need a standalone page for Moyasar compliance and App Store requirements | PARTIALLY COVERED in Terms of Use | Founder | **L2** | Confirm with Moyasar what refund policy display is required; publish standalone page if needed |
| **P2-5** | **Customer Agreement & EULA — lawyer reviewed** | Customer Agreement EULA.docx (02-legal/) — comprehensive draft exists but not yet lawyer-reviewed | EXISTING DRAFT — awaiting lawyer review | Founder → lawyer | **L2 (Pro paid tier)** | Lawyer review; Arabic translation initiated; published as paid-tier agreement |
| **P2-6** | **Moyasar merchant agreement and integration** | Commercial agreement with Moyasar; payment page compliance | IN PROGRESS | Founder | **L2** | Moyasar agreement signed; integration tested; refund policy displayed as required |

---

## Table 4 — Required Before Academy B2B Launch (L3)

| # | Item | Document / Deliverable | Status | Owner | Blocks | What Unblocks It |
|---|------|----------------------|--------|-------|--------|-----------------|
| **P3-1** | **B2B Data Processing Agreement (DPA)** | B2B-Data-Processing-Agreement-DRAFT-2026-06-14.md | DRAFTED — awaiting lawyer review | Founder → lawyer | **L3** | Lawyer review; Arabic translation; must be signed by each Academy customer before data processing begins |
| **P3-2** | **Order Form template** | No standalone Order Form exists (referenced in Customer Agreement) | MISSING | Founder → lawyer | **L3** | Create and lawyer-review an Order Form template to accompany the Customer Agreement |
| **P3-3** | **60-Day Pilot Agreement — current** | 60-Day Pilot Agreement.docx (02-legal/) — existing draft | EXISTING — check currency against updated Terms | Founder | **L3 (pilot deals)** | Review for consistency with updated Terms of Use and DPA; lawyer confirm adequate |
| **P3-4** | **SLA — current** | Service Level Agreement (SLA).docx (02-legal/) — existing draft | EXISTING — check currency | Founder | **L3** | Review for consistency with updated commercial terms |

---

## Table 5 — Lawyer-Only Items (Fly GACA Cannot Produce These)

| # | Item | Brief Document | Status | Owner | Blocks | Note |
|---|------|--------------|--------|-------|--------|------|
| **L-1** | **Corpus rights opinion** | Lawyer-Brief-Corpus-Rights-2026-06-14.md | BRIEF READY — awaiting lawyer engagement | Founder → Saudi IP lawyer | **L0** (absolute blocker) | Cannot be self-produced; requires written opinion from Saudi IP lawyer |
| **L-2** | **Name / trade mark opinion** | Lawyer-Brief-Name-Opinion-2026-06-14.md | BRIEF READY — awaiting lawyer engagement | Founder → Saudi IP lawyer | **Entity + L2** (absolute blocker) | Cannot be self-produced; requires written opinion + SAIP advice |
| **L-3** | **PDPL DPIA specialist review** | PDPL Compliance Program & DPIA.docx (04-compliance-ksa/) | INTERNALLY DRAFTED | Founder → PDPL specialist | **L1 (AI features)** | Internal DPIA completed by founder; needs SDAIA-qualified consultant or PDPL lawyer sign-off |
| **L-4** | **Arabic translations of P0/P1 documents** | All P0 and P1 documents | NOT STARTED | Founder → certified legal translator | **L1 (best practice); L2 (may be required)** | Counsel should advise whether Arabic versions are legally required or best practice for KSA consumer contracts |
| **L-5** | **SAIP trade mark application** | Depends on P0-2 opinion | NOT STARTED | Founder → Saudi trade mark attorney | **Post-name opinion** | File as soon as name is confirmed |

---

## Table 6 — Medium-Term Items (P2 — within 90 days post-launch)

| # | Item | Status | Priority |
|---|------|--------|----------|
| Standalone AI Output Policy for Captain Adel | Not yet drafted | P2 |
| Content Attribution and Citation Policy | Not yet drafted | P2 |
| White-Label / Reseller Agreement (if channel sales pursued) | Not yet drafted | P2 |
| Arabic translations of all P0/P1 documents | Not started | P2 (legal requirement assessment pending counsel advice) |

---

## Table 7 — Pre-Series A Items (P3)

| # | Item | Note |
|---|------|------|
| External PDPL audit by certified KSA privacy consultant | After accounts launch and 3+ months of data |
| Full trade mark registration (SAIP — KSA + GCC consideration) | After name opinion and SAIP advice |
| External security penetration test | Before institutional / government Academy customers |
| Compliance with NCA Essential Cybersecurity Controls | As platform scales |

---

## Quick-Reference: What Unblocks Soft Launch (L0)?

1. [ ] P0-1 corpus rights opinion — OR a precautionary link-only model adopted pending the opinion
2. [ ] P0-2 name opinion — OR launch under "Fly GACA" at acceptable risk (founder decision after reading this checklist)
3. [x] P0-3 Terms of Use — DRAFTED (needs lawyer review + email fix before publish)
4. [x] P0-4 Disclaimer — DRAFTED (needs lawyer review + email fix before publish)
5. [ ] P0-5 email fix — update `hello@` to `i@` in all live pages (15-minute task)
6. [ ] LAWYER ENGAGEMENT — contact shortlisted lawyers (LAWYER-SHORTLIST.md); send briefs (Lawyer-Brief-Corpus-Rights + Lawyer-Brief-Name-Opinion + existing LAWYER-BRIEF.md)

**The critical path is: lawyer engaged → opinions received → decisions made → entity formed → bank opened → launch sequence begins.**

---

## Document Index (02-legal/ as of 2026-06-14)

| File | Type | Created / Existing |
|------|------|-------------------|
| Terms-of-Use-DRAFT-2026-06-14.md | P0 public-facing | Created 2026-06-14 |
| Disclaimer-and-Educational-Use-Notice-DRAFT-2026-06-14.md | P0 public-facing | Created 2026-06-14 |
| Cookie-and-Tracking-Notice-DRAFT-2026-06-14.md | P1 public-facing | Created 2026-06-14 |
| B2B-Data-Processing-Agreement-DRAFT-2026-06-14.md | P1 B2B | Created 2026-06-14 |
| IP-and-Takedown-Procedure-DRAFT-2026-06-14.md | P1 operational | Created 2026-06-14 |
| PDPL-Breach-Notification-Procedure-DRAFT-2026-06-14.md | P1 operational | Created 2026-06-14 |
| Lawyer-Brief-Corpus-Rights-2026-06-14.md | Lawyer brief | Created 2026-06-14 |
| Lawyer-Brief-Name-Opinion-2026-06-14.md | Lawyer brief | Created 2026-06-14 |
| Launch-Gate-Legal-Checklist-2026-06-14.md | This document | Created 2026-06-14 |
| Privacy-Notice-Full-Stage-DRAFT-2026-06-14.md | P1 public-facing | Created prior session |
| Acceptable-Use-Policy-DRAFT-2026-06-14.md | P1 public-facing | Created prior session |
| Legal-Gap-Audit-2026-06-14.md | Audit | Created prior session |
| LAWYER-BRIEF.md / .docx | Earlier lawyer brief | Existing — May 2026 |
| BRIEF-defensible-naming.md | Earlier naming analysis | Existing — May 2026 |
| RISK-MEMO.md | Internal risk analysis | Existing — May 2026 |
| LAWYER-SHORTLIST.md | Candidate law firms | Existing — May 2026 |
| Customer Agreement EULA.docx | B2B commercial | Existing — May 2026 |
| Mutual NDA.docx | NDA | Existing — May 2026 |
| One-Way NDA.docx | NDA | Existing — May 2026 |
| IP Assignment Agreement.docx | Internal/HR | Existing — May 2026 |
| Confidentiality & Non-Compete Agreement.docx | Internal/HR | Existing — May 2026 |
| Influencer Creator Partnership Agreement.docx | Marketing | Existing — May 2026 |
| Service Level Agreement (SLA).docx | B2B commercial | Existing — May 2026 |
| 60-Day Pilot Agreement.docx | B2B commercial | Existing — May 2026 |

---

*Document version 1.0 — 2026-06-14. Update as items complete. Last status review: 2026-06-14 (founder).*
