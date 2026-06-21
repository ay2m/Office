# Fly GACA — Legal Gap Audit
**Date:** 2026-06-14  
**Prepared by:** Claude (AI assistant) — for founder review and Saudi-licensed legal counsel sign-off  
**Scope:** 02-legal/, 01-governance/, 04-compliance-ksa/ + live PWA pages (terms.html, privacy.html, disclaimer.html)  
**Purpose:** Map existing legal coverage against what a KSA-based, consumer-facing SaaS/edtech platform with AI requires; identify gaps; prioritise against the launch gate (ROADMAP §6/§7 — legal track + PDPL DPIA named as real blockers).

> **IMPORTANT NOTICE — NOT LEGAL ADVICE.** This audit is a business-operations summary prepared by an AI assistant. It is not legal advice and does not substitute for advice from a Saudi-qualified lawyer. Every gap, risk rating, and draft document must be reviewed and validated by qualified Saudi legal counsel before any reliance or publication.

---

## Part 1 — Inventory of Existing Documents

### 02-legal/ (14 items)

| # | File | What it covers | Status |
|---|------|---------------|--------|
| L-01 | `customer-agreement-eula.docx` | Paid subscription T&Cs for Pro + Academy tiers; licence grant; prohibited use; payment & refund (30-day individual; prorated academy); data privacy pointer; IP; limitation of liability; SCCA arbitration | Draft v1.0, May 2026 — comprehensive but signed/B2B focus; does **not** fully serve anonymous public visitors |
| L-02 | `mutual-nda.docx` | Standard mutual NDA for external discussions | Generic template |
| L-03 | `one-way-nda.docx` | Disclosing-party NDA | Generic template |
| L-04 | `ip-assignment-agreement.docx` | Contractor/employee IP assignment to Fly GACA | Internal/HR use |
| L-05 | `confidentiality-and-non-compete-agreement.docx` | Staff confidentiality + non-compete | Internal/HR use |
| L-06 | `influencer-creator-partnership-agreement.docx` | Creator/affiliate deals | Marketing use |
| L-07 | `service-level-agreement-sla.docx` | SLA for academy/B2B | B2B use |
| L-08 | `60-day-pilot-agreement.docx` | Beta/pilot school engagement | B2B pilot use |
| L-09 | `lawyer-brief.md / .docx` | IP opinion brief for Saudi IP lawyer (P0-1 corpus rights; P0-2 name) | Working doc — awaiting lawyer |
| L-10 | `lawyer-shortlist.md` | Candidate Saudi law firms | Working doc |
| L-11 | `brief-defensible-naming.md` | Options analysis for "Fly GACA" brand risk | Working doc |
| L-12 | `email-routing.md` | Internal: email alias scheme | Operational doc |
| L-13 | `risk-memo.md` | Investor risk inventory (R1–R10) | Internal analysis |
| L-14 | `lawyer-brief.docx` | (Duplicate/compiled of L-09) | Working doc |

### 01-governance/ (12 items relevant)

| # | File | What it covers |
|---|------|---------------|
| G-01 | `anti-bribery-aml-and-whistleblower-policy.docx` | FCPA/KSA anti-corruption; AML; whistleblower channel |
| G-02 | `board-pack-template.docx` | Board reporting template |
| G-03 | `code-of-conduct.docx` | Staff code of conduct |
| G-04 | `decision-log-template.docx` | Governance decision logging |
| G-05 | `ESOP Plan.docx` | Employee stock option plan |
| G-06 | `founders-agreement.docx` | Founder equity and governance |
| G-07 | `shareholders-agreement-sha.docx` | Shareholder rights and mechanics |
| G-08 | `LICENSE` | Open-source licence (repo) |
| G-09 | `CODE_OF_CONDUCT.md` | Public contributor CoC (GitHub-style) |
| G-10 | `CONTRIBUTING.md` | Open-source contribution guide |
| G-11 | `SECURITY.md` | Security disclosure policy |
| G-12 | `CLAUDE.md` | AI agent briefing doc (internal) |

### 04-compliance-ksa/ (13 items)

