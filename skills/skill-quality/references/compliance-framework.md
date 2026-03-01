# Skill Compliance Framework

Persuasion design audit criteria for skills. Based on Meincke et al. (2025): persuasion techniques more than doubled LLM compliance rates (33% to 72%, p < .001). Authority, commitment, and scarcity were the most effective principles.

## Step 1: Classify Skill Type

Read the skill. Classify by primary intent:

| Type                   | Signals                                                | Examples                                    |
| ---------------------- | ------------------------------------------------------ | ------------------------------------------- |
| **Discipline**         | Rules, "must," "never," checklists, required workflows | TDD, verification-before-completion         |
| **Guidance/technique** | How-to, patterns, decision criteria, examples          | condition-based-waiting, root-cause-tracing |
| **Collaborative**      | Team workflows, shared processes, partner interactions | code-review, pair-programming               |
| **Reference**          | API docs, command references, lookup tables            | CLI tools, library guides                   |

Mixed-type skills exist. Classify by the **dominant** intent — whatever occupies the most lines.

## Step 2: Audit Principle Usage

### The Seven Principles

| Principle        | Mechanism                                  | Skill use                                           |
| ---------------- | ------------------------------------------ | --------------------------------------------------- |
| **Authority**    | Deference to expertise/imperative language | "YOU MUST", "Never", "No exceptions"                |
| **Commitment**   | Consistency with prior declarations        | Announcements, TodoWrite tracking, explicit choices |
| **Scarcity**     | Urgency from time/sequence constraints     | "Before proceeding", "Immediately after X"          |
| **Social Proof** | Conformity to norms                        | "Every time", "X without Y = failure"               |
| **Unity**        | Shared identity, "we-ness"                 | "Our codebase", "we both want quality"              |
| **Reciprocity**  | Obligation to return benefits              | Rarely needed, can feel manipulative                |
| **Liking**       | Preference for cooperation                 | DON'T use for compliance — creates sycophancy       |

### Expected Principles by Skill Type

| Skill Type         | Use                                   | Avoid               |
| ------------------ | ------------------------------------- | ------------------- |
| Discipline         | Authority + Commitment + Social Proof | Liking, Reciprocity |
| Guidance/technique | Moderate Authority + Unity            | Heavy authority     |
| Collaborative      | Unity + Commitment                    | Authority, Liking   |
| Reference          | Clarity only                          | All persuasion      |

### Discipline Skills — Required Principles

| Principle        | What to check for                                            | Severity if missing |
| ---------------- | ------------------------------------------------------------ | ------------------- |
| **Authority**    | Imperative language ("YOU MUST," "Never," "No exceptions")   | FAIL                |
| **Commitment**   | Announcements, TodoWrite tracking, explicit declarations     | WARN                |
| **Social Proof** | Failure mode warnings ("X without Y = failure. Every time.") | WARN                |

### Discipline Skills — Anti-Pattern Principles

| Principle       | What to flag                                     | Severity |
| --------------- | ------------------------------------------------ | -------- |
| **Liking**      | Flattery, excessive praise, "you're doing great" | FAIL     |
| **Reciprocity** | "I'll help you if you follow this rule"          | WARN     |

### Guidance/Technique Skills

| Principle     | What to check for                                          | Severity if missing |
| ------------- | ---------------------------------------------------------- | ------------------- |
| **Authority** | Moderate — named standards, cited sources (not imperative) | INFO                |
| **Unity**     | Collaborative framing — "our codebase," "we want quality"  | INFO                |

**Anti-pattern:** Heavy authority ("YOU MUST") in a guidance skill creates rigidity. Flag as WARN.

### Collaborative Skills

**Expected:** Unity + Commitment. **Anti-pattern:** Authority (creates hierarchy where partnership is needed). Flag as WARN.

### Reference Skills

**Expected:** Clarity only. **Anti-pattern:** Any persuasion language. Flag as INFO.

## Step 3: Audit Loophole Defenses (Discipline Skills Only)

Discipline skills fail when agents rationalize around the rules.

| Defense                       | What to look for                                                      | Severity if missing |
| ----------------------------- | --------------------------------------------------------------------- | ------------------- |
| **Rationalization table**     | Table of excuses with counters ("Too simple to test" / "Test anyway") | FAIL                |
| **Red flags list**            | Bullet list of "if you're thinking X, STOP"                           | FAIL                |
| **Explicit loophole closers** | "No exceptions: don't keep it as reference, don't adapt it..."        | FAIL                |
| **Spirit vs. letter address** | Statement like "Violating the letter IS violating the spirit"         | WARN                |
| **Implementation intentions** | "When X happens, do Y" — not "generally do Y"                         | WARN                |

**Scoring:** A discipline skill missing ALL THREE FAIL-severity defenses is **non-compliant**. Agents will find workarounds under pressure.

## Step 4: Audit Bright-Line Rules

| Pattern                       | Type        | Verdict                             |
| ----------------------------- | ----------- | ----------------------------------- |
| "YOU MUST do X before Y"      | Bright-line | PASS                                |
| "Consider doing X"            | Fuzzy       | FAIL (discipline) / PASS (guidance) |
| "When feasible, do X"         | Fuzzy       | FAIL (discipline) / PASS (guidance) |
| "Always do X. No exceptions." | Bright-line | PASS                                |
| "Try to do X when possible"   | Fuzzy       | FAIL (discipline) / WARN (guidance) |
| "X without Y = failure"       | Bright-line | PASS                                |

Discipline skills should have zero fuzzy rules for core requirements. Guidance skills may use moderate fuzziness.

## Verdicts

| Verdict           | Criteria                                                                  |
| ----------------- | ------------------------------------------------------------------------- |
| **COMPLIANT**     | Zero FAIL findings. Expected principles present.                          |
| **NEEDS WORK**    | 1-2 FAIL findings, or missing loophole defenses.                          |
| **NON-COMPLIANT** | 3+ FAIL findings, or anti-pattern principles present in wrong skill type. |

## NEVER

| Temptation                                          | Why it fails                                                 |
| --------------------------------------------------- | ------------------------------------------------------------ |
| "This guidance skill needs more authority"          | Heavy authority in guidance creates rigidity, not compliance |
| "Reference skills should have red flags lists"      | Reference skills should be neutral. No persuasion needed.    |
| "Every skill needs a rationalization table"         | Only discipline skills need anti-rationalization defenses    |
| "Liking patterns help discipline skills"            | Liking undermines honest feedback and creates sycophancy     |
| "Skip the audit — the skill is obviously compliant" | Obvious compliance = untested compliance                     |
