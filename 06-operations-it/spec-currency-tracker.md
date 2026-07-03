---
title: "SPEC: GACAR-Aware Currency Tracker & Logbook"
section: 06-operations-it
doc_type: spec
status: draft
owner: Product & Engineering
last_updated: 2026-06-16
lang: en
doc: "SPEC-currency-tracker"
version: "0.1"
author: "Product & Engineering"
created: "2026-06-16"
roadmap_phase: "3"
depends_on: ["AIRAC editorial process (see airac-editorial-sync.svg)", "GACAR-Source-Corpus Part 61", "Pro tier auth"]
---

# SPEC: GACAR-Aware Currency Tracker & Logbook

> **Independent of GACA. Educational use only.**
> Fly GACA is not affiliated with the General Authority of Civil Aviation.
> The authoritative source for all regulations is always gaca.gov.sa.
> This feature helps pilots *understand* GACAR recency requirements; it does
> not replace official records, instructor endorsements, or GACA oversight.

---

## 1. Purpose & Strategic Rationale

### 1.1 The post-exam churn problem (§2.2 of the Action Plan)

The SAR 299 Exam Pass converts cadets who would never commit to an annual plan,
but it structurally produces churn: a cadet buys it, passes, and leaves. The Pro
annual plan (SAR 449/yr) must earn its keep against that one-time exit path.

**Today nothing pulls the user back after the exam.** The logbook that exists in
the product reads like a study-aid afterthought. There is no reason for a newly
certificated pilot to keep paying.

### 1.2 The retention moat (§5.1 of the Action Plan)

The strategic thesis: **win on the wedge competitors cannot easily copy.** LogTen
Pro and ForeFlight have a decade of polish on generic logbook features. That fight
is unwinnable in Phase 3.

The wedge is **GACAR Part 61 recency awareness** — currency tracked directly
against Saudi regulations, bilingual, with proactive alerts ("your night currency
lapses in 9 days"). No competitor has built this for Saudi pilots because it
requires a deep understanding of GACAR Part 61 and operational trust in the Saudi
market. That is exactly what Fly GACA is building.

A pilot who relies on Fly GACA to stay current against GACAR has a strong reason
to keep paying — not just for exam prep, but for their entire flying career.

### 1.3 Scope framing

This feature is **not** a generic logbook clone. It is a regulation-aware currency
dashboard with minimal logbook data entry behind it. The logbook records only what
is needed to compute GACAR recency. Hobbs time, fuel burn, route details, and rich
aircraft records are out of scope for Phase 3.

---

## 2. Scope

### 2.1 In scope (Phase 3)

| Area | What is included |
|------|-----------------|
| Currency rules tracked | Day T&L recency (§ 61.17(a)(1)), Night T&L recency (§ 61.17(a)(2)), Instrument recency (§ 61.17(a)(3)), Flight Review cycle (§ 61.21), SIC recency where applicable (§ 61.19) |
| Logbook entry fields | Date, aircraft category/class/type, T&L count, day/night split, instrument approaches (type + location), holding procedures logged, IFR tracking logged, PIC/SIC, FSTD/ATD flag, authorized instructor endorsement flag |
| Dashboard | Per-currency status card with time-remaining countdown and colour coding |
| Alerts | In-app banners + push notifications (PWA) at configurable thresholds |
| Bilingual | All UI strings in English and Arabic; RTL layout for Arabic |
| Pro gating | All currency tracking and logbook entry is Pro-only |
| Regulation link | Each currency card deep-links to the exact GACAR Part 61 section in the library |
| Data export | JSON and PDF export of logbook entries and currency status (PDPL right to data portability) |
| Account deletion | Full logbook wipe within 30 days of delete-account request (PDPL) |

### 2.2 Out of scope (Phase 3)

- Generic logbook (route, fuel, aircraft squawks, endorsements history beyond currency)
- ForeFlight/LogTen import parsers (Phase 4 candidate)
- Part 121 / Part 135 recency requirements (different regime; future spec)
- Part 67 medical certificate tracking (future spec)
- Instructor-side endorsement flow (B2B dashboard, Phase 5)
- Cross-border currency against foreign CAA rules
- Automatic ADS-B or avionics data sync

---

## 3. GACAR Part 61 Recency Rules Implemented

> **Source corpus status:** The held copy of GACAR Part 61 in the library corpus is
> **Version 9.0** (Docket GR23-025, dated 31 Oct 2023). The GACA Change History Log
> (Version 101.0, 02 Feb 2026) shows the current published version is **Version 10.0**.
> All section citations below are verified against the held v9.0 text. Before shipping,
> each rule must be re-verified against the v10.0 PDF at gaca.gov.sa to confirm no
> substantive recency-rule amendments were introduced in v10.0.
> Items marked **[VERIFY v10.0]** require this check before rule implementation.

### 3.1 Day takeoff and landing recency — § 61.17(a)(1)

**Rule (verified, v9.0):** No person may act as PIC of an aircraft carrying
passengers, or of an aircraft certificated for more than one flight crew member,
unless within the **preceding 90 days** they have made at least **three takeoffs
and three landings** as the sole manipulator of the flight controls, in an aircraft
of the same category, class, and type (if a type rating is required). For tailwheel
aircraft, landings must be to a full stop.

**Exception tracked:** Paragraph (a)(1)(ii) — the pilot may act as PIC under day
VFR or day IFR with no passengers/cargo (solo positioning flight) without meeting
this requirement.

**FSTD credit:** Allowed if the simulator is approved for landings and used under a
GACAR Part 142 approved course (§ 61.17(a)(1)(i)(A)(B)).

**Implementation note:** The 90-day window rolls on a calendar-day basis from the
date of the most recent qualifying T&L. The tracker recomputes daily.

**[VERIFY v10.0]** — confirm no change to the 90-day threshold or category/class
same-type requirement.

### 3.2 Night takeoff and landing recency — § 61.17(a)(2)

**Rule (verified, v9.0):** No person may act as PIC carrying passengers during the
period beginning **1 hour after sunset and ending 1 hour before sunrise** unless
within the **preceding 90 days** they have made at least **three takeoffs and three
landings to a full stop** during that same night period, as sole manipulator of the
flight controls, in an aircraft of the same category, class, and type.

**FSTD credit:** Allowed in a full flight simulator approved for takeoffs and
landings with visual system representing the night period, used under GACAR Part
142 (§ 61.17(a)(2)(i)(A)(B)).

**Special rule for multi-crew turbine PICs (§ 61.17(a)(5)(iv)):** A PIC of a
turbine-powered airplane type-certificated for more than one flight crew member who
holds at least a commercial certificate, has logged ≥ 1,500 hours, and has met day
T&L recency may satisfy night currency via alternative path:
- Three night T&L to full stop as sole manipulator within the **preceding 6 months**, OR
- Within the **preceding 12 months**, completed a GACAR Part 142 approved training
  program with at least six night T&L in an FFS.

**[VERIFY v10.0]** — confirm night window definition (1 hr after sunset / 1 hr
before sunrise) and 90-day threshold unchanged.

**UI note:** The night currency widget must display the local sunset/sunrise time
for the user's last logged aerodrome (or the user's selected home aerodrome) so
they can see when tonight's flying would count.