| # | File | What it covers |
|---|------|---------------|
| C-01 | `pdpl-compliance-program-and-dpia.docx` | Full PDPL framework: lawful bases, data inventory, rights process, cross-border rules, sub-processor register, DPIA for Captain Adel AI — internal compliance doc |
| C-02 | `sub-processor-list-and-dpa-register.docx` | Sub-processor DPA register (Google Cloud, Moyasar, future analytics) |
| C-03 | `information-security-policy.docx` | ISP aligned to ISO 27001 / CITC |
| C-04 | `Business Continuity & Disaster Recovery Plan.docx` | BCP/DR |
| C-05 | `misa-investment-license-application-bundle.docx` | MISA FDI/local entity application |
| C-06 | `monshaat-sme-registration-kit.docx` | SME registration |
| C-07 | `ntdp-application.docx` | National Technology Development Programme |
| C-08 | `saudi-tax-and-compliance-calendar.docx` | VAT/Zakat deadlines |
| C-09 | `saudization-nitaqat-compliance-plan.docx` | Saudization planning |
| C-10 | `tamheer-and-doroob-program-application-pack.docx` | Graduate training programmes |
| C-11 | `vat-compliance-memo.docx` | ZATCA VAT analysis |
| C-12 | `vendor-management-policy.docx` | Vendor due diligence |
| C-13 | `zatca-fatoora-e-invoicing-compliance-pack.docx` | E-invoicing compliance |

### Live PWA pages (flygaca/ app — in-product)

| # | Page | Content status |
|---|------|---------------|
| P-01 | `terms.html` | Draft Terms of Use — public-visitor focused, lightweight, KSA-governed; marked "pending legal review"; email contact still shows old `hello@flygaca.com` not `i@flygaca.com` |
| P-02 | `privacy.html` | Draft Privacy Notice — PDPL-aligned, cookieless analytics explained, pre-account stage; marked "pending legal review" |
| P-03 | `disclaimer.html` | Draft Legal Disclaimer — independent/not-official positioning; AI assistant scope; AIRAC caveat; "not for operational use" |

---

## Part 2 — Gap Analysis Matrix

**Legend:** P0 = launch blocker | P1 = must-have within 30 days of launch | P2 = within 90 days | P3 = pre-Series A / growth stage

### 2.1 Public-Facing User-Facing Documents

| Document | Status | Priority | Risk if missing |
|----------|--------|----------|----------------|
| **Website Terms of Use** (public, anonymous visitor) | Draft exists in `terms.html` — but thin on: account-stage terms, AI disclaimer integration, Arabic language clause, PDPL data rights pointer, contact email consistency | **P0** — must be final + lawyer-reviewed before public launch | Without valid T&Cs, no enforceable limits on use; no liability cap; no jurisdiction clause for anonymous visitors |
| **Privacy Notice / PDPL Notice** (public-facing) | Draft exists in `privacy.html` — covers pre-account waitlist stage well; will need material update when accounts go live (PDPL Art. 11 requires notice at point of collection) | **P0** — current draft adequate for pre-account stage only; new version required before account/payment launch | PDPL breach: failure to notify data subjects = administrative penalty up to SAR 1M (PDPL Art. 29) |
| **Disclaimer & Educational-Use Notice** | Draft exists in `disclaimer.html` — good structure; covers independence, AIRAC, Captain Adel AI, no-operational-use | **P0** — needs lawyer review and finalisation; currently marked "Draft · pending legal review" | Without clear disclaimer, passing-off risk amplified; liability for pilot reliance on incorrect AI output |
| **Cookie / Tracking Notice** | **MISSING** — `privacy.html` explains cookieless analytics but there is no standalone Cookie Policy or cookie consent mechanism | **P1** — required if any analytics or functional cookies used; Cloudflare Web Analytics described as cookieless but Firebase auth/Firestore may set cookies when accounts launch | Non-compliance with PDPL Art. 29 (transparency obligation); potential CITC enforcement |
| **Acceptable Use Policy (AUP)** | Partially covered in `terms.html` §3 and `customer-agreement-eula.docx` §3 — but no standalone AUP; no AI-specific conduct rules; no content-reporting mechanism | **P1** — needed before Captain Adel / account launch; especially for AI misuse | Operational reliance on contractual terms only; gaps in enforcement against scraping, prompt injection abuse, GACA-authority impersonation |
| **Refund & Cancellation Policy** (standalone, public) | Covered in `customer-agreement-eula.docx` §4 — but that document is B2B/signed-agreement only; anonymous PWA pricing page has no public-facing refund statement | **P1** — ZATCA/Saudi consumer protection expectations; Moyasar requires merchant to display refund policy; App Store (Android) submission may require it | Consumer protection exposure; payment dispute escalations; App Store rejection risk |

### 2.2 Data & Privacy Infrastructure

