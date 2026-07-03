---
title: Original User Request
section: 00-strategy
doc_type: document
status: active
owner: Founder
last_updated: 2026-06-16
lang: en
---

# Original User Request

## Initial Request — 2026-06-06T11:27:26Z

An AI-powered sales enablement multi-agent system simulating FlyGACA pre-sales roles (Enrollment Advisor, Chief Flight Instructor, and B2B Account Owner) to qualify prospects, handle objections, and draft proposal documents based on the playbooks in the repository.

Working directory: /Users/flygaca/teamwork_projects/sales_agents
Integrity mode: development

## Requirements

### R1. Persona and Playbook Definition
Implement three distinct agent roles with custom system prompts and knowledge integration:
- **Enrollment Advisor**: Focuses on lead qualification, initial interest, pricing questions, and objection handling using the playbook guidelines.
- **Chief Flight Instructor (CFI)**: Focuses on technical flight training details, GACA regulatory references, and syllabus structures.
- **B2B / Corporate Account Owner**: Focuses on structuring proposal responses and handling institutional inquiries.
All agents must leverage the relevant playbook documents in `docs/` and root documentation (like `README.md` and `customer-success.md`) for factual alignment.

### R2. Orchestration and Routing
Create an intelligent routing gateway that analyzes incoming prospect inquiries, decides which agent(s) should formulate the response, and merges their outputs if multi-disciplinary expertise is required (e.g., a query asking about both pricing and training schedules).

### R3. Interactive Interface
Provide a simple interface (e.g., a lightweight command-line interactive loop or a simple local web page) allowing a user to simulate conversations with the agents and trigger RFP proposal generation.

### R4. Automated Verification Harness
Provide an automated test runner script that runs a suite of at least 10 pre-defined test cases (prospect queries of varying intent) and evaluates:
1. Routing accuracy (did the right agent handle the query?).
2. Factuality and policy compliance (no hallucinated pricing, proper regulatory deferral, no affiliation with official GACA).
The runner should output a structured JSON report summarizing the evaluation results.

## Acceptance Criteria

### Interaction & Execution
- [ ] The routing gateway successfully delegates to the correct agent(s) based on the input query's intent.
- [ ] The enrollment advisor agent handles objection scenarios (e.g., cost, duration) exactly in accordance with the objection playbooks.
- [ ] The CFI agent correctly refers to GACA rules and refuses to substitute for a POH/AFM.

### Verification & Testing
- [ ] Running the test script executes all test cases and generates a validation report.
- [ ] The test suite includes at least one scenario for each of the three agent roles.
