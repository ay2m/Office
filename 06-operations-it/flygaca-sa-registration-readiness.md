---
title: "flygaca.sa registration — readiness & risk (SaudiNIC)"
section: 06-operations-it
doc_type: document
status: active
owner: Founder
last_updated: 2026-07-28
lang: en
---

# flygaca.sa registration — readiness & risk (SaudiNIC)

Now that the legal entity exists (**CR 7030976893**, BDA Company International),
the SaudiNIC blocker on `flygaca.sa` is cleared. This is the readiness pack:
eligibility, the process, the one real risk (the **"gaca" substring**), and the
DNS plan. `flygaca.com` **stays canonical** either way — `flygaca.sa` is a
defensive / local-trust redirect, not a migration.

## Status

- **Unblocked (2026-07-28).** SaudiNIC (`nic.sa`) requires a registrant with a
  genuine relationship to the name; the LLC now provides that. See
  `06-operations-it/hosting-facts.md` (Domains) and `00-strategy/phase0.md` P0-2.
- `flygaca.com` owned & canonical; `captadel.com` owned. `flygaca.sa` is the open
  item.

## ⚠️ The one real risk — the "gaca" substring

"GACA" is the abbreviation of the **General Authority of Civil Aviation** — the
regulator. "flygaca" contains it. SaudiNIC reviews every `.sa` request for a
genuine name↔registrant relationship **and** screens names that could imply an
official / government affiliation. Two consequences:

1. The request may be **queried or refused** on the ground that the name could be
   read as affiliated with GACA — which the product explicitly is **not**.
2. This is the same fault line as the pending **P0-2 name / trademark opinion** —
   do **not** register `flygaca.sa` before the lawyer weighs in on the name
   itself, because a `.sa` filing puts the name in front of a government
   registrar.

**Mitigation / stance:**

- Lead with independence: the registrant is **BDA Company International**, every
  surface carries the not-affiliated disclaimer, and the `.sa` use is a redirect
  to an independent educational library — be ready to state this in the request.
- Sequence it **after** the lawyer's name opinion (P0-2). If counsel flags the
  name, resolve that first — the domain follows the name, not the reverse.
- Have fallbacks ready (`flygaca.com.sa`, or a differently-branded `.sa`) if the
  name is contested. Losing `flygaca.sa` costs nothing operationally —
  `flygaca.com` remains canonical.

## Eligibility & documents

| Requirement | Status |
|---|---|
| Saudi CR / legal entity | ✅ CR 7030976893 |
| National access (Nafath / Absher Business) for the entity | Owner to confirm |
| Genuine name↔registrant relationship | The "gaca" review point above |
| SaudiNIC-accredited registrar | Pick one (below) |

## Process (SaudiNIC)

1. Confirm `flygaca.sa` availability on `nic.sa`.
2. Register through a SaudiNIC-accredited registrar (or the SaudiNIC portal),
   signed in with the entity's national access.
3. Submit the CR as registrant proof; expect a **name review** (the risk above).
   Respond with the independence framing if queried.
4. On approval, set nameservers / DNS (below).

## DNS & hosting plan — redirect, don't split

`flygaca.sa` **301-redirects to `https://flygaca.com`** — the same
marketing-domain consolidation the app already does (`worker/index.ts`,
`vercel.json`). Do **not** serve a second copy of the site on `.sa`:

- Keeps the strict CSP and the single canonical origin intact.
- Avoids duplicate-content / hreflang complexity — the canonical stays
  `flygaca.com` (the SEO canonical tags already point there).

Once registered:

- Point `flygaca.sa` at the same edge (Cloudflare zone / registrar redirect) →
  `301 → https://flygaca.com` (apex + `www`).
- If the redirect must be app-side instead of at the edge, add `flygaca.sa` to
  the redirect map alongside `captadel.com`.
- No canonical/SEO change — `flygaca.com` stays the one indexed origin.

## Records

Record the registrar, registration / expiry dates, and nameservers in
`hosting-facts.md`; set a renewal reminder; keep the registration certificate in
the founder's records.
