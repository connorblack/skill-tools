---
description: "Find skill overlap — scans installed skills for redundancy and suggests consolidation."
argument-hint: "[project | global | plugin | all]"
allowed-tools: Bash, Read, Glob, Grep, AskUserQuestion
---

Scan for skill overlap across the specified scope ($ARGUMENTS, default "all").

## Discover

Find all `SKILL.md` files based on scope:

| Scope   | Paths                                                    |
|---------|----------------------------------------------------------|
| project | `.claude/skills/*/SKILL.md`                              |
| global  | `~/.claude/skills/*/SKILL.md`                            |
| plugin  | Installed plugin `skills/*/SKILL.md` paths               |
| all     | All of the above                                         |

Collect per skill: name, level, source (plugin name or project/global), line count, description.

Present inventory sorted by name with totals.

## Detect Overlaps

Compare all skill pairs for:

1. **Trigger phrase overlap** — extract trigger keywords from descriptions, compute Jaccard similarity
2. **Conceptual overlap** — compare section headings and key terms
3. **Functional overlap** — skills producing similar outputs or covering similar workflows

Flag pairs with >30% trigger phrase similarity or substantial content overlap.

## Present Findings

For each overlap group, show shared triggers, content overlap, recommendation (merge / split / disambiguate / keep separate), and rationale.

## Action Plan

Ask which recommendations to act on. For each approved action, present what to do — but do not execute changes. Recommend `/skill-tools:improve` or `/skill-tools:adapt` to apply changes.

## Report

```
## Deduplicate: {scope}

**Scanned:** {N} skills across {N} levels
**Overlaps found:** {N} pairs
**Recommendations:**
1. {action}: {skill-a} + {skill-b} — {rationale}
```
