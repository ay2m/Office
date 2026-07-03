# At-Risk / Churn Prevention Playbook

## Purpose

This playbook defines how the FlyGACA Customer Success team detects, triages,
and recovers accounts showing churn risk. The goal is to keep churn **< 5%**
and convert at-risk accounts back to a Healthy health band.

It is triggered automatically whenever a customer's composite health score
falls into the **At-Risk** band (0–59) per
[`docs/customer-health-scoring.md`](customer-health-scoring.md), or when any
early-warning signal below is observed.

## Early-Warning Signals

| Signal | Source | Severity |
|--------|--------|----------|
| Login frequency down > 30% quarter-over-quarter | Product usage | High |
| Key champion or accountable manager departs | CRM / engagement | High |
| Missed a GACA compliance deadline while on the platform | Compliance module | Critical |
| Two or more severity-1 support tickets in a month | Support | High |
| NPS detractor (0–6) or CSAT drop | Sentiment | Medium |
| Adoption rate falls below 80% of licensed seats | Product usage | Medium |
| Invoice > 30 days past due | Financial | Medium |

## Risk Segmentation

| Tier | Definition | Owner | Response SLA |
|------|------------|-------|--------------|
| Critical | Health < 40, or compliance deadline missed | CSM + CS Lead | < 2 hours |
| High | Health 40–59, or champion departure | Assigned CSM | < 1 business day |
| Watch | Neutral band (60–79) drifting down | Assigned CSM | < 3 business days |

## Intervention Strategies

1. **Diagnose** — review the health-score breakdown to find the weakest
   dimension(s); pull usage, support, and sentiment history before reaching out.
2. **Reconnect** — schedule a call with the accountable manager / compliance
   officer; acknowledge the issue directly.
3. **Re-anchor on value** — restate the compliance and audit-readiness outcomes
   the customer originally bought (avoided findings, audit prep time saved).
4. **Remove blockers** — escalate open severity-1 tickets, schedule refresher
   training, fix adoption gaps on core modules.
5. **Commit to a recovery plan** — document specific actions, owners, and dates;
   set a follow-up health-score review in 30 days.

## Save Campaigns

- **Adoption rescue:** targeted enablement for accounts whose `usage` dimension
  is the weakest — re-onboard new users, run a compliance-tracking workshop.
- **Executive bridge:** for champion loss, secure a new executive sponsor and
  re-map stakeholders (accountable manager, safety manager, compliance officer).
- **Compliance assurance:** for missed-deadline risk, run a deadline audit and
  configure proactive reminders so no future GACA obligation is missed.

## Win-Back Program

For accounts that have churned:
- Conduct an exit interview within 2 weeks of departure.
- Tag the root cause and add the account to a 90-day nurture sequence.
- Re-engage when the original blocker is resolved (e.g., new pricing tier, new
  feature, regulatory change) with a tailored return offer.

## Exit Interviews & Root-Cause Analysis

- Run a structured exit interview for every churn (voluntary or non-renewal).
- Classify root cause: value, adoption, support, price, product gap, or
  champion/sponsor change.
- Feed themes into the monthly CS review and the product feedback loop; update
  this playbook's prevention steps when a recurring cause emerges.

## Success Metrics

| Metric | Target |
|--------|--------|
| Gross churn rate | < 5% |
| At-risk accounts recovered to Neutral+ within 90 days | > 60% |
| First response time on Critical risk | < 2 hours |
| Save-campaign success rate | > 50% |

## Related

- [Customer Health Scoring](customer-health-scoring.md)
- [Renewal Playbook](renewal-playbook.md)
- [Voice of Customer](voice-of-customer.md)
