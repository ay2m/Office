---
title: Fly GACA — B2B Data Processing Agreement (DPA)
section: 02-legal
doc_type: legal
status: draft
owner: Founder
last_updated: 2026-08-20
lang: en
---

# Fly GACA — B2B Data Processing Agreement (DPA)
**Document:** b2b-data-processing-agreement-draft-2026-06-14.md
**Version:** Draft 1.0 — 2026-06-14
**Status:** DRAFT — requires review by a qualified Saudi-licensed lawyer before use.
**Purpose:** Governs the processing of personal data by Fly GACA (as Processor) on behalf of Academy Operators (as Controllers) under the Personal Data Protection Law of the Kingdom of Saudi Arabia.
**Contact:** legal@flygaca.com

---

> **DRAFT — requires review by a qualified Saudi-licensed lawyer before use.**
>
> This document is a working draft prepared by an AI assistant. It is NOT legal advice. It must be reviewed by a Saudi-licensed lawyer before execution or reliance.
>
> Key review points: (1) Whether PDPL Articles 18–23 (processor obligations) are correctly characterised in this DPA; (2) Whether the sub-processor approval mechanism is consistent with PDPL requirements; (3) Whether the data deletion timelines are appropriate under PDPL Art. 17; (4) Whether this DPA, read together with the Customer Agreement & EULA, creates an adequate contractual chain for PDPL compliance; (5) Whether a joint-controller scenario (rather than controller-processor) arises for any data category. Counsel should advise whether an Arabic version is required for enforceability.

---

## DATA PROCESSING AGREEMENT

**Between:**

**[ACADEMY OPERATOR NAME]** (the "**Controller**")
[Legal entity type, registered address, registration number]

and

**BDA Company International (شركة بدع الدولية), operating as Fly GACA** (the "**Processor**")
Operating at: flygaca.com | Kingdom of Saudi Arabia

---

## Recitals

A. The Controller is a flight school, aviation training academy, or other educational institution that has entered into the Fly GACA Customer Agreement & EULA (the "**Main Agreement**") for the Academy tier of the Fly GACA platform ("**Platform**").

B. In the course of delivering the services under the Main Agreement, the Processor will process Personal Data relating to the Controller's enrolled cadets, students, instructors, and other personnel on behalf of and under the instructions of the Controller.

C. The parties wish to set out the terms on which such processing will take place, in accordance with the Personal Data Protection Law of the Kingdom of Saudi Arabia (Royal Decree M/19, 1443H / 2021, as amended, the "**PDPL**") and its Implementing Regulations issued by the Saudi Data & Artificial Intelligence Authority ("**SDAIA**").

D. This DPA is entered into as a schedule to and forms part of the Main Agreement. In the event of conflict between this DPA and the Main Agreement on a data protection matter, this DPA prevails.

---

## Part 1 — Definitions

In this DPA:

**"Personal Data"** has the meaning given in the PDPL: any data, whatever the source or form, that leads to identifying a specific individual or makes it possible to identify them, directly or indirectly, including name, personal identification number, addresses, contact numbers, and other personal, physical, physiological, economic, cultural, and social data.

**"Sensitive Personal Data"** has the meaning given in the PDPL, including health data, biometric data, and other categories designated as sensitive by SDAIA regulations.

**"Processing"** means any operation or set of operations performed on Personal Data, whether automatically or manually, including collection, recording, storage, retrieval, use, disclosure, transfer, deletion, or destruction.

**"Data Subject"** means an identifiable natural person whose Personal Data is processed.

**"PDPL"** means the Personal Data Protection Law of the Kingdom of Saudi Arabia (Royal Decree M/19, 1443H / 2021) and its Implementing Regulations, as amended from time to time.

**"Sub-Processor"** means any third-party processor engaged by the Processor to carry out Processing activities in respect of the Controller's Personal Data.

**"Security Incident"** means any breach of security leading to accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to, Personal Data.

---

## Part 2 — Processing Details

### 2.1 Subject Matter

The Processor provides an educational platform (Fly GACA) including a regulatory library, AI study assistant (Captain Adel), and Academy dashboard. In doing so, it processes Personal Data about the Controller's enrolled cadets and users.

### 2.2 Nature, Purpose, and Lawful Basis of Processing

