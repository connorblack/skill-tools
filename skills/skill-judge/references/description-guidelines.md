# Writing Effective Descriptions

The `description` field enables Skill discovery and MUST include both **what the Skill does** and **when to use it**.

Write the description as concise routing metadata rather than first-person assistant chat or marketing copy.

Good: `Processes Excel files and generates reports. Use when working with spreadsheets or xlsx files.`
Avoid: `I can help you process Excel files`
Avoid: `Powerful spreadsheet toolkit for every possible workflow`

Be specific and include key terms. Include both what the Skill does and specific triggers/contexts for when to use it.

Each Skill has exactly one description field. The description is critical for skill selection: the agent uses it to choose the right Skill from potentially 100+ available Skills. Your description must provide enough detail for the agent to know when to select this Skill, while the rest of `SKILL.md` provides the implementation details.

## Effective examples

**PDF Processing skill**

```
description: Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.
```

**Excel Analysis skill**

```
description: Analyze Excel spreadsheets, create pivot tables, generate charts. Use when analyzing Excel files, spreadsheets, tabular data, or .xlsx files.
```

**Git Commit Helper skill**

```
description: Generate descriptive commit messages by analyzing git diffs. Use when the user asks for help writing commit messages or reviewing staged changes.
```

## Avoid vague descriptions

```
description: Helps with documents
description: Processes data
description: Does stuff with files
```
