---
title: RUNBOOK — Fly GACA iOS apps (native family + store presence)
section: 06-operations-it
doc_type: runbook
status: active
owner: Founder
last_updated: 2026-08-19
lang: en
---

# RUNBOOK — Fly GACA iOS apps (native family + store presence)

> **Current track.** The shipping iOS strategy is the **native app family** — one offline SwiftUI
> app per study module, paid up-front, built from
> [`iflygaca/FlyGACA-ios`](https://github.com/iflygaca/FlyGACA-ios) (a shared `FlyGACAKit` package plus one
> app target per module, with per-app content snapshots synced from the web monorepo). The
> single-app **Capacitor + subscription** wrapper this runbook originally documented is retired —
> see the note at the end.

> [!IMPORTANT]
> **iOS is `iflygaca/FlyGACA-ios`, not `iflygaca/FlyGACA`.** `iflygaca/FlyGACA` is the web app and its Express
> backend; it is the **content** source of truth (the corpus, `src/lib/prepCatalog.ts`, the content
> and icon generators) but holds no Swift. Earlier versions of this page named the wrong repo.

## 0. The native app family — release path

**What ships: two independent App Store apps — ELPT and AIP** (bundle ids `com.flygaca.<module>`),
sold together via an App Store app bundle. Identical offline feature set: study mode, quizzing,
flashcards with spaced repetition, mock tests, and a timed scored exam simulation. **No accounts,
no IAP, no network in v1** — content is bundled at build time.

The licence-exam modules (**PPL, CPL, IR, ATPL**) were **paused on 2026-08-10** and their targets
removed from the repo. They exist in git history; their **web** study packs are untouched and still
selling. Do not "fix" a doc by restoring a six-app list.

The operational detail lives with the code — this section only points at it:

1. **Content sync** — `scripts/sync-content.sh` in `iflygaca/FlyGACA-ios`, run against a clone of
   `iflygaca/FlyGACA`. The web repo stays the corpus source of truth; the sync only ever runs
   monorepo → iOS repo, never the reverse.
2. **Build / test / CI** — `docs/RUNBOOK-ios-release.md` and `.github/workflows/ios.yml` in the iOS
   repo: Swift tests, XcodeGen validation, a per-app build matrix, and a TestFlight lane that
   activates once signing secrets exist. `docs/RUNBOOK-ios-xcodebuild.md` covers local builds.
3. **Apple portal (human, one-time)** — `docs/RUNBOOK-ios-signing.md` +
   `docs/RUNBOOK-ios-signing-CHECKLIST.md`, with `docs/PORTAL-RUNSHEET-wave1.md` as the run sheet:
   App Group `group.com.flygaca.study`; App IDs (Sign in with Apple was **removed** from the shared
   entitlements in 2026-08); distribution certificate; `FlyGACA <APP> AppStore` provisioning
   profiles; paid App Store Connect records; the ASC API key; then the GitHub signing secrets
   (`scripts/native/set-signing-secrets.sh`).
4. **Corpus signing** — `docs/CORPUS-SIGNING.md` (Ed25519) for the remote quiz corpus.
5. **Store listings** — per-app EN + AR copy and screenshots. Listing copy describes the offline,
   English-language app truthfully.

### Apple review checklist — native offline v1

- **No IAP and no external purchase links** — the apps are paid up-front, so guideline 3.1.1 does
  not apply.
- **No account system in v1** — Sign in with Apple (4.8) and in-app account/data deletion (5.1.1)
  become requirements only if an online phase ships sign-in.
- **Privacy nutrition labels:** "Data Not Collected" (offline; no analytics, no tracking). Revisit
  before any telemetry is ever added.
- **The "not for operational use" disclaimer stays prominent** in every app and listing —
  educational use only; GACA is always the authority.
- **Guideline 4.3(b) (spam/app farms)** — sibling apps from one shell: keep the differentiation
  dossier ready before submission.

---

## If an online phase is ever added

The apps are offline by design and nothing below is scheduled. If sign-in, sync or purchases are
added later, they go through **the same backend the web app uses** — the Express service on Cloud
Run, with Cloud SQL behind it, sessions as an HttpOnly JWT cookie, and entitlements written only by
the server's billing and grants routes. See [`../hosting-facts.md`](../hosting-facts.md).

> [!WARNING]
> **There is no Firebase in this product.** Any step that says "add an iOS app to the
> `flygaca-app` Firebase project", "download `GoogleService-Info.plist`", or "enable the Firebase
> Auth Apple provider" is retired — those projects are deleted. `iflygaca/FlyGACA-ios` still carries a
> `docs/RUNBOOK-ios-firebase.md` written for that plan; it is stale and needs retiring in its own
> repo (flagged, not fixed from here).

If the subscription wrapper is ever revived, note two things:

- The Capacitor shell and its native bridge still exist in `iflygaca/FlyGACA` (`capacitor.config.ts`,
  `src/lib/native/nativeBridge.ts`) — inert on web, routing auth/IAP/offline-cache through
  Capacitor plugins inside a native shell. That is the mechanism; **RevenueCat and Stripe are not**
  — both are gone, and web payments are Moyasar.
- **App Store prices must mirror the current web prices**, not the 2026 draft ones. Today:
  Pro **SAR 79/month · 649/year**; Exam Season Pass **SAR 299 / 90 days**; exam-prep packs banded
  **SAR 249 / 399 / 499**; the pack bundle **SAR 1,499**; a chat credit pack **SAR 39**. There is
  **no Student tier**. Apple's cut makes the in-app price a commercial decision, not a copy of the
  web number — take it deliberately, and remember rule 3.1.1 forbids the app pointing at web
  checkout.

---

## Retired — the single Capacitor app + RevenueCat/Stripe subscription track

> [!WARNING]
> **Retired 2026-08-19.** The pre-2026-08 plan (one `com.flygaca.app` Capacitor shell around the
> web PWA, monetised through RevenueCat and Apple IAP, with entitlements written by a Firebase
> Cloud Function into Firestore, and web billing through Stripe) documented a stack that no longer
> exists — Firebase Auth, Firestore, Cloud Functions, `firebase.json`, RevenueCat webhooks and
> Stripe are all gone. The step-by-step procedure has been removed rather than rewritten, because
> every command in it would have to be invented.
>
> What survives conceptually is captured above: the native family is the launch path, and any
> future subscription wrapper builds on the Cloud Run API. B2B school licences are handled today by
> the product's own grants routes and the org-admin dashboard — see the B2B design docs in
> `iflygaca/FlyGACA` `docs/b2b/`.
