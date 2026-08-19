---
title: Book of Fly GACA — Review
section: 00-strategy
doc_type: document
status: active
owner: Founder
last_updated: 2026-08-19
lang: en
---

# Book of Fly GACA — Review

> [!NOTE]
> **Superseded 2026-08-19 — retained as a record, not corrected.** This document captured the
> position as it stood on its own date. The price card, the B2B pricing model and the platform
> architecture have all changed since: see [`01-governance/decision-log.md`](../01-governance/decision-log.md)
> **DEC-011** and [`03-finance/monetization.md`](../03-finance/monetization.md) for what is
> current. Nothing below has been edited — its value is that it records what was decided or
> observed at the time, including the parts that later turned out to be wrong.

**Reviewed:** 2026-06-14  
**Document:** `the-book-of-fly-gaca.html` (44,723 bytes) + companion PDF (1.1 MB)

---

## 1. What It Is

"The Book of Fly GACA — The Canon of the Cockpit" is a single-file HTML document styled as a stylised internal scripture/manifesto. It uses religious register (Books, Verses, Tenets, Commandments, Psalms, Proverbs, Apocrypha, Benediction) as a rhetorical device to encode the mission, operating principles, and design philosophy of the Fly GACA platform. It is NOT a product spec or user-facing document — it is a founder's canon for internal alignment, onboarding contributors, and setting tone.

The file is a polished standalone HTML page with a full embedded CSS design system ("Falcon theme") derived from the Fly GACA design system. It renders in the browser without dependencies and is print-optimised (A4 CSS page rules).

---

## 2. Structure

| Book | Title | Content type |
|------|-------|--------------|
| I | The Ground Run (Genesis) | Origin story — 6 founding verses |
| II | The Tenets (What We Believe) | 7 non-negotiable principles |
| III | Ten Commandments of Airmanship | Classic aviation safety rules |
| IV | Ten Commandments of the Codebase | Engineering standards |
| V | The Book of Captain Adel | AI persona constraints |
| VI | The Library (On Scripture and Citation) | Corpus policy |
| VII | The Psalms of Currency | Currency-tracker rationale |
| VIII | The Proverbs of the PIC | Aviation wisdom aphorisms |
| IX | The Apocrypha (Decisions Not Taken) | Rejected paths (ADRs) |
| X | The Final Approach (Benediction) | Closing charge to each stakeholder |

---

## 3. Quality Assessment

### 3.1 Strengths

**Positioning clarity.** The brand positioning — independent, educational, not GACA — is woven in at every level. The disclaimer appears on the cover, in Tenet II:2, in Book V (Captain Adel constraints), Book VI:2, and the Benediction (X:5). This is the correct level of redundancy for a platform that carries legal and safety risk from confusion with the regulator.

**Bilingual awareness.** Arabic is present in the cover eyebrow, the cover's closing "صُنع في المملكة," and the `lang="ar"` tags on inline Arabic text. The CSS correctly applies Cairo for Arabic. However, see gaps below — the body text is English-only, which is consistent with this being an internal document, but flagged for awareness.

**Architectural decision records embedded.** The Apocrypha (Book IX) is a lightweight set of ADRs encoded in memorable form — multi-region, build step, live AIP/NOTAMs, crippled free tier, hidden citations, English-first UI. Each is a real risk with a real justification. This is useful founding-team alignment material.

**Captain Adel constraints (Book V)** are tight and correct: persona not person, cites always, refuses when corpus is silent, does not impersonate GACA/ATC/examiner, does not joke about safety. These map directly to the product's legal and brand risk. They are the right rules.

**Tenet II:6 ("One file, where possible")** is honest about the tension between simplicity and scaling — and its scope is correctly bounded to `flygaca.html` the single-file SPA, not the whole platform.

**Visual quality.** The Falcon design system implementation is excellent for a single-file HTML doc: CSS variables, gradient typography, RTL-aware via `inline-start`/`inline-end` logical properties, responsive, print-ready.

---

### 3.2 Weaknesses and Issues

#### W1 — FACTUAL TENSION: Corpus count (HIGH)
Book VI:1 states: *"The corpus is 96 documents — 75 GACAR Parts, 17 administration eBooks, and the references that bind them. It is rebuilt by `build_library.py` and indexed by BM25 across 29,749 chunks."*

The `flygaca-claude-briefing.md` briefing and the `fly-gaca-review-action-plan.md` reference "74 Parts · 21 handbooks · 61 aerodromes · 13 charts · 190 references" as the live proof-point. The action plan notes the homepage was updated with this count. The Book says 96 documents (75 + 17 + "references"). These numbers are inconsistent and at least one is stale. The Book needs the corpus numbers reconciled against the authoritative `build_library.py` output before anyone uses it for onboarding — a new team member will read two different numbers in two documents on day one.

**Fix:** Confirm canonical corpus count from `build_library.py`. Update Book VI:1 to use the same numbers the product UI shows, or add a "(as of first build)" qualifier.

#### W2 — FACTUAL: "me-central2" vs actual GCP region availability (MEDIUM)
Tenet II:1 and the Apocrypha both name `me-central2` as the data-residency location. The `flygaca-claude-briefing.md` and the action plan confirm this is the intent. **VERIFIED (2026-06-14 QA sweep):** `me-central2` IS Dammam, Saudi Arabia (the PDPL target, Firestore confirmed here); `me-central1` IS Doha, Qatar (the current interim compute region). The project codebase is factually correct throughout. The erroneous claim was in this review document and in `.claude/agents/flygaca-qa-reviewer.md` line 15 — both have been corrected. No changes needed to the Book itself on the region question.