| Activity | Nature of Processing | Purpose | Processor's Lawful Basis |
|----------|---------------------|---------|--------------------------|
| Cadet account provisioning | Collection, storage, use | Creating and managing cadet access to the Platform | Performance of contract with Controller (PDPL Art. 6) |
| Study progress tracking | Collection, storage, use, analysis | Enabling cadets to track progress; enabling academy to view cohort progress | Performance of contract (PDPL Art. 6) |
| Exam and assessment results | Collection, storage, use | Delivering and recording mock exam results | Performance of contract (PDPL Art. 6) |
| Captain Adel AI chat logs (where enabled) | Collection, storage, processing | Generating AI responses; quality improvement; audit trail | Performance of contract / Legitimate interest (PDPL Art. 6) — [counsel: confirm appropriate basis] |
| GACA licence numbers (where provided) | Collection, storage, display | Licence verification display and progress tracking | Consent of data subject (PDPL Art. 8) / Performance of contract |
| Usage analytics (aggregate) | Anonymisation, analysis | Platform quality improvement | Legitimate interest — aggregated and anonymised, no individual-level tracking |

### 2.3 Categories of Personal Data

The Processor will process the following categories of Personal Data on behalf of the Controller:

- **Identity data:** Full name, display name, profile image (optional)
- **Contact data:** Email address
- **Authentication data:** Password (stored only as a secure hash — scrypt — in the Fly GACA database; Fly GACA does not access plaintext passwords)
- **GACA licence / student number** (where provided by the cadet or provisioned by the Controller)
- **Academic data:** Study progress, module completion, mock examination scores, performance reports
- **Usage data:** Login timestamps, feature usage patterns, Captain Adel AI query logs (where the Academy tier includes AI access)
- **Device / technical data:** IP address (processed by Cloudflare, not retained by Fly GACA at individual level), device type, browser (aggregate analytics only — cookieless)

No Sensitive Personal Data within the PDPL definition is expected to be processed in the normal course of the services. If the Controller intends to provision Sensitive Personal Data through the Platform, it must notify the Processor in advance and obtain prior written approval.

### 2.4 Categories of Data Subjects

- Enrolled cadets and student pilots registered under the Controller's Academy account
- Flight instructors and Academy staff provisioned by the Controller as users
- Other personnel with access provisioned by the Controller

### 2.5 Duration

Processing will continue for the term of the Main Agreement. On expiry or termination of the Main Agreement, the Processor will delete or return Personal Data in accordance with Part 7 of this DPA.

---

## Part 3 — Processor Obligations

The Processor agrees that:

### 3.1 Documented Instructions

It will process Personal Data only on the documented instructions of the Controller, as set out in this DPA and the Main Agreement. If the Processor is required by Saudi law to process Personal Data in a way not covered by the Controller's instructions, it will notify the Controller (unless prohibited by law).

### 3.2 Confidentiality

It will ensure that persons authorised to process Personal Data are subject to binding confidentiality obligations.

### 3.3 Security

It will implement and maintain appropriate technical and organisational security measures, commensurate with the risks of the processing, including:
- Data encryption in transit (TLS 1.2+) and at rest
- First-party session authentication (a signed JSON Web Token in an HttpOnly cookie) for access control
- Role-based access controls for Academy dashboard features
- Cloudflare-level DDoS and perimeter protection
- Incident detection, logging, and response capability
- Regular review of security measures in line with the Fly GACA Information Security Policy (04-compliance-ksa/)

### 3.4 Sub-Processors

See Part 5 (Sub-Processors).

### 3.5 Data Subject Rights

It will promptly notify the Controller (and in any event within 5 business days) if a Data Subject contacts the Processor directly to exercise rights under the PDPL (access, correction, deletion, restriction, portability, objection). The Processor will provide reasonable assistance to the Controller to fulfil such requests. Where data is exclusively within the Processor's systems, the Processor will action valid Data Subject requests within timelines required by PDPL, subject to the Controller's prior authorisation.

### 3.6 Security Incidents

See Part 6 (Security Incidents and Notification).

### 3.7 Data Protection Impact Assessments

Where the Processor's processing activities would require a Data Protection Impact Assessment (DPIA) under PDPL (or guidance issued by SDAIA), the Processor will provide reasonable assistance to the Controller.

### 3.8 Audits

The Processor will, on reasonable written notice (not less than 20 business days) and no more than once per 12-month period, make available to the Controller information necessary to demonstrate compliance with this DPA. The Processor may satisfy this obligation by providing a summary compliance report, security certifications, or relevant third-party audit reports rather than providing direct access to its systems.

---

## Part 4 — Controller Obligations

The Controller agrees that:

### 4.1 Lawful Basis

It has identified and documented a lawful basis under the PDPL for each category of Personal Data it directs the Processor to process.

