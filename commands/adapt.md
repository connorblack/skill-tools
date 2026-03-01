---
description: Fork a skill — copy and specialize for a new use case, toolset, or audience.
argument-hint: '<source-skill> [as <target-name>]'
allowed-tools: Bash, Read, Glob, Grep, Edit, Write, AskUserQuestion
---

Parse $ARGUMENTS: resolve the source skill per the skill-quality resolution rules. If "as {name}" appears after the source, use that as the target name.

## Read Source

Read the source SKILL.md and any files in `references/`, `scripts/`, `assets/`.

Summarize: name, description, line count, type, supporting files.

## Plan Adaptation

Ask the user:

1. What should the new skill be named? (suggest based on specialization)
2. What scope should change? (narrower domain, different toolset, different audience)
3. What content should be added, removed, or modified?
4. Where should the new skill live? (suggest same parent directory as source)

## Create

1. Create the target directory
2. Copy and adapt SKILL.md:
   - Update `name` to match new directory
   - Rewrite `description` with new trigger phrases and negative routing
   - Modify content per specialization instructions
   - Update any self-references
3. Copy and adapt supporting files as needed

## Validate

Read the newly created `SKILL.md` using the Read tool. Check it against lint-spec.md from `${CLAUDE_PLUGIN_ROOT}/skills/skill-quality/references/lint-spec.md`—verify name matches directory, description has trigger phrases and negative routing, no external references, no persona statements. Quote any issues found with line numbers.

Run `bash ${CLAUDE_PLUGIN_ROOT}/scripts/validate-skill.sh <target-path>` as supplementary cross-check. Fix any errors.

## Handle Source

Ask: "Remove the original source skill?"

If yes and source is from a third-party plugin, warn that plugin updates may recreate it.

## Report

```
## Adapt: {source-name} → {target-name}

**Source:** {source-path} ({lines} lines)
**Target:** {target-path} ({lines} lines)
**Changes:** {summary of adaptations}
**Source:** {kept | removed}
```
