---
title: P0-3 Walkthrough — Register the legal entity
section: 06-operations-it
doc_type: setup-guide
status: active
owner: Founder
last_updated: 2026-06-16
lang: en
---

# P0-3 Walkthrough — Register the legal entity

**Goal:** stand up the legal entity that owns Fly GACA, so it can hold the domain, a bank
account, contracts and (later) ZATCA registration.

**Prerequisite:** the brand/legal name must be locked first — see `../phase0.md`, P0-2.

> Operational guidance, not legal advice. Government portal journeys and fees change;
> confirm current steps with the Saudi Business Center help channels and a Saudi
> accountant or corporate lawyer.

## 1. Choose the legal structure

- **Sole proprietorship** (مؤسسة فردية) — simplest and cheapest, suited to a solo founder;
  the owner is personally liable.
- **Limited Liability Company** (شركة ذات مسؤولية محدودة) — separates personal and business
  liability; more setup and ongoing cost.

Fly GACA will handle personal data, take payments and sign B2B contracts with flight
schools, so the liability separation of an LLC is worth discussing with an accountant
before you decide.

## 2. Register the Commercial Registration (CR)

- Go to the Saudi Business Center — businesscenter.gov.sa — and sign in with your Nafath
  digital identity.
- Start a new business registration; the CR is issued through the SBC unified journey.
- Enter the trade name (the locked name from P0-2). **If the name contains "GACA", expect
  the trade-name check to query it** — have the lawyer's view on the name ready.
- Select the business activity (ISIC code) — software / educational technology /
  information-service activities fit Fly GACA.
- Pay the fees and receive the CR.

## 3. Register with Monshaat (SME)

- Register the business with Monshaat — the Small and Medium Enterprises General Authority,
  monshaat.gov.sa — to access SME support programs and the wider ecosystem.

## 4. Check NTDP eligibility and apply

- The National Technology Development Program (ntdp.gov.sa) funds and enables Saudi tech
  companies. Review the current programs and eligibility, then apply once the CR exists — a
  registered Saudi tech entity with Fly GACA's roadmap is the kind of applicant these
  programs target.

## 5. Open a business bank account

- With the CR issued, open a business current account. This is needed before the Phase 5
  payment-gateway and ZATCA work.

## 6. Record the result

- Update `../phase0.md` P0-3 with the CR number, legal structure, registered name and bank.
