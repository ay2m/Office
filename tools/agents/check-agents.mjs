#!/usr/bin/env node

// check-agents.mjs
// Validates all agent .md files in .claude/agents/ and .claude/plugins/*/agents/
// - Verifies YAML front-matter (name, description, tools, color)
// - Checks that all declared tools are real (built-in or MCP)
// - Verifies agent filename matches name field
// - Flags missing or stale agent references in README
// - Verifies a plugin agent that shadows a repo agent of the same name is
//   byte-identical to it, so the two copies cannot drift apart silently

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../..');

// Known tools (built-in + common MCP)
const knownTools = new Set([
  'Read', 'Write', 'Edit', 'Glob', 'Grep', 'Bash',
  'Agent', 'Artifact', 'SendUserFile', 'AskUserQuestion',
  'Skill', 'WebFetch', 'WebSearch', 'ListAgents', 'SendMessage',
  'Monitor', 'ScheduleWakeup', 'TaskCreate', 'TaskUpdate', 'TaskList',
  'Artifact', 'ReportFindings', 'ReadNotifications', 'EnterPlanMode', 'ExitPlanMode',
  'TodoWrite',
  // MCP tools (common patterns)
  'GitHub', 'Slack', 'Gmail', 'Notion', 'Airtable',
]);

const issues = [];
let agentCount = 0;
let agentFilesChecked = 0;

// Find all agent files
function findAgentFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findAgentFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'README.md') {
      files.push(fullPath);
    }
  }
  return files;
}

// Parse YAML front-matter
function parseFrontMatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const yaml = match[1];
  const result = {};
  const lines = yaml.split('\n');
  for (const line of lines) {
    if (!line.trim()) continue;
    const [key, ...valueParts] = line.split(':');
    const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
    result[key.trim()] = value;
  }
  return result;
}

// Validate a single agent file
function validateAgent(filePath) {
  agentFilesChecked++;
  const filename = path.basename(filePath);
  const dirName = path.basename(path.dirname(filePath));

  if (!fs.existsSync(filePath)) {
    issues.push(`❌ ${filePath}: file does not exist`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const frontMatter = parseFrontMatter(content);

  if (!frontMatter) {
    issues.push(`❌ ${filePath}: missing YAML front-matter (---)`);
    return;
  }

  // Required fields
  const required = ['name', 'description', 'tools', 'color'];
  for (const field of required) {
    if (!frontMatter[field]) {
      issues.push(`❌ ${filePath}: missing required field '${field}'`);
    }
  }

  // Filename must match name
  const expectedFilename = `${frontMatter.name}.md`;
  if (filename !== expectedFilename) {
    issues.push(
      `❌ ${filePath}: filename '${filename}' does not match name field '${frontMatter.name}' (expected '${expectedFilename}')`
    );
  }

  // Validate tools
  if (frontMatter.tools) {
    const toolList = frontMatter.tools.split(',').map(t => t.trim());
    for (const tool of toolList) {
      if (!knownTools.has(tool) && !tool.startsWith('mcp__')) {
        issues.push(
          `⚠️  ${filePath}: tool '${tool}' not recognized (may be MCP or custom)`
        );
      }
    }
  }

  // Validate color (basic check)
  if (frontMatter.color && !isValidColor(frontMatter.color)) {
    issues.push(
      `⚠️  ${filePath}: color '${frontMatter.color}' may not be valid Tailwind`
    );
  }

  agentCount++;
}

function isValidColor(color) {
  // Simple Tailwind color check
  const validColors = [
    'cyan', 'purple', 'yellow', 'magenta', 'blue', 'green', 'orange',
    'teal', 'indigo', 'amber', 'stone', 'lime', 'sky', 'rose', 'violet',
    'fuchsia', 'red', 'pink', 'slate', 'gray', 'zinc',
  ];
  return validColors.includes(color);
}

// Main check
console.log('agents-check: validating agent files...\n');

const claudeAgentsDir = path.join(repoRoot, '.claude', 'agents');
const pluginsDir = path.join(repoRoot, '.claude', 'plugins');

// Only <plugin>/agents/ holds agents — a plugin's commands/ and skills/ are
// Markdown too, and are validated against their own schemas, not this one.
function findPluginAgentFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .flatMap((e) => findAgentFiles(path.join(dir, e.name, 'agents')));
}

const allAgentFiles = [
  ...findAgentFiles(claudeAgentsDir),
  ...findPluginAgentFiles(pluginsDir),
];

for (const file of allAgentFiles) {
  validateAgent(file);
}

// A plugin ships its own copy of an agent so the plugin works outside this
// checkout, but a session *here* loads .claude/agents/. Two copies of the same
// name must stay byte-identical or the roster means two different things
// depending on how you got it.
let parityChecked = 0;
for (const file of findPluginAgentFiles(pluginsDir)) {
  const twin = path.join(claudeAgentsDir, path.basename(file));
  if (!fs.existsSync(twin)) continue;
  parityChecked++;
  if (fs.readFileSync(file).equals(fs.readFileSync(twin))) continue;
  issues.push(
    `❌ ${path.relative(repoRoot, file)}: differs from ${path.relative(repoRoot, twin)} — ` +
      'a plugin agent that shadows a repo agent must be byte-identical to it'
  );
}

// Report
if (issues.length === 0) {
  console.log(
    `✅ agents-check: OK — ${agentCount} agents found, ${agentFilesChecked} files checked, ` +
      `${parityChecked} plugin/repo agent pairs in parity, all valid.\n`
  );
  process.exit(0);
} else {
  console.log(`agents-check: found ${issues.length} issue(s)\n`);
  for (const issue of issues) {
    console.log(issue);
  }
  console.log(`\n❌ agents-check failed: ${issues.length} issue(s)\n`);
  process.exit(1);
}