**Fix:** Confirm the actual GCP region in use and correct it in all documents.

#### W3 — POSITIONING GAP: No version or date stamp (MEDIUM)
The Book has no version number, no date, no "last updated" marker. Because it encodes technical facts (corpus size, BM25, region names, quota numbers: "five Captain Adel questions per day") these facts will drift. A founding manifesto that contains stale numbers becomes a liability rather than an asset.

**Fix:** Add a `<!-- Version: 1.0 · 2026-06-14 -->` comment and a footer revision date. Cross-reference it to the product changelog.

#### W4 — CONTENT GAP: The Book describes what Captain Adel must NOT do, but not what he MUST do (MEDIUM)
Book V covers persona, tone, citation, language-matching, limits, and safety. It does not cover: the fallback protocol when retrieval confidence is low (which the action plan calls out as a critical safety requirement — refuse and redirect, not guess with a plausible wrong citation). The action plan explicitly says "citations alone don't solve this." The Book should encode the strict fallback posture.

**Fix:** Add a Book V:8 on the refusal/fallback protocol.

#### W5 — CONTENT GAP: Monetisation/pricing not encoded (LOW for a manifesto, noted for completeness)
The Book encodes the free-tier principle (Tenet II:7, Apocrypha IX:4) but does not encode the pricing structure (SAR 299 Exam Pass, SAR 449/year Pro, Mada). This is not a flaw in a manifesto — but if the Book is used as onboarding for future team members or investors, the gap means they need a separate document for commercial context. The `03-finance/monetization.md` fills this, but there is no cross-reference.

#### W6 — BILINGUAL GAP: Body text is English-only (LOW for internal doc)
The Book is internally aligned on bilingualism as a core tenet (II:3: "Bilingual or it didn't ship"). Yet the Book itself ships only in English. As an internal document this is reasonable — but it is a mild irony if used for onboarding Arabic-speaking team members, partners, or investors. The cover and closing have Arabic fragments but no Arabic section headings or body content.

**Fix (optional):** Add an Arabic subtitle to each Book heading using the `lang="ar"` pattern already in the CSS.

#### W7 — STRUCTURAL: The Psalms of Currency (Book VII) are under-specified (LOW)
Book VII names 8 currency items to track (medical, BFR, IFR, licence, passport, type/class, night) but verse VII:4 says "License" when GACAR uses "Licence." Terminology should match the regulation. More substantively, Book VII:8 ("The countdown is mercy") describes the tracker's purpose in one sentence. Given that the currency tracker is the platform's flagship retention feature and post-exam retention hook (per the action plan), the Book could say more about the design principle: proactive reminders, not just display.

---

## 4. Consistency with Brand Positioning

| Brand position | Present in Book? | Assessment |
|---|---|---|
| Independent of GACA | Yes — cover, II:2, V:4, VI:2, X:5 | Strong. The arrow-always-points-to-GACA framing (X:5) is excellent. |
| Educational only | Yes — cover disclaimer, II:2, IX:3 (NOTAM rejection) | Strong. |
| Bilingual EN/AR | Partial — cover/footer only | Acceptable for an internal doc. |
| RTL-aware | Yes — CSS uses logical properties throughout | Strong. |
| Source of truth = GACA | Yes — VI:2 explicitly | Strong. |
| KSA data residency | Yes — I:5, II:1 | Has factual risk (see W2). |
| Free tier generous | Yes — II:7, IX:4 | Strong. |
| Citations, not opinion | Yes — II:4, V:3, V:4 | Strong. |

---

## 5. Prioritised Improvement List

| # | Priority | Action |
|---|---|---|
| 1 | HIGH | **Reconcile corpus count** — verify `build_library.py` output, align Book VI:1 with the homepage numbers |
| 2 | CLOSED | **GCP region verified (2026-06-14)** — `me-central2` = Dammam, Saudi Arabia (PDPL target, Firestore live); `me-central1` = Doha, Qatar (current interim compute). Codebase correct throughout; erroneous labels corrected in this doc and `flygaca-qa-reviewer.md`. |
| 3 | MEDIUM | **Add version/date stamp** — cover footer and/or HTML comment; tie to product changelog |
| 4 | MEDIUM | **Add Book V:8** — Captain Adel refusal/fallback protocol (refuse, don't guess; surface retrieved snippet, not just citation link) |
| 5 | LOW | **Optional AR subtitles** — add Arabic book headings using existing `lang="ar"` CSS pattern |
| 6 | LOW | **Licence spelling** — VII:4: "License" → "Licence" to match GACAR terminology |
| 7 | LOW | **Cross-reference to monetization.md** — add a closing note in Tenet II:7 or a new Apocrypha entry for pricing philosophy |

---

## 6. Overall Verdict

The Book of Fly GACA is a high-quality, coherent, well-designed internal manifesto. It does the hardest thing well: it encodes the non-negotiable positioning (independent, educational, bilingual, in-Kingdom, citations-or-silence) in a memorable, human form that a future team member or AI agent can absorb quickly. The design is production-grade for a single-file document.

The two issues that need immediate attention before it is used as a source of truth for onboarding are: the corpus count inconsistency (W1) and the potential GCP region naming error (W2). Everything else is polish.

