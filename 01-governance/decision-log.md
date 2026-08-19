---
title: Fly GACA — Decision Log
section: 01-governance
doc_type: document
status: active
owner: Founder
last_updated: 2026-08-19
lang: en
---

# Fly GACA — Decision Log

> Live decision log. Continues the series from `decision-log-template.docx`
> (DEC-001 … DEC-005). Log every decision that is (a) strategic, (b) irreversible or
> expensive to reverse, (c) likely to be questioned by investors/board, or
> (d) cross-functional — within 7 days of being made.
>
> Owner of the log: Captain Adel Yahya A. Madkhali, Founder · i@flygaca.com
> Confidential — Not for Distribution.

**Prior entries (in the template):** DEC-001 me-central2 region · DEC-002 Gemini for
inference · DEC-003 Moyasar for payments · DEC-004 Apache 2.0 licensing · DEC-005 60-day
academy pilot.

These entries (DEC-006 …) record the July 2026 shift from *build* to *go-to-company* —
the decisions captured in `00-strategy/ceo-execution-roadmap-2026-07.md`.

---

## DEC-006 — Why go-to-market and legal existence now, not more product build

| Field | Detail |
|---|---|
| **Date** | 2026-07-02 |
| **Decision** | Freeze new product/brand/localization work and run the go-to-company critical path — engage the IP lawyer, lock the name, register the legal entity, and land the first paying customer — as the sole priority for Q3 FY2026. |
| **Reversibility** | Two-way door — building can resume anytime. But the opportunity cost is one-way: weeks spent building are weeks the company still does not legally exist and has no revenue. |
| **Owner** | Founder |
| **Stakeholders Consulted** | Founder (solo); advisory review |
| **Review Date** | 2026-09-24 (end of Sprint 3) |

**Context.** The product is feature-complete and deployed (`flygaca-firebase.web.app`):
library, Captain Adel cited AI, 162-question study bank, 21 tools, Arabic RTL, offline PWA,
launch SEO. The company, however, is not legally registered, has never engaged the IP
lawyer, has zero customers and zero revenue. The product roadmap itself concludes "the
legal/entity track is now the critical path — the product itself is built," yet recent work
was Arabic localization and a repo reorg — more building. Continuing to build is the
comfortable, controllable work; it is also avoidance of the externally-gated work that
actually makes this a company.

**Options Considered.**
- *Keep building* (more features/localization/docs before going to market) — Pro: in the
  founder's control, low external friction. Con: the company still does not exist or earn;
  compounds sunk cost under an unresolved brand name.
- *Go-to-company now* (freeze build, run lawyer→name→entity→first customer) — Pro: moves the
  only two scoreboard numbers that matter (legal existence; paid customers); time-critical
  before the 12 Aug 2026 copyright law. Con: forces the uncomfortable, gated, external work.
- *Hybrid — build + slowly pursue legal* — Pro: feels balanced. Con: in practice the legal
  track keeps losing to the buildable track (the last month proves it); the critical path
  needs to be the *only* path to actually move.

**Rationale.** The scoreboard is being changed from "features shipped / documents written"
to "does the company legally exist, and how many customers have paid." Everything already
built is preparation for those two numbers; the gap is entirely on the far side of the
founder's comfort zone. For a different choice to be right, the product would have to be the
binding constraint on revenue — it is not; legal existence and demand are.

---

## DEC-007 — Why engage a Saudi IP lawyer now, ahead of the 12 Aug 2026 copyright law

| Field | Detail |
|---|---|
| **Date** | 2026-07-02 |
| **Decision** | Engage one of the shortlisted Saudi IP firms in Sprint 0 (this week) to deliver a written opinion on (a) GACAR/AIP redistribution rights and (b) the "Fly GACA" name/trademark exposure — accounting for the **new** copyright law, not the 2003 law. |
| **Reversibility** | Two-way door on the engagement; the *timing* is effectively one-way — an opinion obtained after 12 Aug 2026 may miss the window to shape pre-launch decisions cleanly. |
| **Owner** | Founder |
| **Stakeholders Consulted** | Shortlisted IP firms (`02-legal/lawyer-shortlist.md`); brief ready (`02-legal/lawyer-brief`) |
| **Review Date** | 2026-07-30 (opinion in hand) |

**Context.** The lawyer brief has been ready for weeks but unsent. Two open risks (P0-1
corpus rights, P0-2 name) are gated on it, and P0-3 entity registration is gated on the name
lock that only the opinion unblocks. A new Saudi Copyright Law takes effect **12 August
2026**, with SAIP implementing regulations on the official-documents exclusion and the AI
-training exception landing then — both central to Captain Adel's corpus rights.

**Options Considered.**
- *Self-assess on desk research* — Pro: free, immediate. Con: not legal advice; corpus
  rehosting and the name both carry real exposure; investors/academies will ask.
