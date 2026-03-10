# Evaluation Report Template

## Output Format

Use this template when generating the evaluation report in Step 6.

```markdown
# Skill Evaluation: [Artifact Name]

## Summary

- **Artifact Type**: [Skill | Agent]
- **Rubric Basis**: [Standard skill rubric | Agent-adjusted skill rubric]
- **Score**: X/150 (X%)
- **Grade**: [A/B/C/D/F]
- **Pattern**: [Mindset/Navigation/Philosophy/Process/Tool]
- **Knowledge Ratio**: E:A:R = X:Y:Z
- **Verdict**: [One sentence assessment]
- **Rubric Adjustment**: [Only for agent files — explain which skill-only checks were translated or marked N/A]

## Dimension Scores

| Dimension                  | Score | Max | Notes |
| -------------------------- | ----- | --- | ----- |
| D1: Knowledge Delta        | X     | 20  |       |
| D2: Persuasion Effectiveness | X   | 15  |       |
| D3: Anti-Pattern Quality   | X     | 15  |       |
| D4: Mindset + Procedures   | X     | 15  |       |
| D5: Practical Usability    | X     | 15  |       |
| D6: Freedom Calibration    | X     | 15  |       |
| D7: Anthropic Best Practices | X   | 15  |       |
| D8: Spec Compliance        | X     | 15  |       |
| D9: Progressive Disclosure | X     | 15  |       |
| D10: Pattern Recognition   | X     | 10  |       |

## Critical Issues

[Must-fix problems that significantly impact effectiveness]

## Top 3 Improvements

1. [Highest impact improvement with specific guidance]
2. [Second priority]
3. [Third priority]

## Detailed Analysis

[For each dimension scoring below 80%, and for any agent-file normalization that materially changes D8 or D9, provide:

- What's missing or problematic
- Specific quotes from the artifact
- Concrete suggestions for improvement]
```

## Scoring Notes

- **Evidence-based**: Every score needs a specific quote or observation from the artifact
- **Improvement-oriented**: Low scores must include an actionable fix
- **Dimension weighting**: D1 (Knowledge Delta) carries most weight at 20 points — prioritize it
- **Description penalty**: If D8 < 10, note that the artifact's routing metadata is unlikely to activate or route correctly in its host
- **Agent adjustment**: Do not deduct for agent-native metadata such as `tools`, `model`, `color`, `skills`, or `whenToUse`; translate D8 and D9 to the host's agent format instead
- **Length is not quality**: A concise 43-line Skill scoring 125/150 outranks a verbose 500-line Skill scoring 95/150

## Grade Boundaries

| Grade | %      | Points  | Typical Characteristics                                            |
| ----- | ------ | ------- | ------------------------------------------------------------------ |
| A     | 90%+   | 135+    | Pure expert knowledge, excellent description, proper architecture  |
| B     | 80-89% | 120-134 | Strong content, minor gaps in structure or description             |
| C     | 70-79% | 105-119 | Useful content mixed with redundancy, or structural issues         |
| D     | 60-69% | 90-104  | Significant redundancy, poor description, or architecture problems |
| F     | <60%   | <90     | Mostly redundant, missing description, no progressive disclosure   |
