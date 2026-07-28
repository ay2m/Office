---
title: "Company facts — BDA Company International (شركة بدع الدولية)"
section: 01-governance
doc_type: document
status: active
owner: Founder
last_updated: 2026-07-27
lang: en
---

# Company facts — BDA Company International (شركة بدع الدولية)

Single-page reference for the registered legal entity that operates Fly GACA
(flygaca.com) and Captain Adel (captadel.com). **This file is the source of
truth for company identity** — every other document references these values
instead of restating them. Pattern follows `06-operations-it/hosting-facts.md`.

Source documents: Ministry of Commerce CR certificate, ZATCA VAT registration
certificate (28/11/2025), SiFi IBAN certificate (26/07/2026) — filed in the
founder's records.

## Legal identity

| Field | Value |
|---|---|
| Legal name (Arabic) | شركة بدع الدولية |
| Legal name (English, as on the CR) | **BDA Company International** |
| Entity type | Limited liability company (شركة ذات مسؤولية محدودة) |
| Unified national number / CR | **7030976893** |
| CR issued | 23/09/2022 · Status: **Active** |
| Registered address | Riyadh, Al Baqqal district 12965 (الرياض، حي البقال) |
| Trade names / products | Fly GACA (flygaca.com) · Captain Adel (captadel.com) |

> Spelling note: the bank's IBAN certificate transliterates the name as
> "Beda International Company". The CR's English rendering — **BDA Company
> International** — is the one used in all legal copy, contracts and websites.

## Tax (ZATCA)

| Field | Value |
|---|---|
| VAT registration number | **311415259500003** |
| Effective registration date | 2025-11-01 |
| Tax period | Quarterly |
| First filing due | 2026-01-31 — **see `03-finance/invoicing-and-vat-returns.md` (overdue action)** |
| TIN | 3114152595 |

## Banking

| Field | Value |
|---|---|
| Bank | Arab National Bank (via SiFi — Alhulul Almobassatah Financial Co.) |
| Account name | Beda International Company (bank spelling) |
| IBAN | SA4930100806623389733294 |
| Account number | 806623389733294 |

> **Hard rule — the IBAN and account number never leave this repo.** They are
> recorded here and in `00-strategy/phase0.md` (P0-3) only. They must never
> appear in the product repos (FlyGACA-app, Captain-Adel), on any website,
> or in any public document. Customer-facing invoices carry the bank details
> on the invoice itself, generated at billing time.

## Where the identity appears publicly

| Surface | What is shown | Where it lives |
|---|---|---|
| flygaca.com footer | Operator line: name AR/EN + CR + VAT + Riyadh | `FlyGACA-app: src/i18n/*.json` (`footer.legalEntity`) + `src/app/Footer.tsx` |
| flygaca.com /terms, /privacy | Entity block, PDPL controller, Riyadh jurisdiction | `FlyGACA-app: src/i18n/*.json` (`legal.*`) |
| flygaca.com structured data | `legalName`, address, SA-CR identifier, vatID | `FlyGACA-app: src/lib/seo/jsonld.ts` + `index.html` + `scripts/prerender-head.mjs` |
| captadel.com footer (all pages) | Operator line AR/EN | `Captain-Adel: public/assets/js/footer.js` |
| captadel.com /terms, /privacy | Entity block, PDPL controller, Moyasar processor | `Captain-Adel: public/terms.html`, `public/privacy.html` |
| Repo metadata | LICENSE holder, package.json author, SECURITY.md | both product repos |

Never published: IBAN / bank account (see hard rule above), founder's national
ID, signed contracts.

## Decisions this registration settles

- **B2 (legal structure):** LLC — settled by the CR (owner-decision-brief 2026-07).
- **B3 (VAT timing):** registered, effective 2025-11-01, quarterly — settled by
  the ZATCA certificate.
- **MISA:** not required — 100% Saudi-owned LLC, no foreign investment license
  needed (see `04-compliance-ksa/compliance-roadmap.md`).
- `flygaca.sa` registration is now **unblocked** (SaudiNIC needs a legal entity).

## Rollout tracker — where the identity still needs to land

Done in this pass (2026-07-27): product repos (footers, legal pages, JSON-LD,
repo metadata), `phase0.md` P0-3, compliance/status docs, the `.docx` contract
and policy set (placeholders `[CR_NUMBER]` / `[COMPANY_ADDRESS]` and the retired
identities "Fly GACA Saudi Arabia (LLC)" / "trading as" replaced).

Still open:

- [ ] Saudi counsel review of the public policy drafts in `02-legal/` — the
  "do not publish" banners stay until cleared.
- [ ] Moyasar (both products): confirm each merchant profile carries the CR +
  settlement IBAN, and validate the webhook HMAC recipe against a dashboard test
  event before relying on it (see captadel RUNBOOK §3).
- [x] Brand print assets — **done 2026-07-27**: rebuilt as editable HTML under
  `11-brand/print/*.html` (Palette B), PNGs regenerated at 300 dpi with the
  CR/VAT identity line (GAP-7 closed). The ZATCA tax-invoice template is at
  `03-finance/tax-invoice-template.html`.
- [ ] Google Sheet master index (`00-master-office-paperwork-index.gsheet`) —
  manual paste of the new/renamed docs.
- [ ] Register `flygaca.sa` (now unblocked).
- [ ] ZATCA Fatoora e-invoicing wave check now that a real VAT number exists.
