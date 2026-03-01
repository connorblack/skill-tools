---
description: Structural and content quality review—examines skill files against the lint specification. For prose, compliance, and overlap analysis use /skill-tools:audit.
argument-hint: skill-name | path | all | project | global | plugin
allowed-tools: Bash, Read, Glob, Grep
---

Resolve the skill target from $ARGUMENTS per the skill-quality resolution rules.

## Step 1: Read the Skill

Read the skill's SKILL.md using the Read tool.

Read every file in the skill's `references/`, `scripts/`, and `assets/` subdirectories using the Read tool. If none exist, note that.

Do not proceed until you have read every file.

## Step 2: Read the Criteria

Read `${CLAUDE_PLUGIN_ROOT}/skills/skill-quality/references/lint-spec.md` using the Read tool.

Do not rely on prior context. Read it fresh.

## Step 3: Examine Each Rule

Work through lint-spec.md section by section. For each rule, examine the skill content and report what you find. Every finding must cite a line number and quote the relevant text.

### Required Frontmatter

Check each required field against its constraints. Quote the actual frontmatter values.

### Optional Frontmatter

If present, check each optional field against its constraints. Flag any invalid values.

### Structure Requirements

Verify directory name matches `name` field. Count lines. List subdirectories and flag any outside `scripts/`, `references/`, `assets/`.

### Name Pattern

Test the `name` value against the regex. Quote the name.

### Content Quality Rules

Read through the SKILL.md body line by line. For each content quality rule (no ASCII art, no decorative quotes, no persona statements, functional content only), search for violations. Quote any violating lines with line numbers.

Check the framing rule: does the skill use Audience/Goal framing or persona roleplay? Quote the framing lines.

### Description Quality

Quote the full description. Assess against the quality levels table in lint-spec.md. Does it include trigger phrases ("Use when")? Negative routing ("Not for X")? Expected outputs?

### Flowchart Quality

If any ` ```dot ` blocks exist, examine each one:

- Is the flowchart used for a non-obvious decision point, or is it representing linear instructions? (Appropriate Use table)
- Check every node: does the shape match the content? Diamond labels must end with `?`. Box labels should start with a verb. plaintext should be literal commands. (Shape Correctness table)
- Check for generic labels (`step1`, `process`, `check`), code in nodes, non-verb action labels. (Label Quality rules)

Quote the specific nodes that violate rules.

### Command/Agent Invocation

Search the skill content for `Skill(`, `SlashCommand(`, and other deprecated patterns. Quote any found.

### Self-Containment

Search for paths that reference files outside the skill directory. Look for absolute paths, `../` references, and references to files that don't exist within the skill's own directory tree. Quote any found.

## Step 4: Supplementary Script

Do not run this step until Step 3 is fully complete with all findings cited.

Run `bash ${CLAUDE_PLUGIN_ROOT}/scripts/validate-skill.sh <resolved-path>` as a mechanical cross-check for character counts, regex patterns, and file existence. Note any findings the script caught that your analysis missed — these are the only checks the script adds beyond your analysis.

## Step 5: Report

Every finding must include: line number, quoted text, rule applied, and verdict.

```
## Lint: {skill-name} ({lines} lines)

**Verdict:** {PASS | NEEDS WORK | FAIL}

### Findings
1. [{PASS|WARN|FAIL}] **{rule category}** (line {N}): `{quoted text}` — {explanation}

### Script Cross-Check
{script output summary — note any discrepancies with analysis above}

**Summary:** {N} passed, {N} warnings, {N} failures
```

In batch mode, run the full analysis for each skill and collect results into a summary table with per-skill verdicts.
