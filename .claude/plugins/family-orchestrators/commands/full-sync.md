---
description: Audit the three repos for drift — the family contract, entity facts, the repo roster, and the claims each CLAUDE.md makes
argument-hint: [--fix]
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash
  - Edit
---

The family's cross-repo claims used to live only in prose, and drifted without
anything failing. This walk finds what has drifted since.

Run it read-only by default. With `--fix`, correct only what is unambiguous
(a stale count, a wrong path, a superseded claim), and raise anything that
requires a judgement call instead of guessing.

## 1. The manifest is one revision, three copies

`contracts/flygaca-family.json` is committed **byte-identically** to
`iflygaca/Office`, `iflygaca/FlyGACA` and `iflygaca/Captain-Adel`. Compare the three: hash
the file in each checkout, then compare `version` and `sha`.

Nothing offline proves the three are the same revision — `version` and `sha`
reduce that to a visible one-line diff, which is exactly what you are looking
for here. If they differ, identify which repo **owns** the differing block
(`entity` and `repos` → Office; `chat` → FlyGACA) and correct the mirrors, never
the other way round.

Each repo's own gate must also pass:

| Repo | Gate |
| --- | --- |
| `iflygaca/Office` | `node tools/print/check-facts.mjs` |
| `iflygaca/FlyGACA` | `tests/family-contract.test.ts` (inside `npm test`) |
| `iflygaca/Captain-Adel` | `test/family-contract.test.js` (inside `npm run test:unit`) |

## 2. Entity facts

`01-governance/company-facts.md` in Office is the source of truth. The legal
name, CR and VAT number must appear verbatim in:

- `iflygaca/FlyGACA` — `src/lib/seo/jsonld.ts`, and `footer.legalEntity` + `legal.*`
  in **both** i18n bundles.
- `iflygaca/Captain-Adel` — `footer.js`, `terms.html`, `privacy.html`,
  `package.json`, `LICENSE`.

The banking IBAN and account number must appear in **none** of them — the
manifest travels to both product repos, and Office's `check-facts.mjs` asserts
their absence. Treat a hit as an incident, not a diff.

## 3. The repo roster

The real roster is `iflygaca/Office`, `iflygaca/FlyGACA`, `iflygaca/Captain-Adel`,
`iflygaca/FlyGACA-ios`, and `iflygaca/FlyGACA-app` (**archived** — never cited as
current). Flag every surviving reference to:

- a `FlyGACA/…` org path (legacy redirect to `iflygaca/…`),
- per-module App Store repos (`PPL`, `CPL`, `IR`, `ATPL`, `ELPT`, `AIP` — none
  exist under either owner; iOS metadata lives in `iflygaca/FlyGACA-ios`),
- `THE-BOOK-OF-FLY-GACA.md` in `iflygaca/FlyGACA` (never existed; the canon is
  Office's `00-strategy/the-book-of-fly-gaca.html`),
- `iflygaca/FlyGACA` described as "the iOS family", or `iflygaca/FlyGACA-app` as "the
  web monorepo".

## 4. Claims that must stay corrected

These have each been wrong in prose before and are the ones most likely to
regrow:

- **Two brains, not one.** `iflygaca/FlyGACA`'s `server/src/captain-adel.ts` +
  `corpus.ts` + `grounding-core.ts` and `iflygaca/Captain-Adel`'s `src/brain/` are
  parallel implementations of one contract. There is no `X-Adel-Api-Key` call
  between them; `server/src/brain.ts` is the seam, off on every revision.
- **Hosting is aspirational.** `flygaca.com` is down, the Express service has
  never been deployed, `me-central2` is not available to this account, and no
  user data exists anywhere. Any doc stating in-Kingdom residency as present
  fact is wrong.
- **iOS module status.** ELPT and AIP ship; PPL, CPL, IR and ATPL are parked
  while their **web** study packs keep selling.

## 5. Report

Produce a table: claim · where it appears · repo · correct? · action. Fix the
unambiguous ones, list the rest, and say plainly which repos you could actually
read — an audit that silently skipped a repo is worse than no audit.
