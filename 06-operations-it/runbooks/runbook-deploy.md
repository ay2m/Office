---
title: Runbook — Deploy Fly GACA to Firebase Hosting
section: 06-operations-it
doc_type: runbook
status: active
owner: Founder
last_updated: 2026-06-16
lang: en
---

# Runbook — Deploy Fly GACA to Firebase Hosting

The Phase 1 site (landing, library, reader, aerodrome dashboard + map, chart viewer,
legal pages) is built. This runbook takes it live on `flygaca.com`.

**Good news:** Firebase Hosting works on the **free Spark plan** — no Blaze upgrade or
payment card is needed to deploy. (Blaze is only needed later, for Phase 2's Cloud
Functions.)

**What deploys:** the HTML pages, `assets/` (CSS, JS, fonts, images, and the generated
`assets/data/` catalogues, part text and chart images), `sw.js` and the manifest. The raw
corpus in `library/` is excluded by `firebase.json`, so the ~1 GB of source PDFs never
uploads.

---

## One-time setup

1. **Install the Firebase CLI** (needs Node.js, already on your machine):
   ```bash
   npm install -g firebase-tools
   ```

2. **Sign in** with the Google account that owns the Firebase project
   (`flygaca@gmail.com`):
   ```bash
   firebase login
   ```

The repo already contains `firebase.json` (hosting config) and `.firebaserc` (which points
at the `flygaca-firebase` project), so there is nothing else to configure.

---

## Deploy

From the repository root:

```bash
cd ~/Documents/Claude/flygaca/flygaca
firebase deploy --only hosting
```

When it finishes, the CLI prints a **Hosting URL** — `https://flygaca-firebase.web.app`. Open
it: the full site is live over HTTPS, and everything that needs HTTP (the library, the
reader, the map, the chart viewer) now works.

---

## Connect the custom domain — flygaca.com

1. Firebase Console → your project → **Hosting** → **Add custom domain**.
2. Enter `flygaca.com`.
3. Firebase gives you DNS records (an A record, or TXT for verification). Add them at
   your domain registrar.
4. Firebase provisions an SSL certificate automatically (can take up to ~24 h).

---

## Updating the site later

Re-run `firebase deploy --only hosting` after any change. When you change site code,
**bump `VERSION` in `sw.js`** (e.g. `flygaca-v1` → `flygaca-v2`) so returning visitors
pick up the update rather than a stale cached copy.

**Optional — automatic deploys:** a GitHub Actions workflow can deploy on every push to
`main`. It needs a Firebase CI token or service account stored as a GitHub secret. Set
this up once the manual deploy is confirmed working.

---

## Pre-launch reminders

- The **legal pages are drafts** — have the Saudi lawyer review the Terms, Privacy Notice
  and Disclaimer before the site is publicly announced (see `office/lawyer-brief.md`).
- Create the contact mailboxes referenced on the site: `i@flygaca.com` and
  `i@flygaca.com`.
- The library now hosts GACAR text and AIP-derived material — the redistribution position
  (P0-1) should be confirmed by the lawyer.

*Part of the Fly GACA Phase 0 / Phase 1 setup walkthroughs.*
