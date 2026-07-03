---
title: "Project: Fly GACA Sales Enablement Multi-Agent System"
section: 00-strategy
doc_type: document
status: active
owner: Founder
last_updated: 2026-07-03
lang: en
---

# Project: Fly GACA Sales Enablement Multi-Agent System

## Architecture
The system is implemented as a modular Python package `sales_agents/` utilizing the `google-genai` SDK for LLM interactions. It contains:
- Specialized agents grounded in pre-sales playbooks.
- A routing gateway to analyze queries, delegate to agents, and blend responses.
- A command-line interface for interactive simulations.
- A test runner to execute and evaluate predefined queries.

## Milestones
| # | Name | Scope | Dependencies | Status | Conv ID |
|---|------|-------|-------------|--------|---------|
| 1 | E2E Testing Track | Define test suite and runner, publish test-ready.md | None | DONE | 63c8ee12-cacf-4115-95c1-40fe70792733 |
| 2 | Codebase Setup & Personas | Create directories, shared config, grounding, agent prompts | None | DONE | df0ac967-6ffb-4e7d-9d56-2da85374601d |
| 3 | Routing Gateway | Classify queries, route to agents, blend responses, inject disclaimers | M2 | IN_PROGRESS | df0ac967-6ffb-4e7d-9d56-2da85374601d |
| 4 | Interactive CLI | Simulate conversational query processing and RFP document generation | M3 | PLANNED | TBD |
| 5 | E2E Test Pass | Run test runner against routing gateway, pass 100% tests | M1, M4 | PLANNED | TBD |
| 6 | Forensic Audit & Hardening | White-box testing, Challenger gaps, Auditor check | M5 | PLANNED | TBD |

## Interface Contracts
### Routing Gateway
- `RoutingGateway.process_and_combine(query: str, history: list = None) -> dict`
  - Returns: `{"routing": list, "response": str, "classification_reason": str}`
- `RoutingGateway.classify_query(query: str) -> dict`
  - Returns: `{"agents": list, "reasoning": str, "is_b2b": bool, "is_regulatory": bool}`

## Code Layout
- `sales_agents/config.py`: Shared LLM configs and client initialization.
- `sales_agents/agents/base_agent.py`: Base agent class.
- `sales_agents/agents/enrollment.py`: Enrollment Advisor (qualification, objections).
- `sales_agents/agents/cfi.py`: Chief Flight Instructor (regulatory reference).
- `sales_agents/agents/b2b_owner.py`: B2B Account Owner (RFP proposal).
- `sales_agents/routing/gateway.py`: Routing Gateway.
- `sales_agents/cli/interactive.py`: CLI simulation interface.
- `sales_agents/main.py`: Interactive CLI entry point.
- `sales_agents/tests/test_cases.json`: Defined scenarios.
- `sales_agents/tests/test_runner.py`: Verification script.
