---
title: Test Coverage Analysis — 2026-06-16
section: 06-operations-it
doc_type: document
status: active
owner: Founder
last_updated: 2026-06-16
lang: en
---

# Test Coverage Analysis — 2026-06-16

> Scope note: **The-Office is a documentation/spec repository, not a code repository.**
> There is no source to instrument, so this is not a line/branch-coverage report.
> It is a **spec-vs-test gap audit**: it cross-references the testable behaviour
> described in the `SPEC-*.md` files, `captadel-plan.md`, and `test-ready.md`
> against what those same documents claim is covered, and flags the gaps. The
> implementation and its real test suites live in separate repos
> (`captadel/evals/**`, `sales_agents/tests/**`, `functions/**`).

## 1. What is being tested today

Two distinct test surfaces are described in this repo:

| Surface | Where described | Claimed coverage | Runner |
|---|---|---|---|
| **Sales-agent E2E** (Enrollment / CFI / B2B) | `test-ready.md` | 55 cases (≥ 38 min) | `python3 sales_agents/tests/test_runner.py` |
| **Captain Adel RAG eval harness** | `spec-captain-adel-refusal-protocol.md` §7, `captadel-plan.md` | target ≥ 95 cases (v0.5); ≥ 80 (v0.4) | `evals/run.js` + CI `.github/workflows/eval.yml` |

Three of the five specs define little or no test plan at all (see §3).

## 2. Gaps the documents themselves already flag (highest priority)

These are not inferred — the specs explicitly mark them **uncovered**. They should
be the first additions because the authors already decided they belong in the suite.

1. **Four refusal cases marked "currently uncovered"** (`refusal-protocol` §7.2) —
   ready-to-paste JSON fixtures already exist in the spec:
   - `refuse-personal-safety` (fatigue / fitness-to-fly, class 3.2)
   - `refuse-enable-noncompliance` (below-minima "what's the risk", class 3.3)
   - `ar-refuse-unverifiable-limit` (Arabic unverifiable-limit refusal, class 1.1)
   - `refuse-conflicting-sources` (two corpus passages, different versions)
2. **Tool-use eval cases do not exist yet** (`captadel-plan.md` Evaluation notes).
   E6B / W&B / fuel / VFR-minima compute tools introduce a new failure class —
   *confidently wrong calculation* — and the plan states no compute tool should ship
   before cases assert: right tool called, right inputs, working shown, **rule still
   cited**. Currently zero coverage.
3. **Multi-tenant prompt isolation** has no eval case (`captadel-plan.md`). As tenants
   beyond Fly GACA land, there is no test that one tenant's system prompt / persona
   cannot leak into another's response. Needs an explicit isolation contract + red-team case.
4. **Runtime injection logging → eval growth loop** is described but not in place: the
   adversarial eval set is static; there is no runtime detector feeding real injection
   attempts back into the suite.

## 3. Specs with weak or absent acceptance criteria

| Spec | Lines | Test/acceptance language | Risk |
|---|---:|---|---|
| `spec-crm.md` | 196 | **None** | High |
| `spec-freshness-pipeline.md` | 108 | **None** | High |
| `spec-currency-tracker.md` | 788 | Regulatory `[VERIFY]` TODOs only; one "logbook entry validation" note; **no automated test plan** | **Critical** |
| `spec-instructor-dashboard.md` | 243 | Good — mandates Firebase-emulator rule tests before deploy | Low |
| `spec-captain-adel-refusal-protocol.md` | 1025 | Strong — full §7 eval harness spec | Low (but see §2) |

### 3.1 Currency tracker — the critical gap
This computes **legal pilot-currency status** from GACAR Part 61 rules, yet defines no
test cases for any calculation:
- 90-day passenger-currency threshold (day vs. night, category/class).
- Night-currency window (1 hr after sunset → 1 hr before sunrise).
- IPC trigger at > 6 calendar months instrument-lapse.
- Flight-review 24-month window and the § 61.21(d) bypass list.
- The combination paths (iv)(v)(vi) the spec itself calls "complex — confirm all."

These are date-boundary, legal-consequence calculations: exactly the code that needs
exhaustive boundary tests (the day before / day of / day after each window; leap-year and
timezone edges; the bypass-substitution matrix). A wrong result tells a pilot they are
legal to fly when they are not. **Recommend a table-driven unit suite per rule plus
golden fixtures, gated like the captadel eval suite.**

### 3.2 CRM — security-rule and conversion coverage
`spec-crm.md` describes `assertAdmin(req)` enforced on every callable, a proposed narrower
`crm` claim, and lead→account conversion (`grantSchoolLicence`) — none with tests. Mirror
the instructor-dashboard approach: **Firebase-emulator rule tests** for every callable
(admin / non-admin / proposed `crm` claim) and a conversion-flow test.

### 3.3 Freshness pipeline — validation coverage
Ingests/diffs the public corpus and rebuilds indexes. No tests for diff correctness,
index-rebuild integrity, or the data-boundary guarantee ("never touches personal data").
Recommend: diff-correctness fixtures (known-input → expected changelog), an index-rebuild
smoke test, and a boundary assertion that no PII crosses into deployed artifacts.

## 4. Cross-cutting coverage improvements

- **Arabic parity is under-tested.** Plan target is AR pass-rate within 5% of EN across
  the *whole* suite, but AR cases are sprinkled and lag. Make AR parity a measured CI gate,
  not a per-feature afterthought.
- **Multi-turn conversation cases** are deferred to a later wave; only Tier-4 (5 cases) in
  the sales-agent suite exercises realistic dialogue. RAG-side multi-turn (context carry,
  follow-up disambiguation) is essentially uncovered today.
- **CI enforcement exists on paper** (`refusal-protocol` §7.4: zero-tolerance on
  refusal/injection regression, AR-within-5% bar). Confirm `.github/workflows/eval.yml`
  actually implements these gates in the code repo — the spec is ahead of verified reality.
- **No reconciliation between the two suites.** `test-ready.md` (55 cases, "≥38") and the
  captadel plan (≥95) use different baselines and runners. A single coverage dashboard
  across both would prevent each from being read as "done" in isolation.

## 5. Recommended priority order

1. Add the four §7.2 refusal fixtures (already written) — fastest win, safety-critical.
2. Define and build the **currency-tracker** boundary unit suite — highest real-world risk.
3. Add **tool-use eval cases** before any compute tool ships.
4. Add **CRM** + **freshness-pipeline** emulator/validation tests (currently zero).
5. Promote **AR parity** and **multi-tenant isolation** to measured CI gates.

---
*Generated as a spec-vs-test gap audit; no executable coverage tooling applies to this
repository. Update alongside the implementation repos as suites land.*
