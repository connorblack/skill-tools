# D9: Progressive Disclosure (15 points)

Does the artifact implement proper content layering?

## Agent-file adjustment

Standalone agent files can still score well here. Do not penalize an agent just because the host does not use `SKILL.md` bundles.

For agent targets:

- Score layering against the host's real affordances.
- Reward concise single-file agents when the task is narrow and the structure is easy to scan.
- Deduct when the file is bloated, repeats the same rule many times, or hides critical reference material with no loading cues.
- Treat external references as positive only when the agent can discover and use them from the host's actual directory structure.

## The Three Layers

```
Layer 1: Metadata (always in memory)
         Only name + description
         ~100 tokens per skill

Layer 2: SKILL.md Body (loaded when triggered)
         Guidelines, code examples, decision trees
         Target: < 500 lines, < 5k tokens

Layer 3: Reference Files (loaded on demand)
         scripts/, references/, assets/
         No context cost until accessed
         Scripts: only OUTPUT enters context (code itself never loaded)
```

## Scoring

| Score | Criteria                                                                     |
| ----- | ---------------------------------------------------------------------------- |
| 0-5   | Everything dumped in SKILL.md (>500 lines, no structure)                     |
| 6-10  | Has references but unclear when to load them                                 |
| 11-13 | Good layering with loading triggers present                                  |
| 14-15 | Perfect: situational triggers + conditional loading + "Do NOT Load" guidance |

## Official Disclosure Patterns (from Anthropic)

### Pattern 1: High-Level Guide with References

```markdown
# PDF Processing

## Quick start

[inline code example]

## Advanced features

**Form filling**: See [FORMS.md](FORMS.md)
**API reference**: See [REFERENCE.md](REFERENCE.md)
```

Claude loads FORMS.md or REFERENCE.md only when needed.

### Pattern 2: Domain-Specific Organization

```
bigquery-skill/
  SKILL.md (overview and navigation)
  references/
    finance.md (revenue, billing)
    sales.md (opportunities, pipeline)
    product.md (API usage, features)
```

When user asks about revenue, Claude reads only finance.md. Sales and product remain on filesystem, consuming zero context.

### Pattern 3: Conditional Details

```markdown
## Creating documents

Use docx-js library. See [DOCX-JS.md](DOCX-JS.md).

## Editing documents

For simple edits, modify XML directly.
**For tracked changes**: See [REDLINING.md](REDLINING.md)
```

Claude reads REDLINING.md only when tracked changes are needed.

## Loading Trigger Quality

| Quality   | Characteristics                                            |
| --------- | ---------------------------------------------------------- |
| Poor      | References listed at end, no loading guidance              |
| Mediocre  | Some triggers but not embedded in workflow                 |
| Good      | Loading triggers embedded in workflow steps                |
| Excellent | Situational triggers + conditional loading + "Do NOT Load" |

### Good Loading Trigger (embedded in workflow)

```markdown
### Creating New Document

**Read**: [docx-js.md](docx-js.md) before proceeding.
**Do NOT load** ooxml.md or redlining.md for this task.
```

### Bad Loading Trigger (just listed)

```markdown
## References

- docx-js.md - for creating documents
- ooxml.md - for editing
```

## Critical Rule: One Level Deep

All reference files must link directly from SKILL.md. Nested references (A -> B -> C) cause partial reads and incomplete information.

## Reference File Best Practice

For reference files over 100 lines, include a table of contents at the top so Claude can see the full scope even when previewing.

## How Loading Works in Practice

Concrete example of progressive loading:

1. **Startup**: System prompt includes metadata: "PDF Processing - Extract text and tables..."
2. **User request**: "Extract the text from this PDF"
3. **Claude reads**: SKILL.md via bash -> instructions enter context
4. **Claude decides**: Form filling not needed, so FORMS.md is NOT read
5. **Claude executes**: Uses only SKILL.md instructions to complete the task

Files that aren't read consume zero tokens. Scripts that are executed only contribute their output, not their source code. This is why bundling comprehensive reference material has no penalty — only what's accessed counts.

## For Simple Skills

Skills under ~100 lines with no reference files: score based on conciseness and self-containment. Not every Skill needs reference files — a focused 50-line Skill can be perfectly structured as-is.
