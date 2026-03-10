# D8: Specification Compliance (15 points)

Special focus on description quality — the most critical field for Skill discovery.

## Agent-file adjustment

This dimension is spec-aware, so identify the target format before scoring.

For current Claude Code agent targets:

- Score the file against the current Claude Code subagent contract, not the `SKILL.md` contract.
- The documented subagent fields are `name`, `description`, `tools`, `disallowedTools`, `model`, `permissionMode`, `maxTurns`, `skills`, `mcpServers`, `hooks`, `memory`, `background`, and `isolation`.
- Route primarily through `description`. Only treat other routing fields as first-class when the host explicitly documents them.
- Do **NOT** deduct for documented agent fields such as `tools`, `disallowedTools`, `skills`, `mcpServers`, `permissionMode`, `background`, or `isolation`.
- Do **NOT** treat host-specific extras such as `color` or `whenToUse` as part of the Claude Code subagent spec.
- Do **NOT** deduct for missing `SKILL.md`, directory-name matches, or skill-package reference layout when evaluating a standalone agent file.
- Do deduct for contradictory routing metadata, vague descriptions, mismatched tool surfaces, or host-specific fields that do not match the agent's actual job.
- If a check truly has no agent analogue, mark it `N/A` in the notes and explain the normalization in the report.

For other or legacy agent hosts:

- Score against the host's actual contract if it is known.
- Separate "host-native" from "current Claude Code spec" in the notes.
- Do not auto-fail an agent just because the host adds extra metadata, but do not count those extras as Claude Code compliance.

## Scoring

| Score | Criteria                                                               |
| ----- | ---------------------------------------------------------------------- |
| 0-5   | Missing frontmatter or invalid format                                  |
| 6-10  | Has frontmatter but description is vague or incomplete                 |
| 11-13 | Valid frontmatter, description has WHAT but weak on WHEN               |
| 14-15 | Perfect: comprehensive description with WHAT + WHEN + trigger keywords |

## Claude Code Skill Frontmatter

These rules apply directly to Skill targets. Translate them to the host's equivalent metadata rules when evaluating agent files.

### `name` field

- Optional. If omitted, Claude Code uses the directory name.
- If present, maximum 64 characters.
- Lowercase letters, numbers, and hyphens only.
- Plugin namespace is added by location and slash invocation (`/plugin-name:skill-name`), not by putting `:` in `name:`.
- Prefer descriptive names over vague placeholders such as `helper`, `utils`, or `tools`.

### `description` field

- Recommended. If omitted, Claude Code uses the first paragraph of the markdown body.
- Maximum 1024 characters when present.
- Should state what the skill does and when to use it.
- Include trigger terms users will actually say.

### Documented skill fields

Current Claude Code documents these skill fields:

- `name`
- `description`
- `argument-hint`
- `disable-model-invocation`
- `user-invocable`
- `allowed-tools`
- `model`
- `context`
- `agent`
- `hooks`

Fields outside that list are either host-specific extensions or non-standard metadata. Note them explicitly instead of silently treating them as core Claude Code skill fields.

## Why Description is THE MOST CRITICAL Field

```
User Request -> Agent sees ALL skill descriptions -> Decides which to activate
                (only descriptions, not bodies!)
```

- If description doesn't match -> Skill NEVER gets loaded
- If description is vague -> Skill WILL NOT trigger when it MUST
- If description lacks keywords -> Skill is invisible to the Agent

A Skill with perfect content but poor description is **useless** — it will never be activated.

## Description Must Answer Three Questions

1. **WHAT**: What does this Skill do? (capabilities)
2. **WHEN**: In what situations MUST it be used? (trigger scenarios)
3. **KEYWORDS**: What terms MUST trigger this Skill? (searchable terms)

### Good Description

```yaml
description:
  Extract text and tables from PDF files, fill forms, merge documents.
  Use when working with PDF files or when the user mentions PDFs, forms, or
  document extraction.
```

- WHAT: extract text/tables, fill forms, merge
- WHEN: "Use when working with PDF files"
- KEYWORDS: PDF, forms, document extraction

### Another Good Description

```yaml
description: Generate descriptive commit messages by analyzing git diffs.
  Use when the user asks for help writing commit messages or reviewing
  staged changes.
```

### Poor Description

```yaml
description: Helps with documents
```

- WHAT: vague ("helps" with what specifically?)
- WHEN: missing
- KEYWORDS: missing

## Description Checklist

- [ ] Lists specific capabilities (not just "helps with X")
- [ ] Includes explicit trigger scenarios ("Use when...", "When user asks for...")
- [ ] Contains searchable keywords (file extensions, domain terms, action verbs)
- [ ] Specific enough that Agent knows EXACTLY when to use it
- [ ] Under 1024 characters

## Additional Spec Checks

- [ ] Uses documented Claude Code fields, or clearly labels host-specific extras
- [ ] SKILL.md body under 500 lines
- [ ] No time-sensitive information (or in "old patterns" collapsed section)
- [ ] Consistent terminology throughout (one term, not synonyms)
- [ ] Forward slashes in all file paths (no backslashes)
- [ ] File references one level deep from SKILL.md
- [ ] Required packages listed if Skill includes executable code
