# Skill Lint Specification

Structural validation rules for the agentskills.io skill format.

## Required Frontmatter

| Field | Constraints |
| ----- | ----------- |
| `name` | 1-64 chars, lowercase alphanumeric + hyphens, no leading/trailing/consecutive hyphens, must match parent directory name |
| `description` | 1-1024 chars, non-empty, should include keywords for discoverability |

## Optional Frontmatter

| Field | Constraints |
| ----- | ----------- |
| `compatibility` | 1-500 chars, environment requirements |
| `metadata` | Key-value pairs (string values only) |
| `allowed-tools` | Space-delimited tool list (FAIL on commas or array syntax) |
| `disable-model-invocation` | Boolean. `true` = Claude cannot auto-load |
| `user-invocable` | Boolean. `false` = hidden from `/` menu |
| `model` | `haiku`, `sonnet`, or `opus` |
| `context` | `fork` to run in isolated subagent context |
| `agent` | Subagent type when `context: fork` |

## Structure Requirements

| Rule | Requirement |
| ---- | ----------- |
| Directory name | Must match `name` field exactly |
| SKILL.md | Required, must exist |
| Line limit | Max 500 lines in SKILL.md |
| Subdirectories | Only `scripts/`, `references/`, `assets/` allowed |

## Name Pattern

```regex
^[a-z][a-z0-9]*(-[a-z0-9]+)*$
```

**Valid:** `my-skill`, `skill1`, `api-v2-handler`
**Invalid:** `-skill`, `skill-`, `my--skill`, `MySkill`, `my_skill`

## Content Quality Rules

| Rule | Requirement |
| ---- | ----------- |
| No ASCII art | Box-drawing characters, arrows, and decorative diagrams waste tokens. Use plain lists or tables. |
| No decorative quotes | Inspirational quotes or attributions have no functional value for LLM execution. |
| No persona statements | "You are an expert..." wastes tokens. Use **Audience:** / **Goal:** framing instead. |
| Functional content only | Every line should improve LLM behavior. Ask: "Does this help Claude execute better?" |

### Framing Rule

Use `**Audience:** / **Goal:**` instead of persona roleplay. "Explain X for audience Y" yields better outputs than "Act as persona Z."

### ASCII Art Detection

```regex
[─│┌┐└┘├┤┬┴┼╭╮╯╰═║╔╗╚╝╠╣╦╩╬↑↓←→↔⇒⇐⇔▲▼◄►]{3,}
```

## Description Quality

Skill descriptions are routing logic, not documentation. They answer:

- **When** to use this skill (trigger conditions)
- **When NOT** to use (negative routing)
- **What outputs** to expect (success criteria)

| Quality Level | Example |
| ------------- | ------- |
| Good | "Use when implementing Stimulus controllers. Not for React components. Outputs controller with targets and actions." |
| Adequate | "Use when working with Stimulus controllers in Rails applications." |
| Poor | "Stimulus controller development skill." |
| Anti-pattern | "Comprehensive, powerful toolkit for building cutting-edge Stimulus controllers." |

### Negative Routing

When multiple skills cover similar domains, include disambiguation:

```
"Use when writing Minitest tests. Not for RSpec — use rspec-coder instead."
```

"Don't use when..." is as important as "Use when..." for routing accuracy.

## Flowchart Quality

Skills may use `dot`/graphviz flowcharts (in ` ```dot ` code blocks) for process logic. When present, check:

### Appropriate Use

| Use Case | Verdict |
|----------|---------|
| Non-obvious decision point | PASS |
| Process loop with early-exit risk | PASS |
| A-vs-B choice with criteria | PASS |
| Linear instructions | FAIL — use numbered list |
| Reference material | FAIL — use table |
| Code examples | FAIL — use code block |

### Shape Correctness

| Shape | Correct Use | Detection |
|-------|------------|-----------|
| `diamond` | Questions — must end with `?` | Label without `?` on diamond node |
| `box` | Actions — should start with verb | Non-action label on box |
| `plaintext` | Literal CLI commands | Non-command text as plaintext |
| `ellipse` | States/situations | Action verbs on ellipse |
| `octagon` | Warnings (STOP/NEVER) | Non-warning text on octagon |
| `doublecircle` | Entry/exit points | Mid-process node as doublecircle |

### Label Quality

- **FAIL:** Generic labels (`step1`, `helper2`, `process`, `check`) — labels must have semantic meaning
- **WARN:** Action labels that don't start with a verb ("the configuration" → "Configure X")
- **WARN:** Question labels that don't end with `?`
- **FAIL:** Code in flowchart nodes (`import fs`, `const x = 1`) — can't copy-paste, hard to read

## Command/Agent Invocation

| Pattern | Status | Use Instead |
| ------- | ------ | ----------- |
| `Skill("command", args: "...")` | Deprecated | `/command args` |
| `SlashCommand("command", ...)` | Deprecated | `/command args` |
| `Task(subagent_type="agent", ...)` | Correct | (no change) |

Preferred command invocation: `/plugin-name:command-name args`

## Error Codes

| Code | Meaning |
| ---- | ------- |
| 0 | All validations passed |
| 1 | Missing SKILL.md |
| 2 | Invalid frontmatter |
| 3 | Name validation failed |
| 4 | Description validation failed |
| 5 | Optional field validation failed |
| 6 | Line limit exceeded |
| 7 | Invalid subdirectory |
| 8 | ASCII art detected (warning) |
| 9 | Persona statement detected |
| 10 | Description routing quality (warning) |
| 11 | Marketing copy detected (warning) |
