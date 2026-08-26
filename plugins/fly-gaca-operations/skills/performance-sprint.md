---
name: performance-sprint
description: On-demand performance analysis — bundle size, API latency, database query optimization across React, Express, PostgreSQL
---

# Performance-Sprint Workflow

**Orchestrator:** operations-orchestrator  
**Trigger:** Manual command `/perf-sprint` (recommended when p95 latency > 2s, bundle > 250KB, or after load test)  
**Duration target:** 90 minutes  
**Participants:** react-19-architect, express-backend-pro, sql-migrator

## Pre-flight checks

- [ ] All three repos accessible (Office, FlyGACA, Captain-Adel)
- [ ] MCP server running
- [ ] Load-test baseline data available (if analyzing regression)
- [ ] No ongoing security-hardening or compliance-audit workflows (perf-sprint can run in parallel with feature-ship)

## Workflow Steps

### Step 1: React Frontend Performance Analysis (react-19-architect)
**Duration:** 30 minutes

1. Analyze bundle size per route:
   - Run Vite bundle report (ask build tool to emit size report)
   - Identify largest chunks (React libraries, third-party, app code)
   - Measure lazy-loadable routes (pages that could be code-split)
   - Check for unused dependencies (tree-shake validation)
   - Gzip size vs. raw size comparison

2. Analyze React render performance:
   - Run React DevTools Profiler on key user flows (login, exam start, question navigation)
   - Identify slow renders (baseline: > 50ms is slow on modern hardware)
   - Check for unnecessary re-renders (components re-rendering on parent state change)
   - Identify render-blocking computations in render phase (should move to useMemo/useCallback)

3. Analyze React 19 patterns for efficiency:
   - Use Compiler recommendations where available (automatic memoization)
   - Check for components that could benefit from Suspense (code-split lazy boundary)
   - Verify no deprecated lifecycle methods (all on hooks)
   - Verify use of concurrent features when applicable

4. Check for performance anti-patterns:
   - Creating new objects/arrays in render (causes child re-renders)
   - Inline function definitions as event handlers (causes re-binding each render)
   - Large lists without virtualization (rendering 1000s of DOM nodes)
   - No debounce/throttle on high-frequency events (search input, scroll)

5. Generate recommendations:
   - Ranked by estimated impact (how much each fix would reduce bundle or latency)
   - Ranked by effort (1-point, 3-point, 5-point story estimate)

**Outcomes:**
- ✅ Bundle healthy (<250KB gzip), renders fast (<50ms p95), no obvious anti-patterns
- ⚠️ Bundle approaching limit or one slow render identified (e.g., exam questions lazy-load needed) — fix < 5 points
- ❌ Bundle bloated (>250KB gzip) or key render slow (>100ms p95) — blocker, needs immediate fix

### Step 2: Express Backend Performance Analysis (express-backend-pro)
**Duration:** 30 minutes

1. Analyze endpoint response times:
   - Collect response-time metrics: p50, p95, p99 latency per endpoint
   - Identify slow endpoints (baseline: p95 > 2s is slow)
   - Measure throughput: requests/second per endpoint under load

2. Detect database query inefficiencies:
   - Count queries per endpoint (N+1 detection: is endpoint making 10 queries when 1 would do?)
   - Identify queries without indexes (full table scans on large tables)
   - Identify missing JOINs (backend pulling data separately when it could JOIN in DB)
   - Measure query time: are slow queries in app logic or database?

3. Analyze memory and connection pool:
   - Check memory usage per request (baseline: < 50MB per concurrent connection)
   - Check database connection pool saturation (are connections exhausted during load?)
   - Check for memory leaks (does memory grow monotonically or plateau?)

