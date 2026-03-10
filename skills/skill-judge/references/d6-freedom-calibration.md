# D6: Freedom Calibration (15 points)

Is the level of specificity appropriate for the task's fragility?

## Scoring

| Score | Criteria                                                                      |
| ----- | ----------------------------------------------------------------------------- |
| 0-5   | Severely mismatched (rigid scripts for creative tasks, vague for fragile ops) |
| 6-10  | Partially appropriate, some mismatches                                        |
| 11-13 | Good calibration for most scenarios                                           |
| 14-15 | Perfect freedom calibration throughout                                        |

## The Analogy (from Anthropic)

Think of Claude as a robot exploring a path:

- **Narrow bridge with cliffs on both sides**: Only one safe way forward. Provide exact instructions. (Low freedom)
- **Open field with no hazards**: Multiple paths lead to success. Give general direction. (High freedom)

## The Freedom Spectrum

| Task Type              | Freedom | Why                                                 | Example           |
| ---------------------- | ------- | --------------------------------------------------- | ----------------- |
| Creative/Design        | High    | Multiple valid approaches, differentiation is value | frontend-design   |
| Code review            | Medium  | Principles exist but judgment required              | code-review       |
| File format operations | Low     | One wrong byte corrupts file                        | DOCX, XLSX, PDF   |
| Database migrations    | Low     | Must run in exact sequence                          | migration scripts |

## High Freedom (text-based instructions)

Use when multiple approaches are valid and decisions depend on context.

```markdown
Commit to a BOLD aesthetic direction. Pick an extreme: brutally minimal,
maximalist chaos, retro-futuristic, organic natural...
```

## Medium Freedom (pseudocode or parameterized)

Use when a standard pattern exists but some variation is acceptable.

```markdown
Review priority:

1. Security vulnerabilities (must fix)
2. Logic errors (must fix)
3. Performance issues (should fix)
4. Maintainability (optional)
```

## Low Freedom (specific scripts, exact steps)

Use when operations are fragile, consistency is critical, or a specific sequence must be followed.

```markdown
Run exactly this script:
python scripts/migrate.py --verify --backup

Do not modify the command or add additional flags.
```

## The Test

Ask: "If Agent makes a mistake here, what's the consequence?"

- High consequence (data loss, file corruption) -> Low freedom needed
- Low consequence (style preference, approach choice) -> High freedom acceptable
