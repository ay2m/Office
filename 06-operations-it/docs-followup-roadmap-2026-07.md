---
title: Fly GACA — Office Documents Follow-up Roadmap
section: 06-operations-it
doc_type: plan
status: active
owner: Founder
last_updated: 2026-07-04
lang: en
---

# Fly GACA — Office Documents Follow-up Roadmap

> **Purpose.** The 2026-07-03 refactor pass (see `repo-health-report-2026-06-16.md` §Addendum)
> reorganized the office, filled the scaffolds, and added the print pipeline. It left a
> defined tail of work: nine new/rewritten documents are still `status: draft` carrying
> **60 `[Owner to confirm]` markers**, plus a few docs-infrastructure cleanups. This roadmap
> sequences that tail to done.
>
> **Created:** 2026-07-04. **Owner:** Founder (solo). **Not legal advice.**
> **Scoreboard — two numbers:** **(1) How many of the 9 new drafts are adopted
> (`status: active`)? (2) Is the HR pack ready before the first non-founder hire?**
>
> This is the *documents* roadmap. It complements the two existing roadmaps and does not
> repeat them: `00-strategy/roadmap.md` (product, done) and
> `00-strategy/ceo-execution-roadmap-2026-07.md` (go-to-company — legal/entity/first customer).
> Where a document here is gated on a legal or entity step, the gate lives in that CEO roadmap;
> this file only points at it.

---

## The nine drafts in play

| Document | Section | `[Owner to confirm]` | Gated by |
|---|---|---:|---|
| finance-strategy.md | 03-finance | 10 | Phase 0 (your numbers) |
| investor-thesis.md | 09-investor-relations | 6 | Phase 0 (your numbers) |
| compliance-roadmap.md | 04-compliance-ksa | 9 | Phase 0 + entity track |
| refund-and-cancellation-policy-draft-2026-07-03.md | 02-legal | 6 | Phase 1 (counsel) |
| order-form-template-2026-07-03.md | 02-legal | 4 | Phase 1 (counsel) |
| onboarding-checklist-2026-07-03.md | 05-people | 7 | Phase 2 (first hire) |
| offboarding-checklist-2026-07-03.md | 05-people | 6 | Phase 2 (first hire) |
| grievance-and-disciplinary-procedure-2026-07-03.md | 05-people | 7 | Phase 2 (first hire) |
| anti-harassment-policy-2026-07-03.md | 05-people | 5 | Phase 2 (first hire) |

Each has an identical Arabic mirror under `ar/`; adopting a document means flipping **both**
copies to `status: active` and rebuilding their PDFs (`cd tools/print && npm run build`).

---

## Phase 0 — Owner desk review · *now, no external dependency*

Answer the markers only you can settle — before anything goes to a lawyer. This unblocks every
later phase. Convert each marker to either a real value or an explicit stated assumption.

> **Worksheet:** all 60 markers are consolidated into `../00-strategy/owner-decision-brief-2026-07.md`
> (groups A–D for your desk, group E for counsel). Fill it and the strategy docs flip to `active`.

| # | Decision to make | Docs it unblocks | Done when |
|---|---|---|---|
| 0.1 | **Stripe vs Moyasar** (the DEC-open item in `decision-log.md`) | refund policy §7, finance-strategy, order-form | Processor named; refund-routing + sub-processor register updated |
| 0.2 | Entity form: **MISA license vs CR-only**, **sole-proprietorship vs LLC** | compliance-roadmap, both legal drafts (operator name) | Chosen; compliance-roadmap tables reflect it |
| 0.3 | **VAT registration timing** + pre-registration invoice/VAT-line treatment | order-form §2, refund policy §8, compliance-roadmap | Timing set; invoice template VAT line finalized |
| 0.4 | Proposed windows: refund 30d / renewal 7d / prep-pack 14d / consult 48h; B2B net-30; seat grant on signature vs payment | refund policy, order-form | Confirmed or adjusted |
| 0.5 | The **ask**: amount / instrument / valuation / use of funds; TAM basis | investor-thesis | Filled or deliberately left `[TBD until raise]` |
| 0.6 | One-time fee amounts (lawyer / CR / gateway); cash + runway; banking signatory model | finance-strategy | Numbers in |
| 0.7 | Employee medical-insurance provider; HR-record retention period | HR pack (×4) | Values in |

**Phase-0 done-when:** zero unanswered `[Owner to confirm]` markers remain — each is either a
value or a written assumption.

## Phase 1 — Legal drafts → counsel · *gated on the lawyer engagement in the CEO roadmap*

