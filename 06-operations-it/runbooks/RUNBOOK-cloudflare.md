# RUNBOOK — Cloudflare hosting

Production hosting for `flygaca.com` is a **Cloudflare Worker** that serves the
static site and proxies `/api/*` to the Firebase Cloud Functions. The backend
(Captain Adel gateway, content, billing) **stays on Firebase me-central2** — the
Worker never processes user questions or data, it only forwards the request, so
the PDPL in-Kingdom posture is unchanged.

## Pieces

| File | Role |
| --- | --- |
| `wrangler.jsonc` | Worker config: name `flygaca`, `main` worker, `assets` = `./dist`, build hook. |
| `worker/index.js` | Routing (clean URLs + redirects), `/api/*` proxy, security headers/CSP. |
| `scripts/build-cloudflare.js` | Assembles `dist/` — the exact file set Firebase served (mirrors `firebase.json` `public`/`ignore`). Run by `npm run build:cloudflare`. |
| `firebase.json` | Retained for `firebase serve` (local dev) and as the rollback host. Keep its rewrites/redirects/headers in sync with `worker/index.js`. |

`dist/` is generated (git-ignored) — never commit it.

## Cloudflare project settings (one-time)

The **Workers Builds** Git integration deploys the `flygaca` Worker on every
push. In the Cloudflare dashboard for the Worker:

1. **Build command:** `npm run build:cloudflare` (also wired as the `build` hook
   in `wrangler.jsonc`, so the default `npx wrangler deploy` triggers it).
2. **Deploy command:** `npx wrangler deploy` (default).
3. **Variables** (Settings → Variables) — set the two function endpoints:
   - `CHAT_FUNCTION_URL` → the deployed `chat` function URL
   - `CONTENT_FUNCTION_URL` → the deployed `protectedContent` function URL

   Find these in the Firebase/GCP console (Cloud Functions / Cloud Run, region
   me-central2; interim me-central1). Until they are set, `/api/*` returns 503
   but the static site is fully up.

## Custom domain (flygaca.com)

The Worker is bound to the production domain in `wrangler.jsonc` so it serves
`flygaca.com` rather than only the default `flygaca.flygaca.workers.dev` URL:

```jsonc
"routes": [
  { "pattern": "flygaca.com", "custom_domain": true },
  { "pattern": "www.flygaca.com", "custom_domain": true }
]
```

- **Prereq:** the `flygaca.com` zone must be active in the same Cloudflare
  account. `custom_domain: true` auto-creates the proxied DNS records for the
  apex and `www` on `npx wrangler deploy` — no manual DNS step.
- **Canonical host:** `worker/index.js` 301-redirects `www.flygaca.com` and the
  leftover `*.workers.dev` host to the apex `https://flygaca.com`, so the served
  URL matches the `<link rel="canonical">` / `og:url` / JSON-LD tags (which all
  point at the apex). Local dev hosts are exempt from the redirect.
- The Firebase rollback host attaches its own custom domain separately via the
  Firebase console (Hosting → Add custom domain) — unchanged by this binding.

## Local

```bash
npm run build:cloudflare      # assemble dist/
npx wrangler dev              # run the Worker + assets locally
# or, against the Firebase config instead:
firebase serve                # legacy/rollback host
```

## Deploy / rollback

- **Deploy:** push to the branch the Workers project tracks (the Git
  integration builds + deploys). Or manually: `npm run build:cloudflare && npx
  wrangler deploy`.
- **Rollback:** Cloudflare dashboard → the Worker → Deployments → roll back to a
  previous version. As a full fallback, `firebase deploy --only hosting` still
  serves the same site from Firebase Hosting.

## What still lives on Firebase

- **Cloud Functions** (`chat`, `protectedContent`, billing, webhooks) — deployed
  from `office/RUNBOOK-deploy.md` (they need the Gemini/Adel secrets).
- **Firestore + security rules** — rules deploy from CI (`firebase deploy --only
  firestore:rules`) on push to `main`.

## Keep in sync

`worker/index.js` and `firebase.json` encode the same routing, redirects and
headers/CSP. When you change one (a new clean URL, a CSP origin, a redirect),
change the other. New external origins must be added to the CSP in **both**.
