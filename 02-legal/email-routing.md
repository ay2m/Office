---
title: Email routing — Fly GACA
section: 02-legal
doc_type: document
status: active
owner: Founder
last_updated: 2026-08-09
lang: en
---

# Email routing — Fly GACA

How the public-facing `@flygaca.com` addresses map to real inboxes.

> **Where this is actually configured:** forwarding/aliasing lives at the mail
> provider for the `flygaca.com` domain (Google Workspace routing or Cloudflare
> Email Routing) — **not** in this repository. This file is the source of truth
> for *what the scheme should be*; apply it in the provider's console and keep
> the two in sync. The repo only controls which address each page *displays*.

## Destinations

Every role address below forwards to **both** of these inboxes:

- `i@flygaca.com` — the canonical, on-brand inbox (primary).
- `ay2m@hotmail.com` — personal backup inbox.

`i@flygaca.com` is itself the brand inbox; it forwards onward to
`ay2m@hotmail.com` so nothing is missed.

## Role addresses

| Address | Purpose | Surfaced on |
| --- | --- | --- |
| `i@flygaca.com` | General contact, questions, corrections/feedback | Footer (every page), About, Terms, Disclaimer, document "report a problem" |
| `support@flygaca.com` | Product, account & billing support | About, Settings (plan/cancellation) |
| `sales@flygaca.com` | Flight-school seats & business / B2B enquiries | About |
| `info@flygaca.com` | General information (alias of `i@`) | — (alias only) |
| `hr@flygaca.com` | Careers / hiring | About |
| `captadel@flygaca.com` | Captain Adel feedback & issues | About |
| `privacy@flygaca.com` | PDPL / data-protection (legal controller contact) | Privacy notice, About |

## Legacy

| Address | Status |
| --- | --- |
| `hello@flygaca.com` | **Retired** as the displayed contact (replaced by `i@flygaca.com`). Keep it alive as a forwarding alias so older links and printed material still reach us. |
| `flygaca@gmail.com` | Founder/account address (used for Firebase project ownership — see `06-operations-it/runbooks/runbook-deploy.md`). Not a public contact. |

## Notes

- `ay2m@hotmail.com` is also used in code as the **staff/admin allow-list
  identity** (`assets/js/store.js`, `functions/staff.js`). That is an auth
  mechanism, unrelated to contact routing — do not change it when updating
  contact addresses.
- The official `@gaca.gov.sa` addresses that appear in `assets/data/` are real
  GACA regulatory contacts from the source corpus — never rewrite them.

## Provider setup — Cloudflare Email Routing (chosen)

Free, receive-and-forward only (no mailbox). **`flygaca.com`'s DNS and the
website are both already on Cloudflare** (Cloudflare DNS + Cloudflare Pages), so
there is no nameserver migration and no Firebase records to protect — Email
Routing is independent of the Pages site and just adds MX/TXT records.

1. **Enable Email Routing.** In Cloudflare for `flygaca.com`: **Email → Email
   Routing → Get started / Enable.** Cloudflare auto-creates the `MX` records and
   the `SPF` (`TXT`) record. (If any stale `MX`/mail `TXT` records remain from a
   previous host, delete them so only Cloudflare's exist.)
2. **Destination addresses** → add and verify (click the confirmation email):
   - `ay2m@hotmail.com`
   - the real inbox behind `i@flygaca.com` (a Gmail/Hotmail you actually read)
3. **Routing rules** — one per role address, each → `i@flygaca.com`:
   `support@`, `sales@`, `info@`, `hr@`, `captadel@`, `privacy@`, and the legacy
   `hello@`. Add a **catch-all → `i@flygaca.com`** so any future address still
   lands.
4. **Fan-out to both inboxes:** a Cloudflare rule has one destination, so point
   everything at `i@flygaca.com` and have that inbox auto-forward a copy to
   `ay2m@hotmail.com` (or use an Email Worker for a true two-destination split).

The MX/TXT records are not proxied (no orange/grey-cloud choice for mail), and
they don't touch the Pages site's own records, so the website is unaffected.
After a few minutes: send a test to each address and confirm it lands; verify
MX/SPF with <https://toolbox.googleapps.com/apps/checkmx/>.

> **Limitation (receive-only):** replies leave from whichever inbox you read
> them in, **not** from `i@flygaca.com`. If you later need to *send as*
> `i@flygaca.com`, move to Google Workspace (one seat + aliases) — the role
> addresses above become send-as aliases of the `i@` user.

## Troubleshooting & upgrades

### Getting send-as `i@flygaca.com` (beyond receive-only)

Cloudflare Email Routing has no outbound SMTP, so it can only receive/forward —
replies go out from your personal inbox. Receive-only is fine to launch with;
upgrade when you want the brand `From:`. Options, simplest first:

| Route | Cost | Notes |
| --- | --- | --- |
| **Zoho Mail** free tier | Free | Real mailbox for one domain with send-as. Swap Cloudflare's MX for Zoho's MX. |
| **Google Workspace** (1 seat) | ~$6/mo | Real `i@` mailbox; the role addresses become send-as aliases of that user. Cleanest given the existing Google footprint. |
| Cloudflare forwarding **+ outbound SMTP relay** (Brevo/Mailgun) wired into Gmail "Send mail as" | Free–cheap | Most fiddly; only worth it to avoid running a real mailbox. |

If send-as matters from day one, pick **Zoho free** or **Workspace** and use
*their* MX records instead of Cloudflare Email Routing — at that point the
forwarding-only setup above is replaced, not added to.
