---
title: Fly GACA — Action Plan (v2)
section: 00-strategy
doc_type: plan
status: active
owner: Founder
last_updated: 2026-06-16
lang: en
---

# Fly GACA — Action Plan (v2)

**Updated:** 2026-05-24 · **Integrates:** the external UX/technical review **and** the
strategic breakdown (risks, monetisation, B2B). One coherent plan.

How to read this: §1 corrects things the reviews got wrong. §2 is the strategic
risk layer — read it first, it reorders everything below. §3 is what's already
shipped. §4 is P1 (before marketing). §5 is the strategic bets that decide whether
the business works. §6 is post-launch depth. §7 is the sequence.

Effort key: **S** ≈ under half a day · **M** ≈ 1–3 days · **L** ≈ a week+ · **XL** ≈ multi-week.

---

## 1. Audit corrections — what the reviews got wrong or already-built

- **"Stop Claude" overlay** — not in the code. It was the reviewer's own automation
  tool. Nothing to remove.
- **Desktop hamburger** — not duplicated. CSS already hides it above 1024px where the
  full nav shows. One pattern ships.
- **No header search icon existed** — the "ع" is the language toggle. The real gap was
  that a full Cmd-K palette was built but had no visible trigger. Now fixed (§3).
- **Focus rings** already exist globally (`:focus-visible`). Verify they aren't clipped
  by `overflow:hidden` ancestors.
- **The guide count bug was the "11", not the "10"** — there are exactly 10 guide pages.
  Fixed. The **tools count was also wrong** — 24 tool pages exist, copy said 21. Fixed.
- **Several "add this" items already exist**: changelog, reading paths, safety lessons,
  bookmarks, a waitlist module, and the Cmd-K palette. The work is surfacing, not building.

---

## 2. Strategic risks — read this first

Three risks can sink the product regardless of how polished the UI is. Each reorders
the priorities below.

### 2.1 The trust & authority gap — *existential*
Fly GACA is "unofficial and educational." Its entire value is being *more usable* than
gaca.gov.sa while being *just as current*. The moment a pilot fails a checkride or
takes a violation because the platform showed a stale regulation, the brand is done —
and strict instructors will tell every cadet.

**My take:** this is the single biggest risk and it is not primarily a UI problem.
A visible "Last synced" stamp (§4.1) is necessary but *not sufficient* — a stamp that
says "synced 8 months ago", or worse, a wrong "current" flag, is more damaging than no
stamp. The real requirement is an **editorial process**: someone owns checking GACA
publications each AIRAC cycle and updating the stamps. Build the UI in P1; stand up the
process before launch. Treat currency as a product function with an owner, not a feature.

### 2.2 Post-exam churn — *the monetisation flaw*
The SAR 299 Exam Pass gives 90 days of full Pro. A rational cadet buys it, passes,
and leaves. Pro at SAR 449/year has to win against that.

**My take — partial pushback.** The Exam Pass is not pure cannibalisation: for a cadet
who would *never* commit to an annual plan, it converts SAR 0 into SAR 299. Don't kill
it. The actual flaw is that **nothing pulls the user back after the exam.** Two fixes,
both cheaper than redesigning pricing:
1. **Make Pro indispensable after the exam** — that is the logbook/currency bet (§5.1).
   If Pro is just a study aid, churn is structural and unavoidable.
2. **A win-back offer** — around day 75 of an Exam Pass, surface an in-product offer to
   roll remaining value into a discounted first year of Pro. One screen, high ROI.

So: keep the Exam Pass, but treat §5.1 as the thing that makes the whole pricing model
viable. Without a reason to stay, every other monetisation tweak is rearranging chairs.

### 2.3 AI hallucination — *the brand-reputation risk*
Captain Adel answers high-stakes regulatory questions. One confident wrong answer about
an operational limit, screenshotted by an examiner, is a lasting reputational hit.

**My take:** citations alone don't solve this — a confident answer with a *plausible but
wrong* citation is worse than a refusal. The fix is a strict fallback protocol (§4.2):
when retrieval confidence is low, Captain Adel must **refuse and redirect to the exact
GACAR text**, never guess. Also: the eval harness (already in the repo) should test
refusal behaviour explicitly, and every answer should surface the **retrieved source
snippet**, not just a citation link, so the user verifies against real text. Conservative
refusal is a feature here, not a failure.

