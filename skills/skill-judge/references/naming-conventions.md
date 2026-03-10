# Naming Conventions

Use consistent naming patterns to make Skills easier to reference and discuss. We recommend using **gerund form** (verb + `-ing`) for Skill names, as this clearly describes the activity or capability the Skill provides.

Remember that the `name` field may use optional namespace prefixes separated by `:`. Each segment must stay lowercase and may contain numbers and hyphens. The final segment should match the directory name.

## Good naming examples (gerund form)

- `processing-pdfs`
- `analyzing-spreadsheets`
- `managing-databases`
- `testing-code`
- `writing-documentation`
- `tools:processing-pdfs`
- `search:analyzing-spreadsheets`

## Acceptable alternatives

- Noun phrases: `pdf-processing`, `spreadsheet-analysis`
- Action-oriented: `process-pdfs`, `analyze-spreadsheets`
- Namespaced collections: `tools:pdf-processing`, `search:codebase-search`

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