- *Engage now (fixed-fee, conflict-checked)* — Pro: unblocks name→entity→revenue; opinion
  reflects the new law. Con: cost; forces the name decision.
- *Wait until after 12 Aug 2026* — Pro: opinion reflects final implementing regs. Con:
  stalls the entire critical path 6+ weeks; leaves the name unresolved while brand cost
  compounds. Rejected.

**Rationale.** One email unblocks the name, the corpus position, and the entity. It is the
single highest-leverage action available and it is time-boxed by the 12 Aug law. Ask each
firm for a fixed-fee quote, turnaround, and a conflict check (do they act for GACA?).

---

## DEC-008 — Why resolve the "Fly GACA" name before further brand investment

| Field | Detail |
|---|---|
| **Date** | 2026-07-02 |
| **Decision** | Gate all further brand, print, and localization spend on the lawyer's name opinion; lock the final name (keep "Fly GACA" / demote to tagline + register a distinct mark / rebrand) before any additional brand work or the entity registration. |
| **Reversibility** | The *name itself* is a one-way door for practical purposes — a post-launch rebrand touches the repo, domains, brand assets, entity name, print collateral and the Arabic tree. Cheap to change now, expensive later. |
| **Owner** | Founder |
| **Stakeholders Consulted** | IP lawyer (pending, DEC-007) |
| **Review Date** | 2026-07-30 (name locked) |

**Context.** Desk research (P0-2) finds "Fly GACA" may be **unregistrable** as a trademark
and carries passing-off exposure because it contains "GACA," a government authority's
designation; SAIP can refuse marks implying official endorsement, and a disclaimer is
necessary but not sufficient. Every week of building/localizing under the name raises the
switching cost of a forced rebrand.

**Options Considered.** (For the lawyer to weigh — decision to *gate on the opinion* is what
is logged here.)
- *Keep "Fly GACA"*, accept possible unregistrability, mitigate with prominent disclaimers.
- *Demote "Fly GACA" to a descriptive tagline*, register a distinct primary mark.
- *Rebrand* the primary name to one without "GACA." ("Captain Adel" / `captadel.com`,
  already owned, is unaffected either way and is a natural fallback front door.)

**Rationale.** The name is the highest-leverage unresolved question and the most expensive to
get wrong after launch. Freezing brand spend until it is locked protects against pouring more
sunk cost into a name that may have to change. `captadel.com` is already secured as a hedge.

---

## DEC-009 — Why sequence revenue B2B-schools-first, before consumer checkout

| Field | Detail |
|---|---|
| **Date** | 2026-07-02 |
| **Decision** | Pursue B2B academy seat-licences as the first revenue line — quoted and invoiced manually (ZATCA e-invoice + `grantSchoolLicence`) — ahead of consumer online checkout, which is gated on the legal entity and the payment gateway. |
| **Reversibility** | Two-way door — both lines run in parallel eventually; this is a sequencing/priority call, not an exclusion. |
| **Owner** | Founder |
| **Stakeholders Consulted** | Founder; CS playbooks (`08-customer-success/`) |
| **Review Date** | 2026-09-24 |

**Context.** Consumer checkout cannot open until the legal entity exists (P0-3) and the
payment gateway is live (Moyasar, per **DEC-003**). Schools, however, can be quoted and
invoiced **today** via a manual ZATCA e-invoice and the existing admin grant callable — the
only invoice-able revenue path pre-entity. Year-1 logic: ~10 schools × ~50 seats × ~SAR 249
≈ **SAR 125k ARR**, dominant until consumer checkout opens.

**Options Considered.**
- *B2B-first* — Pro: invoice-able now, recurring, sticky, provides demand proof before more
  building. Con: longer sales cycle; founder-time-intensive.
- *Consumer-first* — Pro: larger TAM, self-serve. Con: fully blocked until entity + gateway;
  no revenue possible before then. Rejected as first mover.
- *Wait for both* — Con: forfeits the one revenue line available now. Rejected.

**Rationale.** B2B is the only revenue that can be earned before the entity and gateway
exist, and a signed pilot is the most valuable demand signal available — worth more than any
feature. It gets the founder's selling time from Sprint 1.

---

## DEC-010 — Moyasar confirmed as the KSA payment gateway; Stripe code kept dormant

| Field | Detail |
|---|---|
| **Date** | 2026-08-09 |
| **Decision** | **Moyasar is the payment processor that goes live for KSA B2C checkout** (flygaca.com and captadel.com), reaffirming DEC-003 and matching the invoicing docs (Qoyod + Moyasar wiring). The built-but-dormant Stripe integration (`functions/stripe.js`) is **kept, not deleted**, as the fallback/expansion rail for non-KSA cards; it stays out of the launch path. |
| **Reversibility** | Two-way door — Stripe code remains in the repo and can be activated later; the decision removes a documentation contradiction, not a capability. |
| **Owner** | Founder |
| **Stakeholders Consulted** | Founder (solo) |
| **Review Date** | 2026-08-27 (Sprint 3 — gateway live in test mode) |

