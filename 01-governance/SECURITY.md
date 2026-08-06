---
title: Security Policy
section: 01-governance
doc_type: document
status: active
owner: Founder
last_updated: 2026-08-05
lang: en
---

# Security Policy

This repository ("The Office") holds Fly GACA's internal operating documents —
strategy, governance, legal, finance, HR, and investor material. It ships no
software, so "security" here is about the **confidentiality and access control of
sensitive material**, not software vulnerabilities.

## Scope

- **This repository:** report anything that exposes sensitive contents or weakens
  access isolation — a file that leaks a secret, an over-broad share link, a
  document that should not have been committed, or a misconfigured permission.
- **Product code lives elsewhere.** Vulnerabilities in Fly GACA's software belong
  in their own repositories — `FlyGACA/FlyGACA-app` (web app + backend),
  `FlyGACA/Captain-Adel` (AI service), and `ay2m/FlyGACA` (iOS apps). Report those
  through the security policy of the repository concerned.

## Reporting a concern

Do **not** open a public issue or pull request — that would disclose the problem
before it can be addressed. Instead, email the maintainer privately:

**ay2m@hotmail.com**

Please include:

- what the concern is and where it is (repository path, share link, or document),
- why you believe it is sensitive or exposed, and
- any steps to reproduce or confirm it.

Do not paste the sensitive contents themselves into the email — a path or short
description is enough to locate the material.

You can expect an acknowledgement within a few business days. If the concern is
confirmed, the exposed material is removed or its access corrected and — where a
secret was involved — the credential is rotated. We will keep you informed of the
outcome.
