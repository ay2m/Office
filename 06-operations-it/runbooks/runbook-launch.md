---
title: Runbook — Launch Fly GACA
section: 06-operations-it
doc_type: runbook
status: active
owner: Founder
last_updated: 2026-06-16
lang: en
---

# Runbook — Launch Fly GACA

Everything built this far is verified locally. This runbook takes it live. The
three steps below run **on your Mac, with your own accounts** — they need your
GitHub, Google/Firebase and Vercel logins, so they can't be run from here.

Run them from the repository root:

```sh
cd ~/Documents/Claude/flygaca/flygaca
```

---

## What's being shipped

A complete static site — landing, a four-section Library (74 GACAR Parts, 21
handbooks, 61 aerodromes, 13 charts), Captain Adel's chat UI, 24 Flight Tools,
10 Guides, the Study section (Ground School + quizzes + mock exam), legal pages,
the offline service worker, `404.html`, `sitemap.xml` and `robots.txt`.

**Two things are intentionally not live yet:**

- **Captain Adel's answers** need the Cloud Function, which needs the Firebase
  **Blaze** plan and a Gemini key — see `office/runbook-captain-adel.md`. Until
  then the chat shows an honest "not on duty yet" message.
- **The legal pages** (Disclaimer, Terms, Privacy) are **drafts** pending the
  Saudi lawyer's review — see `office/lawyer-brief.md`.

Neither blocks a soft launch.

---

## 1 — Push to GitHub  (github.com/FlyGACA/flygaca)

The repo already exists. Commit this session's work and push:

```sh
git add -A
git status                     # sanity-check what's staged
git commit -m "Library handbooks, 17 tools, guides, Study + Ground School, launch polish"
git push origin main
```

The `.gitignore` already keeps `node_modules/`, the ~1 GB `library/` corpus and
secrets out of the commit. The RAG corpus `functions/rag/_chunks.json.gz` (~4 MB)
**is** committed on purpose — the Cloud Function needs it.

---

## 2 — Deploy to Firebase  (the primary host)

Firebase is the architected home: Hosting, the Captain Adel Cloud Function and
Firestore all live in the one `flygaca-firebase` project.

```sh
# One-time, if not already done:
npm install -g firebase-tools
firebase login

# Confirm the CLI is on the right project BEFORE deploying:
firebase use flygaca-firebase

# Deploy hosting first — this has no dependencies and works immediately:
firebase deploy --only hosting

# Then the Firestore security rules (needs a Firestore database to exist —
# see Troubleshooting if this 400s):
firebase deploy --only firestore:rules
```

The hosting deploy publishes the site to `https://flygaca-firebase.web.app`. The
rules deploy activates the `waitlist` Firestore rule (write-only — submitted
emails can't be read back from the client). Deploying the two separately means
a rules problem never blocks the site from going live.

- **Captain Adel's engine** is a separate, Blaze-gated step — follow
  `office/runbook-captain-adel.md` when ready (`firebase deploy --only functions`).
- **Firestore** must be enabled in the project for the waitlist to save emails.

### Custom domain — flygaca.com

Firebase Console → Hosting → **Add custom domain** → `flygaca.com` → add the DNS
records it gives you at your registrar. SSL is provisioned automatically.

---

## 3 — Deploy to Vercel  (optional parallel/static host)

Vercel can host the **static** site (everything except Captain Adel's Cloud
Function, which is Firebase-only). `vercel.json` and `.vercelignore` are already
in the repo — the ignore file keeps `office/`, `assistant/`, `functions/` and the
`library/` corpus **off** the public host.

```sh
npm install -g vercel
vercel            # first run links the project — accept the defaults
vercel --prod     # promote to production
```

On Vercel, `/api/chat` has no function, so Captain Adel shows the same "not on
duty" message; the waitlist still works (Firestore is called straight from the
browser).

> Deploying to both Firebase and Vercel is redundant for one product. Recommended:
> **Firebase as the live host** (it runs Captain Adel and Firestore together);
> use Vercel only if you want a separate preview/staging URL.

---

## 4 — Post-deploy smoke test

On the live URL, check:

- The landing page, and the nav reaches Library · Captain Adel · Tools · Guides · Study · About.
- The Library loads all four tabs; open a Part and a Handbook in the reader.
- A couple of tools compute (E6B, Weight & Balance); the AIRAC tool shows the current cycle.
- A Study quiz runs and the mock exam times and scores.
- Ground School ticks lessons and the progress bar moves.
- A made-up URL shows the branded `404.html`.
- The waitlist accepts an email (confirm a doc appears in Firestore → `waitlist`).

---

## Troubleshooting

### `firestore:rules` deploy fails — HTTP 400, wrong project ID

Symptom:

```
Error: Request to https://firebaserules.googleapis.com/v1/projects/<id>/rulesets
had HTTP Error: 400, Request contains an invalid argument.
```

If the `<id>` in that URL is **not** `flygaca-firebase`, the CLI is deploying to the
wrong project. The Firebase CLI keeps a per-directory active-project override
(in `~/.config/configstore/`) that overrides `.firebaserc`. Reset it:

```sh
firebase projects:list      # list every project; confirm flygaca-firebase exists
firebase use                # show which project the CLI is currently using
firebase use flygaca-firebase    # point it back at the right project
```

Even on the correct project, **Firestore rules cannot deploy until a Firestore
database exists.** In the Firebase Console for `flygaca-firebase`: Build → Firestore
Database → **Create database** (Production mode, region `me-central2` / Dammam).

Hosting has no such dependency, so split the deploy — get the site live first,
then add the rules once the database exists:

```sh
firebase deploy --only hosting              # works immediately
firebase deploy --only firestore:rules      # after the database is created
```

## Updating later

Re-run the deploy command for the host you changed. **Whenever you change site
code, bump `VERSION` in `sw.js`** (currently `flygaca-v11`) so returning visitors
get the update instead of a stale cached copy.

## Launch mode — everything free (temporary)

While the company paperwork/banking completes, the whole product is open to
everyone. Two switches, one per side:

- **Client** — `window.FG_LAUNCH_MODE` defaults to `true` at the top of
  `assets/js/entitlements.js`. Every gate (tools, study, packs, logbook,
  dashboard, the paywall modal, Captain Adel's client hint) keys off it.
- **Server** — `ADEL_LAUNCH_MODE=free` in `functions/.env.flygaca-app`. The chat
  gateway treats every caller as Pro and skips the free-tier quota. The abuse
  rate-limiter (`functions/rag/ratelimit.js`) stays active — it protects the
  model spend, not the product tier.

`pricing.html` carries a green "all features are currently free" banner
(`.pricing-notice-launch`) — remove it together with the flags.

**To end launch mode (the revert):**

1. In `assets/js/entitlements.js`, flip the default to
   `window.FG_LAUNCH_MODE = false` (or delete the block).
2. Remove the `ADEL_LAUNCH_MODE=free` line from `functions/.env.flygaca-app`.
3. Remove the launch banner block in `pricing.html` (and its
   `.pricing-notice-launch` rule in `assets/css/pricing.css`).
4. Bump `VERSION` in `sw.js`, redeploy hosting + the `chat` function, and drop
   the `launch mode` describe-block in `tests/entitlements-gating.spec.js`.

*Part of the Fly GACA launch walkthrough. Not legal advice.*
