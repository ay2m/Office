---
title: Fly GACA — Offboarding / Exit Checklist
section: 05-people
doc_type: checklist
status: draft
owner: Founder / HR
last_updated: 2026-08-09
lang: en
---

# Fly GACA — Offboarding / Exit Checklist
**قائمة إنهاء الخدمة ومغادرة الموظف — فلاي قاكا**

**Version:** 0.2 (draft) | **Date:** 2026-08-09 | **Folder:** 05-people/

> **DRAFT — PENDING LEGAL REVIEW.** This checklist must be reviewed by a qualified Saudi HR professional and/or Saudi-licensed legal counsel before use. It is an operational aid, not legal advice. Saudi Labor Law (Royal Decree M/51 and its amendments) governs; where this checklist conflicts with the law, the law prevails.

---

## 1. Purpose and Scope

Covers every exit from BDA Company International (شركة بدع الدولية): **resignation, non-renewal, probation termination, termination with cause (Labor Law Art. 80), redundancy, or mutual agreement**. Triggered the day notice is given or received. The Employee Handbook's informal exit steps are superseded by this checklist.

Any termination **initiated by the Company outside probation** must first satisfy the documentation standards in 05-people/grievance-and-disciplinary-procedure-2026-07-03.md (HRSD can void terminations lacking documented warnings).

**Owner key:** F = Founder (acting HR/IT) | E = Exiting employee | Mgr = Line manager.

---

## 2. Phase A — On Notice (Day 0 of notice period)

| ☐ | Task | Owner | Done-when |
|---|------|-------|-----------|
| ☐ | Resignation received in writing / termination letter issued in writing (Arabic version for Saudi nationals — [Counsel question E10: translation source]) | F | Signed/dated letter in HR file |
| ☐ | Confirm notice period per contract (Handbook: 60 days; verify against executed contract and Labor Law Art. 75) | F | Last working day agreed and confirmed in writing |
| ☐ | Record exit reason and legal basis (resignation / Art. 74 / Art. 77 / Art. 80 / Art. 81) | F | Basis noted in HR file; counsel consulted for any contested exit |
| ☐ | Decide leave treatment during notice (Leave & PTO Policy §3.4) | F | Decision communicated in writing |
| ☐ | Open knowledge-handover plan (Section 3) and set weekly checkpoints | Mgr | Handover doc created in Drive with owner per item |
| ☐ | Access review: restrict any access no longer needed for handover duties (esp. production Firebase/Cloudflare, HubSpot exports, GitHub admin) | F | Access reduced to handover-only scope |

---

## 3. Phase B — Knowledge Handover (during notice period)

| ☐ | Task | Owner | Done-when |
|---|------|-------|-----------|
| ☐ | Inventory of owned work: repos/branches, Drive docs, HubSpot pipelines, in-flight tasks, recurring duties | E | Written inventory reviewed by Mgr |
| ☐ | Document runbooks for anything only this person knows (align with 06-operations-it/runbooks) | E | Runbooks merged/filed; Mgr can execute them unaided |
| ☐ | Transfer ownership: Google Drive files to shared drive, GitHub repo/issue ownership, HubSpot record ownership, calendar events | E + F | No orphaned assets remain under the leaver's account |
| ☐ | Introduce successors/handover contacts to external parties (customers, vendors, GACA/regulatory contacts if applicable) | E + Mgr | Handover emails sent from company address |
| ☐ | Final handover sign-off meeting | E + Mgr | Sign-off note filed in HR folder |

---

## 4. Phase C — Last Working Day (access, equipment)

| ☐ | Task | Owner | Done-when |
|---|------|-------|-----------|
| ☐ | Revoke Google Workspace / email account (suspend, then transfer data; update aliases per 02-legal/email-routing.md so mail to the leaver routes to `i@flygaca.com`) | F | Login disabled; routing rule updated |
| ☐ | Revoke Slack, GitHub (org membership + PATs/deploy keys), HubSpot, Firebase console, Cloudflare dashboard | F | Each system's member list shows removal |
| ☐ | Rotate shared secrets the leaver had: API keys, service passwords, password-manager shared vaults — **decided 2026-08-09 (brief D6):** secrets inventory kept in the ops Drive folder per 06-operations-it/03-drive-folder-structure.docx | F | Rotation log completed |
| ☐ | Collect equipment against the signed equipment receipt: laptop, peripherals, access cards, SIM | E → F | Equipment register updated to "returned"; condition noted |
| ☐ | Employee deletes company data from personal devices and confirms in writing (PDPL + confidentiality obligations survive exit) | E | Signed data-deletion confirmation filed |
| ☐ | Exit interview (voluntary exits) — themes logged for retention learning | F | Notes filed (anonymised summary if shared) |
| ☐ | Remind employee in writing of surviving obligations: confidentiality/NDA, IP assignment, non-compete if applicable (02-legal/confidentiality-and-non-compete-agreement.docx) | F | Reminder letter acknowledged |