### 3.3 Instrument recency — § 61.17(a)(3)

**Rule (verified, v9.0):** A person may act as PIC under IFR only if, within the
**6 calendar months preceding the month of the flight**, they have performed and
logged the following, solely by reference to instruments:

**Path A — Aircraft or FSTD (§ 61.17(a)(3)(i) and (ii)):**
- Six instrument approaches
- Holding procedures and tasks
- Intercepting and tracking courses using electronic navigation systems

**Path B — ATD only (§ 61.17(a)(3)(iii), within preceding 2 months):**
- Three hours of instrument experience
- Holding procedures and tasks
- Six instrument approaches
- Two unusual attitude recoveries (descending/VNE and ascending/stall-speed)
- Interception and tracking courses using electronic navigation systems

**Paths C, D, E (combination paths — §§ 61.17(a)(3)(iv)(v)(vi)):** Various
combinations of aircraft + FSTD + ATD are permitted; the common thread is that the
aggregate tasks (6 approaches, holding, tracking) must be completed within 6 months
(or 2 months for ATD-only components). See the corpus text for exact breakdown.

**[VERIFY v10.0]** — the combination paths (iv)(v)(vi) are complex; confirm all
sub-requirements are unchanged in v10.0.

**Lapse beyond 6 months — Instrument Proficiency Check (§ 61.17(a)(4)):**
A pilot who fails to meet § 61.17(a)(3) for **more than 6 calendar months** may
reestablish IFR currency only by completing an **Instrument Proficiency Check
(IPC)**. The IPC must cover the areas of operation and instrument tasks in the
instrument rating practical test standards. It must be conducted by an examiner, an
authorized instructor, or a company check pilot authorized under GACAR Parts
121/125/135 (§ 61.17(a)(4)(ii)).

**Implementation note:** The instrument currency widget must track the count of
qualifying approaches (distinguishing ILS, VOR, RNAV, etc.), holding entries, and
tracking tasks logged. It must flag the IPC requirement when the 6-month window
lapses and the pilot has not retrained.

**[VERIFY v10.0]** — confirm IPC trigger window (> 6 calendar months lapse) and
who may conduct it.

### 3.4 Flight Review — § 61.21

**Rule (verified, v9.0):** No person may act as a required flight crew member
unless, within the **24 calendar months before the month** in which they act as a
flight crew member, they have:
1. Performed a flight review in an aircraft for which they are rated, given by an
   authorized instructor, AND
2. Obtained a logbook endorsement from that instructor certifying satisfactory
   completion.

**Minimum content (§ 61.21(b)):**
- At least **1 hour of flight training**
- At least **1 hour of ground training**
- Must include current GACAR Part 91 general operating and flight rules
- Plus maneuvers/procedures at the instructor's discretion

**Glider exception (§ 61.21(c)):** Three instructional flights to traffic pattern
altitude may substitute for the 1-hour flight training component.

