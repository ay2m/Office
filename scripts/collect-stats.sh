#!/bin/bash
# Collect live metrics for Office README auto-update
# Extracts: markdown count, PDF count, Arabic parity %, agent count, recently updated docs
# Output: .stats.json (git-ignored)

set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STATS_FILE="$REPO_ROOT/.stats.json"

echo "📊 Collecting Office metrics..."

# Count markdown files (excluding templates)
echo "  • Counting markdown files..."
EN_MD_COUNT=$(find "$REPO_ROOT" -name "*.md" -type f \
  ! -path "*/templates/*" \
  ! -path "*/.git/*" \
  ! -path "*/_print/*" \
  ! -path "*/node_modules/*" \
  ! -path "*/.claude/*" \
  ! -name "_INDEX.md" \
  ! -name "_GLOSSARY.md" | wc -l | xargs)

# Count Arabic markdown files
AR_MD_COUNT=$(find "$REPO_ROOT/ar" -name "*.md" -type f \
  ! -path "*/templates/*" \
  ! -path "*/.git/*" \
  ! -path "*/node_modules/*" 2>/dev/null | wc -l | xargs || echo "0")

# Calculate parity percentage
if [ "$EN_MD_COUNT" -gt 0 ]; then
  PARITY_PCT=$((AR_MD_COUNT * 100 / EN_MD_COUNT))
else
  PARITY_PCT=0
fi

# Count PDF files in _print/
echo "  • Counting generated PDFs..."
PDF_COUNT=$(find "$REPO_ROOT/_print" -name "*.pdf" -type f 2>/dev/null | wc -l | xargs || echo "0")

# Extract agent count from .claude/agents/
echo "  • Counting agents..."
AGENT_COUNT=$(find "$REPO_ROOT/.claude/agents" -name "*.md" -type f 2>/dev/null | wc -l | xargs || echo "0")

# Write stats JSON
cat > "$STATS_FILE" <<EOF
{
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "en_markdown_count": $EN_MD_COUNT,
  "ar_markdown_count": $AR_MD_COUNT,
  "bilingual_parity_percent": $PARITY_PCT,
  "pdf_count": $PDF_COUNT,
  "agent_count": $AGENT_COUNT,
  "source": "scripts/collect-stats.sh"
}
EOF

echo ""
echo "✅ Metrics collected:"
echo "  EN markdown: $EN_MD_COUNT"
echo "  AR markdown: $AR_MD_COUNT"
echo "  Bilingual parity: $PARITY_PCT%"
echo "  Generated PDFs: $PDF_COUNT"
echo "  Agents in .claude/agents/: $AGENT_COUNT"
echo "  Written to: $STATS_FILE"
