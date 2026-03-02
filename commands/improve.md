---
description: 'Audit and fix — runs full quality audit then fixes each finding interactively. To review without modifying use /skill-tools:audit.'
argument-hint: '[skill-name | path]'
allowed-tools: Bash, Read, Glob, Grep, Edit, Write, AskUserQuestion
---

Resolve the skill target from $ARGUMENTS per the skill-quality resolution rules.

## Step 1: Read Everything

Read the skill's SKILL.md and all supporting files using the Read tool.

Read all four criteria files using the Read tool: lint-spec.md, prose-rules.md, compliance-framework.md, graphviz-conventions.dot from `${CLAUDE_PLUGIN_ROOT}/skills/skill-quality/references/`.

Do not proceed until you have read every file.

## Step 2: Examine and Analyze

Examine the skill against every rule in each criteria file. Cite line numbers and quote text for every finding. Cover structure (lint-spec.md), prose quality (prose-rules.md), compliance (compliance-framework.md), and flowcharts (graphviz-conventions.dot).

After completing your analysis, run both scripts as supplementary cross-checks:

- `bash ${CLAUDE_PLUGIN_ROOT}/scripts/validate-skill.sh <resolved-path>`
- `bash ${CLAUDE_PLUGIN_ROOT}/scripts/detect-fluff.sh <resolved-path>/SKILL.md`

Note any findings the scripts caught that your analysis missed.

Present all findings sorted by severity: FAIL first, then WARN, then INFO. Each finding must include line number, quoted text, rule applied, and verdict.

## Step 3: Fix Each Finding

Work through findings starting with FAIL, then WARN:

For each finding:

1. Show the issue: line number, quoted text, which rule it violates
2. Propose a specific rewrite
3. Apply the fix using Edit tool

Self-containment violations:

- External file references → move the referenced content into `references/` within the skill directory
- Wrong invocation syntax → fix to `/plugin-name:command-name` format
- Dangling concept references → embed the definition or remove the reference

Prose violations:

- Passive voice → rewrite in active voice
- Negative instructions → restate positively
- Bloated phrases → replace with concise alternatives
- Token waste (attribution, decorative quotes) → remove entirely

## Step 4: Re-Audit

After all fixes:

1. Re-read the modified SKILL.md using the Read tool.
2. Re-examine against the same criteria. Verify each FAIL finding is resolved.
3. Run both scripts again as cross-check.
4. If any FAIL findings remain, return to Step 3.

## Step 5: Report

```
## Improve: {skill-name}

**Before:** {N} FAIL, {N} WARN, {N} INFO
**After:** {N} FAIL, {N} WARN, {N} INFO
**Lines:** {before} → {after} ({delta})
**Changes:** {N} fixes applied

### Fixes Applied
1. (line {N}) `{original text}` → `{new text}` — {rule}
```
