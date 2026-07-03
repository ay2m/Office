# Fly GACA — Cookie and Tracking Notice
**Document:** cookie-and-tracking-notice-draft-2026-06-14.md
**Version:** Draft 1.0 — 2026-06-14
**Status:** DRAFT — requires review by a qualified Saudi-licensed lawyer before use.
**Scope:** This notice covers cookies, local storage, session tokens, and tracking technologies used across the Fly GACA website, PWA, and Android application.
**Contact:** privacy@flygaca.com

---

> **DRAFT — requires review by a qualified Saudi-licensed lawyer before use.**
>
> This document is a working draft prepared by an AI assistant. It is NOT legal advice. It must be reviewed by a Saudi-licensed lawyer before publication.
>
> Key review points: (1) PDPL Art. 29 transparency obligation — whether a cookie banner and affirmative consent mechanism is required for functional/analytics technologies at account stage, and at what point; (2) CITC / CST position on analytics tracking for KSA-based services; (3) Whether Firebase Authentication session management cookies are "necessary" and exempt from consent requirements or require disclosure; (4) Whether Cloudflare security cookies are categorised as strictly necessary. Counsel should advise on the appropriate consent mechanic (implied vs. opt-in) for each category.

---

## بالعربية — ملخص

> تستخدم منصة Fly GACA قدرًا محدودًا من تقنيات التتبع وملفات الارتباط (الكوكيز)، لا سيما لإدارة الجلسات والمصادقة الأمنية. لا نستخدم ملفات ارتباط إعلانية أو تسويقية. ترجمة عربية كاملة ستتوفر قبيل إطلاق الحسابات. للاستفسارات: privacy@flygaca.com

---

## 1. What This Notice Covers

This Cookie and Tracking Notice explains:
- What cookies and similar technologies we use
- Why we use them
- How you can manage your preferences

