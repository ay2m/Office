<div align="center">

# 🤖 Fly GACA Family MCP — Shared Agent State Server
### Multi-Agent State Synchronization, Resource Discovery & Optimistic Locking
#### خادم بروتوكول سياق النماذج (MCP) · مزامنة حالة الوكلاء الذكية · القفل المتفائل

<p align="center">
  <img src="https://img.shields.io/badge/Made%20in-Saudi%20Arabia-006C35?style=for-the-badge&labelColor=0a0e12" alt="صنع في السعودية" />
  <img src="https://img.shields.io/badge/Protocol-Model%20Context%20Protocol-0D96F6?style=for-the-badge&labelColor=0a0e12" alt="MCP" />
  <img src="https://img.shields.io/badge/Database-SQLite%20WAL%20%7C%20D1-8E75B2?style=for-the-badge&labelColor=0a0e12" alt="Database" />
  <img src="https://img.shields.io/badge/Concurrency-SHA%20Optimistic%20Lock-C8A04A?style=for-the-badge&labelColor=0a0e12" alt="Concurrency" />
</p>

</div>

---

## 🧭 Purpose & Architecture

The **Fly GACA Family MCP Server** provides a unified shared-state backbone for autonomous AI agents operating across `ay2m/Office`, `ay2m/FlyGACA`, and `ay2m/Captain-Adel`.

It exposes 5 structured Key-Value (KV) resources backed by SQLite with **SHA-based optimistic locking** to prevent conflicting concurrent edits across agent sessions.

```
┌────────────────────────────────────────────────────────┐
│             Autonomous Multi-Agent Team                │
│    (Governance Auditor, Entity Guardian, Sync Bot)     │
└───────────────────────────┬────────────────────────────┘
                            │ Model Context Protocol (MCP)
                            ▼
┌────────────────────────────────────────────────────────┐
│             Fly GACA Family MCP Server                 │
│              (tools/mcp-servers/fly-gaca-family-mcp.js)│
├────────────────────────────────────────────────────────┤
│ • SHA-based optimistic write locking                   │
│ • Version auto-incrementing                            │
│ • Resource schema validation                           │
└───────────────────────────┬────────────────────────────┘
                            │
            ┌───────────────┴───────────────┐
            ▼                               ▼
┌─────────────────────────┐   ┌─────────────────────────┐
│ Local SQLite (WAL Mode) │   │ Cloud Supabase D1 Store │
│   /tmp/fly-gaca-family  │   │    (Remote Production)  │
└─────────────────────────┘   └─────────────────────────┘
```

---

## 📦 The Five KV Resources

1. **`office-entity-facts-v1`:** Canonical corporate entity facts from `01-governance/company-facts.md` (read-only for bots).
2. **`product-architecture-v1`:** Global React + Express architectural decisions and system constraints.
3. **`corpus-index-v1`:** GACAR regulatory tier definitions, chunk indexing status, and AIRAC cycle schedules.
4. **`captain-adel-model-v1`:** AI flight instructor persona versioning, prompt hash, and benchmark scorecards.
5. **`cross-repo-health-v1`:** SHA verification status of `flygaca-family.json` and sync parity logs.

---

## ⚡ Quickstart & Testing

```bash
cd tools/mcp-servers
npm install

# Initialize local SQLite database with seed data
npm run init

# Run concurrency and integrity tests
npm test
```

---

## 🔒 Concurrency Model (Optimistic Locking)

```javascript
const { data, sha } = mcp.read('corpus-index-v1');

// Update state
data.last_corpus_indexing = new Date().toISOString();

// Write back with SHA lock (fails if modified by another agent)
try {
  mcp.write('corpus-index-v1', data, sha);
} catch (err) {
  // Retry: re-read, resolve conflicts, and re-write
}
```

---

<div align="center">

<sub>🇸🇦 صنع في السعودية · Made in Saudi Arabia</sub>

</div>
