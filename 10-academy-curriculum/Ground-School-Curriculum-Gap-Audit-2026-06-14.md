# Fly GACA — Ground School Curriculum Gap Audit
**Date:** 2026-06-14  
**Scope:** PPL theoretical-knowledge syllabus (Saudi GACAR / ICAO Annex 1 alignment)  
**Sources reviewed:** `assets/data/groundschool.json`, `assets/data/quiz.json`, `Captain Adel Curriculum Map.docx`, app HTML pages  
**Disclaimer:** Independent educational audit. Authoritative standard is always the official GACA syllabus at gaca.gov.sa.

---

## 1. Coverage Matrix by Subject

| # | Subject | Ground School Lessons | Quiz Questions | Self-Reported Coverage (Curriculum Map) | Quality Rating | Key GACAR Refs |
|---|---|---|---|---|---|---|
| 1 | Air Law & Regulations | 4 | 48 (3 banks: vfr-flight-rules 18, airspace 18, air-law 18) | 92% | **Good** | Parts 1, 61, 71, 91, 101 |
| 2 | Meteorology | 4 | 12 (weather bank) | 90% | **Adequate** | Parts 91, 135; AIP MET |
| 3 | Navigation | 4 | 12 (navigation bank) | 88% | **Adequate** | Parts 61, 91 |
| 4 | Human Performance & Limitations | 3 | 12 (human-factors bank) | 95% | **Good** | Part 67; ICAO Doc 8984 |
| 5 | Principles of Flight | 4 | 12 (aerodynamics bank) | 93% | **Good** | ICAO Annex 1 |
| 6 | Aircraft General Knowledge | 4 | 12 (aircraft-equipment bank) | 85% | **Adequate** | Parts 43, 65 |
| 7 | Operational Procedures | 4 | 0 — **NO dedicated bank** | 87% | **Thin** | Parts 91, 101 |
| 8 | Flight Performance & Planning | 4 | 12 (navigation bank shared) | 80% | **Thin** | Parts 91, 135 |
| 9 | Communications | 3 | 12 (radio-elpt bank) + 12 (aip-ais) | 89% | **Adequate** | Part 87; ICAO Annex 10 |

**Additional quiz banks not mapped to a ground-school module:**

| Quiz Bank | Questions | Ground School Module Equivalent |
|---|---|---|
| pilot-licensing | 12 | Partial coverage in Air Law (al-4) |
| medical | 12 | Partial coverage in Human Performance (hpl-2) |
| aip-ais | 12 | Spread across Navigation and Communications |

**Total quiz questions:** 162  
**Total ground-school lessons:** 34 across 9 modules  
**Mock exam configuration:** 25 questions, 30 minutes, 75% pass mark

---

## 2. Critical Gaps Identified

### 2.1 Answer Key — CRITICAL (All Banks Affected)
The `correct` field is `null` for every one of the 162 questions in `quiz.json`. The quiz is delivered to users without a programmatic correct answer, meaning the self-assessment engine cannot mark responses automatically. This is a **data-integrity bug**, not a content gap. Every question must have its correct index (0–3) populated.

### 2.2 Operational Procedures — No Dedicated Quiz Bank
The ground-school module `operations` (4 lessons: normal procedures, emergencies, wake turbulence, aerodrome operations) has zero quiz questions. The 87% self-reported coverage is not backed by any assessable content. Topics missing from the question bank:
- Traffic pattern procedures and spacing
- Engine failure drill (MAYDAY calls, forced landing)
- ATC light-gun signals
- Wake turbulence avoidance rules (spacing behind heavy aircraft)
- Runway incursion avoidance

### 2.3 Flight Performance & Planning — Shallow Quiz Coverage
The module `performance` (4 lessons: W&B, density altitude, fuel planning, route/FPL) shares the `navigation` bank (12 questions). There is no standalone performance-and-planning question bank. Missing testable items:
- Density-altitude calculation steps (specific Saudi conditions, e.g., OERK at 45°C)
- Fuel reserve requirements under GACAR Part 91 (VFR day: 30 min; VFR night: 45 min)
- W&B CG envelope interpretation
- Accelerate-stop distance factors
- ICAO flight plan (FPL) field decoding

### 2.4 Meteorology — Saudi-Specific Content Thin
Four lessons cover the global syllabus adequately. What is absent:
- Saudi-specific weather phenomena: shamal wind, dust and haboob visibility, extreme heat inversions
- Reading Saudi METAR/TAF with KSA-specific identifiers (OERK, OEJN, OEDF)
- Sandstorm (BLDU/BLSA) METAR codes and operational impact
- Turbulence over Hejaz mountains

### 2.5 Navigation — No AIP Chart / Saudi Aerodrome Coverage
Radio navigation (nav-4) covers VOR/NDB/DME/GNSS at a conceptual level. Gaps:
- Saudi AIP chart reading with current symbols
- OERK / OEJN / OEDF aerodrome diagrams (referenced but no lesson)
- GNSS/RNAV procedures as adopted by GACA AIP
- Position reporting on Saudi airways

### 2.6 Communications — ELPT/SAELPT Depth
Three lessons cover the basics. The `radio-elpt` bank (12 questions) tests the phonetic alphabet and ICAO levels adequately. Gaps:
- Distress and urgency procedures (MAYDAY, PAN-PAN phraseology)
- Mandatory frequency (MF) and CTAF operations (uncontrolled Saudi aerodromes)
- Lost-communications procedures under GACAR Part 91

