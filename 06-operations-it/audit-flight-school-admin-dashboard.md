---
title: Flight School Admin Dashboard — Technical & Functional Audit
section: 06-operations-it
doc_type: audit
status: active
owner: GTM & CS Specialist
last_updated: 2026-08-19
lang: en
---

# Flight School Admin Dashboard — Technical & Functional Audit

> [!NOTE]
> **Superseded 2026-08-19 — retained as a record, not corrected.** This document captured the
> position as it stood on its own date. The price card, the B2B pricing model and the platform
> architecture have all changed since: see [`01-governance/decision-log.md`](../01-governance/decision-log.md)
> **DEC-011** and [`03-finance/monetization.md`](../03-finance/monetization.md) for what is
> current. Nothing below has been edited — its value is that it records what was decided or
> observed at the time, including the parts that later turned out to be wrong.

## 1. Executive Summary & Audit Scope

This document provides a comprehensive audit of the **Flight School Admin & Instructor Dashboard** requirements, bridging the commercial GTM commitments made in [`b2b-pipeline.md`](../07-gtm/b2b-pipeline.md) and [`gtm-schools.md`](../07-gtm/gtm-schools.md) with the architectural specification in [`spec-instructor-dashboard.md`](spec-instructor-dashboard.md).

### Key Audit Findings:
1. **Commercial Alignment:** The dashboard feature set directly fulfills all promises made on `schools.html` and B2B pilot sales decks (Cohort Exam Readiness %, Cadet Drill-Down, Weak Area Identification, Assigned Reading Paths).
2. **Architecture & Multi-Tenancy:** The sub-tree Firestore data model (`schools/{schoolId}/roster/{cadetUid}`) effectively preserves 100% per-user isolation of `users/{uid}` logbooks while enabling safe cross-user progress reads.
3. **Primary Gap Identified:** Study progress currently resides in client-side `localStorage` (`study-progress.js`). Phase A migration to Firestore (`users/{uid}/progress/summary`) is a strict prerequisite before any B2B pilot launch.

---

## 2. Multi-Tenant Architecture & Data Isolation Audit

### Data Model Architecture
```
schools/{schoolId}
  ├── adminUids: string[]
  ├── instructorUids: string[]
  ├── seatLimit: number
  └── roster/{cadetUid}
        ├── status: 'invited' | 'active' | 'removed'
        ├── consent: boolean
        ├── readiness: number (0–100)
        ├── lastMockScore: number
        ├── lessonsDone: number
        └── assignedPaths: string[]
```

### Security Rules Isolation Audit
- **Isolation Principle:** Instructors **never** read into `users/{cadetUid}`. They read only `schools/{schoolId}/roster/{cadetUid}`.
- **Diff Check Enforcement:** Security rules enforce strict field diffing:
  - Cadets can only edit `readiness`, `lastMockScore`, `lessonsDone`, `currencyFlags`, and `progressUpdatedAt`.
  - Cadets can only edit if `roster().consent == true`.
  - Instructors can only edit `assignedPaths`.
  - Seat allocations (`seatLimit`, `seatsUsed`) and roster lifecycle are strictly Cloud Function Admin SDK operations.
- **Audit Assessment:** **PASS.** The design satisfies security and multi-tenancy rules without exposing user private collections.

---

## 3. Data Privacy & KSA PDPL Compliance Audit

| Compliance Criteria | Specification Provision | Audit Status | Recommendation |
|---------------------|-------------------------|--------------|----------------|
| **Consent Management** | Explicit opt-in modal on first cadet sign-in (`consent: true`) | **PASS** | Require re-consent upon annual contract renewal. |
| **Scope Limitation** | Only study progress and readiness scores shared; logbooks remain strictly private | **PASS** | Display explicit privacy badge ("Logbook Private") in cadet view. |
| **Right to Revoke** | Cadet can flip `consent: false` from Settings, immediately blanking shared roster entry | **PASS** | Ensure Cloud Function clears denormalized progress data on revocation. |
| **DPIA Inclusion** | Cross-user data sharing in B2B context | **CONDITIONAL** | Must update PDPL Data Protection Impact Assessment (DPIA) before pilot launch. |

---

## 4. Functional Requirements Audit

### Core Feature Coverage Matrix

| Feature | Pitch / GTM Requirement | Technical Spec Coverage | Readiness |
|---------|-------------------------|-------------------------|-----------|
| **Cohort Readiness Rollup** | Display average exam-readiness % across entire cohort | Calculated from `roster/{cadetUid}.readiness` average | Ready for build |
| **Cadet Drill-Down** | Drill into individual cadet mock scores & weak topics | Supported in `instructor.html` design | Ready for build |
| **Weak Topic Filtering** | Filter cadets by GACAR Part or topic deficiency | Filter UI supported in spec | Needs topic tag indexing |
| **Reading Path Assignment** | Instructors assign GACAR study modules (`assignedPaths`) | Supported via `roster/{cadetUid}.assignedPaths` array | Ready for build |
| **Seat & Roster Management** | Add/remove cadets, track seat limits | Server-side Cloud Functions (`grantSchoolLicence`) | Core logic built in `functions/school.js` |

---

## 5. Technical Gap Analysis & Prerequisites

```
[ Current State ]                          [ Required Phase A ]                     [ Target B2B State ]
localStorage:                              Firestore Document:                      Multi-Tenant Roster:
study-progress.js ──► LocalStorage ──────► users/{uid}/progress/summary ────────► schools/{id}/roster/{uid}
```

1. **Gap 1: Firestore Progress Summary (Phase A)**
   - *Issue:* `study-progress.js` currently stores mock exam scores and lesson completion exclusively in browser `localStorage`.
   - *Remediation:* Build `users/{uid}/progress/summary` sync mechanism on client study session completion.
2. **Gap 2: School Account Provisioning Tool (Phase C)**
   - *Issue:* Missing admin UI/CLI for provisioning school accounts (`createSchoolAccount`).
   - *Remediation:* Create an internal Firebase Admin script/callable function for CS operations.
3. **Gap 3: Executive Reporting Export**
   - *Issue:* Heads of Training require monthly PDF readiness summaries for regulatory audits.
   - *Remediation:* Add a CSV/PDF export button in `instructor.html` generating cohort performance summaries.

---

## 6. Action Plan & Build Roadmap

| Phase | Milestone | Priority | Effort | Target Completion |
|-------|-----------|----------|--------|-------------------|
| **Phase A** | Progress Persistence (`users/{uid}/progress/summary`) | P0 (Blocker) | 3 Days | Week 1 |
| **Phase B** | Firestore Security Rules & Emulator Unit Tests | P0 (Blocker) | 4 Days | Week 2 |
| **Phase C** | Cloud Functions (`grantSchoolLicence`, `createSchool`, consent) | P0 (Blocker) | 4 Days | Week 2 |
| **Phase D** | Instructor UI (`instructor.html` - Cohort View & Drill-Down) | P1 | 5 Days | Week 3 |
| **Phase E** | Admin Roster Management & Reading Path Assignment | P1 | 4 Days | Week 4 |

---

## Related Documents

- [Instructor Dashboard Design Spec](spec-instructor-dashboard.md)
- [B2B Pipeline Playbook](../07-gtm/b2b-pipeline.md)
- [GTM Flight Schools Strategy](../07-gtm/gtm-schools.md)
- [Customer Health Scoring Spec](../08-customer-success/customer-health-scoring.md)