`refund-and-cancellation-policy` and `order-form-template` carry placeholder-entity text and
must not be published until reviewed. They ride the **same** lawyer engagement as DEC-007/008
(`ceo-execution-roadmap-2026-07.md` Sprint 0) — add them to that brief; do not open a separate
engagement.

| Step | Done when |
|---|---|
| Add both drafts to the lawyer brief bundle | Bundle includes them |
| Counsel review + edits | Comments resolved |
| Replace placeholder operator with registered CR/VAT identity | Entity name/CR/VAT in both docs |
| Flip `status: draft → active` (EN + AR); rebuild PDFs | Both trees active; PDFs regenerated |
| Publish | Only at payments-launch gate **L2** (CEO roadmap) |

## Phase 2 — HR pack activation · *before the first non-founder hire*

The four HR docs need owner review, ideally a Saudi HR/counsel check, and **one concrete
appointment** they both depend on.

| Step | Done when |
|---|---|
| **Appoint an external grievance/harassment recipient** for founder-conflict cases | Named in grievance §4.1(4) + anti-harassment §5.1(2) |
| Owner (+ HR/counsel) review of all four docs | Comments resolved |
| Draft the two P2 stubs they reference: **Probation Review Form**, **PIP template** | Both exist (only if hiring is near) |
| Wire Employee-Handbook acknowledgment into onboarding Day 1 | Onboarding checklist Phase B references the signed acknowledgment |
| Flip `status → active` (EN + AR); rebuild PDFs | Pack active |

## Phase 3 — Strategy docs → active · *gated only on Phase 0*

`finance-strategy`, `compliance-roadmap`, `investor-thesis` need **no counsel** — only your
Phase-0 answers. Once the numbers/decisions are in, flip `status → active` (EN + AR) and rebuild.

## Phase 4 — Docs-infrastructure follow-ons · *independent; can be done any time*

| Item | Why | Owner | Status |
|---|---|---|---|
| Extend the pipeline to the **HTML brand docs** (`the-book-of-fly-gaca.html`, brainstorms dashboard, `design-system.html`, `tidal-reckoning.html`) | the only docs not yet in `_print/` | Claude | ✅ done — `tools/print/build-html.mjs`; PDFs under `_print/` |
| **CI guard**: assert every `.md` has standard front-matter + an up-to-date PDF, and every brand HTML has a PDF | stops `_print/` and metadata drifting from source | Claude | ✅ done — `tools/print/check.mjs` + `.github/workflows/docs-check.yml` |
| Move `_print/**/*.pdf` to **Git LFS** | repo is ~95 MB; PDFs are ~82 MB of it | Founder | ⛔ blocked in the build environment (no `git-lfs`; needs a history rewrite + force-push) — run locally: `git lfs install && git lfs track "_print/**/*.pdf" && git lfs migrate import --include="_print/**/*.pdf"` |
| Reconcile the **Google-Sheet master index** (health-report X1 / FLY-9) — 204 old→new filename pairs | the sheet is AI-locked; needs a manual paste from the CSV | Founder | manual |
| Delete the duplicate originals in `library/06-product-eng/` + `flygaca/office/` (`consolidation-manifest-2026-06-16.md`) | dedup cleanup still open | Founder | manual |

## Phase 5 — App-repo backlog · *cross-reference only; executed in the app repo, not here*

Logged in the health-report addendum; tracked here for one-page visibility:

- **`quiz.json` `correct: null`** on all 162 questions — the self-assessment is decorative until
  fixed. Highest curriculum priority.
- Analytics wiring (empty Cloudflare token; local-only error beacon).
- **Stripe vs Moyasar** decision (same as 0.1) then wire checkout to the pricing CTA.
- CI parity guards for the hand-synced lists (`guards.js`, `TESTER_EMAILS` ↔ `staff.js`).

---

## Sequencing at a glance

```
Phase 0 (owner desk review) ──┬─► Phase 3 (strategy docs → active)     [no counsel]
                              │
                              ├─► Phase 1 (legal → counsel) ──► publish at L2
                              │        └─ rides CEO-roadmap lawyer engagement
                              │
                              └─► Phase 2 (HR pack) ──► ready before first hire
                                       └─ needs external-recipient appointment

Phase 4 (docs-infra) — parallel, no gate
Phase 5 (app repo)   — tracked here, done elsewhere
```

*This roadmap is a living tracker. Update the status of each phase as items close; when all nine
drafts are `active` and Phase 4 is done, retire this file into the health report's history.*
