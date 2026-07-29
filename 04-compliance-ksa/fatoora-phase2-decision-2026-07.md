---
title: "Fatoora e-invoicing — phase & software decision (2026-07)"
section: 04-compliance-ksa
doc_type: document
status: active
owner: Founder
last_updated: 2026-07-28
lang: en
---

# Fatoora e-invoicing — phase & software decision (2026-07)

Current decision note that sits on top of the detailed
`04-compliance-ksa/zatca-fatoora-e-invoicing-compliance-pack.docx` (v1.0, May
2026). That pack is still the technical reference (UBL 2.1, cryptographic stamp,
certificate procurement, APIs) — but it was written **before** the VAT
registration was real and assumes an early integration wave. This note corrects
the timing and locks the software call now that the entity exists (VAT
311415259500003, **TIN 3114152595 already issued**).

## Decision 1 — which phase applies now

- **Phase 1 (Generation) is the live obligation.** Every invoice must be a
  structured, compliant e-invoice — Arabic seller name, VAT/CR, sequential
  number, line items with 15% VAT, and the **QR (TLV)** on simplified (B2C)
  receipts. This applies from the first real invoice.
- **Phase 2 (Integration) is NOT yet mandatory for us.** ZATCA assigns Phase 2
  in **waves by annual taxable revenue** and notifies each taxpayer **≥ 6 months
  ahead**. A newly-registered micro-entity below the current wave thresholds is
  not in scope until notified. **Do not integrate early** — the pack's "go live
  in Q2 2027 ahead of Wave 8" is over-eager and rests on a stale threshold.
  **Action:** re-check the latest announced wave thresholds on
  `zatca.gov.sa/fatoora` and act only on ZATCA's official wave notification.

## Decision 2 — software

- **Use a ZATCA-compliant e-invoicing solution from the first invoice** — the
  hand-editable `03-finance/tax-invoice-template.html` (with its TLV) is a
  **manual/interim aid** for one-off B2B invoices, not a compliant Phase-1
  *generator* for volume, and it does **not** render the certified QR.
- **Decision: Qoyod** for launch (≈ 200–500 SAR/mo) — Arabic-first, ZATCA
  Phase-1 compliant, generates the compliant QR. **Zoho Books** is the
  fallback/scale option. (Same recommendation as the pack — confirmed.)
- Wire **Moyasar → automatic simplified e-invoice** on payment so B2C receipts
  are compliant without manual work; B2B (school) invoices are issued from Qoyod
  as standard tax invoices.

## What is already in place (this repo)

- Phase-1 tax-invoice template with the mandatory fields + TLV, and a
  **Standard (B2B) / Simplified (B2C)** mode toggle — `03-finance/tax-invoice-template.html`.
- Quarterly VAT-return worksheet + filing runbook — `03-finance/vat-return-worksheet.html`,
  `03-finance/invoicing-and-vat-returns.md`.

## Corrections to the pack's action plan

| Pack (May 2026) | Reality (2026-07) |
|---|---|
| "Q3 2026: register with ZATCA, obtain TIN" | **Done** — VAT registered 2025-11-01, TIN 3114152595. |
| "Select Qoyod for Phase 1" | **Confirmed** — adopt now, before invoice volume. |
| "Q2 2027 go-live ahead of Wave 8" | **Revised** — Phase 2 only on ZATCA wave notification; re-verify thresholds, don't integrate early. |

## Owner actions

1. Subscribe to **Qoyod**; configure the seller profile (Arabic name, VAT, CR,
   address, logo) and the invoice series.
2. Wire **Moyasar → Qoyod** so paid subscriptions emit a compliant simplified
   e-invoice automatically.
3. Re-verify the current Phase-2 wave thresholds on `zatca.gov.sa/fatoora`;
   record the result and watch for an official notification.
4. Keep the pack as the integration playbook for when Phase 2 is notified
   (certificates, sandbox, clearance/reporting APIs).
