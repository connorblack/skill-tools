# Naming Conventions

Use consistent naming patterns to make Skills easier to reference and discuss. We recommend using **gerund form** (verb + `-ing`) for Skill names, as this clearly describes the activity or capability the Skill provides.

In current Claude Code skill frontmatter, `name` is a single lowercase, hyphenated identifier. Plugin namespace is added at invocation time (`/plugin-name:skill-name`), not by putting `:` into the `name` field.

## Good naming examples (gerund form)

- `processing-pdfs`
- `analyzing-spreadsheets`
- `managing-databases`
- `testing-code`
- `writing-documentation`

## Acceptable alternatives

- Noun phrases: `pdf-processing`, `spreadsheet-analysis`
- Action-oriented: `process-pdfs`, `analyze-spreadsheets`

## Avoid

- Vague names: `helper`, `utils`, `tools`
- Overly generic: `documents`, `data`, `files`
- Reserved words: `anthropic-helper`, `claude-tools`
- Inconsistent patterns within your skill collection

Consistent naming makes it easier to:

- Reference Skills in documentation and conversations
- Understand what a Skill does at a glance
- Organize and search through multiple Skills
- Maintain a professional, cohesive skill library
