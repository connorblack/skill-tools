# Common Failure Patterns

When a Skill or agent prompt scores poorly, diagnose the root cause using these patterns.

## Diagnosis Shortcut

| Observed Symptom                | Likely Pattern         | Primary Dimension          |
| ------------------------------- | ---------------------- | -------------------------- |
| SKILL.md > 500 lines            | The Dump (#2)          | D9: Progressive Disclosure |
| "What is X" sections            | The Tutorial (#1)      | D1: Knowledge Delta        |
| No NEVER list                   | The Vague Warning (#5) | D3: Anti-Patterns          |
| Artifact rarely activates       | The Invisible (#6)     | D8: Spec Compliance        |
| Step 1, 2, 3... only            | The Checkbox (#4)      | D4: Mindset                |
| References never loaded         | Orphan References (#3) | D9: Progressive Disclosure |
| README.md, CHANGELOG.md present | Over-Engineered (#8)   | D9: Progressive Disclosure |
| Triggers only in body           | Wrong Location (#7)    | D8: Spec Compliance        |
| Scripts for creative work       | Freedom Mismatch (#9)  | D6: Freedom Calibration    |

---

## Pattern 1: The Tutorial

**Symptom**: Explains what PDF is, how Python works, basic library usage
**Root cause**: Author incorrectly assumes Skill "teaches" the model
**Fix**: Delete all basic explanations. Claude already knows this. Focus on expert decisions, trade-offs, and anti-patterns.

## Pattern 2: The Dump

**Symptom**: SKILL.md is 800+ lines with everything included
**Root cause**: No progressive disclosure design
**Fix**: Core routing in SKILL.md (<500 lines). Detailed content in reference files, loaded on-demand.

## Pattern 3: The Orphan References

**Symptom**: Reference files exist but never get loaded
**Root cause**: No explicit loading triggers in workflow
**Fix**: Embed loading triggers at workflow decision points. Add "Do NOT Load" to prevent over-loading.

## Pattern 4: The Checkbox Procedure

**Symptom**: Step 1, Step 2, Step 3... mechanical procedures only
**Root cause**: Author thinks in procedures, not thinking frameworks
**Fix**: Transform into "Before doing X, ask yourself..." Focus on decision principles, not operation sequences.

## Pattern 5: The Vague Warning

**Symptom**: "Be careful", "avoid errors", "consider edge cases"
**Root cause**: Author knows things can go wrong but hasn't articulated specifics
**Fix**: Specific NEVER list with concrete examples and non-obvious reasons.

## Pattern 6: The Invisible Skill

**Symptom**: Great content but skill rarely gets activated
**Root cause**: Description is vague, missing keywords, lacks trigger scenarios
**Fix**: Description must answer WHAT + WHEN + KEYWORDS. "Use when..." + specific scenarios + searchable terms.

Example:

- Bad: "Helps with document tasks"
- Good: "Create, edit, and analyze .docx files. Use when working with Word documents, tracked changes, or professional document formatting."

## Pattern 7: The Wrong Location

**Symptom**: Triggering information lives only in the body, not in the host's routing metadata
**Root cause**: Misunderstanding of three-layer loading
**Fix**: Move triggering information into the host's activation surface: `description` for Skills, `description`, `whenToUse`, or equivalent routing metadata for agents. The body is only loaded AFTER the routing decision is made.

## Pattern 8: The Over-Engineered

**Symptom**: README.md, CHANGELOG.md, INSTALLATION_GUIDE.md, CONTRIBUTING.md
**Root cause**: Treating Skill like a software project
**Fix**: Delete all auxiliary files. Only include what Agent needs for the task. No documentation about the Skill itself.

## Pattern 9: The Freedom Mismatch

**Symptom**: Rigid scripts for creative tasks, vague guidance for fragile operations
**Root cause**: Not considering task fragility
**Fix**: High freedom for creative (principles, not steps). Low freedom for fragile (exact scripts, no parameters).
