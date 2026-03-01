---
description: Full quality audit - structure, prose, compliance, and scope. Read-only. To auto-fix findings use /skill-tools:improve.
argument-hint: [skill-name | path | all | project | global | plugin]
allowed-tools: Bash, Read, Glob, Grep
---

Resolve the skill target from $ARGUMENTS per the skill-quality resolution rules.

## Step 1: Read Everything

Read the skill's SKILL.md using the Read tool.

Read every file in the skill's `references/`, `scripts/`, and `assets/` subdirectories using the Read tool.

Read all four criteria files using the Read tool:

1. `${CLAUDE_PLUGIN_ROOT}/skills/skill-quality/references/lint-spec.md`
2. `${CLAUDE_PLUGIN_ROOT}/skills/skill-quality/references/prose-rules.md`
3. `${CLAUDE_PLUGIN_ROOT}/skills/skill-quality/references/compliance-framework.md`
4. `${CLAUDE_PLUGIN_ROOT}/skills/skill-quality/references/graphviz-conventions.dot`

Do not proceed until you have read every file. Do not rely on prior context.

## Step 2: Structure Analysis

Work through lint-spec.md section by section. For each rule, examine the skill content. Every finding must cite a line number and quote the relevant text.

Cover each area:

- Required/optional frontmatter
- Structure requirements and name pattern
- Content quality (ASCII art, decorative quotes, persona statements, framing)
- Description quality (trigger phrases, negative routing, quality level)
- Flowchart quality (if dot blocks exist: shape correctness, label quality)
- Command/agent invocation syntax
- Self-containment

## Step 3: Prose Analysis

Read through the SKILL.md line by line applying each rule from prose-rules.md:

**Active voice** — Find every passive construction. Quote each one with the line number. Count total instances. WARN per instance, FAIL if 5+.

**Positive form** — Find negative instructions ("don't", "never", "avoid") that could be restated positively. Quote each with line number. WARN per instance.

**Concrete language** — Find vague action steps ("consider", "think about", "be careful"). Quote each with line number. WARN per instance.

<!-- vale off -->
**Concise expression** — Find bloated phrases ("in order to", "at this point in time", "due to the fact that"). Quote each with line number. INFO per instance, WARN if 3+ of same pattern.
<!-- vale on -->

**Token waste** — Search for attribution signals, decorative quotes, redundant explanations per the patterns in prose-rules.md. Quote each with line number.

**Structure** — Check parallel construction, related words grouping, emphasis placement, paragraph discipline per prose-rules.md.

After completing your prose analysis above, run `bash ${CLAUDE_PLUGIN_ROOT}/scripts/detect-fluff.sh <resolved-path>/SKILL.md` as a supplementary cross-check for token waste patterns. Note any findings the script caught that your analysis missed.

## Step 4: Compliance Analysis

Using `compliance-framework.md`:

1. Classify the skill type: Discipline / Guidance / Collaborative / Reference. Quote the evidence that determines the classification.
2. For each persuasion principle expected for that type (per the Expected Principles table), search the skill content for its presence. Quote the lines that apply each principle, or note its absence.
3. For discipline skills: check loophole defenses. Quote any bright-line rules and any fuzzy rules that should be bright-line.
4. Assess compliance verdict with evidence.

## Step 5: Scope Analysis

Discover all installed skills:

```
Glob for SKILL.md files across:
- .claude/skills/*/SKILL.md
- ~/.claude/skills/*/SKILL.md
- Plugin skills paths
```

For each discovered skill, read its description. Compare trigger phrases against the target skill's description. Flag any pairs with substantial keyword overlap. Quote the overlapping trigger phrases from both skills.

## Step 6: Supplementary Scripts

Do not run this step until Steps 2–5 are fully complete with all findings cited.

Run `bash ${CLAUDE_PLUGIN_ROOT}/scripts/validate-skill.sh <resolved-path>` as a mechanical cross-check for character counts, regex patterns, and file existence. Note any discrepancies with your analysis above.

## Step 7: Report

Every finding must include: line number, quoted text, rule applied, and verdict.

```
## Audit: {skill-name} ({lines} lines)

**Verdict:** {PASS | NEEDS WORK | FAIL}

| Dimension  | Verdict | Findings |
|------------|---------|----------|
| Structure  | {P/W/F} | {count}  |
| Prose      | {P/W/F} | {count}  |
| Compliance | {P/W/F} | {count}  |
| Scope      | {P/W/F} | {count}  |

### Structure Findings
1. [{PASS|WARN|FAIL}] **{rule}** (line {N}): `{quoted text}` — {explanation}

### Prose Findings
1. [{PASS|WARN|FAIL}] **{rule}** (line {N}): `{quoted text}` — {explanation}

### Compliance Findings
**Type:** {classification} — Evidence: `{quoted text from line N}`
1. [{PASS|WARN|FAIL}] **{principle}** (line {N}): `{quoted text}` — {explanation}

### Scope Findings
1. [{INFO|WARN}] **Overlap:** {skill-name} — shared triggers: `{quoted phrases}` → {action}

### Script Cross-Checks
{script output summaries — note any discrepancies with analysis above}

**Summary:** {N} passed, {N} warnings, {N} failures across {N} rules examined
```

In batch mode, run the full analysis for each skill.
