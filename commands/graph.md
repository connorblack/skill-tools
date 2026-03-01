---
description: "Render flowcharts — extracts dot blocks from a skill and renders to SVG. Use --combine for a single combined diagram."
argument-hint: "[skill-name | path] [--combine]"
allowed-tools: Bash, Read, Glob
model: sonnet
---

Resolve the skill target from $ARGUMENTS per the skill-quality resolution rules. Parse `--combine` flag if present.

Check prerequisites:

1. `which bun` — if missing, tell user: `brew install oven-sh/bun/bun`
2. `which dot` — if missing, tell user: `brew install graphviz`

Run the render script:

```
bun ${CLAUDE_PLUGIN_ROOT}/scripts/generate-graphs.ts <resolved-path> [--combine]
```

If no ` ```dot ` blocks found, suggest the user review `${CLAUDE_PLUGIN_ROOT}/skills/skill-quality/references/graphviz-conventions.dot` for the process DSL. Ask whether the skill has process logic that would benefit from a flowchart.

## Report

```
## Graph: {skill-name}

**Diagrams found:** {N}
**Rendered:** {list of SVG filenames}
**Output:** {path}/diagrams/
```
