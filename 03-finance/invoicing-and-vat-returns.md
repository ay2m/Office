---
title: "Invoicing & VAT returns — operating procedure"
section: 03-finance
doc_type: document
status: active
owner: Founder
last_updated: 2026-07-28
lang: en
---

# Invoicing & VAT returns — operating procedure

The company is **VAT-registered and filing quarterly** — this document is the
finance-side operating procedure that was missing between the analysis in
`04-compliance-ksa/vat-compliance-memo.docx` and reality. Figures and deadlines
below should be confirmed with the accountant. Entity identity and the VAT
number live in `01-governance/company-facts.md` — referenced, not restated.

## ⚠️ Immediate action — the first return is overdue

The VAT registration is effective **2025-11-01** with a **quarterly** period.
The first return (period Nov–Dec 2025) was due **2026-01-31**. As of
**2026-07-27 that filing — and likely the Q1 2026 return (due 2026-04-30) — is
overdue.**

1. File the outstanding return(s) now via the ZATCA portal (zatca.gov.sa),
   even if the revenue for the period is zero — a nil return still has to be
   filed.
2. Expect late-filing / late-payment penalties; check whether a ZATCA penalty
   amnesty/exemption initiative is currently in force before paying.
3. Engage the accountant to reconcile any output VAT collected since
   2025-11-01 against invoices issued.
4. Set the recurring calendar reminders (14 days ahead) that
   `04-compliance-ksa/saudi-tax-and-compliance-calendar.docx` prescribes.

## Return calendar (quarterly, due 30 days after period end)

| Period | Due date |
|---|---|
| Nov–Dec 2025 (first, short) | 2026-01-31 — **overdue** |
| Jan–Mar 2026 | 2026-04-30 — **verify filed** |
| Apr–Jun 2026 | 2026-07-30 — **this week** |
| Jul–Sep 2026 | 2026-10-30 |
| Oct–Dec 2026 | 2027-01-30 |

## Filing a return — step by step (ZATCA portal)

Compute the period figures first with the worksheet
`03-finance/vat-return-worksheet.html` (enter amounts excl. VAT; output/input VAT
and the net due compute at 15%), then file:

1. Sign in to the ZATCA portal (zatca.gov.sa) → **VAT** → **File return**, and
   pick the tax period — **the overdue Nov–Dec 2025 first, oldest first**.
2. Transfer the worksheet figures into the return boxes:
   - Standard-rated sales → **box 1** (amount + 15% output VAT).
   - Exports / zero-rated / exempt sales → **box 4 / 3 / 5** (amount, 0 VAT).
   - Reverse charge on imported services → **box 9** (self-assessed 15% as
     **both** output and deductible input — nets to zero if fully recoverable).
   - Standard-rated domestic purchases → **box 7**; customs import VAT → **box 8**.
3. Check the portal's computed **net VAT due** matches the worksheet's net.
4. Submit, then pay any net payable via **SADAD** using the generated bill
   number **before the due date** to limit penalties.
5. Download the return acknowledgement + payment receipt and store them in the
   founder's records (see Records).
6. A nil period is **still filed** — submit a zero return.

Late filing and late payment carry ZATCA penalties; check for any active
penalty-amnesty/exemption initiative before paying. The worksheet is a
computational aid only — confirm every figure and treatment with the accountant.

## Tax-invoice requirements (ZATCA)

Every tax invoice must carry, at minimum:

- Seller legal name **in Arabic**: شركة بدع الدولية
- Seller VAT number and CR number (see company-facts)
- Seller address (Riyadh, Al Baqqal 12965)
- Sequential invoice number and issue date
- Line items with the VAT rate (15%) and VAT amount broken out
- For **simplified** invoices (B2C receipts): a ZATCA-compliant QR code (TLV)
- For B2B: the buyer's name and VAT number

Buyer-side VAT on foreign services (Google Cloud, Gemini, foreign SaaS, etc.) is
accounted for under the **reverse-charge** mechanism — see the VAT memo. (Moyasar
is a domestic provider, so its fees are domestic-rated, not reverse charge.)

## How the products map to invoices

- **flygaca.com (Moyasar):** consumer prices are **VAT-inclusive** (the pricing
  page shows "incl. 15% VAT"). Moyasar receipts are payment receipts, not tax
  invoices — a simplified tax invoice (with QR) must be generated per sale, and
  B2B school invoices are full tax invoices (VAT-exclusive prices + 15%).
- **captadel.com (Moyasar):** same pattern; Moyasar receipts are payment
  receipts, so a simplified tax invoice (with QR) is generated per sale and B2B
  invoices carry the buyer's VAT number (see the captadel SaaS runbook §3).
- Invoice numbering: single sequential series per year (e.g. `INV-2026-0001`),
  shared across both products; the accountant may split series later.

## E-invoicing (Fatoora)

Phase 1 (generation) obligations and the Phase 2 (integration) wave analysis
live in `04-compliance-ksa/zatca-fatoora-e-invoicing-compliance-pack.docx`.
That pack assumed "Wave 8+ (revenue ≥ SAR 25M), estimated 2027" — **re-verify
the wave assignment now that the VAT registration is real**, and pick the
invoicing software (the pack recommends Qoyod, then Zoho) before invoice
volume starts.

The current post-registration **phase & software decision** — Phase 1 applies
now, Phase 2 only on ZATCA wave notification, **Qoyod** adopted for launch — is
in `04-compliance-ksa/fatoora-phase2-decision-2026-07.md`.

## The invoice template

A bilingual (AR/EN), ZATCA-Phase-1 tax-invoice template lives at
`03-finance/tax-invoice-template.html` (rendered to
`_print/03-finance/tax-invoice-template.pdf`). It carries the mandatory fields —
Arabic seller legal name, VAT, CR, address, sequential number, issue date,
line items with the 15% VAT broken out — and computes the **ZATCA QR TLV**
(the 5 mandatory tags: seller name, VAT number, timestamp, total, VAT amount)
as base64, shown under the QR slot. The scannable QR image itself is generated
by the e-invoicing software (Qoyod → Zoho) from that TLV, not hand-drawn, so the
version/EC/mask are guaranteed correct (a malformed QR is a 1,000–10,000 SAR
per-invoice penalty). The bank line is a placeholder — **the IBAN is added on the
issued invoice at billing time, never committed to the repo**.

The template has a **Standard (B2B) / Simplified (B2C)** mode toggle (screen-only,
hidden in print): *simplified* hides the buyer block and retitles to "Simplified
Tax Invoice", matching ZATCA's two invoice types — a B2C receipt needs the QR but
not the buyer's details, a B2B invoice needs the buyer's name + VAT number.

## Records

Keep invoices, returns and supporting records **6 years**, with Arabic-language
records available (VAT memo, retention section). Store filed returns and ZATCA
acknowledgements in the founder's records alongside the registration
certificates.
