# Skill Prose Rules

Prose quality criteria for skill content based on Strunk's Elements of Style (Rules 10-13) and token waste detection patterns.

## Active Voice (Strunk Rule 10)

Passive voice hides the actor. In skills, the actor is almost always "you" (the LLM).

| Passive | Active |
| ------- | ------ |
| "X is invoked" | "Invoke X" |
| "The file should be read" | "Read the file" |
| "Tests are run after..." | "Run tests after..." |
| "Errors are handled by..." | "Handle errors by..." |

**Severity:** WARN per instance. FAIL if 5+ passive instructions exist.

**Exception:** Passive is correct for side effects: "The file is overwritten."

## Positive Form (Strunk Rule 11)

Negative instructions force meaning inversion. Positive form is shorter and unambiguous.

| Negative | Positive |
| -------- | -------- |
| "Do not forget to X" | "Always X" |
| "Not uncommon" | "Common" |
| "Do not fail to verify" | "Verify" |
| "It is not incorrect to..." | "It is correct to..." |

**Severity:** WARN per instance. **Exception:** NEVER tables and explicit prohibitions legitimately use negation.

## Concrete Language (Strunk Rule 12)

Vague instructions force the LLM to guess. Every instruction should be concrete enough to execute without interpretation.

| Vague | Concrete |
| ----- | -------- |
| "Handle appropriately" | "Log the error and retry once" |
| "Process the data" | "Parse JSON, extract the `name` field" |
| "Ensure quality" | "Run the lint script and check for FAIL results" |
| "Various factors" | Name them |

### Hackneyed Words

| Word | Preferred |
| ---- | --------- |
| "case" | Cut ("in many cases" = "often") |
| "factor" | Name the cause |
| "nature/character" | Cut wrapper ("of a complex nature" = "complex") |
| "facilitate/utilize/leverage" | "Use" |
| "very" | Stronger word or cut |

**Severity:** WARN for vague action steps. INFO in descriptions or context.

## Concise Expression (Strunk Rule 13)

Every word burns tokens. A sentence should contain no unnecessary words for the same reason a machine should have no unnecessary parts.

| Bloated | Concise |
| ------- | ------- |
| "in order to" | "to" |
| "the fact that" | Cut or rephrase |
| "it is important to note that" | Cut entirely |
| "due to the fact that" | "because" |
| "in the event that" | "if" |
| "for the purpose of" | "to" |
| "whether or not" | "whether" |

Also flag: redundant relative clauses ("is a man who is" = cut), throat-clearing openers ("It should be noted..." = cut), wrapper phrases ("is a skill that" = cut).

**Severity:** INFO per instance. WARN if same pattern appears 3+ times.

## Token Waste Patterns

Structural anti-patterns that burn tokens without improving LLM behavior. Distinct from sentence-level bloat above.

### Attribution Signals

Content that establishes credibility for humans but has zero LLM value.

| Pattern | Example |
| ------- | ------- |
| "Inspired by X" | "Inspired by DHH's approach" |
| "Based on X's methodology" | "Based on Martin Fowler's patterns" |
| "According to X" | "According to industry experts" |
| "As recommended by" | "As recommended by Google" |

**Detection regex:**

```regex
(inspired by|based on|according to|as recommended by|following|using|applying)\s+[A-Z][a-z]+('s)?
```

**Exception:** Names that define a style ("DHH-style Rails") are functional, not attribution.

### Decorative Quotes

Inspirational or philosophical quotes with no functional value.

| Pattern | Example |
| ------- | ------- |
| Epigraph quotes | "The best code is no code" — Someone |
| Philosophy | "In the spirit of simplicity..." |

**Detection regex:**

```regex
[""][^""]{20,}[""][\s]*[-—]\s*[A-Z]
```

### Redundant Explanations

Explaining what the LLM already knows or can infer.

| Pattern | Example |
| ------- | ------- |
| Tool explanations | "The Read tool allows you to read files" |
| Obvious context | "This agent is used for..." |
| Meta-commentary | "The following section describes..." |

**Detection regex:**

```regex
(this (agent|skill|command) (is used|helps|allows|enables))
```

### False Positives

| Pattern | Legitimate use |
| ------- | -------------- |
| "Based on" | "Based on user input" (not attribution) |
| "Consider" | In decision trees with conditions |
| Author names | When defining a style (DHH, Fowler) |

**Severity:** WARN for attribution and decorative quotes. INFO for redundant explanations (may be intentional).

## Structure Violations

### Parallel Construction — WARN

| Violation | Fix |
| --------- | --- |
| "Read file, writing output, then verify" | "Read file, write output, verify" |
| "- Run tests / - Testing coverage / - To verify" | Pick one form: all imperatives or all gerunds |

### Related Words Together — WARN

| Violation | Fix |
| --------- | --- |
| "Only run tests that are failing currently." | "Run only currently failing tests." |

### Emphasis at End — INFO

| Weak ending | Strong ending |
| ----------- | ------------- |
| "Run tests before committing, always." | "Before committing, always run tests." |

### Paragraph Discipline — INFO

Flag paragraphs covering 2+ topics or burying the main point after setup.

## Verdicts

| Verdict | Criteria |
| ------- | -------- |
| **CLEAN** | Zero FAIL, 2 or fewer WARN. Prose is clear and concise. |
| **NEEDS EDITING** | 1+ FAIL or 3+ WARN. Specific sentences need rewriting. |
| **REWRITE** | 5+ FAIL or systematic violations across multiple categories. |

## NEVER

| Temptation | Why it fails |
| ---------- | ------------ |
| "Passive voice is always wrong" | Passive is correct for side effects and consequences |
| "Every 'very' must go" | Flag overuse, not existence |
| "Shorter is always better" | Concise does not mean terse. Cut waste, keep necessary detail |
| "Fix the prose, ignore the content" | Prose fixes must preserve technical accuracy |
| "Flag NEVER sections for negative form" | NEVER sections legitimately use negation |
| "Attribution is always fluff" | Names defining a style are functional |
| "All 'Based on' phrases are attribution" | "Based on user input" is not attribution — check context |
