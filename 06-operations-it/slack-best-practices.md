---
title: "Slack Best Practices"
section: 06-operations-it
doc_type: document
status: draft
owner: Founder / Operations
last_updated: 2026-07-30
lang: en
---

# Slack Best Practices

**Companion to `06-operations-it/05-slack-workspace-blueprint.docx`.** The blueprint defines how the
workspace is *built* (channels, provisioning, admin settings); this guide defines how the team *uses*
it day to day — norms, security, and integrations.

> [!NOTE]
> Draft for review by the Founder / Operations owner before adoption. Where this guide and a formal
> policy disagree, the policy wins: Slack account provisioning follows
> `05-people/onboarding-checklist-2026-07-03.md`; conduct follows
> `05-people/anti-harassment-policy-2026-07-03.md`; data handling follows
> `04-compliance-ksa/information-security-policy.docx` and Saudi PDPL. New hires are pointed at this
> doc during tool orientation (see the onboarding checklist).

---

## 1. Purpose and scope

Slack is Fly GACA's primary internal, real-time communication tool. This guide covers **everyone**
with a workspace account — founders, employees, Tamheer trainees, contractors, and single-channel
guests. It sets shared expectations so the workspace stays searchable, low-noise, and PDPL-safe as
the team grows.

It does **not** cover: external social media (see `05-people/social-media-policy.docx`), customer
support tooling, or the canonical channel roster (see the workspace blueprint).

The three rules that everything else follows from:

1. **Default to public.** Work happens in channels, not DMs, so knowledge is searchable.
2. **Slack is not a system of record.** Nothing that must be retained, audited, or legally relied on
   lives only in Slack. No customer/user personal data, secrets, or regulated records (§6).
3. **Protect focus.** Async by default; notify people deliberately, not reflexively.

---

## 2. Workspace and channel architecture

The canonical channel list lives in the blueprint. This section fixes the **naming convention** so
new channels stay predictable and self-sorting. Use a lowercase `prefix-topic` pattern:

| Prefix | Purpose | Examples |
|---|---|---|
| `team-` | A standing team's home channel | `team-eng`, `team-ops`, `team-gtm` |
| `proj-` | A time-boxed project (archive when done) | `proj-launch`, `proj-ios-release` |
| `ops-` | Recurring operational topics | `ops-it`, `ops-finance`, `ops-hiring` |
| `alerts-` | **Automated** posts only — bots, CI/CD, monitoring (§8) | `alerts-deploys`, `alerts-ci` |
| `help-` | Ask-here support channels | `help-it`, `help-people` |
| `inc-` | Incident coordination (§9) | `inc-2026-07-30-outage` |
| `social-` | Non-work / culture | `social-random`, `social-wins` |

Rules:

- **Public by default.** Make a channel private only for HR, legal, security, finance, or founder-
  confidential matters. Privacy is not a tidiness tool.