### 4.2 Data Subject Notification

It has provided its cadets and other Data Subjects with adequate notice under PDPL Art. 11 regarding the Processing described in this DPA, including the fact that Fly GACA is a processor of their data.

### 4.3 Accuracy

The Personal Data it provides to the Processor is, to the best of its knowledge, accurate. It will notify the Processor of any material inaccuracies promptly.

### 4.4 Instructions

It will issue lawful processing instructions only. It will not instruct the Processor to process Personal Data in a way that violates the PDPL, any applicable KSA law, or any data subject's rights.

---

## Part 5 — Sub-Processors

### 5.1 Current Sub-Processors

> ⚠️ **EXECUTION BLOCKER — the Data Location column must state the deployed reality.**
>
> An earlier draft of this schedule listed `me-central2` (Dammam, Kingdom of Saudi Arabia) as the Google Cloud data location. **That is the target architecture, not what is deployed.** Verified against the live Google Cloud project on **2026-08-19**: the application and API run as Cloud Run services in **`me-central1` (Doha, Qatar)** and the Cloud SQL (PostgreSQL) database is in **`us-east4` (Northern Virginia, United States)**; a second Cloud SQL instance sits in **`me-west1` (Tel Aviv)**. The `me-central2` region has **not been granted** to our Google Cloud account, so the migration is blocked pending that grant. **Personal Data is not resident in the Kingdom today.** The table below states the as-built locations; do not execute a DPA carrying the in-Kingdom claim.

The Controller provides general written authorisation for the Processor to engage the following Sub-Processors, who process Personal Data under the Processor's responsibility:

| Sub-Processor | Registered Entity | Processing Activity | Data Location (as built, verified 2026-08-19) |
|--------------|-------------------|---------------------|---------------|
| Google LLC (Google Cloud Platform) | Google LLC, USA | Application hosting (Cloud Run), database (Cloud SQL — PostgreSQL), static asset storage (Cloud Storage) | **`me-central1` (Doha, Qatar)** — application and API; **`us-east4` (Northern Virginia, USA)** — primary database; **`me-west1` (Tel Aviv)** — secondary database instance. *Target on completion of the planned migration: `me-central2` (Dammam, Kingdom of Saudi Arabia) — not deployed, blocked on a Google region grant.* |
| Google LLC (Google Gemini, via Genkit) | Google LLC, USA | AI inference for the Captain Adel study assistant | [Note for lawyer: inference runs against the Google Gemini API and **not** on the Google Cloud infrastructure listed in the row above. The processing region must be confirmed before this DPA is executed, because PDPL Art. 29 cross-border transfer rules turn on it — as they now also do for the application and database rows above] |
| Cloudflare, Inc. | Cloudflare, Inc., USA | CDN, security, DDoS protection, cookieless analytics | Distributed — processed at edge closest to user |
| Moyasar Financial Company | Saudi Arabia | Payment processing (subscription billing) | Kingdom of Saudi Arabia |

The complete and current Sub-Processor list is maintained in the Fly GACA Sub-Processor Register (04-compliance-ksa/sub-processor-list-and-dpa-register.docx) and available to the Controller on request.

### 5.2 Changes to Sub-Processors

The Processor will give the Controller at least 30 days' written notice before engaging a new Sub-Processor that will have access to Personal Data covered by this DPA. If the Controller objects to a new Sub-Processor on reasonable data protection grounds, the parties will seek in good faith to resolve the objection. If it cannot be resolved, the Controller may terminate the Main Agreement without penalty on 30 days' written notice.

### 5.3 Sub-Processor Obligations

The Processor will impose equivalent data protection obligations on all Sub-Processors, by contract, and will remain responsible for Sub-Processor compliance.

---

## Part 6 — Security Incidents and Notification

### 6.1 Notification to Controller

The Processor will notify the Controller without undue delay, and in any event within **48 hours** of becoming aware of a Security Incident involving the Controller's Personal Data. Notification will include (to the extent known at the time):
- Description of the nature of the Security Incident
- Categories and approximate number of Personal Data records affected
- Categories and approximate number of Data Subjects affected
- Contact details of the Fly GACA data protection contact
- Likely consequences of the incident
- Measures taken or proposed to address the incident and mitigate its effects

Initial notification may be provided before all information is available; the Processor will provide updates as further information becomes known.

### 6.2 SDAIA Notification

