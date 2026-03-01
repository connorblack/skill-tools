# D7: Pattern Recognition (10 points)

Does the Skill follow an established design pattern?

## Scoring

| Score | Criteria                                                |
| ----- | ------------------------------------------------------- |
| 0-3   | No recognizable pattern, chaotic structure              |
| 4-6   | Partially follows a pattern with significant deviations |
| 7-8   | Clear pattern with minor deviations                     |
| 9-10  | Masterful application of appropriate pattern            |

## Five Skill Patterns

| Pattern        | ~Lines | Characteristics                                       | When to Use                            |
| -------------- | ------ | ----------------------------------------------------- | -------------------------------------- |
| **Mindset**    | ~50    | Thinking > technique, strong NEVER list, high freedom | Creative tasks requiring taste         |
| **Navigation** | ~30    | Minimal SKILL.md, routes to sub-files                 | Multiple distinct scenarios            |
| **Philosophy** | ~150   | Two-step: Philosophy -> Express, craft emphasis       | Art/creation requiring originality     |
| **Process**    | ~200   | Phased workflow, checkpoints, medium freedom          | Complex multi-step projects            |
| **Tool**       | ~300   | Decision trees, code examples, low freedom            | Precise operations on specific formats |

## Pattern Selection Guide

| Task Characteristics                  | Best Fit Pattern        |
| ------------------------------------- | ----------------------- |
| Needs taste and creativity            | Mindset (~50 lines)     |
| Needs originality and craft quality   | Philosophy (~150 lines) |
| Has multiple distinct sub-scenarios   | Navigation (~30 lines)  |
| Complex multi-step project            | Process (~200 lines)    |
| Precise operations on specific format | Tool (~300 lines)       |

## Key Pattern Indicators

**Mindset**: Few procedures, strong anti-patterns, philosophical framing. Example: "Commit to BOLD choices" over "Step 1: Choose colors."

**Navigation**: Mostly links to reference files, minimal inline content. SKILL.md acts as table of contents routing to domain-specific files.

**Philosophy**: "Think first, then create" structure. Establishes principles before any implementation guidance.

**Process**: Phase markers, checkpoints, progressive complexity. Clear "what comes next" at each stage. Often includes checklists Claude can copy and track.

**Tool**: Decision trees with fallbacks, specific code examples, error handling for each path. Provides exact scripts with minimal parameters.

## Common Mismatches

| Mismatch                            | Symptom                                    | Fix                               |
| ----------------------------------- | ------------------------------------------ | --------------------------------- |
| Tool pattern for creative work      | Rigid steps for open-ended design          | Switch to Mindset or Philosophy   |
| Mindset pattern for file operations | Vague guidance for byte-level work         | Switch to Tool with exact scripts |
| Process pattern for simple tasks    | 200 lines of phases for a 3-step operation | Simplify to Mindset or Navigation |