---

## 5. Phase D — Final Settlement (within 14 calendar days of last working day)

Saudi Labor Law Art. 88/91 timing as adopted in Leave & PTO Policy §16: final settlement due within **14 calendar days** of the last working day. [Counsel question E5: confirm exact statutory deadline — timing differs by who ended the contract.]

| ☐ | Task | Owner | Done-when |
|---|------|-------|-----------|
| ☐ | Calculate **End-of-Service Benefit (EOSB)** per Labor Law Arts. 84–85 on basic salary (contract §4; Offer Letter §2 note): half-month wage per year for the first 5 years, one month per year thereafter; resignation scale under Art. 85 (⅓ after 2–5 yrs, ⅔ after 5–10 yrs, full after 10 yrs); Art. 80 termination may forfeit EOSB — take legal advice before applying | F | EOSB worksheet saved to HR file and checked against an HRSD/official calculator |
| ☐ | Pay out accrued untaken annual leave in cash (Leave Policy §16: total monthly salary ÷ 30 × days) | F | Amount on final settlement sheet |
| ☐ | Settle outstanding items: final salary days, approved expenses, deductions (loans/advances, unreturned equipment per signed receipt — deductions within Labor Law limits) | F | Itemised settlement sheet signed by both parties |
| ☐ | Pay final settlement via WPS/bank transfer | F | Transfer evidence filed |
| ☐ | Issue **certificate of service** (Labor Law Art. 64 — free of charge, no prejudicial remarks) | F | Certificate delivered to employee |

---

## 6. Phase E — Government and Registry Deregistration

| ☐ | Task | Owner | Done-when |
|---|------|-------|-----------|
| ☐ | GOSI: deregister employee effective last working day | F | GOSI portal shows contributor removed |
| ☐ | Qiwa: record contract termination / update employment status | F | Qiwa status = terminated |
| ☐ | Mudad/WPS: remove from payroll file after final settlement run | F | Next WPS file excludes leaver without compliance flag |
| ☐ | **Expats only:** process visa outcome — final exit visa or sponsorship transfer via Qiwa/Muqeem; Iqama cancellation as applicable [Counsel question E9: confirm process with PRO/counsel — first hire may be Saudi national] | F | Government portal confirmation filed |
| ☐ | Check Nitaqat impact of the departure (04-compliance-ksa/saudization-nitaqat-compliance-plan.docx) | F | Nitaqat tracker updated |
| ☐ | Update insurance: remove from medical policy [Owner to confirm provider — brief D2] | F | Provider confirmation received |

---

## 7. Phase F — Post-Exit Wrap-Up (within 30 days)

| ☐ | Task | Owner | Done-when |
|---|------|-------|-----------|
| ☐ | Archive employee HR folder per retention policy [Owner to confirm retention period with counsel — brief D5]; restrict access to Founder | F | Folder moved to archive area of Drive |
| ☐ | 30-day access re-check: search all systems (Google, Slack, GitHub, HubSpot, Firebase, Cloudflare, vendor accounts) for residual access | F | Zero residual accounts; check logged |
| ☐ | Close the loop on exit-interview actions and update HR docs if the exit exposed gaps | F | Actions tracked or explicitly declined |

---

## 8. Records

Retain: notice/termination letters, handover sign-off, equipment receipt, EOSB worksheet, signed final settlement, certificate of service copy, government deregistration confirmations. Location: employee HR folder in Drive (06-operations-it/03-drive-folder-structure.docx).

**Cross-references:** 05-people/leave-pto-policy-2026-06-14.md §16 · 05-people/grievance-and-disciplinary-procedure-2026-07-03.md · 05-people/employee-handbook.docx (EOSB formula, notice) · 05-people/saudi-compliant-employment-contract-template.docx · 02-legal/email-routing.md · 04-compliance-ksa/saudization-nitaqat-compliance-plan.docx

---

*BDA Company International (شركة بدع الدولية) | Confidential — Internal HR Document*
*Draft 0.2 — 2026-08-09 (owner decision D6 applied; counsel markers relabelled to Group E refs). Pending review by qualified Saudi HR/legal professional. Not legal advice.*
