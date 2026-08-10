---
title: SOP — Log a Decision in the Decision Log
section: 06-operations-it
doc_type: runbook
status: active
owner: Founder
last_updated: 2026-08-10
lang: en
---

# SOP — Log a Decision in the Decision Log

A standard operating procedure for recording a company decision in
`01-governance/decision-log.md`. Short by design — a new person should be able to
follow it end to end without asking anyone. Each step says what to do and what to do
if it goes wrong.

The decision log is the memory of *why* the company did things. Investors, the board,
and future-you all read it. A decision that isn't logged effectively didn't happen —
it becomes a thing nobody can explain six months later.

---

## When to use this

Log a decision when **any** of these is true:

- **Strategic** — it changes direction, priorities, or what the company is.
- **Expensive to reverse** — a one-way (or nearly one-way) door: name, entity, pricing,
  a gateway/vendor, a legal position.
- **Likely to be questioned** — an investor, the board, or an academy partner will ask
  "why did you do that?"
- **Cross-functional** — it touches more than one area (e.g. legal *and* product,
  finance *and* GTM).

> If you're unsure whether a decision qualifies — **log it**. An extra entry costs
> nothing; a missing one costs an explanation you can't give later.

**Do not** use this for routine, easily-reversed working choices (a copy tweak, a
folder rename, which task to do first today). Those don't need a permanent record.

---

## The procedure

### 1. Confirm it's a decision worth logging
Run it against the four triggers above.
- **If it doesn't clearly qualify → log it anyway** and keep the entry short. Over-logging
  is harmless; under-logging is not.

### 2. Open the log and take the next number
Open `01-governance/decision-log.md`. Find the last entry (e.g. `DEC-010`) and use the
next number (`DEC-011`). Copy the previous entry's block as your template.
- **If two decisions were made close together →** number them in the order they were
  *made*, not the order you're typing them. Never reuse or skip a number.

### 3. Fill the header table
Complete every field: **Date · Decision · Reversibility · Owner · Stakeholders
Consulted · Review Date.**
- *Reversibility* = one-way door (expensive/permanent) or two-way door (easily undone).
  Say which, in one line.
- **If you can't name who was consulted →** write "Founder (solo)". That is a valid,
  honest answer for a solo call — don't leave it blank.

### 4. Write the three prose blocks
Under the table, write **Context** (what forced the decision), **Options Considered**
(each with a one-line pro/con), and **Rationale** (why this option won).
- **If you can't state the rationale in a sentence →** the decision isn't actually made
  yet. Mark it "provisional", set a near Review Date (step 5), and come back. Don't log a
  half-decision as final.

### 5. Set a Review Date
Give every decision a date to be revisited, so it comes back around instead of being
forgotten.
- **If there's no natural review point →** default to the end of the current sprint.

### 6. Do it within 7 days
Log the decision within **7 days** of making it, while the reasoning is fresh.
- **If it's already older than 7 days →** log it anyway, dated the **real** decision date
  (not today). A late entry beats no entry.

---

## Before you commit — rebuild the PDF (required)

The decision log is a tracked `.md` file, so CI requires a matching, fresh PDF under
`_print/`. After editing it:

```bash
cd tools/print
npm ci            # first time only, or after a dependency change
npm run build     # incremental — re-renders only the file you changed
node check.mjs    # the CI gate — must pass before you commit
```

Commit the regenerated PDF **and** the updated `.buildcache.json` together with your
`.md` edit.

- **If `check.mjs` fails on staleness →** you edited the `.md` but didn't rebuild. Run
  `npm run build` again and stage the new PDF + `.buildcache.json`.
- **If the build can't find a browser →** the pipeline needs Chromium ≥ 131; it
  auto-detects `$PLAYWRIGHT_BROWSERS_PATH` (default `/opt/pw-browsers`) or `$CHROMIUM_PATH`.

---

## One-line reminder

> A decision without a logged *why* is a decision the company can't defend. When in
> doubt, log it — short and dated beats complete and missing.

*Part of the Fly GACA operations SOP set. Companion to `01-governance/decision-log.md`.*
