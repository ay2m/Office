# Fly GACA Document Style Guide

## Overview
This guide provides standardized documentation practices for Fly GACA office documents, ensuring visual consistency, readability, and brand alignment across all document types (strategy, legal, finance, operations, etc.). Based on the Fly GACA design system from *The Book of Fly GACA*, these guidelines apply to Markdown-based documents used in internal wikis, project repositories, and shared drives.

## Core Principles
- **Modern**: Clean lines, contemporary typography, vibrant but purposeful color use
- **Clear**: Information hierarchy that guides the eye naturally
- **Vibrant**: Strategic use of the Falcon theme to highlight key information
- **User-Centric**: Prioritizing readability, scannability, and accessibility

## Typography
Fly GACA uses a three-font system optimized for both screen and print readability.

### Font Families
| Purpose | Font | Weight Variants | Usage Examples |
|---------|------|-----------------|----------------|
| **Primary Body** | Inter | 400 (Regular), 500 (Medium), 600 (SemiBold) | Paragraph text, table content, list items |
| **Headings & Accents** | Cairo | 600 (SemiBold), 700 (Bold), 800 (ExtraBold) | Document titles, section headers, callouts |
| **Code & Technical** | JetBrains Mono | 400 (Regular), 500 (Medium) | Inline code, code blocks, terminal output, file paths |

### Hierarchy & Sizing
```markdown
# Document Title (Cairo 800, 32pt)
## Section Header (Cairo 700, 24pt)
### Subsection Header (Cairo 600, 20pt)
#### Sub-subsection Header (Cairo 600, 18pt)

Body text (Inter 400, 14pt)
**Bold emphasis** (Inter 600, 14pt)
*Italic emphasis* (Inter 400, 14pt, italic)

`Inline code` (JetBrains Mono 400, 13pt)
```

### Special Cases
- **Legal Documents**: Use Cairo 700 for clause numbers (e.g., "Section 3.2")
- **Financial Reports**: JetBrains Mono for monetary figures and codes
- **Strategy Docs**: Cairo 800 for strategic pillars/goals
- **Accessibility Minimum**: Body text never smaller than 14pt (equivalent to 18px)

## Color Usage (Falcon Theme)
The Falcon theme provides a vibrant yet professional palette optimized for document clarity.

### Primary Palette
| Color | Hex | Usage Guidelines | Accessibility Notes |
|-------|-----|------------------|---------------------|
| **Falcon Blue** | #0066FF | Primary accents, hyperlinks, key highlights | WCAG AA on white (≥4.5:1) |
| **Falcon Orange** | #FF6B35 | Callouts, warnings, important notes | WCAG AA on white (≥4.5:1) |
| **Falcon Green** | #00C853 | Success indicators, positive metrics | WCAG AA on white (≥4.5:1) |
| **Falcon Red** | #FF3D00 | Errors, critical alerts, financial negatives | WCAG AA on white (≥4.5:1) |
| **Falcon Purple** | #9D4EDD | Strategic insights, innovation markers | WCAG AA on white (≥4.5:1) |

### Neutral Palette
| Color | Hex | Usage |
|-------|-----|-------|
| **Dark Charcoal** | #2D3748 | Body text (primary) |
| **Medium Gray** | #4A5568 | Secondary text, subtitles |
| **Light Gray** | #718096 | Tertiary text, footnotes |
| **Border Gray** | #E2E8F0 | Tables, dividers, code block backgrounds |
| **White** | #FFFFFF | Document background |