4. Check for performance anti-patterns:
   - Synchronous blocking operations on hot path (don't await in loop; use Promise.all)
   - Unbounded queries (pagination missing, could fetch 1M rows instead of 100)
   - No caching of expensive computations (same computation repeated for same input)
   - Inefficient serialization (large JSON responses when subset would do)

5. Generate recommendations:
   - Query optimization: add index, rewrite JOIN, batch queries
   - Caching: cache expensive computation or database result (with TTL)
   - Pagination: limit results and add cursor/offset pagination
   - Connection pool tuning: increase max size if bottleneck detected

**Outcomes:**
- ✅ All endpoints < 2s p95, no N+1 queries, connection pool healthy
- ⚠️ One endpoint slow (e.g., exam results endpoint does N+1) or N+1 query identified — fix < 5 points
- ❌ Multiple slow endpoints or memory leak detected — blocker, needs immediate investigation

### Step 3: Database Query Performance Analysis (sql-migrator)
**Duration:** 20 minutes

1. Analyze slow query logs:
   - Fetch Cloud SQL slow query log (baseline: > 1 second execution time)
   - Identify full-table scans on large tables (learners, quiz_attempts, flight_hours)
   - Measure query time distribution (is one query 90% of slowness, or many?)

2. Check index coverage:
   - Verify indexes exist on hot query predicates (WHERE clauses)
   - Verify composite indexes exist when multiple columns filter (e.g., learner_id + quiz_id)
   - Identify missing indexes (query plan shows full scan when index would help)
   - Verify no unused indexes (add maintenance cost without benefit)

3. Analyze connection pool:
   - Check pool size vs. concurrent connections during peak load
   - Identify if pool exhaustion causes queueing (connections waiting for available slot)
   - Check for connection leaks (connections never returned to pool)

4. Check for schema inefficiencies:
   - Denormalization opportunities (is computation being done at app layer that schema could cache?)
   - Data type misalignment (are strings used for integers, causing slower comparisons?)
   - Partition strategy (is large table partitioned for faster range queries?)

5. Generate recommendations:
   - Ranked by query frequency impact (frequent slow query > rare slow query)
   - Ranked by fix effort (add index < denormalize < repartition)

**Outcomes:**
- ✅ No slow queries, indexes cover all hot paths, pool healthy
- ⚠️ One slow query identified (e.g., learner progress report without index) — add index < 1 day
- ❌ Multiple slow queries or connection pool exhaustion — blocker, needs investigation

### Step 4: Summary and Report
**Duration:** 10 minutes

1. Aggregate performance findings:
   - React bundle size: current vs. target (250KB gzip target)
   - React render performance: p95 latency range, slow components identified
   - Express endpoints: slow endpoints by latency, top N+1 queries
   - Database: slow queries, missing indexes, connection pool health

2. Rank bottlenecks by impact:
   - **High impact:** fixes that reduce p95 latency > 500ms or bundle > 50KB
   - **Medium impact:** fixes that reduce latency 100-500ms or bundle 10-50KB
   - **Low impact:** fixes that reduce latency < 100ms or bundle < 10KB

3. Estimate effort per fix:
   - 1-point: add index, cache simple value, lazy-load one route
   - 3-point: rewrite query to use JOIN, refactor component memoization, add pagination
   - 5-point: denormalize schema, split bundle across multiple chunks, redesign API response shape

4. Generate performance report:
   ```
   Fly GACA Performance Analysis — [date]
   
   Executive Summary:
   - p95 API latency: [Xms] (baseline: < 2000ms)
   - p95 React render: [Xms] (baseline: < 50ms)
   - Bundle size (gzip): [XKB] (baseline: < 250KB)
   - Slowest endpoint: [name] ([Xms] p95)
   - Slowest DB query: [query] ([Xms] execution)
   
   Frontend Performance:
   - Bundle breakdown:
     * React/vendors: [XKB]
     * App code: [XKB]
     * Lazy routes: [X routes] ([XKB] total)
   - Slow renders: [list components > 50ms]
   - Recommendation: [top 3 fixes, estimate impact + effort]
   
   Backend Performance:
   - Endpoint latencies: [table of p50/p95/p99 per endpoint]
   - N+1 queries: [list endpoints, queries per request]
   - Slow endpoints: [list > 2s p95]
   - Recommendation: [top 3 fixes, estimate impact + effort]
   
   Database Performance:
   - Slow queries: [table of query name, time, frequency]
   - Missing indexes: [list predicates without indexes]
   - Connection pool: [current size, peak usage, saturation]
   - Recommendation: [top 3 fixes, estimate impact + effort]
   
   Prioritized Optimization Roadmap:
   - Sprint 1 (High impact, 1-3 points): [items]
   - Sprint 2 (Medium impact, 3-5 points): [items]
   - Sprint 3 (Low impact, 1-5 points): [items]
   ```

5. Store report in `06-operations-it/perf-sprint-YYYY-MM-DD.md`

6. Post to Slack #engineering:
   - If healthy: "Performance analysis complete ✅ — p95 latency healthy, no blockers"
   - If at-risk: "Performance analysis ⚠️ — [X] optimizations recommended ([impact summaries])"
   - If critical: "Performance CRITICAL 🔴 — [endpoint] p95 latency [Xms] exceeds 2s threshold"

7. If critical (p95 > 2s or bundle > 300KB):
   - Halt feature-ship workflow (don't ship new code until performance regression fixed)
   - Create backlog items for prioritized roadmap above
   - Schedule 7-day follow-up analysis to verify fixes

## Decision Tree

```
React performance healthy?
├─ Yes (< 250KB, < 50ms p95) → Continue to API analysis
├─ At-risk (250-300KB, 50-100ms p95) → Flag, continue
└─ No (> 300KB, > 100ms p95) → WARN: bundle bloated, continue

API performance healthy?
├─ Yes (all endpoints < 2s p95) → Continue to database analysis
├─ At-risk (one endpoint 2-3s) → Flag, continue
└─ No (multiple endpoints > 3s) → WARN: API slow, continue

Database performance healthy?
├─ Yes (no slow queries, indexes present) → Generate report, post to Slack
├─ At-risk (one slow query, missing index) → Log, generate report
└─ No (multiple slow queries, connection exhaustion) → WARN, generate report

Overall performance rating?
├─ HEALTHY → Post to Slack, recommended optimizations for next sprint
├─ AT-RISK → Post to Slack with priority roadmap, no blocking impact
└─ CRITICAL → Halt feature-ship, create backlog, schedule 7-day follow-up
```

## Idempotency

Running performance-sprint twice on the same codebase (without changes) should produce the same results:
- Same React code → same bundle size, same render profiles
- Same Express code → same endpoint latencies, same query patterns
- Same database schema → same slow queries, same index coverage

This allows perf-sprint to be re-run safely if a transient error occurs (e.g., load test interrupted).

## Escalation Contacts

- React bundle/render issues → react-19-architect
- Express endpoint/N+1 issues → express-backend-pro
- Database query/index issues → sql-migrator
- Performance regression blocking feature → escalate to CTO; halt feature-ship until fixed
