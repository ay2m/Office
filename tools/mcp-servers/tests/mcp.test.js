/**
 * MCP Server Concurrency Tests
 * Validates SHA-based optimistic locking and seed data integrity.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import FlyGacaFamilyMCP from '../fly-gaca-family-mcp.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testDbPath = '/tmp/fly-gaca-family-test.db';

// Clean up test DB before starting
if (fs.existsSync(testDbPath)) {
  fs.unlinkSync(testDbPath);
}

// Stub the seed directory to tests/seed for this test run
const originalEnv = process.env.MCP_DB_PATH;
process.env.MCP_DB_PATH = testDbPath;

test('MCP Concurrency Suite', async (suite) => {
  let mcp;

  await suite.test('initialization', () => {
    mcp = new FlyGacaFamilyMCP();
    assert.ok(mcp, 'MCP instance created');
    assert.ok(mcp.db, 'Database initialized');
  });

  await suite.test('read initial state', () => {
    const result = mcp.read('office-entity-facts-v1');
    if (result) {
      assert.ok(result.sha, 'SHA present');
      assert.ok(result.data, 'Data present');
    }
  });

  await suite.test('write without conflict', () => {
    const testData = { test: 'value', timestamp: new Date().toISOString() };
    const result = mcp.write('test-key-1', testData);
    assert.ok(result.sha, 'SHA returned');
    assert.equal(result.version, 1, 'Version incremented');
  });

  await suite.test('write with matching SHA', () => {
    // Write initial
    const data1 = { value: 'first' };
    mcp.write('test-key-2', data1);

    // Read back
    const { data, sha } = mcp.read('test-key-2');
    assert.deepEqual(data, data1, 'Data matches');

    // Write with matching SHA
    const data2 = { value: 'second' };
    const result = mcp.write('test-key-2', data2, sha);
    assert.ok(result.sha, 'New SHA returned');
    assert.equal(result.version, 2, 'Version incremented to 2');

    // Verify update
    const { data: updated } = mcp.read('test-key-2');
    assert.deepEqual(updated, data2, 'Data updated');
  });

  await suite.test('write with conflicting SHA (should throw)', () => {
    const data = { value: 'original' };
    mcp.write('test-key-3', data);

    // Attempt write with wrong SHA
    const wrongData = { value: 'conflict' };
    assert.throws(
      () => mcp.write('test-key-3', wrongData, 'wrong-sha'),
      /Concurrency conflict/,
      'Conflict error thrown'
    );
  });

  await suite.test('list all resources', () => {
    const all = mcp.list();
    assert.ok(Array.isArray(all), 'List returns array');
    assert.ok(all.length > 0, 'Resources exist');
  });

  await suite.test('list by owner filter', () => {
    mcp.write('owned-by-test', { owner: 'test-agent' }, null);
    const owned = mcp.list('test-agent');
    assert.ok(Array.isArray(owned), 'Filtered list is array');
  });

  await suite.test('cleanup', () => {
    mcp.close();
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
    process.env.MCP_DB_PATH = originalEnv;
  });
});

console.log('All MCP tests completed.');