| Document | Status | Priority | Risk if missing |
|----------|--------|----------|----------------|
| **PDPL DPIA** (Data Protection Impact Assessment) | Exists in `04-compliance-ksa/pdpl-compliance-program-and-dpia.docx` — covers Captain Adel AI data flows, risk register, mitigation, sign-off | Named launch blocker in Review-Action-Plan §7 — status: internally signed by founder-as-DPO but **not yet reviewed by SDAIA-qualified counsel** | Without completed DPIA, regulator could deem AI processing unlawful; SDAIA enforcement risk |
| **Full post-account Privacy Notice** | `privacy.html` is pre-account (waitlist only); accounts involve GACA licence numbers, payment data, exam scores, chat history | **P0 before account launch** — material change in data processing requires updated notice per PDPL Art. 11 | Silent processing of new data categories = PDPL breach |
| **Sub-Processor / DPA Register** | Exists in `04-compliance-ksa/sub-processor-list-and-dpa-register.docx` — covers Google Cloud, Moyasar; future analytics TBD | **P1** — register is internal only; public Privacy Notice must reference sub-processors or link to sub-processor list | PDPL transparency gap |
| **Data Retention & Deletion Schedule** | Referenced within PDPL doc (retention periods listed in data inventory) but no standalone schedule; no public deletion-request procedure beyond email | **P1** | PDPL Art. 7–12 data-subject rights compliance |

### 2.3 Content, IP & Third-Party Rights

| Document | Status | Priority | Risk if missing |
|----------|--------|----------|----------------|
| **GACA Corpus / Content Rights Opinion** | Legal question documented in `lawyer-brief.md` (P0-1); awaiting Saudi IP lawyer opinion | **P0 — absolute launch blocker** per ROADMAP | If corpus hosting is impermissible, entire library product collapses; SAR 1M copyright fine under 2022 Copyright Law |
| **Brand / Trademark Opinion** ("Fly GACA" name) | Documented in `brief-defensible-naming.md` and `lawyer-brief.md` (P0-2); awaiting opinion | **P0 — absolute launch blocker** per ROADMAP | Unregistrable mark; passing-off; potential SAIP or GACA cease-and-desist |
| **Takedown / DMCA-equivalent Procedure** | **MISSING** — no documented content takedown process; no publicly stated procedure for notifying Fly GACA of alleged IP infringement | **P1** | Without a takedown procedure, Fly GACA cannot benefit from safe-harbour analogues; increased liability for third-party IP complaints |
| **Content Licensing / Attribution Policy** | **MISSING** — terms reference GACA as source but no structured attribution/citation policy; no procedure for user-submitted content rights | **P1** | Copyright ambiguity on re-used regulatory excerpts; user-generated-content IP vesting |
| **AI Output Disclaimer** (Captain Adel) | Partially in `disclaimer.html` §7 and `customer-agreement-eula.docx` §3.2 — but no consolidated, standalone AI-specific policy | **P1** | Aviation safety liability; AI Act analogues (EU/KSA future regulation); hallucination liability gap |

### 2.4 B2B / Commercial Contracts

| Document | Status | Priority | Risk if missing |
|----------|--------|----------|----------------|
| **Customer Agreement EULA** | Comprehensive draft exists (L-01) — covers Pro and Academy tiers, SCCA arbitration, PDPL, IP, limitation of liability | **P0 before B2B sales** — needs lawyer review and Arabic translation | Unenforceable contract; jurisdiction gaps |
| **Order Form template** | Referenced in EULA but **no standalone Order Form template exists** | **P1** | Cannot close Academy deals without an agreed order form |
| **White-Label / Reseller Agreement** | EULA §3.1 reserves White Label rights but **no White Label agreement exists** | **P2** | Cannot onboard a reseller or white-label partner |
| **SLA** | Exists (`service-level-agreement-sla.docx`) | Adequate for now |  |
| **60-Day Pilot Agreement** | Exists | Adequate for now |  |
| **DPA / Data Processing Agreement** (B2B) | **MISSING** — EULA §5 references PDPL but no separate DPA for academy customers who are data controllers in their own right | **P1** — academies processing cadet data need their own DPA with Fly GACA | Academy customers cannot sign up in PDPL-compliant manner without a DPA |

### 2.5 Governance & Internal

| Document | Status | Priority | Risk if missing |
|----------|--------|----------|----------------|
| **Founders Agreement** | Exists (G-06) | Adequate |  |
| **SHA** | Exists | Adequate |  |
| **Anti-Bribery / AML / Whistleblower** | Exists (G-01) | Adequate |  |
| **ESOP Plan** | Exists (G-05) | Adequate |  |
| **IP Assignment** | Exists (L-04) | Adequate |  |
| **Confidentiality / NDA suite** | Exists (L-02, L-03, L-05) | Adequate |  |
| **Incident Response Plan** (data breach) | **PARTIALLY MISSING** — ISP in C-03 covers security; PDPL requires a breach notification procedure (PDPL Art. 20: notify SDAIA within 72 hours of discovering a breach likely to cause serious harm) | **P1** | PDPL Art. 20 breach: failure to notify SDAIA within 72 hours |