### 2.7 Human Performance — Weak on Fatigue / CRM
Three lessons; strong on physiology (hpl-1) and medical (hpl-2). Decision-making is covered conceptually (hpl-3). Gaps:
- Fatigue science: circadian rhythms, sleep debt, FRMS concepts
- Crew Resource Management (CRM) for multi-crew awareness
- IMSAFE checklist application
- Stress and workload management in Saudi summer operations

### 2.8 Aircraft General Knowledge — No Engine-Run-Up / Magneto Check Scenario
Four lessons cover the airframe and systems. Gaps:
- Magneto check procedure and what a drop indicates
- Carburettor heat application trigger (when to apply and why)
- Pitot-static blockage symptoms and actions
- Transponder codes (7700/7600/7500) not in any lesson

### 2.9 CPL / ATPL Modules — Not Yet Built
The Curriculum Map documents the 12-month roadmap: ATPL mock exam engine is planned for Q1 2027. Currently, all structured ground-school content targets PPL only. CPL content exists only in Captain Adel's RAG library but has no structured lesson path.

---

## 3. Structural / Technical Gaps

| Issue | Location | Impact |
|---|---|---|
| `correct: null` on all 162 quiz questions | `quiz.json` | Quiz engine cannot auto-mark; no score feedback |
| No `subject` tag on quiz banks | `quiz.json` | Cannot filter/group by ICAO subject area |
| Mock exam is 25 questions but the groundschool.js references 75% pass mark for a "25-question mock exam" | `quiz.json` + `groundschool.js` | The new Mock Exam (Set A) in this audit uses 40 questions to better match realistic PPL exam depth |
| Operational Procedures bank absent | `quiz.json` | 4 lessons have zero assessable questions |
| `meteorology` module has no `quiz` field | `groundschool.json` | No quiz link shown for that module |
| `navigation`, `aircraft`, `principles`, `performance`, `human`, `operations` modules have no `quiz` field | `groundschool.json` | Only Air Law and Communications show quiz links |
| Ground school progress is device-local (localStorage) | `groundschool.js` | No server-side sync; progress lost on new device |

---

## 4. Lesson Count Summary

| Subject | Lessons | Min ICAO Learning Outcomes Recommended | Gap |
|---|---|---|---|
| Air Law | 4 | 6–8 | Missing: special mission ops, SOC/ATC separation, Part 101 UAS |
| Meteorology | 4 | 5–6 | Missing: Saudi-specific phenomena, sigmets, wx products |
| Navigation | 4 | 5–6 | Missing: Saudi AIP charts, RNAV, terrain awareness |
| Human Performance | 3 | 4–5 | Missing: fatigue/FRMS, CRM, IMSAFE |
| Principles of Flight | 4 | 4 | Adequate |
| Aircraft General Knowledge | 4 | 5–6 | Missing: magneto/run-up, transponder codes, ELT |
| Operational Procedures | 4 | 5–6 | Missing: emergency procedures detail, wake turbulence rules |
| Flight Performance & Planning | 4 | 5–6 | Missing: Saudi-specific density altitude, GACAR fuel reserves |
| Communications | 3 | 4–5 | Missing: distress/urgency, lost comms, uncontrolled aerodromes |
| **Total** | **34** | **43–52** | **9–18 lessons needed** |

---

## 5. Build Priority List (Recommended)

### Priority 1 — Fix Immediately (Data Bugs)
1. **Populate `correct` index for all 162 quiz questions** — quiz is non-functional without this.
2. **Add `quiz` field to Meteorology, Navigation, Aircraft, Principles, Performance, Human, Operations modules** in `groundschool.json` so quiz links appear.

### Priority 2 — New Content (High Impact, Q3 2026)
3. **Create `operational-procedures` quiz bank** (minimum 12 questions) covering emergency procedures, wake turbulence avoidance, aerodrome operations, ATC light signals.
4. **Create `flight-performance-planning` quiz bank** (minimum 12 questions) covering W&B, density altitude, fuel reserves (GACAR Part 91 §91.249), ICAO FPL fields.
5. **Add Lesson: Saudi Weather Phenomena** (Meteorology module, met-5) — shamal, dust/haboob, extreme heat, mountain turbulence over Hejaz.
6. **Add Lesson: Emergency Procedures Depth** (Operations module, op-5) — MAYDAY/PAN-PAN scripts, 7700 squawk, forced landing procedure.

### Priority 3 — Depth Improvements (Q4 2026)
7. **Add Lesson: Fatigue & CRM** (Human Performance module, hpl-4).
8. **Add Lesson: Saudi AIP Charts & Aerodromes** (Navigation module, nav-5) — OERK/OEJN/OEDF plates, AIRAC update process.
9. **Upgrade weather bank** — add 6 Saudi-specific questions (haboob, shamal, dust storm METAR codes).
10. **Add Lesson: Transponder & ELT** (AGK module, agk-5) — codes 7700/7600/7500, ELT types.

### Priority 4 — CPL Path Foundation (Q1 2027)
11. Structured CPL ground-school module set (parallel to PPL, same JSON schema).
12. ATPL mock exam engine (per the existing roadmap).

---

## 6. Summary Assessment

**Well-covered (minimal gaps):** Principles of Flight, Air Law (broad), Human Performance (physiology), Communications (basics).

**Adequately covered but needs depth:** Meteorology, Navigation, Aircraft General Knowledge.

**Under-served:** Operational Procedures (no quiz), Flight Performance & Planning (no dedicated quiz, thin Saudi context), Communications (missing distress/urgency and lost-comms).

**Structural blocker:** The `correct: null` bug means the self-assessment system is decorative rather than functional. This is the single highest-priority fix.

---

*This audit was produced for internal product planning. It is not an official GACA assessment. All coverage percentages and gap estimates are based on publicly available syllabus descriptions and the app's own JSON data files as of 2026-06-14.*