- **One topic per channel.** Set the channel *topic* (one line, what it's for) and *description*
  (who's it for, linked docs). Broad is better than many near-duplicate channels.
- **Archive, don't delete.** When a `proj-` channel wraps, archive it — history stays searchable.
- **`alerts-` channels are read-mostly.** Humans discuss automated posts in a thread or a linked
  `team-`/`ops-` channel, not by cluttering the feed.

---

## 3. Membership, roles, and external access

| Role | Who | Notes |
|---|---|---|
| Owner | Founder(s) | Billing, workspace deletion, org-wide settings. Keep to the minimum. |
| Admin | Operations / IT lead | User & channel management, app approvals. |
| Member | Employees, trainees | Default for anyone on the team. |
| Single-channel / multi-channel guest | Contractors, external partners | Provisioned to *only* the channels they need; time-boxed. |

- **Least privilege.** Owner/Admin is granted by role, not seniority, and reviewed at offboarding.
- **App installation is admin-approved.** Members request apps; an admin approves against §8. This
  prevents shadow integrations that could exfiltrate data.
- **Slack Connect (shared channels) is admin-approved per partner.** Treat an external shared channel
  as data leaving the company: no personal data, apply `04-compliance-ksa/vendor-management-policy.docx`,
  and prefer a dedicated `proj-` channel scoped to that engagement.

---

## 4. Communication norms and etiquette

- **Thread everything.** Reply in threads, not the main channel, to keep the feed readable. Check
  "also send to channel" only when the whole channel genuinely needs the update.
- **`@here` / `@channel` are interruptions — spend them carefully.** `@here` pings online members;
  `@channel` pings everyone including offline. Use `@channel` only for genuinely can't-miss, whole-
  channel messages. Prefer @-mentioning the one or two people who actually need to act.
- **Async is the default; respect working hours.** The team operates on Arabia Standard Time (AST,
  UTC+3) with a Sunday–Thursday week. A message is not an interruption unless you make it one — do
  **not** expect real-time replies outside working hours. Use **Schedule send** for off-hours
  messages, and set your own working hours in Slack.
- **Write the whole message.** No "hi" / "you there?" pings — say what you need and why in one
  message so the recipient can act or reply async.
- **Channels over DMs for work.** DMs are for genuinely private or trivial exchanges. If a DM turns
  into a decision or shared knowledge, move it to a channel. DMs are not private from Workspace
  Owners on paid plans and are excluded from team knowledge.
- **Status and DND.** Set your status (focusing, in a meeting, OOO) and use Do Not Disturb — the team
  is expected to honor it.
- **React to acknowledge.** A ✅ / 👀 emoji closes the loop without adding a message. Agree on a small
  shared set (e.g. ✅ done, 👀 looking, 🙏 thanks) per team.
- **Conduct.** All workspace conduct is governed by
  `05-people/anti-harassment-policy-2026-07-03.md`. Slack is a company system; the same professional
  standards as any other channel apply.

---

## 5. Notifications and focus

Recommended personal defaults (each member owns their own config):

| Setting | Recommendation |
|---|---|
| Channel notifications | **Mentions only** for high-traffic channels; **All** only for a few you must not miss. |
| Keyword alerts | Add your name variants and your area (e.g. `deploy`, `billing`, `pdpl`). |
| Do Not Disturb | On outside your working hours; Slack won't ping you, senders see the schedule. |
| Mobile | Mentions/DMs only — the desktop app is for everything else. |

Mute channels you only reference occasionally; you can still search and visit them. Muting is the
healthy default for `social-` and low-signal `alerts-` channels.

---

## 6. Security, privacy, and PDPL

**This is the load-bearing section.** Slack is a US-hosted SaaS tool and is **outside the Kingdom**.
Under Saudi PDPL, personal data of Fly GACA users must be stored and processed in-Kingdom (see
`04-compliance-ksa/pdpl-compliance-program-and-dpia.docx` and the hosting boundary in
`06-operations-it/hosting-facts.md`). Slack therefore must **never** be a store of record for
personal or regulated data.

**Do not put in Slack (channels, DMs, or app messages):**

- User / customer personal data — names tied to accounts, emails, phone numbers, national ID
  (Iqama), payment details, exam results, or support-case PII. Reference a record by its ID in the
  system of record instead of pasting it.
- Secrets — API keys, tokens, passwords, `.env` contents, service-account JSON, private keys. If one
  is posted, treat it as compromised: **rotate it immediately**, delete the message, and follow
  `02-legal/pdpl-breach-notification-procedure-draft-2026-06-14.md` if personal data was exposed.
- Anything you would not want retained, exported, or read by a future Workspace Owner.

**Do:**

- **Enforce 2FA / SSO** on every account. 2FA setup is an onboarding step
  (`05-people/onboarding-checklist-2026-07-03.md`); no account operates without it.
- Share files by **link to Drive** (with correct permissions) rather than uploading copies that then
  live in Slack's US storage.
- Keep confidential discussions in appropriately private channels, and remember private ≠ encrypted-
  from-Slack — it only limits *who in the workspace* can read it.
- Report a suspected leak or account compromise in `help-it` and to the Operations / IT owner; escalate
  to incident handling (§9) if user data is involved.

Message **retention** is set workspace-wide by an admin (see the blueprint). Assume everything is
retained and searchable by admins until then; this is exactly why regulated data must not enter Slack.

---

## 7. Account lifecycle

Slack accounts are provisioned and revoked with the rest of the tooling stack, not ad hoc:

- **Onboarding:** account created, 2FA enforced, added to the right `team-`/`ops-` channels, and the
  new hire is walked through this guide. Per `05-people/onboarding-checklist-2026-07-03.md`.
- **Role changes:** channel membership and (if applicable) Admin rights are updated to match the new
  role — least privilege still applies.
- **Offboarding:** the account is **deactivated the same day** as departure, Slack Connect / guest
  access is revoked, and any owned integrations are reassigned. Per
  `05-people/offboarding-checklist-2026-07-03.md`. Deactivation preserves history for search;
  full deletion is not the default.

---

## 8. Integrations and bots

Integrations are powerful and are a data-exfiltration surface — hence admin approval (§3).

- **Least privilege for every app.** Install only apps with a clear need, grant only the scopes they
  require, and post automated output to a dedicated `alerts-` channel — never DMs, never a busy human
  channel.
- **Webhook secrets are secrets.** A Slack incoming-webhook URL grants post access to your workspace.
  Store it in the platform's secret manager (GitHub Actions secrets, Cloud secret manager) — never in
  code, `.env` committed to a repo, or a Slack message. Rotate on suspected exposure.

### 8.1 GitHub / CI-CD deploy alerts

Today no repo emits Slack notifications — deploy/CI status is only visible in the GitHub Actions UI.
When the team is ready, add a **secret-gated** notification step to the deploy workflows
(`Captain-Adel/.github/workflows/deploy.yml`, `FlyGACA-app/.github/workflows/deploy.yml`) that posts to
`alerts-deploys`. It stays inert until a `SLACK_WEBHOOK_URL` repo/org secret is set, so it is safe to
merge ahead of the workspace being live:

```yaml
# Add as a final step in a deploy job. No-ops until the SLACK_WEBHOOK_URL secret exists.
- name: Notify Slack (deploy result)
  if: ${{ always() && secrets.SLACK_WEBHOOK_URL != '' }}
  run: |
    curl -fsS -X POST "$SLACK_WEBHOOK_URL" \
      -H 'Content-Type: application/json' \
      -d "{\"text\": \"*${{ github.repository }}* deploy on \`${{ github.ref_name }}\` → *${{ job.status }}* (<${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}|run>)\"}"
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

Keep new webhook-driven surfaces behind the same `secrets.* != ''` guard so a fork or a
not-yet-configured repo never fails CI on a missing secret.

### 8.2 Claude in Slack

The Claude Slack app can summarize threads and answer questions in-channel. Best practice:

- **PDPL still applies inside prompts.** Do not paste user personal data or regulated content into a
  Claude prompt any more than into a channel (§6). Reference records by ID.
- **Scope it to the channels that need it**, and treat its output as a draft — review before acting or
  forwarding, exactly as with any generated content.
- Prefer it for internal, non-personal work: summarizing an `ops-`/`proj-` thread, drafting a message,
  or explaining a doc — not for anything touching the regulatory corpus's users.

---

## 9. Incident communications

For a production incident (outage, security event, data exposure):

1. **Open a dedicated channel** `inc-YYYY-MM-DD-<slug>` and pin the current status to the top.
2. **One incident lead** posts authoritative updates; everyone else threads. Tag severity in the
   channel topic (`SEV1` … `SEV3`).
3. **Keep the timeline in-channel** as it happens, then write it up in the system of record
   afterward — Slack is the coordination surface, not the post-incident record.
4. If **user personal data** may be exposed, invoke
   `02-legal/pdpl-breach-notification-procedure-draft-2026-06-14.md` immediately, and coordinate per
   `04-compliance-ksa/business-continuity-and-disaster-recovery-plan-bcp-dr.docx`.
5. Archive the channel once the write-up is filed.

---

## 10. Records, retention, and exports

- **Retention** is admin-configured workspace-wide; assume messages persist and are searchable.
- **Exports are admin-only** and are governed by the same data-handling rules as any other export of
  company data — an export can surface anything ever posted, which is another reason §6 matters.
- **The system of record wins.** Decisions, specs, and policies live in this repo / Drive / the
  product database. Link Slack threads *to* those records; never let Slack be the only copy.

---

## 11. Related documents

- `06-operations-it/05-slack-workspace-blueprint.docx` — workspace setup, canonical channels, admin settings.
- `05-people/onboarding-checklist-2026-07-03.md` · `05-people/offboarding-checklist-2026-07-03.md` — account lifecycle, 2FA.
- `05-people/anti-harassment-policy-2026-07-03.md` — conduct on company systems.
- `05-people/social-media-policy.docx` — external social media (distinct from internal messaging).
- `04-compliance-ksa/information-security-policy.docx` — access control, 2FA, secret handling.
- `04-compliance-ksa/pdpl-compliance-program-and-dpia.docx` · `06-operations-it/hosting-facts.md` — PDPL / in-Kingdom data boundary.
- `02-legal/pdpl-breach-notification-procedure-draft-2026-06-14.md` — breach / leak response.
- `04-compliance-ksa/business-continuity-and-disaster-recovery-plan-bcp-dr.docx` — incident coordination.
- `04-compliance-ksa/vendor-management-policy.docx` — external / Slack Connect partners.