### Application Rules
1. **Text Color**: 
   - Primary text: Dark Charcoal (#2D3748) on white background
   - Never use pure black (#000000) for text
   - Light Gray (#718096) only for supplementary information (max 20% of text volume)

2. **Color Usage Limits**:
   - Maximum 2 accent colors per document section
   - Reserve Falcon Blue for primary actions/links
   - Use Falcon Orange sparingly (max 3 instances per page) for high-priority alerts
   - Falcon Green/Red only for clear positive/negative indicators (not decorative)

3. **Backgrounds**:
   - Main document: White (#FFFFFF)
   - Code blocks: Border Gray (#E2E8F0) with 1px padding
   - Callout boxes: 10% tint of accent color (e.g., Falcon Blue at #E6F0FF)

4. **Accessibility**:
   - All text must meet WCAG AA contrast ratios
   - Never rely solely on color to convey information (add icons/text labels)
   - For printed documents, ensure colors convert appropriately to grayscale

## Spacing & Layout
Based on an 8px grid system for consistent vertical and horizontal rhythm.

### Base Measurements
| Unit | Value | Application |
|------|-------|-------------|
| **Base Spacing** | 8px | Margin/padding increments |
| **Line Height** | 1.5 | Body text (21px for 14pt font) |
| **Paragraph Spacing** | 16px | Between paragraphs |
| **Section Spacing** | 32px | Between major sections |
| **Block Spacing** | 24px | Around code blocks, quotes, tables |

### Layout Specifications
- **Page Margins**: 
  - Digital: 40px (5 units) on all sides
  - Print: 0.75" (equivalent to 54px) for binding considerations
- **Column Width**: 
  - Optimal readability: 65-75 characters per line
  - Max width: 800px (100 units) for digital documents
- **Indentation**: 
  - Lists: 16px (2 units) 
  - Nested lists: Additional 16px per level
  - Code blocks: 0px left indent (full width within container)
- **Horizontal Rules**: 
  - Height: 1px
  - Color: Border Gray (#E2E8F0)
  - Margin: 32px above/below

### Document Structure
```markdown
# Title (with 32px space below)

## Section 1 (with 24px space below)
[Content with 16px paragraph spacing]

### Subsection (with 20px space below)
[Content]

> [Blockquote with 24px margin top/bottom, 16px padding]

```[language]
[Code block with 24px margin top/bottom, 16px padding]
```

## Section 2 (with 32px space above)
```

## File Naming Conventions
Ensures discoverability, version control, and consistent sorting.

### Pattern
`[department]_[doctype]_[YYYYMMDD]_[v##].[extension]`

### Components
- **department**: 2-4 letter code (all lowercase)
  - `strat` (Strategy), `legal` (Legal), `fin` (Finance), `ops` (Operations), `hr` (HR), `tech` (Technology)
- **doctype**: Descriptive term (snake_case)
  - `proposal`, `memo`, `report`, `minutes`, `policy`, `spec`, `retro`, `roadmap`
- **date**: Creation date in UTC (YYYYMMDD)
- **version**: Sequential version number (v01, v02, etc.)
- **extension**: 
  - `.md` for Markdown (primary)
  - `.pdf` for final/distribution versions
  - `.docx` only when required for external collaboration

### Examples
- `strat_proposal_20260615_v01.md`
- `legal_ndata_20260610_v03.pdf`
- `fin_q2report_20260614_v02.md`
- `ops_runbook_20260612_v01.md`

### Versioning Rules
- Increment version number for substantive changes
- Use `v00` for drafts/templates
- Major revisions: increment first digit (v01 → v02)
- Minor edits: keep same version, add changelog entry
- Never overwrite files; create new versioned files

## Markdown Formatting Standards
Ensures consistent rendering across platforms (GitHub, GitLab, Notion, Obsidian, etc.)

### Headings
- Use sentence case (only first word and proper nouns capitalized)
- Maximum 3 heading levels in body content (appendix may use 4th)
- No heading should be the only content in a section
- Example: `## Quarterly financial review` not `## QUARTERLY FINANCIAL REVIEW`

### Text Formatting
- **Bold**: For key terms, action items, and important concepts (use sparingly)
- *Italic*: For book titles, foreign words, and subtle emphasis
- `Inline code`: For file paths, command names, variables, and technical terms
- **Never** combine formatting (e.g., no `**_bold italic_**`)
- Use blockquotes (`>`) for citations, external quotes, and callouts

### Lists
- Unordered: Use hyphens (`-`) not asterisks or plus signs
- Ordered: Use numbers with periods (`1.`) not parentheses
- Nested lists: Increase indentation by 2 spaces per level
- Task lists: Use `- [ ]` for incomplete, `- [x]` for complete
- Maximum list depth: 3 levels

### Code Blocks
- Always specify language: 
  ```python
  def function():
      pass
  ```
- For console sessions: use `bash` or `shell`
- For configuration: use `yaml`, `json`, `toml`, or `ini`
- Never use code blocks for non-code content (use blockquotes instead)

### Tables
- Header row must be bolded
- Align text left, numbers right
- Use pipe tables with consistent column spacing
- Maximum width: 80 characters per cell (wrap content if needed)
- Example:
  | Metric | Q1 | Q2 | Target |
  |--------|----|----|--------|
  | Revenue | $1.2M | $1.5M | $1.4M |
  | Users | 12K | 18K | 15K |

### Links & References
- Use descriptive link text: `[Fly GACA Brand Guidelines](https://flygaca.com/brand)`
- Never use "click here" or raw URLs in body text
- For internal references: use relative paths when possible
- Footnotes: Use `[^1]` style with definitions at document end

### Special Elements
- **Callouts**: Use blockquotes with colored left border (see Color Usage)
- **Alerts**: 
  - `> [!NOTE]` for information
  - `> [!TIP]` for advice
  - `> [!IMPORTANT]` for critical points
  - `> [!WARNING]` for risks
  - `> [!CAUTION]` for procedural cautions
- **Horizontal Rules**: Use `---` on its own line with blank lines above/below
- **Images**: 
  - Always include alt text: `![Alt description](path/to/image.jpg)`
  - Maximum width: 600px
  - Preferred formats: SVG (icons), PNG (screenshots), JPEG (photos)

## Maintaining Visual Consistency Across Document Types
While core standards apply universally, specific document types have tailored applications.

### Strategy Documents
- **Typography**: Cairo 800 for vision statements, Cairo 700 for strategic pillars
- **Color**: Falcon Purple for innovation sections, Falcon Blue for metrics
- **Layout**: 
  - Use two-column layout for SWOT analysis (max 400px per column)
  - Timeline diagrams with Falcon Orange milestones
  - Appendices for detailed data (separate file if >2 pages)
- **Example Structure**:
  ```markdown
  # Q3 2026 Strategy Refresh
  
  ## Vision Statement
  [Cairo 800, Falcon Purple]
  
  ## Strategic Pillars
  [Three-column layout with icons]
  
  ## Financial Outlook
  [Table with Falcon Green/Red indicators]
  
  ## Implementation Roadmap
  [Timeline visualization]
  ```

### Legal Documents
- **Typography**: 
  - Cairo 700 for section numbers and headings
  - Inter 400 for body (slightly tighter line height: 1.4)
  - JetBrains Mono for clause references and definitions
- **Color**: 
  - Minimal color use (primarily for hyperlinks and warnings)
  - Falcon Red only for breach clauses and penalties
  - Falcon Green for compliance checkpoints
- **Layout**:
  - Numbered sections with decimal notation (1.0, 1.1, 1.2)
  - Consistent indentation for subclauses (16px per level)
  - Definitions section at beginning
  - Signature blocks right-aligned
- **Example**:
  ```markdown
  # CONFIDENTIALITY AGREEMENT
  
  ## 1.0 DEFINITIONS
  1.1 "Confidential Information" means [JetBrains Mono]
  
  ## 2.0 OBLIGATIONS
  2.1 Receiving Party shall [Inter 400]
  
  > [!WARNING]
  > Breach of Section 2.1 may result in [Falcon Red]
  ```

### Financial Reports
- **Typography**:
  - Cairo 700 for section headers
  - Inter 400 for narrative
  - JetBrains Mono for all numbers, codes, and financial identifiers
- **Color**:
  - Falcon Green for positive variances, Falcon Red for negative
  - Falcon Blue for forecast/projection columns
  - Never use color for actual historical values (keep neutral)
- **Layout**:
  - Consistent number formatting (currency symbols, decimal places)
  - Use tables with alternating row shades (10% Border Gray tint)
  - Charts: Use Falcon theme colors with pattern fills for B/W printing
  - Executive summary: Max 1 page
- **Example**:
  ```markdown
  # Q2 2026 Financial Performance
  
  ## Revenue Summary
  | Region | Actual | Forecast | Variance |
  |--------|--------|----------|----------|
  | North | $2.1M | $2.0M | `+$100K` [Falcon Green] |
  
  ## Expense Analysis
  [Waterfall chart with Falcon Blue/Green/Red]
  
  ## Key Ratios
  - Current Ratio: `JetBrains Mono 1.8` [Falcon Green if >1.5]
  ```

### Operational Documents (Runbooks, SOPs)
- **Typography**:
  - Cairo 700 for procedure titles
  - Inter 400 for steps
  - JetBrains Mono for file paths, commands, and system outputs
- **Color**:
  - Falcon Orange for warning steps
  - Falcon Green for verification checkpoints
  - Falcon Blue for alternative paths
- **Layout**:
  - Numbered procedures with clear start/end points
  - Decision diamonds: Use `[!]` notation for yes/no branches
  - Troubleshooting tables: Problem | Diagnosis | Solution
  - Always include revision date and approver in footer
- **Example**:
  ```markdown
  # Database Backup Procedure
  
  ## Prerequisites
  - Access to [JetBrains Mono]/backup/scripts
  
  ## Steps
  1. Verify storage [JetBrains Mono]/backup/storage [Falcon Green checkpoint]
  2. Execute [JetBrains Mono]/backup/run.sh
  3. [!] Did completion email arrive?
     - Yes: Proceed to step 4
     - No: See troubleshooting section [Falcon Orange]
  
  ## Troubleshooting
  | Problem | Diagnosis | Solution |
  |---------|-----------|----------|
  | No email | SMTP failure | Check [JetBrains Mono]/var/log/mail |
  ```

## Implementation Notes
### Tools & Templates
- **Recommended Editors**: VS Code with Fly GACA theme extensions, Obsidian, or Notion
- **Templates**: 
  - Store in `/templates/` folder with naming: `tpl_[doctype].md`
  - Include frontmatter for metadata:
    ```yaml
    ---
    title: "Document Type Template"
    type: "strategy"
    version: "v01"
    last_updated: "2026-06-15"
    author: "@username"
    tags: [strategy, quarterly]
    ---
    ```
- **Linters**: Use `markdownlint` with Fly GACA rule set:
  - Line length: 100 characters
  - Heading style: ATX only
  - List indentation: 2 spaces
  - Code block language required
  - No trailing whitespace
  - Maximum 3 consecutive blank lines

### Automation
- **Version Control**: 
  - Commit message format: `[doctype] summary: brief description`
  - Example: `fin report: Q2 actuals update`
- **Export Process**:
  - To PDF: Use `pandoc` with Fly GACA CSS template
  - To Word: Only when required; use automated conversion with manual verification
- **Accessibility Checks**:
  - Run automated contrast checker on all color usage
  - Verify document structure with heading outline tool
  - Test with screen reader (NVDA or VoiceOver) quarterly

## Changelog
- **v1.0** (2026-06-16): Initial release based on Fly GACA Design System v2.1
- **v1.1** (2026-07-01): Added legal document specifics and version control examples
- **v1.2** (2026-08-15): Updated color contrast requirements to WCAG AAA for body text

## Appendix: Visual Examples
*(Described for implementation)*

### Strategy Document Snippet
![Strategy example: Coral blue title, purple vision statement callout, three-column pillars with icons, financial table with green/red variances]

### Legal Contract Excerpt
![Legal example: Navy blue heading, gray body text, red warning blockquote, indented subclauses, definition section with monospaced terms]

### Financial Report Preview
![Financial example: Blue section headers, black numbers in monospace, green/red variance column, alternating row table, waterfall chart with pattern fills]

### SOP Flowchart
![Operational example: Numbered steps, orange warning diamond, green verification checkbox, troubleshooting table with light gray borders]

---
*This document itself follows Fly GACA Document Style Guide v1.2. For questions, contact #flygaca-docs or refer to The Book of Fly GACA, Section 4.3: Documentation Standards.* 

**Last Updated**: 2026-06-16  
**Version**: 1.2  
**Maintainer**: Fly GACA Design Systems Team  
**Classification**: Internal Use Only