**Bypass conditions (§ 61.21(d)):** A pilot who has, within the 24-month period,
passed any of the following does **not** need a separate flight review:
- A pilot proficiency check or practical test conducted by an examiner or approved
  check pilot for a certificate, rating, or operating privilege
- A practical test for the issuance, renewal, or reinstatement of a flight
  instructor certificate

**FSTD use (§ 61.21(h)):** An FSTD may satisfy the flight review requirements
provided it is used under an approved course under GACAR Part 141, 142, or 143
(or under Part 121/135 for certificate-holder employees). Unless the FFS is
approved for landings, the pilot must still meet the T&L recency of § 61.17(a)(1)
or (2).

**[VERIFY v10.0]** — confirm the 24-month window and bypass conditions are
unchanged. The bypass list (§ 61.21(d)) is particularly important to verify, as
it determines whether proficiency checks substitute for the flight review.

### 3.5 SIC recency — § 61.19

**Rule (verified, v9.0):** A person may serve as SIC of an aircraft type
certificated for more than one required flight crew member only if they hold the
appropriate certificate and ratings, including an instrument rating if the flight is
under IFR (§ 61.19(a)(2)). SIC time may be logged only when the pilot is qualified
per § 61.19 and occupies a crew member station in an aircraft requiring more than
one pilot by type certificate (§ 61.13 logbook provisions).

**[VERIFY v10.0]** — confirm SIC qualification requirements (§ 61.19) are
unchanged. SIC recency implementation in Phase 3 is minimal: the logbook entry
captures PIC vs. SIC flag; SIC-specific currency computations (relevant mainly for
Part 135/121 operations) are deferred to Phase 4.

### 3.6 Ground Instructor recent experience — § 61.217

**[VERIFY v10.0]** — § 61.217 governs recent experience for ground instructors.
This is noted for completeness but is **out of scope for Phase 3** (the currency
tracker targets pilot flying currency, not instructor teaching currency).

---

## 4. Data Model

### 4.1 LogbookEntry

```
LogbookEntry {
  id:              string (UUID)
  user_id:         string (Firebase UID)
  date:            date (YYYY-MM-DD, Hijri stored as metadata)
  aircraft_category: enum [AIRPLANE, ROTORCRAFT, GLIDER, POWERED_LIFT, AIRSHIP, BALLOON]
  aircraft_class:  string (e.g. "single_engine_land", "multi_engine_land", "helicopter")
  aircraft_type:   string | null  // only if type rating required
  tail_number:     string | null  // optional; never transmitted to third parties
  is_tailwheel:    boolean
  role:            enum [PIC, SIC, DUAL, SOLO]
  is_fstd:         boolean
  fstd_approved_landings: boolean | null  // only if is_fstd
  fstd_part142_course:    boolean | null  // only if is_fstd
  is_atd:          boolean
  day_landings:    integer (0+)
  night_landings_full_stop: integer (0+)  // full stop only
  night_period_start: time | null  // local time; derived from sunset table if null
  instrument_approaches: [
    {
      type: string  // e.g. "ILS", "RNAV_LPV", "VOR", "NDB", "RNP"
      location: string  // ICAO aerodrome code
      was_full_stop: boolean
    }
  ]
  holding_procedures_logged: boolean
  nav_tracking_logged:       boolean
  unusual_attitude_recoveries: integer | null  // for ATD path B
  instrument_time_hours: decimal | null
  instructor_endorsement_logged: boolean  // for flight review logbook entry
  notes: string | null  // free text; user-visible only; not used in currency calc
  created_at: timestamp
  updated_at: timestamp
}
```

### 4.2 CurrencyRule

```
CurrencyRule {
  id:            string (e.g. "GACAR_61_17_a1_day")
  gacar_section: string (e.g. "§ 61.17(a)(1)")
  gacar_version_verified: string  // e.g. "v9.0 — VERIFY v10.0 before ship"
  name_en:       string
  name_ar:       string
  window_days:   integer | null   // 90 for T&L rules
  window_months: integer | null   // 6 for IFR, 24 for flight review
  window_type:   enum [ROLLING_DAYS, CALENDAR_MONTHS]
  requirements:  object  // structured requirement (e.g. {takeoffs: 3, landings: 3})
  applies_to_roles: [PIC, SIC]
  aircraft_scope: string  // "same_category_class_type", "any_category", etc.
  lapse_action:  string | null  // e.g. "IPC required for IFR currency lapse > 6 months"
}
```

### 4.3 CurrencyStatus (computed, not stored)

```
CurrencyStatus {
  rule_id:         string
  pilot_uid:       string
  as_of_date:      date
  status:          enum [CURRENT, WARNING, LAPSED, UNKNOWN]
  days_remaining:  integer | null  // null if UNKNOWN or LAPSED
  qualifying_entries: [LogbookEntry.id]  // which entries satisfy this rule
  next_expiry_date: date | null
  requires_ipc:    boolean  // true if IFR lapsed > 6 months
  rule_version_verified: string
}
```

### 4.4 AlertThreshold

