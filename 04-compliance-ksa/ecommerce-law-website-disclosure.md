---
title: "E-commerce law — trader identity disclosure on the websites"
section: 04-compliance-ksa
doc_type: document
status: active
owner: Founder
last_updated: 2026-08-19
lang: en
---

# E-commerce law — trader identity disclosure on the websites

The Saudi **E-Commerce Law** (Royal Decree M/126, 1440H / 2019) and its
implementing regulation require a service provider selling online to disclose
its identity to consumers. Six of our legal drafts cite the law, but nothing
documented the **trader-identity display duty** — the one obligation that
touches flygaca.com and captadel.com directly. This document closes that gap
and records exactly what is deployed.

## What the law requires the store/site to show

- The provider's **name** (legal name, or trade name if registered)
- Its **address** and means of contact
- Its **commercial registration** (or equivalent authorization) data
- If VAT-registered, showing the **VAT number** on the site/invoices is
  standard ZATCA-aligned practice
- Plus the consumer-protection duties handled in the policy drafts (terms,
  refund/cancellation, complaint contact)

## The deployed disclosure strings (verbatim)

Arabic:

> تشغّلها شركة بدع الدولية (BDA Company International) — س.ت 7030976893 —
> الرقم الضريبي 311415259500003 — الرياض، المملكة العربية السعودية

English:

> Operated by BDA Company International (شركة بدع الدولية) — CR 7030976893 —
> VAT 311415259500003 — Riyadh, Saudi Arabia

## Implementation map (as of 2026-07-27)

| Site | Surface | Implementation |
|---|---|---|
| flygaca.com | Footer identity line (every page) | `ay2m/FlyGACA: src/i18n/en.json` + `ar.json` key `footer.legalEntity`, rendered by `src/app/Footer.tsx` |
| flygaca.com | Terms §1 entity block, Privacy §1 (PDPL controller) | `ay2m/FlyGACA: src/i18n/*.json` under `legal.terms` / `legal.privacy` |
| flygaca.com | Machine-readable (search/AI) | Organization JSON-LD: `legalName`, `PostalAddress`, SA-CR `identifier`, `vatID` — `ay2m/FlyGACA: src/lib/seo/jsonld.ts`, `index.html`, `scripts/prerender-head.mjs` |
| captadel.com | Footer identity line (all five pages) | `ay2m/Captain-Adel: public/assets/js/footer.js` (`.footer-entity`) |
| captadel.com | `/terms` + `/privacy` entity blocks | `ay2m/Captain-Adel: public/terms.html`, `public/privacy.html` |
| Both | Contact means | `i@flygaca.com` / `hello@captadel.com` in footers and legal pages (per `02-legal/email-routing.md`) |

## What we never publish

- **IBAN / bank account number** — internal only
  (`01-governance/company-facts.md` hard rule); invoices carry bank details at
  billing time.
- The founder's national ID or personal address.

## Maintenance rule

Any change to the entity's registered facts (name, CR, VAT, address) is made
**first** in `01-governance/company-facts.md`, then propagated to the surfaces
in the table above in the same change. The footer strings in both repos must
stay byte-identical to the "deployed disclosure strings" section here.

## Open items for counsel

- Confirm the exact minimum disclosure set under the implementing regulation
  (name/CR/address vs. also authorized-representative details).
- Confirm the refund/cooling-off posture in
  `02-legal/refund-and-cancellation-policy-draft-2026-07-03.md` (questions
  E1/E3 in the owner decision brief).