---

## 3. Shipped so far

**P0 quick wins** — guide count corrected 11→10; tools count corrected 21→24
(both EN + AR, every page); homepage hero proof-point line (74 Parts · 21 handbooks ·
61 aerodromes · 13 charts · 190 references); footer reworked site-wide (62 pages) —
copyright now reads "Independent of GACA · Made in the Kingdom · صُنع في السعودية" with
a `hello@flygaca.com` contact link; a labelled header search button added site-wide that
opens the existing Cmd-K palette.

**Hero rebuild** — the logo square is now a Captain Adel demo card showing a different
cited example each visit (6 bilingual Q&As, each citing a real GACAR Part). Hero padding
trimmed so the CTAs sit above the fold.

**Pricing rebuild** — Free/Pro/Exam Pass comparison table (accessible icon cells); a
trust-signal row (mada · Visa · Mastercard · Apple Pay, 14-day Pro refund, ZATCA-compliant
invoice); a one-field email waitlist wired to the existing `waitlist.js` (no account
needed); a live school ROI calculator.

All of the above is in the working tree — commit and deploy to go live.

---

## 4. P1 — before any marketing push

Risk mitigations first (they move up because of §2), then the technical work.

### 4.1 "Last synced with GACA" stamps + AIRAC currency flags — M + ongoing process
*Mitigates §2.1.* Every regulation, handbook, aerodrome and chart page shows a visible
"Last synced with GACA — [date], AIRAC [cycle]" stamp, with a green check when current
and an amber flag when a newer official amendment may exist. Charts/aerodromes get a
"diff vs last AIRAC" badge. **Critical:** pair the UI with a named editorial owner and a
per-AIRAC sync checklist — see §2.1.

### 4.2 Captain Adel strict fallback protocol — S–M
*Mitigates §2.3.* Update the RAG system prompt (`functions/rag/system-prompt.js`): on
low retrieval confidence, refuse to answer the operational question, state plainly that
it can't verify, and link the user to search the exact GACAR text. Add refusal-behaviour
cases to the eval harness. Surface the retrieved source snippet with every answer.

### 4.3 A real global full-text search — M→L
The Cmd-K palette is now discoverable but only jumps to destinations. Build a static
search index (the content is static HTML) covering all 74 Parts, 21 handbooks, 61
aerodromes, 13 charts and 10 guides, with type filters, plus recent + bookmarked items
for signed-in users. Point the library page's search box at the same index.

### 4.4 SEO / structured data — M
`robots.txt`, `sitemap.xml`, canonical and OG/Twitter tags exist. The gap: JSON-LD is
only on two pages. Add it to every route — `Product`/`Offer` on pricing,
`Course`/`EducationalOccupationalProgram` on Ground School, `WebPage` elsewhere. Add the
missing sitemap entries (changelog, bookmarks, packs). Pre-render the library index.

### 4.5 Custom domain — S (code) + external (DNS)
Everything is hard-coded to `flygaca-firebase.web.app`. Migrate to `flygaca.com` before
any marketing — branding, trust, email deliverability for `hello@flygaca.com`, SEO.
Register the domain now; DNS has lead time.

### 4.6 Accessibility — contrast — S
`--text-dim` (`#6B7682`) on the near-black background measures ≈4.0:1, below the WCAG AA
4.5:1 minimum, and it is used for body-ish copy. Bump it to ≈`#8A95A1` in `tokens.css`.

### 4.7 Nav consistency, disclaimer strip, mobile — S each
One nav set and one primary CTA on every page (they differ today). Make the top
disclaimer strip a one-time dismissible banner — it eats ~10% of mobile height on every
page. Test and tighten layouts at 360–390px.

### 4.8 Pricing — tier framing, and the SAR 1,499 question — S (copy) / M (if new tier)
Separate the copy for *individual study aids* from *professional/enterprise* offers.
**My take on a SAR 1,499 "Pro+" tier:** hold it. Adding individual tiers before the core
Free→Pro path converts is a distraction, and the high-end willingness-to-pay clearly
sits on the **B2B side** (schools, instructors — §5.2), not individuals. The 1:1 consult
Prep Packs already cover the premium-individual case. Frame the high end as institutional,
not "Pro+", until there's evidence individuals want more than Pro.

---

## 5. The strategic bets — bigger than P1, these decide the business

