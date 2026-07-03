# Fly GACA — CEO Execution Roadmap (Go-to-Company)

> **Purpose.** The product roadmap (`roadmap.md`) is done — 11 phases built and deployed.
> This is the *other* roadmap: the sequence that turns a built product into a legally-real,
> revenue-earning company. It tracks the critical path the product roadmap explicitly hands
> off — the legal/entity track and the first customer.
>
> **Created:** 2026-07-02. **Owner:** You (solo). **Not legal advice.**
> **Scoreboard — the only two numbers that matter this quarter:**
> **(1) Does the company legally exist yet? (2) How many customers have paid?**

## The critical-path chain (what gates what)

```
Send lawyer brief ──► Written opinion ──► NAME LOCKED ──┬─► Entity (CR) ──► Bank acct ──► ZATCA/VAT ──► Payments (Stripe) ──► Paywall flip
   (1 email)          (corpus rights too)               │
                                                        └─► Final branding / .sa domain / Arabic legal pages
Parallel (no gates): B2B school demos & free pilots ──► Signed pilot ──► Manual ZATCA invoice ──► First revenue
Parallel (no gates): PDPL DPIA ──► public user accounts can open
```

**Two hard deadlines:**
- **12 Aug 2026** — new Saudi Copyright Law + SAIP implementing regs take effect. Lawyer opinion must account for it → engage *this week*.
- **Name-risk clock** — every week of building under "Fly GACA" raises rebrand cost. Freeze brand/localization spend until the name is locked.

---

## Sprint 0 — This week (2026-07-02 → 07-09) · "Unblock everything"

The entire quarter is gated on actions in this one week. Do these before touching code.

| # | Action | Done when | Gates |
|---|--------|-----------|-------|
| 0.1 | **Send the lawyer brief** to 2–3 firms from `lawyer-shortlist.md`. Ask: fixed-fee quote, turnaround, conflict check (do they act for GACA?). | Emails sent; ≥2 quotes requested. | Name, corpus rights, entity |
| 0.2 | **Send 3 B2B outreach emails** to Heads of Training (OxfordSaudia, Saudi Aviation Academy, one cadet-feeder college). Offer a free 2-week cohort pilot. Link the demo. | 3 emails sent. | First customer |
| 0.3 | **Confirm the demo surface works** — flygaca-firebase.web.app (or flygaca-app) loads clean, Captain Adel answers, mock exam runs. | You can screen-share it end to end without a bug. | Demos |

**Sprint-0 done-when:** the lawyer engagement is in motion and 3 schools have been asked for a meeting. Nothing else this week counts.

---

## Sprint 1 — Weeks 2–4 (2026-07-09 → 07-30) · "Decide the name, book the demos"

| # | Action | Done when | Depends on |
|---|--------|-----------|------------|
| 1.1 | Compare lawyer quotes; **engage one firm.** | Firm engaged, brief delivered. | 0.1 |
| 1.2 | Receive written opinion on **(a) corpus redistribution rights** and **(b) the name**. Record verbatim in `phase0.md`. | Opinion in hand, logged. | 1.1 |
| 1.3 | **LOCK THE NAME** — decide: keep "Fly GACA" / demote to tagline + register a different mark / rebrand. This is the pivotal decision; force it. | Name written into `phase0.md` P0-2 as final. | 1.2 |
| 1.4 | Run **≥3 school demos** (30 min: Captain Adel cited answers → timed mock → readiness view). Offer the free 2-week pilot. | 3 demos delivered; ≥1 pilot verbally agreed. | 0.2 |
| 1.5 | Point **flygaca.com** at the live app (real domain for demos, not a subdomain). | Site resolves on flygaca.com with SSL. | — |

**Sprint-1 done-when:** the name is locked and one school has agreed to a pilot. This is the quarter's fulcrum.

---

## Sprint 2 — Weeks 5–8 (2026-07-30 → 08-27) · "Make the company exist"

| # | Action | Done when | Depends on |
|---|--------|-----------|------------|
| 2.1 | **Register the Commercial Registration** on the Saudi Business Center (choose sole-prop vs LLC first). | CR number issued; logged in `phase0.md` P0-3. | 1.3 (locked name) |
| 2.2 | Register with **Monshaat (SME)**; check **NTDP** eligibility and apply. | Registrations submitted. | 2.1 |
| 2.3 | **Open the business bank account.** | Account open; IBAN recorded. | 2.1 |
| 2.4 | Complete the **PDPL DPIA** (runs in parallel — the one gate before public accounts). | DPIA signed off; logged. | — (parallel) |
| 2.5 | **Convert the pilot → paid seat contract** — quote per the seat card, signed order, **manual ZATCA e-invoice**, `grantSchoolLicence`. | First invoice issued; first riyal in the door. | 1.4, 2.3 |

**Sprint-2 done-when:** the company legally exists with a bank account, **and the first customer has paid.** Scoreboard: both numbers move off zero.

---

## Sprint 3 — Weeks 9–12 (2026-08-27 → 09-24) · "Turn on revenue"

| # | Action | Done when | Depends on |
|---|--------|-----------|------------|
| 3.1 | **ZATCA VAT registration + Fatoora e-invoicing** onboarding. | VAT registered; Fatoora integrated. | 2.1/2.3 |
| 3.2 | **Payment gateway live** — pick mada-capable (Moyasar/HyperPay/PayTabs/Tap) + Stripe products at the decided price card. | Test-mode checkout verified end to end. | 2.3 |
| 3.3 | **Paywall flip**, in your Phase C order: gate Captain Adel first (marginal-cost item) → flip client launch mode → protected content → 30-day grandfather window. | Consumer checkout open; quotas live. | 3.2 |
| 3.4 | **Sell 2–3 more school pilots** off the first one's proof. | ≥3 total school contracts in pipeline. | 2.5 |

**Sprint-3 done-when:** consumer checkout is open and B2B is a repeatable motion, not a one-off.

---

## Parallel tracks (run alongside — do not let them displace the critical path)

- **B2B pipeline** is the only revenue you can invoice pre-Stripe → it gets your selling time from Sprint 1 on. Year-1 logic: ~10 schools × ~50 seats × ~SAR 249 ≈ **SAR 125k ARR**.
- **PDPL DPIA** (2.4) — parallel to legal/entity; gates public consumer accounts, not the B2B motion.
- **Instrument free usage now** — Captain Adel volume, tool opens, study starts. These numbers set your day-one conversion targets.

## Frozen until the name is locked (Sprint 1)

- No more Arabic localization, brand/print polish, or new operating documents.
- No new features. The Oral-Exam Examiner (your flagship Pro build) waits until after checkout is live — build it against paying demand, not before.

## Risk checkpoints

- **Name comes back "rebrand"** → absorb it *now*, before public launch: repo, domains, brand assets, entity name, Arabic tree. Cheaper this month than any later month.
- **Corpus opinion is restrictive** → stay on the deep-link index posture (already the fallback); the AI-exception implementing regs (post-12 Aug) may loosen it.
- **No school says yes** → that's the most valuable signal you can get. Re-examine the offer/price before building more, not after.
- **Solo-founder load** → the ZATCA/payments integration (Sprint 3) and Arabic legal-page review are the likeliest points to bring in paid help.

---

*Living doc — bump statuses as you go. Companion to `phase0.md` (legal detail) and
`roadmap.md` (product). Scoreboard stays two numbers: legal existence, and paid customers.*
