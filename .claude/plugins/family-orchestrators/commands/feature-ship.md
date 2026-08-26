---
description: Ship a change that crosses repos — sequencing, gates, and the three-PR discipline
argument-hint: <what you are shipping>
allowed-tools:
  - Read
  - Edit
  - Write
  - Bash
  - Grep
  - Glob
---

Shipping: `$ARGUMENTS`

Most changes belong to one repo. This walk is for the ones that do not — a chat
contract change, an entity-fact change, a claim that appears in more than one
`CLAUDE.md`, or a product change that needs its documentation to land with it.

## 1. Decide the blast radius before writing code

| If the change touches… | Then it is also… |
| --- | --- |
| `server/src/contract.ts` (FlyGACA) | the `chat` block of `contracts/flygaca-family.json` → **three PRs** |
| `01-governance/company-facts.md` (Office) | the `entity` block → three PRs, plus the verbatim strings in both product repos |
| the repo roster or a family-wide claim | Office's `CLAUDE.md` table, and every doc quoting it |
| pricing, plans or entitlements | `03-finance/monetization.md` in Office **and** the server-owned entitlement path in FlyGACA |
| the assistant's voice, refusal behaviour or the GACA relationship | Captain Adel's `system-prompt.js` + `authoring/`, and Fly GACA's `<Disclaimer />` copy |

If none of these apply, stop — ship it in the one repo and skip the ceremony.

## 2. The manifest sequence, if the manifest moves

1. Edit the **owning** repo's copy (`entity` and `repos` → Office; `chat` →
   FlyGACA). A mirror is never the place to fix a block.
2. Bump `version`.
3. Re-stamp: `node tools/contracts/stamp-manifest.mjs contracts/flygaca-family.json`
   (the tool lives in Office). Editing without re-stamping fails every repo's
   gate immediately.
4. Copy the file **verbatim** into the other two repos.
5. Open all three PRs **together**. One now and two later is the drift this
   whole mechanism exists to prevent.

## 3. Gates, per repo, before any PR goes up

| Repo | Gate |
| --- | --- |
| `ay2m/FlyGACA` | `npm run verify` **and** `cd server && npm run lint && npm test && npm run build` — the root gate does not cover `server/` |
| `ay2m/Captain-Adel` | `npm run smoke && npm run smoke:frontend && npm run test:unit && npm run eval:dry`, plus a live `npm run eval` for any brain change |
| `ay2m/Office` | `node tools/print/check.mjs` and `node tools/print/check-facts.mjs`, with the regenerated PDFs and `.buildcache.json` in the **same commit** as the doc edit |

## 4. Documentation lands with the change, not after

A product change that makes a doc in Office wrong is not finished. Update the
doc, rebuild its PDF, and mirror it into `ar/` (English is authoritative; the
Arabic mirror is convention, not CI). If the change alters what an agent needs
to know, update the repo's `CLAUDE.md` and the matching plugin agent in the same
PR — the plugins in this marketplace are how that knowledge reaches a session
that is not in the checkout.

## 5. Report

For each repo: branch · gate result · PR link. Name explicitly any repo you did
not touch and why, and any gate you could not run here.
