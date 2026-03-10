# D4: Mindset + Appropriate Procedures (15 points)

Does the Skill transfer expert thinking patterns along with necessary domain-specific procedures?

## Scoring

| Score | Criteria                                                                   |
| ----- | -------------------------------------------------------------------------- |
| 0-3   | Only generic procedures Claude already knows                               |
| 4-7   | Has domain procedures but lacks thinking frameworks                        |
| 8-11  | Good balance: thinking patterns + domain-specific workflows                |
| 12-15 | Expert-level: shapes thinking AND provides procedures Claude wouldn't know |

## Knowledge Types

| Type                   | Example                                             | Value                              |
| ---------------------- | --------------------------------------------------- | ---------------------------------- |
| **Thinking patterns**  | "Before designing, ask: What makes this memorable?" | High — shapes decisions            |
| **Domain procedures**  | "OOXML: unpack -> edit XML -> validate -> pack"     | High — Claude likely does not know |
| **Generic procedures** | "Step 1: Open file, Step 2: Edit, Step 3: Save"     | Low — Claude already knows         |

## What Counts as Valuable Procedures

- Workflows Claude hasn't been trained on (new tools, proprietary systems)
- Correct ordering that's non-obvious ("validate BEFORE packing, not after")
- Critical steps easy to miss ("MUST recalculate formulas after editing")
- Domain-specific sequences (e.g., MCP server's 4-phase development process)

## What Counts as Redundant Procedures

- Generic file operations (open, read, write, save)
- Standard programming patterns (loops, conditionals, error handling)
- Common library usage that's well-documented

## Expert Thinking Patterns Look Like

```markdown
Before [action], ask yourself:

- **Purpose**: What problem does this solve?
- **Constraints**: What are the hidden requirements?
- **Differentiation**: What makes this solution memorable?
```

## Valuable Domain Procedures Look Like

```markdown
### Redlining Workflow (Claude wouldn't know this sequence)

1. Convert to markdown: pandoc --track-changes=all
2. Map text to XML: grep for text in document.xml
3. Implement changes in batches of 3-10
4. Pack and verify: check ALL changes were applied
```

## Redundant Generic Procedures Look Like

```markdown
Step 1: Open the file
Step 2: Find the section
Step 3: Make the change
Step 4: Save and test
```

## The Test

1. Does it tell Claude WHAT to think about? (thinking patterns)
2. Does it tell Claude HOW to do things it wouldn't know? (domain procedures)

A good Skill provides both when needed.