The Controller is responsible for notifying SDAIA under PDPL Art. 20 (72-hour notification obligation) where required. The Processor will provide all reasonable assistance to the Controller in fulfilling this obligation. See also the Fly GACA PDPL Breach Notification Procedure (02-legal/pdpl-breach-notification-procedure-draft-2026-06-14.md).

### 6.3 Processor's Own Notification Obligation

Where the Processor independently determines that PDPL Art. 20 requires it to notify SDAIA directly (e.g., as to its own processing), it will do so and promptly inform the Controller.

---

## Part 7 — Data Deletion and Return

### 7.1 On Termination

On termination or expiry of the Main Agreement, the Processor will, at the Controller's election:
- **Delete** all Personal Data in its systems within 30 days of termination, and provide written confirmation of deletion; or
- **Return** Personal Data to the Controller in a machine-readable format (CSV export) within 30 days, after which it will delete all copies

### 7.2 Retained Copies

The Processor may retain minimum Personal Data for the period required by applicable KSA law (including ZATCA record-keeping requirements for financial records). Such retained data will be processed only as required by law and will be deleted once the legal retention period expires.

### 7.3 Backup Systems

The Processor will take reasonable steps to delete Personal Data from backup systems within its standard backup rotation cycle (typically 30–90 days).

---

## Part 8 — Cross-Border Transfers

### 8.1 Transfer Mechanism

Personal Data subject to this DPA may be processed by Sub-Processors outside the Kingdom of Saudi Arabia. The Processor confirms that such transfers are made only:
- To countries or entities recognised by SDAIA as providing an adequate level of data protection; or
- Subject to appropriate safeguards required by the PDPL cross-border transfer rules and SDAIA Implementing Regulations

[Note for lawyer: SDAIA's cross-border transfer implementing regulations and any approved adequacy decisions should be checked and the mechanism specified precisely. **The set of processing that occurs outside the Kingdom is materially larger than an earlier draft of this note assumed.** As built and verified 2026-08-19, it includes the core platform itself: the Cloud Run application and API in `me-central1` (Doha, Qatar) and the Cloud SQL database in `us-east4` (Northern Virginia, USA), alongside Google Gemini AI inference and Cloudflare edge processing. The `me-central2` (Dammam, KSA) placement described elsewhere in our documentation is the target architecture and is not deployed. Counsel should advise on the transfer mechanism for **all** of it, on the same footing.]

### 8.2 Data Residency

The Processor will implement KSA-based data residency for Personal Data where required by applicable PDPL Implementing Regulations, and will notify the Controller of the data storage region upon request.

[Note for lawyer / owner — flagged, clause left unchanged: this clause is drafted as a forward obligation, and the Processor does **not** meet KSA data residency today (see §5.1 — application in Qatar, database in the United States). Whether this DPA can be executed as drafted, and what the Processor must disclose to a Controller at signature about the current storage region, is a legal question that has not been answered. Correcting the factual schedule in §5.1 does not by itself resolve it; do not execute a DPA against this clause without counsel's view.]

---

## Part 9 — Liability

Liability of the parties under this DPA is governed by the liability provisions of the Main Agreement, as supplemented by this clause:

(a) Each party is liable for any damage caused by its own breach of PDPL obligations, as applicable.
(b) The Processor's aggregate liability to the Controller under this DPA shall not exceed the total fees paid by the Controller under the Main Agreement in the 12 months preceding the claim. This cap does not apply to liability for wilful misconduct or fraud.

---

## Part 10 — General

### 10.1 Governing Law

This DPA is governed by the laws of the Kingdom of Saudi Arabia.

### 10.2 Conflict

In the event of conflict between this DPA and the Main Agreement on data protection matters, this DPA prevails. On commercial matters, the Main Agreement prevails.

### 10.3 Amendments

This DPA may be amended only by written agreement signed by both parties.

### 10.4 Term

This DPA is effective from the date of signature and continues until termination of the Main Agreement.

---

## Signatures

**[ACADEMY OPERATOR NAME]** (Controller)

Signed: ___________________________
Name: ___________________________
Title: ___________________________
Date: ___________________________

**BDA Company International (شركة بدع الدولية), operating as Fly GACA** (Processor)

Signed: ___________________________
Name: Adel Yahya A. Madkhali
Title: Founder & Operator
Date: ___________________________

---

## Schedule 1 — Processing Purpose Detail (to be completed per Academy)

*[This schedule should be completed for each Academy customer to capture any specific data categories, special processing instructions, or agreed deviations from the standard DPA.]*

---

*DRAFT 1.0 — 2026-06-14. Not published. Pending Saudi legal counsel review.*