```
AlertThreshold {
  rule_id:    string
  user_id:    string
  warn_days:  integer  // default 30; user-configurable 7–60
  critical_days: integer  // default 7; user-configurable 1–14
}
```

### 4.5 Storage and security

- All logbook data stored in Firebase Firestore, Dammam region (me-central2),
  consistent with the existing Firebase project region selection.
- Security rules: `user_id == request.auth.uid` on all reads and writes. No
  cross-user data access except for CFI endorsement flow (Phase 5, separate spec).
- Tail numbers are optional and, where entered, treated as personal data under
  PDPL (see §9 below). They are never used in analytics aggregation.
- Currency status is computed client-side from the user's own logbook entries
  (or on a Cloud Function triggered by entry writes) and never shared.

---

## 5. UX — Dashboard, Currency Badges, Alerts

### 5.1 Currency dashboard

The currency dashboard is the primary surface. It is reachable from the main nav
under "Logbook / سجل الطيران". It shows:

**Header strip:** User's highest certificate held (SPL, PPL, CPL, ATPL) and the
regulation version the rules are based on ("Based on GACAR Part 61 v9.0 —
[VERIFY] v10.0 pending refresh"). A amber [!] badge appears when the held corpus
version lags the latest published.

**Currency cards (one per tracked rule):**

```
┌────────────────────────────────────────────────────┐
│  🟢  Day Currency — § 61.17(a)(1)                 │
│  3 T&L in 90 days  ·  same category/class/type    │
│  Last qualifying: 14 Jun 2026  (SR171 at OERK)    │
│  Expires: 12 Sep 2026  ·  88 days remaining       │
│  [View GACAR § 61.17(a)(1)]                       │
└────────────────────────────────────────────────────┘
```

Status colours:
- Green (CURRENT): > warn threshold days remaining
- Amber (WARNING): ≤ warn threshold (default 30 days)
- Red (LAPSED): past expiry or IPC required
- Grey (UNKNOWN): insufficient logbook data to compute

**Arabic mirror (RTL layout):**
```
┌────────────────────────────────────────────────────┐
│  🟢  استحقاق النهار — § 61.17(a)(1)              │
│  3 إقلاعات وهبوطات خلال 90 يوماً                │
│  آخر تأهّل: 14 يونيو 2026  (SR171 في OERK)       │
│  تنتهي: 12 سبتمبر 2026  ·  88 يوماً متبقية        │
│  [عرض GACAR § 61.17(a)(1)]                        │
└────────────────────────────────────────────────────┘
```

**IFR Approaches sub-card:** The instrument currency card expands to show a rolling
6-month approach counter:
```
  Approaches: 4 of 6 required  ████░░  (need 2 more by 14 Dec 2026)
  Holding:    ✓ logged
  Nav tracking: ✓ logged
  Path: Aircraft/FSTD (§ 61.17(a)(3)(i))
```

**Flight Review card:**
```
┌────────────────────────────────────────────────────┐
│  🟡  Flight Review — § 61.21                      │
│  Due within 24 calendar months                    │
│  Last review: 03 Jan 2025  ·  Instructor endorsed │
│  Expires: Jan 2027  ·  7 months remaining         │
│  ⚠ Warning threshold: 30 days                    │
│  [View GACAR § 61.21]                             │
└────────────────────────────────────────────────────┘
```

### 5.2 Logbook entry screen

Minimal-friction entry. Required fields surfaced first; optional fields collapsed.

**Quick entry flow (most common case — VFR day flight, same home aircraft):**
1. Date (defaults today)
2. T&L count — day / night split (stepper: + / -)
3. Role (PIC / SIC toggle)
4. "Use home aircraft" toggle (pre-fills category/class/type from settings)
5. Save

**Expanded entry (instrument flight):**
- Approach type + aerodrome (repeatable row)
- Holding logged (checkbox)
- Nav tracking logged (checkbox)
- Instrument time (hours, decimal)
- FSTD / ATD flag (shows conditional fields for approval status)

**Logbook entry validation:**
- Night landings: warn if night period flag is set but logged time is outside
  computed sunset–sunrise window for the aerodrome entered
- Approach count: auto-increment the rolling 6-month IFR approach counter
- Instructor endorsement: flight review entries prompt for endorsement confirmation
  (the app records the pilot's self-attestation; it does not replace the physical
  logbook endorsement)

### 5.3 Proactive alerts

**Push notification schedule (PWA, opt-in):**

| Trigger | Message (EN) | Message (AR) |
|---------|-------------|-------------|
| 30 days before night currency lapses | "Night currency expires in 30 days — log 3 night T&L before [date]" | "تنتهي صلاحية استحقاق الطيران الليلي خلال 30 يوماً" |
| 30 days before Flight Review due | "Flight Review due in 30 days — schedule with an authorized instructor" | "موعد مراجعة الطيران خلال 30 يوماً — احجز مع مدرّب معتمد" |
| 7 days before any currency lapses | Red alert with exact expiry date | |
| IFR currency lapsed > 6 months | "IPC required to restore IFR currency (§ 61.17(a)(4))" | |
| Part 61 corpus updated to v10.0 | "GACAR Part 61 updated — review your currency rules" | |

Alert thresholds are user-configurable (30-day warn and 7-day critical are defaults;
range: warn 7–60 days, critical 1–14 days).

**In-app banner:** Shown on every app open when any currency is in WARNING or
LAPSED state. Dismissible per session, not permanently (re-surfaces on next open
if still in warning).

### 5.4 Educational disclaimer on every currency screen

Every currency card and logbook screen carries a persistent footer:

> **Educational reference only — not an official record.**
> This tool helps you understand GACAR Part 61 recency requirements.
> Your official logbook and your authorized instructor's endorsement are the
> legal record. Verify all requirements against the current GACAR at gaca.gov.sa.
> Fly GACA is independent of and not affiliated with GACA.

Arabic equivalent shown in RTL when language is Arabic.

### 5.5 Navigation and deep linking

- Currency dashboard: `/logbook/currency` (EN) · `/ar/logbook/currency` (AR)
- Logbook entry: `/logbook/entry/new`
- Each currency card links to the exact section in the library, e.g.:
  `/library/gacar/part-61#section-61-17-a-1`

---

## 6. Regulation Sync — Keeping Currency Rules Current

### 6.1 The dependency

The currency rules implemented in the tracker are derived from GACAR Part 61.
When GACA publishes a new version of Part 61, the rules may change. A stale rule
engine that silently computes against an outdated Part 61 is a brand and safety risk.

### 6.2 Editorial process linkage

The currency tracker rule engine is a consumer of the AIRAC/editorial sync process
(see `06-product-eng/diagrams/airac-editorial-sync.svg`). The existing process
already tracks Part 61 version currency via the GACAR-Amendment-Currency-
Verification manifest. The extension needed for the currency tracker:

1. **Rule versioning:** Each `CurrencyRule` record carries the `gacar_version_verified`
   field (set at ship to "v9.0 — VERIFY v10.0"). When the editorial owner updates the
   corpus to v10.0, they must also run the rule review checklist (§6.3).

2. **UI version stamp:** The currency dashboard header always displays the Part 61
   version the rules were last verified against and a link to the library entry. If the
   library corpus version is newer than the rule engine version, the header shows an
   amber "Rules pending review for Part 61 v10.0" banner.

3. **Rule review checklist (new editorial artifact):** A markdown file
   `library/06-product-eng/RULE-REVIEW-PART61.md` (created at Phase 3 ship) that
   the editorial owner must complete after each Part 61 corpus update:
   - Compare § 61.17(a)(1), (a)(2), (a)(3), (a)(4) and § 61.21 thresholds
   - Note any changed values (day count, window, IPC trigger)
   - Update `CurrencyRule` records in Firestore and bump `gacar_version_verified`
   - Redeploy currency rule engine if thresholds changed
   - Clear the amber header banner

4. **Version mismatch alert to pilots:** If a corpus update has been published but
   the rule engine has not yet been reviewed (amber state), the dashboard shows:
   > "GACAR Part 61 has been updated. Your currency rules are being reviewed —
   > verify against the latest Part 61 at gaca.gov.sa until this is resolved."

### 6.3 Rule review checklist — sections to check after each Part 61 update

- § 61.17(a)(1): Day T&L — 90 days? 3 T&L? Category/class/type same?
- § 61.17(a)(2): Night T&L — 90 days? 3 full-stop T&L? Night window definition?
- § 61.17(a)(2)(iv)(E): Turbine multi-crew alternative — 6-month or 12-month?
- § 61.17(a)(3)(i–vi): Instrument paths — 6 approaches? 6-month window?
- § 61.17(a)(3)(iii): ATD path — 2-month window? 3 hrs? 6 approaches?
- § 61.17(a)(4): IPC trigger — > 6 calendar months lapse unchanged?
- § 61.21(a): Flight review — 24-month window unchanged?
- § 61.21(b): Flight review content — 1 hr flight + 1 hr ground unchanged?
- § 61.21(d): Bypass list — which practical tests / checks count as substitutes?

---

## 7. Pro-Tier Gating & How This Answers Post-Exam Churn

### 7.1 Tier access

| Feature | Free | Pro (SAR 449/yr) | Exam Pass (SAR 299 / 90 days) |
|---------|------|-----------------|-------------------------------|
| Read GACAR Part 61 in library | ✓ | ✓ | ✓ |
| Currency dashboard (view rules) | Preview only — locked cards | ✓ — full live computation | ✓ — full during pass period |
| Logbook entry | — | ✓ | ✓ during pass |
| Push alerts | — | ✓ | ✓ during pass |
| Data export (JSON/PDF) | — | ✓ | — |
| Logbook survives after Exam Pass expires | — | ✓ (migrates if converts to Pro) | Exported only |

### 7.2 The conversion moment

At day 75 of an Exam Pass, the win-back offer surfaces (§2.2 of Action Plan):
> "Your Exam Pass expires in 15 days. Your logbook and currency tracker stay
> with you — upgrade to Pro and keep everything. First year at SAR 299."

This is the anchor: the pilot has 75 days of logbook entries they do not want
to lose. The logbook becomes the switching cost — the retention hook that the
study-aid tier alone cannot create.

### 7.3 Career-length stickiness

Currency never stops mattering for an active pilot. The Flight Review recurs
every 24 months. Instrument currency recurs every 6 months. Night currency every
90 days. A pilot who relies on Fly GACA for currency awareness has a continuous,
recurring reason to keep their Pro subscription active — the retention moat that
§5.1 of the Action Plan identifies as the single highest-leverage post-launch
investment.

---

## 8. PDPL & Privacy Considerations

### 8.1 Personal data in the logbook

Flight logbook data is personal data under Saudi PDPL (Personal Data Protection
Law, Royal Decree No. M/19, 2021 and its amendments). Specifically:

- Flight dates, aerodrome codes, and tail numbers (even if optional) can constitute
  personal data and, in combination, may constitute sensitive data if they reveal
  patterns of movement.
- User UID (Firebase Auth) links all logbook entries to an identifiable individual.

### 8.2 Data minimisation

The logbook entry schema (§4.1) is designed for minimum necessary data:
- Tail number is optional and is used only for display, not for currency computation.
- Route details, passenger names, and payload weights are not collected.
- Aerodrome codes for instrument approaches are collected (required for § 61.17(a)(3)
  compliance — the GACAR explicitly requires the location to be logged).

### 8.3 PDPL rights implementation

| Right | Implementation |
|-------|---------------|
| Right to access | Settings → "Download my logbook" — JSON export within 30 seconds for ≤ 5 years of entries |
| Right to portability | PDF and JSON export (§ 2.1 in scope) |
| Right to correction | Logbook entries are editable by the pilot at any time |
| Right to deletion | Settings → "Delete account" → all logbook entries purged from Firestore within 30 days; Firebase Auth account deleted immediately |
| Right to object to processing | No logbook data is used for analytics, training, or third-party sharing |

### 8.4 Consent and transparency

- On first logbook entry, a one-time prompt explains what data is collected, why,
  and where it is stored (Firebase, Dammam region, KSA).
- Privacy policy must be updated before Phase 3 launch to cover logbook data
  processing. The existing DPIA (part of the legal track) must be extended to
  cover the logbook data category. **This is a launch-blocker for Phase 3.**

### 8.5 Data residency

All logbook data is stored in the existing Firebase project in the Dammam region
(me-central2). No logbook data leaves the Kingdom. No third-party analytics service
receives logbook data. Confirm with Firebase documentation that me-central2 stores
Firestore data exclusively within KSA before Phase 3 launch.

### 8.6 No operational reliance disclaimer

The logbook and currency tracker must never be positioned or used as an official
record. The legal risks of a pilot relying solely on this app for currency
verification — and then being found non-current by GACA — are borne by the pilot.
The app disclaimer (§5.4) makes this explicit. Legal counsel should review the
disclaimer language before Phase 3 launch.

---

## 9. Offline & PWA Behaviour

### 9.1 Offline strategy

The currency dashboard and logbook entry must work offline. Saudi pilots operate
at aerodromes with poor or no connectivity (§5.5 of Action Plan calls PWA a near-
essential feature for the flight line).

| Data | Offline behaviour |
|------|-----------------|
| Logbook entries | Written to local IndexedDB; synced to Firestore on reconnect |
| Currency status | Last computed status cached in IndexedDB; shown with "last computed [date/time]" label |
| Currency rules | Bundled as a versioned JSON file in the service worker cache; updated on next app open when online |
| GACAR Part 61 library text | Cached on first read per the existing service worker caching strategy |
| Push alerts | Delivered by PWA push (requires prior online registration); if offline, shown as in-app banners on next open |

### 9.2 Conflict resolution

If a pilot logs entries on multiple devices while offline, the sync merge strategy
is: **last-write-wins per entry** (entries have timestamps and UUIDs; duplicate UUID
on sync is treated as an update, not a duplicate insert). A future audit-log field
may refine this.

### 9.3 Install prompt

The "Install Fly GACA" PWA prompt surfaces on the currency dashboard (not on first
app open, which is too early). Rationale: a pilot who has just seen their night
currency countdown has a concrete reason to install the app for persistent alerts.

---

## 10. Success Metrics

### 10.1 Retention metrics (primary)

| Metric | Target at 6 months post-Phase-3 launch |
|--------|----------------------------------------|
| Pro monthly retention rate | ≥ 80% (up from baseline pre-feature) |
| Exam Pass → Pro conversion rate | ≥ 25% (win-back offer at day 75) |
| Pro users with ≥ 1 logbook entry | ≥ 60% (adoption signal) |
| Pro users with ≥ 5 logbook entries | ≥ 35% (habit formation signal) |
| Days-active per month (Pro cohort) | ≥ 8 days (currency dashboard check-ins) |

### 10.2 Product quality metrics

| Metric | Target |
|--------|--------|
| Currency computation accuracy | 100% — verified by test suite against known GACAR § 61.17 scenarios |
| Rule version mismatch lag | < 14 days after GACA publishes a new Part 61 version before amber banner appears |
| Offline entry sync success rate | ≥ 99% (entries created offline successfully synced on reconnect) |
| Alert delivery rate (PWA push) | ≥ 90% of registered pilots receive alerts before currency lapses |

### 10.3 Leading indicators (weekly monitoring)

- New logbook entries per day (by Pro and Exam Pass cohort)
- Currency dashboard page views
- Entries created offline vs. online ratio
- Push alert opt-in rate

---

## 11. Phased Build Plan

Phase 3 maps to the Action Plan §5.1 priority. Effort estimates follow the
Action Plan key: S < 0.5 day · M 1–3 days · L 1 week+ · XL multi-week.

### Phase 3a — Rule engine & data model (M–L)
- Define and seed `CurrencyRule` records in Firestore (one per tracked section)
- Implement `CurrencyStatus` computation function (Cloud Function triggered on
  logbook write; also computable client-side for offline)
- Write unit tests for every GACAR § 61.17 and § 61.21 scenario (day/night/IFR
  rolling windows, IPC trigger, flight review bypass conditions)
- **Gate: VERIFY Part 61 v10.0 before seeding rules** — pull v10.0 from gaca.gov.sa,
  run the rule review checklist (§6.3), update rule records

### Phase 3b — Logbook entry UI (M)
- Quick-entry screen (date, T&L count, role, home aircraft)
- Expanded entry (instrument approaches, holding, FSTD/ATD flags)
- Offline-first write to IndexedDB + Firestore sync
- Input validation

### Phase 3c — Currency dashboard UI (M)
- Currency cards with status colours and countdown
- IFR approaches sub-card with rolling counter
- Deep links to GACAR library sections
- RTL/bilingual layout
- Disclaimer footer
- Corpus version banner (amber if rule engine lags corpus)

### Phase 3d — Alerts (S–M)
- Alert threshold settings screen
- PWA push notification registration and delivery
- In-app banner component
- Win-back offer at day 75 of Exam Pass

### Phase 3e — PDPL & legal (M + external)
- Data export (JSON + PDF)
- Account deletion flow
- Privacy policy update
- DPIA extension (external — legal track)
- Disclaimer legal review (external)
- **Launch blocker: Phase 3 cannot ship until PDPL/legal items are signed off**

### Phase 3f — QA & monitoring (S–M)
- Currency computation test suite (all § 61.17 and § 61.21 paths)
- Offline sync integration tests
- RTL visual regression
- Launch monitoring dashboard (§10.3 metrics)

---

## 12. Open Questions

| # | Question | Owner | Needed by |
|---|----------|-------|-----------|
| OQ-1 | **Part 61 v10.0 rule changes:** What changed between v9.0 (Docket GR23-025, Oct 2023) and v10.0? Specifically: did any of § 61.17(a)(1), (a)(2), (a)(3), or § 61.21 thresholds change? This must be answered before seeding the rule engine. | Editorial owner | Phase 3a gate |
| OQ-2 | **IPC conduct authority:** Does § 61.17(a)(4)(ii) in v10.0 still list the same authorized parties (examiner, authorized instructor, Part 121/125/135 company check pilot)? | Editorial owner | Phase 3a gate |
| OQ-3 | **Night window definition:** Does GACAR Part 61 v10.0 define the night period as "1 hour after sunset to 1 hour before sunrise" (per § 61.17(a)(2)(i) in v9.0), or does it cross-reference GACAR Part 1 or Part 91 for the night definition? The logbook entry UI needs to know which sunset table to use. | Editorial owner + Captain Adel review | Phase 3b |
| OQ-4 | **PDPL DPIA scope extension:** Does the existing DPIA cover logbook data? If not, a supplementary DPIA addendum is required before Phase 3 launch. | Legal track | Phase 3e gate |
| OQ-5 | **Firebase me-central2 data residency:** Confirm that Firestore in me-central2 stores all data exclusively within KSA (no replication to other regions). Check Firebase documentation or request confirmation from Firebase support. | Engineering | Phase 3a |
| OQ-6 | **Disclaimer legal review:** Does the disclaimer language in §5.4 adequately limit Fly GACA's liability for currency miscalculation? The Saudi IP/aviation lawyer reviewing redistribution rights should opine on this. | Legal track | Phase 3e gate |
| OQ-7 | **Turbine multi-crew alternative (§ 61.17(a)(5)(iv)):** Does v10.0 retain the alternative night currency path for turbine multi-crew PICs (6 months OR 12-month Part 142 training with 6 FFS T&L)? This path is relevant to more advanced users and affects the instrument currency sub-card design. | Editorial owner | Phase 3c |
| OQ-8 | **Flight review bypass list (§ 61.21(d)):** In v10.0, does a passed proficiency check still automatically satisfy the flight review requirement? If the bypass list changed, the flight review card computation changes. | Editorial owner | Phase 3a gate |
| OQ-9 | **Category scope per aircraft:** The day and night T&L rules require "same category, class, and type (if type rating required)." Phase 3 tracks a single home aircraft category. Multi-category pilots (e.g., PPL with SEL and helicopter) need separate currency per category. Is multi-category tracking in scope for Phase 3a or deferred to 3b? | Product | Phase 3b |
| OQ-10 | **SIC instrument rating requirement:** § 61.19(a)(2) requires the SIC to hold an instrument rating if the flight is under IFR. Should the currency dashboard surface an SIC instrument currency warning (i.e., a second IFR currency row for the SIC role)? Or defer SIC-specific tracking to Phase 4? | Product | Phase 3a |

---

## Appendix A — GACAR Part 61 Sections Referenced

| Section | Title / Subject | Status in held corpus |
|---------|-----------------|-----------------------|
| § 61.13 | Pilot Logbooks | v9.0 — [VERIFY v10.0] |
| § 61.17(a)(1) | PIC day T&L recency (90 days, 3 T&L) | v9.0 — [VERIFY v10.0] |
| § 61.17(a)(2) | PIC night T&L recency (90 days, 3 full-stop T&L, night period) | v9.0 — [VERIFY v10.0] |
| § 61.17(a)(2)(iv)(E) | Turbine multi-crew alternative night currency | v9.0 — [VERIFY v10.0] |
| § 61.17(a)(3)(i) | Instrument recency — aircraft/FSTD path (6 months, 6 approaches) | v9.0 — [VERIFY v10.0] |
| § 61.17(a)(3)(ii) | Instrument recency — FSTD-only path | v9.0 — [VERIFY v10.0] |
| § 61.17(a)(3)(iii) | Instrument recency — ATD-only path (2 months, 3 hrs, 6 approaches) | v9.0 — [VERIFY v10.0] |
| § 61.17(a)(3)(iv–vi) | Instrument recency — combination paths | v9.0 — [VERIFY v10.0] |
| § 61.17(a)(4) | Instrument Proficiency Check (IPC) — lapse > 6 months | v9.0 — [VERIFY v10.0] |
| § 61.17(a)(5) | Exceptions (Part 119/121/125/135 operations) | v9.0 — [VERIFY v10.0] |
| § 61.17(b) | PIC proficiency check for multi-crew / turbojet (12-month / 24-month) | v9.0 — [VERIFY v10.0] |
| § 61.19 | SIC qualification requirements | v9.0 — [VERIFY v10.0] |
| § 61.21(a) | Flight review — 24-month cycle | v9.0 — [VERIFY v10.0] |
| § 61.21(b) | Flight review content (1 hr flight + 1 hr ground, Part 91 rules) | v9.0 — [VERIFY v10.0] |
| § 61.21(c) | Glider substitute (3 instructional flights) | v9.0 — [VERIFY v10.0] |
| § 61.21(d) | Flight review bypass — proficiency check / practical test substitutes | v9.0 — [VERIFY v10.0] |
| § 61.21(e) | Flight instructor renewal — ground training waiver | v9.0 — [VERIFY v10.0] |
| § 61.21(g) | Flight review may be combined with § 61.17 requirements | v9.0 — [VERIFY v10.0] |
| § 61.21(h) | FSTD use for flight review | v9.0 — [VERIFY v10.0] |
| § 61.217 | Ground Instructor recent experience (noted, out of scope Phase 3) | v9.0 — [VERIFY v10.0] |

**Corpus note:** The GACAR Part 61 held copy in the library is Version 9.0
(Docket GR23-025, dated 31 Oct 2023). The GACA Change History Log (Version 101.0,
02 Feb 2026) confirms Version 10.0 is the current published version. All rule
implementations must be re-verified against v10.0 at gaca.gov.sa before Phase 3a
ships. This is a hard gate.

---

## Appendix B — [VERIFY] Item Summary

| Item | GACAR reference | What to verify |
|------|----------------|---------------|
| V-1 | § 61.17(a)(1) | 90-day window and 3 T&L unchanged in v10.0 |
| V-2 | § 61.17(a)(2) | Night window ("1 hr after sunset to 1 hr before sunrise"), 90-day, 3 full-stop T&L unchanged |
| V-3 | § 61.17(a)(3)(i) | 6-month window, 6 approaches, holding, tracking requirements unchanged |
| V-4 | § 61.17(a)(3)(iii) | ATD-only path: 2-month window and 3-hour minimum unchanged |
| V-5 | § 61.17(a)(3)(iv–vi) | Combination paths unchanged |
| V-6 | § 61.17(a)(4) | IPC trigger: > 6 calendar months lapse; authorized parties unchanged |
| V-7 | § 61.17(a)(5)(iv) | Turbine multi-crew alternative night currency paths unchanged |
| V-8 | § 61.21(a) | 24-month flight review cycle unchanged |
| V-9 | § 61.21(b) | 1 hr flight + 1 hr ground content requirement unchanged |
| V-10 | § 61.21(d) | Bypass list: proficiency checks and practical tests that substitute for flight review unchanged |
| V-11 | § 61.19 | SIC qualification requirements unchanged |

