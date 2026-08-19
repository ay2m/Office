---
title: Fly GACA — Privacy Notice (Full Platform Stage)
section: 02-legal
doc_type: legal
status: draft
owner: Founder
last_updated: 2026-08-19
lang: en
---

# Fly GACA — Privacy Notice (Full Platform Stage)
**Version:** Draft 1.0 — 2026-06-14  
**Replaces:** Pre-account draft in `flygaca/privacy.html` (effective when user accounts go live)  
**Language:** English (master). Arabic translation required before account launch per PDPL best practice.  
**Contact:** privacy@flygaca.com

---

> ⚠️ **LAWYER-REVIEW REQUIRED — NOT LEGAL ADVICE**
>
> This document is a working draft prepared by an AI assistant for founder review. It is **not** legal advice and has **not** been reviewed by a Saudi-licensed lawyer. It must be reviewed and approved by qualified Saudi legal counsel (with expertise in KSA PDPL, SDAIA implementing regulations, and the Communications, Space & Technology Commission / CITC frameworks) **before** it is published or relied upon. Do not publish this notice until that review is complete.
>
> Relevant KSA instruments this draft is intended to align with: Personal Data Protection Law (Royal Decree M/19, 1443H / 2021, effective 14 Rabi' al-Awwal 1444H / 17 September 2023); SDAIA Implementing Regulations; CITC guidelines on electronic services; Saudi E-Commerce Law (Royal Decree M/126, 1440H / 2019).

---

## مقدمة | Introduction

**بالعربية:** يُعدّ هذا الإشعار هو الإصدار الرسمي لسياسة الخصوصية لمنصة Fly GACA. سنوفر ترجمة عربية كاملة قبل إطلاق الحسابات رسمياً. للاستفسارات بالعربية، تواصل معنا على: privacy@flygaca.com

---

## 1. Who We Are

Fly GACA ("we", "us", "our") is an independent educational reference platform for Saudi civil aviation, operated by BDA Company International (شركة بدع الدولية), CR 7030976893, Riyadh, Kingdom of Saudi Arabia.

**We are not affiliated with, endorsed by, or connected to the General Authority of Civil Aviation (GACA) or the Government of Saudi Arabia.** Fly GACA is a private educational service only. See our [Disclaimer](https://flygaca.com/disclaimer) for the full independence statement.

**Data Controller contact:**  
privacy@flygaca.com  
Fly GACA | flygaca.com | Kingdom of Saudi Arabia

---

## 2. Scope of This Notice

This notice covers all personal data processed through:

- The Fly GACA website at **flygaca.com** and associated sub-domains
- The Fly GACA Progressive Web App (PWA) and Android application
- The **Captain Adel** AI study assistant
- The **Fly GACA Library** (search and document-reader)
- Fly GACA **user accounts** (individual Pro tier and Academy/cadet accounts)
- B2B **Academy dashboard** features (flight school and academy operator access)
- The waitlist and marketing communications

This notice does **not** cover data processed by GACA or other government websites that we link to.

---

## 3. What Personal Data We Collect and Why

### 3.1 Account Registration

| Data | Purpose | Lawful Basis (PDPL) |
|------|---------|---------------------|
| Email address | Account creation, login, service communications | Contract (Art. 6) |
| Password (hashed — we never store plaintext) | Authentication | Contract |
| Display name (optional) | Personalisation | Consent |
| GACA licence/student number (optional, user-provided) | Licence-track features; verification display | Contract / Consent |
| Preferred language (EN/AR) | Service delivery | Contract |

### 3.2 Subscription and Payment

| Data | Purpose | Lawful Basis |
|------|---------|--------------|
| Payment card data | NOT stored by Fly GACA — processed and tokenised by Moyasar (our licensed Saudi payment gateway) | Contract |
| Transaction reference, amount, plan type, date | Billing records, ZATCA VAT compliance | Contract / Legal obligation (VAT, 7-year retention) |
| Invoice details (name / entity, VAT number if applicable) | ZATCA Fatoora e-invoicing | Legal obligation |

### 3.3 Platform Usage (Library and Documents)

| Data | Purpose | Lawful Basis |
|------|---------|--------------|
| Documents viewed, bookmarked, highlighted | Personal study record; progress features | Contract |
| Search queries (non-AI) | Search result delivery; search quality improvement | Contract / Legitimate interest |
| Exam practice scores and session history | Progress tracking; instructor dashboard (Academy tier) | Contract |

### 3.4 Captain Adel AI Study Assistant

| Data | Purpose | Lawful Basis | Retention |
|------|---------|--------------|-----------|
| Chat queries submitted to Captain Adel | AI response generation | Contract | 90 days rolling |
| AI response text and source citations | Quality evaluation; session continuity; user review | Contract / Legitimate interest | 90 days rolling |
| Conversation session metadata (timestamp, model version) | Quality assurance; incident investigation | Legitimate interest | 90 days rolling |

**Important — what Captain Adel does NOT do:**
- Captain Adel does not store, reproduce, or transmit content from ICAO Annexes or aircraft manuals.
- Captain Adel's responses are educational study aids only. They are not authoritative regulatory rulings. Never use them for operational flight decisions.
- We advise users not to include personal identifiers (full name, national ID, passport number, medical details) in chat queries. If such data is inadvertently submitted, it is handled under this notice but is not required and should not be included.

### 3.5 Academy / B2B Operator Data

| Data | Purpose | Lawful Basis |
|------|---------|--------------|
| Academy name, contact email, authorised administrator details | B2B account management | Contract |
| Cadet roster (provided by Academy operator) | Seat provisioning; dashboard | Contract (with Academy as separate data controller for cadet data — see §9) |
| Academy usage analytics (aggregate) | Service reporting; weekly dashboard | Contract |

### 3.6 Technical and Security Data

| Data | Purpose | Lawful Basis | Retention |
|------|---------|--------------|-----------|
| IP address, browser/device type, OS | Security; abuse prevention; server logs | Legitimate interest | 30 days |
| Session token (a signed JSON Web Token held in an HttpOnly cookie, issued by our own backend) | Session management | Contract | Session duration (up to 30 days) |
| Crash and error reports | Bug fixing; service reliability | Legitimate interest | 30 days |

### 3.7 Analytics

We use **Cloudflare Web Analytics** for site-wide usage statistics. This tool is privacy-first and cookieless: it does not set tracking cookies, does not fingerprint your device, does not identify you personally, and does not track you across other websites. It records only aggregate, anonymous data (page views, referral source, broad geographic region). No personal data is processed through this tool.

We do not use Google Analytics or any advertising analytics platform. [Note for lawyer / owner: the analytics description in this section could not be reconciled against the shipped platform and must be confirmed before publication — the sentence describing Firebase Analytics has been removed because there is no Firebase in the platform, but what (if anything) replaces it for in-app behaviour has not been settled.]

### 3.8 Communications and Waitlist

| Data | Purpose | Lawful Basis |
|------|---------|--------------|
| Email address (waitlist) | Notify you when Captain Adel / a feature becomes available | Consent |
| Email address (marketing opt-in) | Product news, updates | Consent |
| Support ticket content | Resolving your request | Contract / Legitimate interest |

---

## 4. Lawful Bases Under Saudi PDPL

The PDPL (Art. 6) requires that processing of personal data rests on a lawful basis. We process personal data on the following bases:

| Basis | When we rely on it |
|-------|--------------------|
| **Contract** | Delivering the Platform, managing your account, processing payment, providing Captain Adel |
| **Legal obligation** | ZATCA VAT records (7-year retention); SDAIA regulatory requirements; lawful authority requests |
| **Legitimate interest** | Platform security; fraud prevention; abuse detection; product analytics (aggregate, privacy-minimal) — in each case balanced against your interests |
| **Consent** | Marketing communications; optional analytics opt-in; waitlist; optional profile data (display name, GACA licence number) |

You may withdraw consent at any time without affecting the lawfulness of processing before withdrawal. To withdraw consent or manage preferences: privacy@flygaca.com or in-app account settings.

---

## 5. How We Store and Protect Your Data

### 5.1 Location — KSA-First Infrastructure

Personal data is stored **within the Kingdom of Saudi Arabia**:

- **Google Cloud SQL (PostgreSQL)** — `me-central2` region (Dammam, KSA): all primary data storage, AI query logs, user accounts
- **Google Cloud Run** — `me-central2` (Dammam, KSA): the application and API, including the Captain Adel gateway
- **Google Cloud Storage** — static assets (no personal data), served behind an HTTPS load balancer
- **Google Gemini (via Genkit)** — AI inference for Captain Adel [Note for lawyer / owner: inference runs against the Google Gemini API with an API key, **not** on our own `me-central2` infrastructure. The processing region for that inference has not been confirmed and this notice must not be published claiming in-Kingdom AI inference until it is.]
- **Moyasar** — KSA-registered payment processor: payment data stays in KSA

We designed the platform so that personal data stays inside the Kingdom. Any processing outside the Kingdom is limited to technical infrastructure that processes only public, non-personal data (e.g., Cloudflare CDN for static assets).

### 5.2 Security Measures

- All data in transit is encrypted (TLS 1.2+)
- All data at rest is encrypted (AES-256 via Google Cloud)
- Server-side authorisation restricts each user's data to their own authenticated session — every request is checked against the session token before any record is returned, and you cannot access another user's data
- Admin access is restricted to the founder via Identity-Aware Proxy (IAP) and two-factor authentication
- Payment card data is never transmitted to or stored by Fly GACA — Moyasar handles all card processing under PCI-DSS
- We conduct periodic security reviews; penetration testing is planned before Series A

Despite these measures, no online service is 100% secure. In the event of a breach likely to cause serious harm, we will notify SDAIA within 72 hours (PDPL Art. 20) and affected users without undue delay.

---

## 6. How Long We Keep Your Data

| Data type | Retention period | Basis |
|-----------|-----------------|-------|
| Account data (name, email, settings) | Life of account + 1 year after deletion | Contract / Legitimate interest |
| GACA licence number | Life of account | Contract / Consent |
| Captain Adel chat queries and responses | 90 days rolling | Contract / Legitimate interest |
| Exam scores and progress data | Life of account + 2 years | Contract |
| Payment transaction records | 7 years from invoice date | Legal obligation (ZATCA) |
| Server/security logs | 30 days | Legitimate interest |
| Waitlist email | Until launch notification sent, or until deletion requested | Consent |
| Marketing opt-in | Until consent withdrawn | Consent |

When your account is deleted, all personal data linked to it is permanently deleted from active systems. Anonymised aggregate data (e.g., platform usage statistics with no link to any individual) may be retained indefinitely. Transactional records required for tax are retained for the legal period.

---

## 7. Sharing Your Data

We do **not** sell your personal data. We do **not** share it for advertising or marketing by third parties.

We share data only with:

| Recipient | Purpose | Location | Legal basis |
|-----------|---------|----------|-------------|
| **Google Cloud** (Cloud Run, Cloud SQL, Cloud Storage) | Hosting, authentication, database | KSA (me-central2, Dammam) | Contract (processor); Google DPA signed |
| **Google Gemini** (via Genkit) | AI inference for Captain Adel | [region to be confirmed — see §5.1] | Contract (processor); [confirm which Google terms / DPA cover the Gemini API — the Google Cloud DPA above may not] |
| **Moyasar** | Payment processing | KSA | Contract (processor); Moyasar DPA in place |
| **Cloudflare** | CDN, Web Analytics (aggregate, cookieless only — no personal data) | Global (static assets only; analytics = no PII) | Legitimate interest |
| **Academy operators** (B2B only) | Academy operators can view usage data for their own provisioned cadets only | KSA | Contract (see §9) |
| **Competent KSA authorities** | Where required by Saudi law, court order, or regulatory request | KSA | Legal obligation |

Any future sub-processor (e.g., analytics, customer support) will be added to our sub-processor register and to this notice before onboarding, and must meet KSA data-residency requirements or SDAIA-recognised standards.

---

## 8. Cookies and Tracking

### What we use

| Technology | Purpose | Personal data? | Consent required? |
|-----------|---------|---------------|------------------|
| **Fly GACA session token** (a signed JSON Web Token in an HttpOnly cookie) | Keep you logged in to your account | Yes (session identity) | Not required — essential to service |
| **Language preference** (localStorage) | Remember your EN/AR choice | No | Not required — functional |
| **Cloudflare Web Analytics** | Aggregate site usage (cookieless, no fingerprinting) | No | Not required |

We do **not** use:
- Advertising or retargeting cookies
- Cross-site tracking pixels or beacons
- Google Analytics or Facebook Pixel
- Any third-party analytics that processes personal data

**If we introduce any new cookie or tracking technology**, we will update this notice and, where required by PDPL, obtain your prior consent via a clear consent mechanism before that technology is deployed.

---

## 9. Academy Accounts — Separate Data-Controller Notice

If you are an **Academy operator** (flight school, training organisation) using the Fly GACA Academy tier:

- You are the **data controller** for personal data of your cadets (names, GACA student numbers, exam records).
- Fly GACA is the **data processor** processing that data on your behalf.
- Before provisioning cadet seats, Academy operators must sign a **Data Processing Agreement (DPA)** with Fly GACA. The DPA sets out processing instructions, security obligations, breach notification, and data-subject rights assistance.
- Academy operators are responsible for providing their cadets with appropriate privacy notices about the use of Fly GACA.

If you are a **cadet** whose Academy has provisioned a Fly GACA account for you, your Academy is the primary contact for data-rights requests. You may also contact us directly at privacy@flygaca.com.

---

## 10. Your Rights Under the PDPL

Under the Saudi Personal Data Protection Law (PDPL), you have the following rights:

| Right | What it means | How to exercise |
|-------|--------------|-----------------|
| **Right to be informed** | Know what data we hold and why | This notice |
| **Right of access** | Receive a copy of your personal data | privacy@flygaca.com — we respond within 30 days |
| **Right to rectification** | Correct inaccurate data | In-app settings, or email privacy@flygaca.com |
| **Right to erasure** | Request deletion of your data | Account deletion in Settings (wipes all PII) or email privacy@flygaca.com |
| **Right to restriction** | Ask us to pause processing while a dispute is resolved | privacy@flygaca.com |
| **Right to data portability** | Receive your data in a structured, machine-readable format | privacy@flygaca.com — JSON export within 30 days |
| **Right to object** | Object to processing based on legitimate interest | privacy@flygaca.com |
| **Right regarding automated decisions** | Request human review of any Captain Adel assessment | privacy@flygaca.com — human review available on request |
| **Right to withdraw consent** | Withdraw consent at any time | In-app settings or privacy@flygaca.com |

**Response time:** We will acknowledge rights requests within 5 business days and fulfil them within 30 calendar days (PDPL Art. 7–12). Complex requests may take up to 60 days; we will notify you if this applies.

**Complaints:** If you are dissatisfied with our response, you have the right to lodge a complaint with **SDAIA** (the Saudi Data & AI Authority), the KSA supervisory authority for PDPL: [sdaia.gov.sa](https://sdaia.gov.sa).

---

## 11. Children

The Fly GACA platform is designed for pilots, cadets, flight instructors, and aviation professionals. We do not knowingly collect personal data from individuals under the age of 18 (or any higher age of majority applicable under KSA law for specific data types). If you believe a minor's data has been submitted to us without appropriate consent, contact privacy@flygaca.com and we will delete it promptly.

---

## 12. Changes to This Notice

We will update this notice as the platform develops (for example, when new features, AI capabilities, or sub-processors are added). Material changes will be notified:

- For **account holders**: by email to the address on your account at least 14 days before the change takes effect
- For **anonymous visitors**: by updating this notice and posting a change notice on the website

The "Version" at the top of this notice and the changelog below record each revision. Continued use of the platform after a notified change constitutes acceptance.

### Changelog

| Version | Date | Summary of changes |
|---------|------|--------------------|
| Draft 1.0 | 2026-06-14 | Initial full-stage draft for legal review. Covers accounts, AI, Academy tier, B2B DPA requirement. Replaces pre-account draft in `privacy.html`. |

---

## 13. Contact Us

For any question about this notice, to exercise your data rights, or to report a concern:

**Data Protection contact:** privacy@flygaca.com  
**General contact:** i@flygaca.com  
**Website:** [flygaca.com](https://flygaca.com)  
**Postal / registered address:** [to be confirmed upon entity incorporation — KSA]

---

*Draft 1.0 — 2026-06-14. This document must be reviewed by a qualified Saudi-licensed lawyer specialising in PDPL and KSA data protection before publication. It is a business working draft only and does not constitute legal advice.*
