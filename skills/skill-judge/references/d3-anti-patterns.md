# D3: Anti-Pattern Quality (15 points)

Does the Skill have effective NEVER lists?

## Why This Matters

Half of expert knowledge is knowing what NOT to do. Claude hasn't stepped on the landmines that experts have. Good Skills must explicitly state these "absolute don'ts" with non-obvious reasoning.

## Scoring

| Score | Criteria                                                               |
| ----- | ---------------------------------------------------------------------- |
| 0-3   | No anti-patterns mentioned                                             |
| 4-7   | Generic warnings ("avoid errors", "be careful", "consider edge cases") |
| 8-11  | Specific NEVER list with some reasoning                                |
| 12-15 | Expert-grade anti-patterns with WHY — things only experience teaches   |

## Expert Anti-Patterns (specific + reason)

```markdown
NEVER use generic AI-generated aesthetics like:

- Overused font families (Inter, Roboto, Arial)
- Cliched color schemes (purple gradients on white)
- Predictable layouts and component patterns
- Default border-radius on everything
```

Why this works: Names specific landmines an expert has learned to avoid.

## Weak Anti-Patterns (vague, no reasoning)

```markdown
Avoid making mistakes.
Be careful with edge cases.
Don't write bad code.
```

Why this fails: Claude already "knows" these. They add zero knowledge delta.

## Evaluation Questions

1. Would an expert read this list and say "yes, I learned this the hard way"?
2. Or would they say "this is obvious to everyone"?
3. Does each anti-pattern include the non-obvious WHY?
4. Are the anti-patterns specific enough to be actionable?

## The Difference

| Vague (low score)        | Specific (high score)                                                   |
| ------------------------ | ----------------------------------------------------------------------- |
| "Handle errors properly" | "NEVER catch exceptions silently — log the original stack trace"        |
| "Be careful with dates"  | "NEVER use local timezone for storage — always UTC, convert at display" |
| "Consider performance"   | "NEVER load full dataset into memory — stream with cursor pagination"   |