These are XL initiatives, not features. They map to phases in your existing `roadmap.md`.

### 5.1 The logbook & currency tracking as the retention moat — XL
*This is the answer to §2.2.* Today the logbook reads like a study-aid afterthought. To
stop post-exam churn it has to be a reason to keep paying for a whole career.

**My take — be focused, don't fight ForeFlight head-on.** LogTen Pro and ForeFlight have
a decade of polish; "best-in-class generic logbook" is a multi-year fight you'd lose.
Win on the wedge competitors *can't* easily copy: a **GACA-regulation-aware** logbook —
currency tracked directly against GACAR Part 61 recency requirements, Saudi-specific,
bilingual, with alerts ("your night currency lapses in 9 days"). A focused, regulation-
aware logbook for Saudi pilots beats a me-too generic one. This is the single highest-
leverage post-launch investment. Maps to `roadmap.md` Phase 3.

### 5.2 Instructor dashboard / B2B — L→XL
A portal for CFIs and schools: assign reading paths, monitor cadet ground-school
progress, see mock-exam scores. **My take:** this is the strongest revenue lever in the
whole plan — it drives bulk seat sales *and* turns instructors into the platform's
evangelists (an instructor who runs their class on Fly GACA brings every cadet). The
school seat pricing already exists; the dashboard is what makes it sell. Prioritise this
above new individual features. Maps to `roadmap.md` Phase 5.

### 5.3 Adaptive exam coach — L
Replace static quizzes with an engine that weights a student's weak topics into their
next mock exam and suggests targeted reading paths. High retention value, and a clear
Pro differentiator. The 162-question bank and readiness analytics already exist to build
on. Maps to `roadmap.md` Phase 7.

### 5.4 Mock checkride simulator (oral prep) — L→XL
A scenario-based simulator for the *oral* portion of the checkride — ideally voice-driven,
firing rapid questions and assessing recall under pressure. **My take:** genuinely
differentiated and nobody in this market does it well — but scope it carefully. Start
text-based, scenario-driven, reusing Captain Adel; add voice only once the text version
proves demand. Voice-to-text adds cost and failure modes. Maps to `roadmap.md` Phase 7.

### 5.5 Offline / PWA — M→L
Hangars, cockpits and remote aerodromes have poor signal. A service worker already
exists — extend it to cache the regulation library and flight tools, add an install
prompt, an offline indicator, and a "Downloaded for offline" badge per document.
**My take:** for a flight-line tool this is closer to essential than optional — promote
it from "polish" to a committed P1.5 item once the trust and search work lands.

---

## 6. P2 — post-launch depth

Bookmarks already exist — add highlights and per-paragraph notes synced to the account.
A "Cite this" button on every regulation paragraph. Captain Adel transcript/history view
and chat-to-PDF export, with an explicit rate-limit counter ("4 of 5 free questions left
today"). Social proof — "Built with input from GACA-licensed instructors", cadet/school
testimonials, real screenshots. True Arabic parity on inner pages (the toggle works; the
pricing body and several pages are still English-only). A "Was this section clear?"
widget and a structured "Report a typo / outdated citation" flow (this also feeds the
§2.1 editorial process). Tool-index preview thumbnails. A two-click data-export and
delete-account flow in Settings (PDPL).

---

## 7. Recommended sequence

1. **Shipped** — P0, hero, pricing (§3).
2. **Risk mitigations** — §4.1 currency stamps + the editorial process, and §4.2
   Captain Adel fallback. Do these first; they protect the brand the moment traffic arrives.
3. **Register the domain** (§4.5) — code is cheap, DNS has lead time.
4. **Search** (§4.3) — the differentiator.
5. **SEO, contrast, nav/disclaimer/mobile, pricing framing** (§4.4, 4.6, 4.7, 4.8).
6. **Launch gate** — per your `roadmap.md`, the real blockers are the legal track and
   the PDPL DPIA. Nothing in these reviews changes that.
7. **Post-launch, in priority order:** the logbook moat (§5.1) and the instructor
   dashboard (§5.2) first — they decide retention and revenue — then the exam coach,
   checkride simulator and full PWA.

**The one-line version:** ship the trust and accuracy safeguards before you market;
bet the retention story on a regulation-aware logbook and the revenue story on the
instructor dashboard; treat the Exam Pass as a funnel, not a leak, and win users back
with utility rather than by removing the cheap entry point.
