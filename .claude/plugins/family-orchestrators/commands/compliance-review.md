---
description: Review the family against the regimes that actually govern it — PDPL, ZATCA, the GACA relationship, and residency claims
argument-hint: [pdpl|zatca|affiliation|residency|all]
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash
  - Skill
---

Review `$1` (default `all`). Two framing rules before you start:

- **PDPL and ZATCA are the governing regimes.** The vendored skills in
  `ay2m/Office/.claude/skills/` (GDPR controls, privacy impact assessment,
  ISO 27001, NIST 800-30, third-party vendor risk, PCI DSS) are **foreign-law
  scaffolding** — useful for structure and method, never authority.
  `01-governance/` remains the source of policy.
- **Fly GACA is not affiliated with GACA.** That constraint is load-bearing
  across the whole document tree — legal, GTM and investor material, not just
  product copy.

## Affiliation

Grep all three repos plus the Office document tree for language that implies
endorsement, licensing, approval or partnership: "official", "authorised",
"approved by", "in partnership with", "GACA-certified". The correct posture is
that the product **cites and defers to** GACA as the authority and helps you
find regulation — it never replaces it, and every assistant answer carries an
exact Part and section.

In `ay2m/FlyGACA` the disclaimer is a component (`<Disclaimer />`) and must
never be inlined or reworded. In `ay2m/Captain-Adel` the `.disclaimer-strip` is
hand-duplicated across all eight `public/*.html` pages — an edit to one is an
edit to all eight, and `npm run smoke:frontend` is what keeps that honest.

## Residency (PDPL) — say what is true today

The intended architecture is in-Kingdom: personal data in `me-central2`, the
generation hop carrying no account identity. **None of it is deployed.**
`me-central2` is not available to this account (a commercial blocker — Dammam
sells through CNTXT to organizations on Invoiced Billing — not a support
ticket), the Express service has never been deployed, and
`server/src/captain-adel.ts` calls the **global** Gemini Developer API, so chat
questions leave the region regardless of where Cloud Run sits.

So: flag every place — repo docs, `ay2m/Office`, investor decks — that states
in-Kingdom residency as **present fact**. Aspirational is fine when labelled;
unlabelled is a compliance claim the family cannot support. `ay2m/Office`'s
`06-operations-it/runbooks/runbook-pdpl-me-central2.md` and
`04-compliance-ksa/` hold the KSA side; `docs/RUNBOOK-golive.md` §5 in
`ay2m/FlyGACA` holds the sub-processor disclosure.

## PDPL, operationally

- Real user questions are personal data. In `ay2m/Captain-Adel` the chat model
  must run in-Kingdom for production; HF/US/EU endpoints are dev and eval only.
  Embeddings see only the public corpus — no region constraint.
- Feedback logs only `{rating, turnId, provider, ts}` — never the question or
  the answer. Verify that is still true.
- Erasure must exist for every user-keyed store. `POST /v1/account/delete`
  erases the uid-keyed set and **tombstones** payment markers (replay guard).
  In `ay2m/FlyGACA`, a new user-keyed table needs its erasure path in the same
  change.
- The DPIA and the PDPL policies live in `04-compliance-ksa/` and `02-legal/`;
  a processing change that outdates them is not finished until they are updated.

## ZATCA

E-invoicing lives in `ay2m/Office`: `03-finance/` holds the tax-invoice and
VAT-return HTML templates, `04-compliance-ksa/` the e-invoicing obligations.
Check that the VAT number in use matches `01-governance/company-facts.md`
verbatim — the same string the family manifest pins — and that pricing quoted in
product surfaces agrees with `03-finance/monetization.md`.

## Report

Regime · requirement · where it lives · status (met / gap / aspirational-stated-as-fact)
· action. Rank by exposure. Anything touching real legal, financial or HR
material stays in the repo — do not restate its contents beyond what the finding
requires, and route security or data-isolation concerns to the maintainer per
`01-governance/SECURITY.md`.