**Context.** A contradiction was flagged 2026-07-02 (governance flag): DEC-003 logged
**Moyasar** (Saudi-licensed, mada-capable, Fatoora-compatible), while
`03-finance/monetization.md` described **Stripe** as the built checkout. The consumer price
card, the Qoyod e-invoicing decision (`04-compliance-ksa/fatoora-phase2-decision-2026-07.md`)
and the VAT procedure (`03-finance/invoicing-and-vat-returns.md`) all already assume
Moyasar.

**Options Considered.**
- *Moyasar live, Stripe dormant* — Pro: the logged decision of record; mada/local rails for
  KSA consumers; consistent with the Qoyod + VAT docs. Con: new integration work in the
  highest-load sprint (Sprint 3).
- *Stripe live, revisit Moyasar later* — Pro: `functions/stripe.js` is built and unit-tested.
  Con: contradicts DEC-003; leaves mada coverage for KSA consumers open; every finance/
  compliance doc would need rework. Rejected.
- *Both live at launch* — Pro: coverage. Con: doubles integration and reconciliation load on
  a solo founder in the paywall sprint. Rejected for launch.

**Rationale.** One processor at launch, and it's the one the legal/financial stack is already
built around. Moyasar's mada support is the deciding factor for KSA consumers; Stripe remains
the pre-built fallback for international cards whenever it's worth the reconciliation
overhead. iOS payments are unaffected in either case (RevenueCat IAP).

## DEC-011 — Re-cut the price card, retire the Student tier, and adopt package B2B pricing

| Field | Detail |
|---|---|
| **Date** | 2026-08-19 |
| **Decision** | The consumer and B2B price card is replaced wholesale by the card now in [`03-finance/monetization.md`](../03-finance/monetization.md): Pro **79/mo · 649/yr**; Exam Season Pass **299 / 90 days** (replacing the 199 / 120-day "Exam Term"); exam-prep packs banded by content depth at **249 / 399 / 499**; All-Access Bundle **1,499**; Captain Adel credits **39** / 50 answers. The **Student tier is removed entirely**. B2B moves from per-seat bands to annual packages — Cohort **12,000/yr** (25 seats), Academy **39,000/yr**, Institution **from 72,000**. The licensed Captain Adel API is priced for the first time at **499 / 1,999 / 6,999** per month. |
| **Reversibility** | Two-way door on the numbers; one-way-ish on the Student tier, since removing a plan people may already hold is harder to undo than a price change. No customer holds a paid plan yet — checkout has never been open — so the cost of this change is documentation only. |
| **Owner** | Founder |
| **Stakeholders Consulted** | Founder (solo) |
| **Review Date** | 2026-11-19 (first full quarter after checkout opens) |

**Context.** Two problems, found together. First, the displayed prices and the charged prices
had drifted apart on every SKU — worst on the B2B cohort, where the site advertised SAR 6,000
and the documented deploy charged SAR 2,499. Second, the **Student tier charged less than Pro
for an identical entitlement** and its eligibility check (`isStudentEmail`) was never wired to
any route, so it was strictly the better buy for every visitor and Pro's price was decorative.

**Why these numbers.** Benchmarked against three anchors rather than a rival — there is no
GACAR competitor at any price. (1) The international question-bank band: a single written costs
SAR 188–244 at ASA/Dauntless/Sheppard, a full-year EASA bank SAR 860–960. (2) Saudi purchasing
power: SAR 29–55/month is the corridor local consumer subscriptions occupy, and domestic
exam-prep edtech sells one-time at SAR 199–400. (3) The buyer's committed spend: a cadet is
already paying SAR 60,000–250,000 for training, and a single GACA practical exam costs SAR
2,000. A Gulf pilot pays ~SAR 1,970/year for Jeppesen Middle East charts alone.

**Why packages instead of per-seat B2B.** Every aviation-ops vendor prices per aircraft with
unlimited students, so a per-seat card invites the objection "we already pay SAR 37/aircraft
for everything." The package hides the seat and sells the admin/readiness dashboard.

**What this supersedes.** The June-2026 price card in DEC-009's revenue logic, and the
per-seat school card carried in `03-finance/finance-strategy.md`, `00-strategy/roadmap.md`,
`07-gtm/`, `09-investor-relations/` and `02-legal/order-form-template-2026-07-03.md`. Those
documents are corrected; the dated records that quote the old card (board packs, prior audits,
this log's earlier entries) are **left intact** — they are the record of what was decided then.

**Note on DEC-010.** Its reasoning stands, but its premise has moved: the dormant Stripe
integration it preserved **no longer exists**. The Firebase Functions codebase it referred to
was replaced by an Express service on Cloud Run, and no Stripe code was carried across.
Moyasar is the only payment rail, as DEC-003 and DEC-010 both intended.

---

*Living document. Log new strategic decisions here within 7 days. Not legal advice.*
