# D8: Specification Compliance (15 points)

Special focus on description quality — the most critical field for Skill discovery.

## Agent-file adjustment

This dimension is written for Skills first, but it also applies to agent files.

For agent targets:

- Score the file against the host's native metadata contract, not the `SKILL.md` contract.
- Routing metadata may live in `description`, `whenToUse`, or the host's equivalent activation field. Judge the combined routing surface.
- Do **NOT** deduct for supported agent fields such as `tools`, `model`, `color`, `skills`, or `whenToUse`.
- Do **NOT** deduct for missing `SKILL.md`, directory-name matches, or skill-package reference layout when evaluating a standalone agent file.
- Do deduct for contradictory routing metadata, vague descriptions, mismatched tool surfaces, or host-specific fields that do not match the agent's actual job.
- If a check truly has no agent analogue, mark it `N/A` in the notes and explain the normalization in the report.

## Scoring

| Score | Criteria                                                               |
| ----- | ---------------------------------------------------------------------- |
| 0-5   | Missing frontmatter or invalid format                                  |
| 6-10  | Has frontmatter but description is vague or incomplete                 |
| 11-13 | Valid frontmatter, description has WHAT but weak on WHEN               |
| 14-15 | Perfect: comprehensive description with WHAT + WHEN + trigger keywords |

## Anthropic Frontmatter Requirements

These rules apply directly to Skill targets. Translate them to the host's equivalent metadata rules when evaluating agent files.

### `name` field

- Maximum 64 characters
- Lowercase namespace/name segments separated by `:`. Each segment may contain numbers and hyphens.
- Cannot contain XML tags
- Cannot contain reserved words: `"anthropic"`, `"claude"`
- Final segment should match the directory name
- Use **gerund form** (verb + -ing): `processing-pdfs`, `analyzing-spreadsheets`, `managing-databases`
- Acceptable: noun phrases (`pdf-processing`), action-oriented (`process-pdfs`)
- Namespaced collections are acceptable when the host uses them: `tools:processing-pdfs`, `search:codebase-search`
- Avoid: vague (`helper`, `utils`, `tools`), overly generic (`documents`, `data`)

### `description` field

- Maximum 1024 characters
- Non-empty
- Cannot contain XML tags
- **Must be written in third person** (injected into system prompt)
  - Good: "Processes Excel files and generates reports"
  - Bad: "I can help you process Excel files"
  - Bad: "You can use this to process Excel files"

### Only supported fields

The SKILL.md frontmatter supports only `name` and `description`. Other fields (`version`, `license`, `metadata`, `allowed-tools`) are non-standard.

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
- [ ] Written in third person
- [ ] Under 1024 characters

## Additional Spec Checks

- [ ] No unsupported frontmatter fields
- [ ] SKILL.md body under 500 lines
- [ ] No time-sensitive information (or in "old patterns" collapsed section)
- [ ] Consistent terminology throughout (one term, not synonyms)
- [ ] Forward slashes in all file paths (no backslashes)
- [ ] File references one level deep from SKILL.md
- [ ] Required packages listed if Skill includes executable code
