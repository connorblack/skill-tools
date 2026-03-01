# D8: Practical Usability (15 points)

Can an Agent actually use this Skill effectively?

## Scoring

| Score | Criteria                                                  |
| ----- | --------------------------------------------------------- |
| 0-5   | Confusing, incomplete, contradictory, or untested         |
| 6-10  | Usable but with noticeable gaps                           |
| 11-13 | Clear guidance for common cases                           |
| 14-15 | Comprehensive: edge cases, error handling, feedback loops |

## Usability Checks

- **Decision trees**: For multi-path scenarios, is there clear guidance on which path?
- **Code examples**: Do they actually work? Or pseudocode that breaks?
- **Error handling**: What if the main approach fails? Are fallbacks provided?
- **Edge cases**: Are unusual but realistic scenarios covered?
- **Actionability**: Can Agent immediately act, or needs to figure things out?

## Workflows (from Anthropic Best Practices)

Complex operations MUST have:

1. **Clear sequential steps** — break into numbered steps
2. **Progress tracking** — checklist Claude can copy and check off
3. **Feedback loops** — run validator -> fix -> repeat

### Feedback Loop Pattern

```markdown
1. Make edits
2. Validate: run python scripts/validate.py
3. If validation fails:
   - Review error
   - Fix the issue
   - Validate again
4. Only proceed when validation passes
```

This pattern greatly improves output quality for quality-critical tasks.

## Scripts: Solve, Don't Punt (from Anthropic)

**Key efficiency insight**: When Claude EXECUTES a script, only the script's output enters context — the source code never loads. This makes scripts far more token-efficient than inline code. Use bundled scripts for deterministic operations.

When a Skill includes executable scripts, they MUST:

- Handle errors explicitly, not fail and let Claude figure it out
- Document configuration values ("why 30 seconds?", "why 3 retries?")
- Have no "voodoo constants" — all magic numbers need justification
- Clearly distinguish "Run X" (execute) vs "See X" (read as reference)

### Good Script

```python
# HTTP requests typically complete within 30 seconds
REQUEST_TIMEOUT = 30
# Most intermittent failures resolve by second retry
MAX_RETRIES = 3
```

### Bad Script

```python
TIMEOUT = 47  # Why 47?
RETRIES = 5   # Why 5?
```

## Verifiable Intermediate Outputs

For complex tasks, the "plan-validate-execute" pattern catches errors early:

1. Analyze -> Create plan file (structured format)
2. Validate plan with script
3. Execute only after validation passes

Make validation scripts verbose with specific error messages.

## Content Guidelines

- No time-sensitive information (use collapsed "old patterns" section only for legacy support)
- Consistent terminology — pick one term, use it throughout
- Don't offer excessive options — provide a default with an escape hatch
- Forward slashes in all file paths (never backslashes)
- Make script execution intent clear: "Run X" (execute) vs "See X" (read as reference)

## Good Usability (decision tree + fallback)

```markdown
| Task           | Primary    | Fallback  | When to Use Fallback |
| -------------- | ---------- | --------- | -------------------- |
| Read text      | pdftotext  | PyMuPDF   | Need layout info     |
| Extract tables | camelot-py | tabula-py | camelot fails        |

Scanned PDF: pdftotext returns blank -> Use OCR first
Encrypted PDF: Permission error -> Use PyMuPDF with password
```

## Poor Usability (vague)

```markdown
Use appropriate tools for PDF processing.
Handle errors properly.
Consider edge cases.
```

## Platform Compatibility

Skills run in different environments with different constraints. Flag Skills that assume capabilities not universally available:

| Platform    | Network            | Package Install    | Filesystem     |
| ----------- | ------------------ | ------------------ | -------------- |
| Claude API  | No access          | Pre-installed only | VM sandbox     |
| Claude.ai   | Varies by settings | npm, PyPI, GitHub  | VM sandbox     |
| Claude Code | Full access        | Full access        | User's machine |

**Check for**: Scripts that fetch external URLs (fails on API), require runtime package installs (fails on API), or assume specific filesystem paths.

## Security Evaluation

From Anthropic's overview: "We strongly recommend using Skills only from trusted sources." When evaluating, flag:

- **External URL fetching**: Scripts or instructions that fetch from external URLs pose risk — fetched content can contain malicious instructions
- **Unexpected file access**: Operations that don't match the Skill's stated purpose
- **Broad tool invocation**: Instructions that grant Claude wide tool access beyond what the task requires
- **Data exposure patterns**: Instructions that can leak sensitive data to external systems

This isn't a scoring dimension, but flagging security concerns is part of a thorough evaluation.

## Testing Consideration

From Anthropic: Test Skills with all models you plan to use (Haiku, Sonnet, Opus). What works for Opus likely needs more detail for Haiku.