---

## Part 3 — Priority Matrix Against Launch Gate

```
┌─────────────────────────────────────────────────────────────────┐
│  LAUNCH GATE (per ROADMAP §7 "real blockers")                   │
│                                                                 │
│  ABSOLUTE BLOCKS — nothing ships without these:                 │
│  1. Lawyer opinion on corpus rights (P0-1)                      │
│  2. Lawyer opinion on "Fly GACA" name (P0-2)                   │
│  3. Final, lawyer-reviewed Terms of Use                         │
│  4. Final, lawyer-reviewed Disclaimer & Educational-Use Notice  │
│  5. Privacy Notice updated for account-stage data (before       │
│     accounts launch)                                            │
│  6. PDPL DPIA — internal version exists; needs PDPL counsel     │
│     sign-off before AI features go live                         │
└─────────────────────────────────────────────────────────────────┘

P0 — BEFORE ANY PUBLIC TRAFFIC:
  [DONE-DRAFT] Terms of Use (terms.html) — needs legal review + email fix
  [DONE-DRAFT] Privacy Notice (privacy.html) — adequate for pre-account; needs update for accounts
  [DONE-DRAFT] Disclaimer (disclaimer.html) — needs legal review
  [OUTSTANDING] IP/corpus rights legal opinion
  [OUTSTANDING] Brand name legal opinion

P1 — BEFORE ACCOUNT / PAYMENT LAUNCH (~30 days post public launch):
  [ ] Cookie Policy / consent mechanism (if any cookies set on account pages)
  [ ] Full post-account Privacy Notice (PDPL-compliant, accounts + AI)
  [ ] Standalone Acceptable Use Policy
  [ ] Public Refund & Cancellation Policy page
  [ ] B2B Data Processing Agreement (DPA) for Academy customers
  [ ] Takedown / IP complaint procedure
  [ ] Data breach notification procedure (SDAIA 72-hour rule)
  [ ] Order Form template

P2 — WITHIN 90 DAYS POST-LAUNCH:
  [ ] AI Output / Captain Adel standalone policy
  [ ] Content Attribution & Citation Policy
  [ ] White-Label Agreement (if channel sales pursued)

P3 — PRE-SERIES A:
  [ ] Arabic-language versions of all P0/P1 documents
  [ ] External PDPL audit by certified KSA privacy consultant
  [ ] Full trademark registration (pending P0-2 opinion)
```

---

## Part 4 — Key Risk Notes

**R-PDPL-1 (Critical):** The existing `privacy.html` is correctly scoped to the pre-account waitlist phase. The moment Fly GACA goes live with accounts, payment data, GACA licence numbers, exam scores, and AI chat logs, the current Privacy Notice becomes materially inadequate. A revised, full-scope PDPL notice must be ready to replace it at account launch — not after.

**R-PDPL-2 (Critical):** PDPL Art. 20 requires notification to SDAIA within 72 hours of discovering a personal data breach that is likely to cause serious harm. The existing ISP (C-03) and BCP (C-04) do not appear to contain a specific SDAIA breach-notification procedure. This must be documented before accounts go live.

**R-AI-1 (High):** Captain Adel operates in a safety-adjacent domain (aviation regulations). The existing `disclaimer.html` §7 provides partial protection, but there is no standalone AI policy that sets out what the system will and will not do, how errors are reported, and what the liability position is. In a domain where a pilot could conceivably act on an AI response, this gap is a reputational and legal risk.

**R-AUP-1 (Medium-High):** The only AUP-equivalent text is buried in `terms.html` §3 and `customer-agreement-eula.docx` §3.2. There is no standalone, prominently linked Acceptable Use Policy and no published mechanism for users to report AUP violations or problematic AI outputs. This is both a content-moderation gap and a PDPL transparency gap.

**R-B2B-1 (High):** Academy customers are independent data controllers processing cadet personal data (names, GACA licence numbers, exam scores). When Fly GACA processes this data on their behalf, Fly GACA acts as a data processor. PDPL requires a written Data Processing Agreement between controller (academy) and processor (Fly GACA). No such agreement currently exists. This blocks any legally compliant B2B Academy deal.

**R-CORP-1 (Note):** The legal entity has not yet been incorporated (per PHASE0 status). Until entity formation is complete, all contracts are personal obligations of the founder. This does not block a soft launch of the free public library but must be resolved before any paid transaction.

---

*This audit covers documents known as of 2026-06-14. It must be reviewed by Saudi-qualified legal counsel before any reliance.*
