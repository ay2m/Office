#!/usr/bin/env node

/**
 * fly-gaca-family-mcp.js
 * MCP server for shared state across Office, FlyGACA, and Captain-Adel agents.
 *
 * Five named resources (KV stores):
 * - office-entity-facts-v1 (owned by entity-facts-guardian)
 * - product-architecture-v1 (owned by react-19-architect, express-backend-pro)
 * - corpus-index-v1 (owned by regulatory-corpus-keeper)
 * - captain-adel-model-v1 (owned by ml-instructor-trainer)
 * - cross-repo-health-v1 (owned by cross-repo-sync, family-warden)
 *
 * Each resource supports read/write with optimistic concurrency (sha verification).
 * Seed data loaded from tools/mcp-servers/seed/*.json on startup.
 * Database: Supabase D1 (SQLite over HTTP), backend-agnostic wrapper.
 */

import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DB_PATH = process.env.MCP_DB_PATH || '/tmp/fly-gaca-family.db';
const SEED_DIR = path.join(path.dirname(import.meta.url.replace('file://', '')), 'seed');

class FlyGacaFamilyMCP {
  constructor() {
    this.db = new Database(DB_PATH);
    this.db.pragma('journal_mode = WAL');
    this.initSchema();
    this.loadSeedData();
  }

  initSchema() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS kv_store (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        sha TEXT NOT NULL,
        version INTEGER NOT NULL DEFAULT 1,
        last_updated TEXT NOT NULL,
        owner TEXT,
        created_at TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_kv_updated ON kv_store(last_updated);
      CREATE INDEX IF NOT EXISTS idx_kv_owner ON kv_store(owner);
    `);
  }

  loadSeedData() {
    if (!fs.existsSync(SEED_DIR)) {
      console.log(`Seed directory not found at ${SEED_DIR}; skipping seed load.`);
      return;
    }

    const files = fs.readdirSync(SEED_DIR).filter(f => f.endsWith('.json'));
    for (const file of files) {
      const key = file.replace('.json', '');
      const filePath = path.join(SEED_DIR, file);
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(content);
        const sha = this.computeSha(JSON.stringify(data));

        // Upsert seed data; do not overwrite existing writes
        const stmt = this.db.prepare(`
          INSERT OR IGNORE INTO kv_store
          (key, value, sha, version, last_updated, owner, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `);
        stmt.run(
          key,
          JSON.stringify(data),
          sha,
          1,
          new Date().toISOString(),
          data.owner || 'system',
          new Date().toISOString()
        );
      } catch (err) {
        console.error(`Failed to load seed ${file}: ${err.message}`);
      }
    }
  }

  computeSha(value) {
    return crypto.createHash('sha256').update(value).digest('hex');
  }

  read(key) {
    const stmt = this.db.prepare('SELECT value, sha FROM kv_store WHERE key = ?');
    const row = stmt.get(key);
    if (!row) return null;
    try {
      return {
        data: JSON.parse(row.value),
        sha: row.sha,
      };
    } catch {
      return { data: row.value, sha: row.sha };
    }
  }

  write(key, value, expectedSha = null) {
    const newValue = typeof value === 'string' ? value : JSON.stringify(value);
    const newSha = this.computeSha(newValue);

    if (expectedSha) {
      const current = this.db.prepare('SELECT sha, version FROM kv_store WHERE key = ?').get(key);
      if (!current || current.sha !== expectedSha) {
        throw new Error(
          `Concurrency conflict on ${key}: expected sha ${expectedSha}, got ${current?.sha || 'null'}.`
        );
      }
      const stmt = this.db.prepare(`
        UPDATE kv_store
        SET value = ?, sha = ?, version = version + 1, last_updated = ?
        WHERE key = ?
      `);
      stmt.run(newValue, newSha, new Date().toISOString(), key);
    } else {
      // Upsert without conflict check
      const stmt = this.db.prepare(`
        INSERT INTO kv_store (key, value, sha, version, last_updated, owner, created_at)
        VALUES (?, ?, ?, 1, ?, ?, ?)
        ON CONFLICT(key) DO UPDATE SET
          value = excluded.value,
          sha = excluded.sha,
          version = version + 1,
          last_updated = excluded.last_updated
      `);
      stmt.run(newValue, newSha, new Date().toISOString(), value.owner || 'unknown', new Date().toISOString());
    }

    return { sha: newSha, version: this.db.prepare('SELECT version FROM kv_store WHERE key = ?').get(key).version };
  }

  list(owner = null) {
    const query = owner
      ? 'SELECT key, sha, version, last_updated, owner FROM kv_store WHERE owner = ? ORDER BY last_updated DESC'
      : 'SELECT key, sha, version, last_updated, owner FROM kv_store ORDER BY last_updated DESC';
    const stmt = this.db.prepare(query);
    return owner ? stmt.all(owner) : stmt.all();
  }

  close() {
    this.db.close();
  }
}

// Export for use as module or run as CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const mcp = new FlyGacaFamilyMCP();
  console.log(`✓ MCP server initialized at ${DB_PATH}`);
  console.log(`Seed data loaded. Run 'node fly-gaca-family-mcp.js <cmd>' for operations.`);
  process.exit(0);
} else {
  export default FlyGacaFamilyMCP;
}
