# P0-5 Walkthrough — Create the Firebase project

**Goal:** create the managed cloud project that hosts the Fly GACA PWA, database, auth and
Cloud Functions.

> The one irreversible decision here is the Firestore region. Get it right the first time.

## 1. Create the project

- Go to console.firebase.google.com and sign in with the Google account that should own the
  project — use a project-dedicated account rather than a personal one if you can.
- Add a project; name it (for example `flygaca` or `fly-gaca-prod`). Note the generated
  **Project ID** — record it in `../phase0.md`.

## 2. Set the Cloud Firestore region — me-central2 (Dammam)

- In **Build → Firestore Database**, create the database.
- Choose location **me-central2** (Dammam, Saudi Arabia). **This is permanent — the
  location cannot be changed after the database is created.** me-central2 keeps data inside
  the Kingdom, which supports PDPL data-sovereignty.
- Start in production mode; the strict per-user security rules are written in Phase 3.

## 3. Enable the other services

- **Authentication** — enable it; sign-in providers are configured in Phase 3.
- **App Check** — register it; enforcement comes in Phase 2/3.
- **Hosting** — enable it; this is the Phase 1 deploy target for the static PWA.

## 4. Upgrade to the Blaze plan

- Cloud Functions (Phase 2) require the Blaze pay-as-you-go plan. Upgrade now and set a
  **budget alert** so there are no surprises.

## 5. Verify AI inference data-residency

- Before Phase 2, confirm where Gemini / Vertex AI inference runs and whether it meets your
  data-sovereignty posture. This is an open item in the briefing's hosting section — record
  the answer.

## 6. Record the result

- Update `../phase0.md` P0-5 with the Project ID and the confirmed Firestore region.