This notice forms part of and should be read alongside our [Privacy Notice](https://flygaca.com/privacy) and [Terms of Use](https://flygaca.com/terms).

---

## 2. What Are Cookies and Similar Technologies?

**Cookies** are small text files placed on your device by a website. They store information about your visit or session.

**Similar technologies** we may use include:
- **Session storage** — temporary browser storage that clears when you close your browser tab
- **Local storage** — persistent browser storage retained between visits
- **IndexedDB** — structured browser-side storage used for offline PWA functionality
- **Firebase Authentication tokens** — secure session tokens issued by Google Firebase to authenticate logged-in users

---

## 3. The Technologies We Use

### 3.1 Summary Table

| Technology | Provider | Category | Purpose | Duration | Consent Required? |
|-----------|----------|----------|---------|----------|------------------|
| Firebase Auth session cookie / ID token | Google Firebase (Google LLC) | Strictly Necessary — Authentication | Authenticates logged-in users; maintains session state | Session / up to 1 hour (ID token); up to 30 days (refresh token if enabled) | No (strictly necessary) |
| Cloudflare `__cf_bm` | Cloudflare, Inc. | Strictly Necessary — Security | Bot management and DDoS protection | 30 minutes | No (strictly necessary) |
| Cloudflare `_cfuvid` | Cloudflare, Inc. | Strictly Necessary — Security | Rate-limiting; identifies connections for security processing | Session | No (strictly necessary) |
| Cloudflare Web Analytics beacon | Cloudflare, Inc. | Analytics — Cookieless | Privacy-preserving analytics: page views, device type, country. No cross-site tracking. No cookies set. Cookieless by design. | N/A (no cookie) | No (cookieless; no persistent identifier) |
| PWA local storage (study progress, offline cache) | First party (Fly GACA) | Functional | Stores your study progress, bookmarks, and downloaded content for offline use and personalisation | Until account deletion or manual clear | No (functional, account-linked) |
| Service Worker cache | First party (Fly GACA) | Strictly Necessary — Functional | Enables PWA offline functionality; caches app shell and library content | Until app update or manual clear | No (necessary for core PWA functionality) |

### 3.2 What We Do NOT Use

We do **not** use:
- Advertising or marketing cookies
- Third-party behavioural tracking cookies (e.g., Meta Pixel, Google Ads tags, TikTok Pixel)
- Cross-site tracking technologies
- Fingerprinting or device tracking for advertising
- Third-party analytics that set persistent cookies (e.g., Google Analytics 4 with cookies — we use Cloudflare Web Analytics instead)

---

## 4. Category Explanations

### 4.1 Strictly Necessary — Authentication and Security

**Firebase Authentication tokens** are required for the Service to function for logged-in users. When you sign in to your Fly GACA account, Firebase issues a short-lived ID token (typically valid for 1 hour) and, where session persistence is enabled, a longer-lived refresh token stored in your browser's local storage. These are not used to track your behaviour; they exist solely to verify that you are who you say you are and to maintain your authenticated session.

**Cloudflare security cookies** are set by Cloudflare, our network infrastructure provider, to protect the Service against bots, automated attacks, and DDoS (distributed denial of service) attempts. They are strictly necessary for the security and availability of the Service.

These technologies are deployed without your prior consent because they are strictly necessary to provide the service you have requested.

### 4.2 Analytics — Cookieless

We use **Cloudflare Web Analytics** to understand aggregate usage of the Service — for example, which pages are most visited, which devices are used, and which countries our visitors are from. Cloudflare Web Analytics is designed to be privacy-preserving: it does not set cookies, does not track individuals across sessions or sites, and does not share data with advertising networks. Aggregate, anonymised analytics data is sufficient for our operational purposes.

### 4.3 Functional — Local Storage and PWA Cache

When you use Fly GACA as a PWA (Progressive Web App), your device stores app files, study progress, and bookmarks locally to enable offline access and a smooth experience. This data is stored on your device and is not transmitted to third parties. It is linked to your account so that progress is synchronised when you are online.

---

## 5. Managing Your Preferences

### 5.1 Browser Controls

You can control and delete cookies through your browser settings. Please note:
- Deleting strictly necessary cookies will sign you out of your account
- Browser cookie controls do not affect local storage or IndexedDB; these must be cleared through your browser's "Clear site data" or equivalent function

Instructions for major browsers:
- [Google Chrome](https://support.google.com/chrome/answer/95647)
- [Mozilla Firefox](https://support.mozilla.org/kb/cookies-information-websites-store-on-your-computer)
- [Apple Safari](https://support.apple.com/guide/safari/manage-cookies-sfri11471)

### 5.2 Account Data

Logged-in users can delete their account and all associated data at any time from account settings or by contacting privacy@flygaca.com. Account deletion removes study progress, preferences, and all server-side personal data subject to our data retention policy.

### 5.3 Analytics Opt-Out

Cloudflare Web Analytics does not use cookies or persistent identifiers, so there is no traditional opt-out. If you prefer that your visit not contribute to aggregate analytics, you can use a network-level ad blocker that blocks the Cloudflare Beacon script (`static.cloudflareinsights.com`).

---

## 6. Third-Party Providers Referenced

| Provider | Role | Privacy Information |
|----------|------|---------------------|
| Google Firebase (Google LLC) | Authentication, Firestore database (data processing in region as configured — see Privacy Notice) | [Firebase Privacy](https://firebase.google.com/support/privacy) |
| Cloudflare, Inc. | CDN, DDoS protection, Web Analytics | [Cloudflare Privacy Policy](https://www.cloudflare.com/privacypolicy/) |

All third-party providers are listed as sub-processors in our Sub-Processor Register, maintained in accordance with PDPL requirements.

---

## 7. Changes to This Notice

We may update this Cookie and Tracking Notice when we introduce new features or change the technologies we use. Material changes — particularly the introduction of any new tracking category — will be communicated to account holders by email and noted on this page with a revised date.

If the Service is updated to introduce analytics cookies or marketing pixels in the future, we will implement an appropriate consent mechanism before doing so.

---

## 8. Contact

For questions about this notice or to exercise your data rights under the PDPL:

**privacy@flygaca.com**

Fly GACA | flygaca.com | Kingdom of Saudi Arabia

---

*DRAFT 1.0 — 2026-06-14. Not published. Pending Saudi legal counsel review.*
*Note to lawyer: The current technology stack (Firebase Auth, Cloudflare Web Analytics) is designed to be lightweight from a consent perspective. The key question for counsel is whether, at account launch, the Firebase Auth persistent refresh token stored in local storage is adequately disclosed by this notice and whether it triggers any consent obligation under PDPL or CITC/CST guidance.*
