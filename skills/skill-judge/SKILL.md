---
name: skills:skill-judge
description: Evaluate Agent Skill design quality against official Anthropic specifications and best practices. Use when reviewing, auditing, scoring, or improving SKILL.md files and skill packages. Provides 8-dimension scoring (120 points) with actionable improvements.
---

# Skill Judge

Evaluate Agent Skills against official Anthropic specifications and best practices.

## Core Formula

> **Good Skill = Expert-only Knowledge - What Claude Already Knows**

A Skill's value is its **knowledge delta** — the gap between what it provides and what the model already knows. The context window is a public good shared with system prompts, conversation history, other Skills, and user requests. Every redundant token has a cost.

### Knowledge Classification

| Type           | Definition                         | Treatment                             |
| -------------- | ---------------------------------- | ------------------------------------- |
| **Expert**     | Claude genuinely doesn't know this | Must keep — this is the Skill's value |
| **Activation** | Claude knows but often overlooks   | Keep if brief — serves as reminder    |
| **Redundant**  | Claude definitely knows this       | Delete — wastes tokens                |

Good Skills maximize `Expert` content, use `Activation` sparingly, and eliminate `Redundant` ruthlessly.

## Evaluation Dimensions (120 points)

| #   | Dimension              | Pts | What It Measures                                    | Reference                                                              |
| --- | ---------------------- | --- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| D1  | Knowledge Delta        | 20  | Expert knowledge vs what Claude already knows       | [d1-knowledge-delta.md](reference/d1-knowledge-delta.md)               |
| D2  | Mindset + Procedures   | 15  | Thinking patterns + domain-specific workflows       | [d2-mindset-procedures.md](reference/d2-mindset-procedures.md)         |
| D3  | Anti-Pattern Quality   | 15  | Effective NEVER lists with reasoning                | [d3-anti-patterns.md](reference/d3-anti-patterns.md)                   |
| D4  | Spec Compliance        | 15  | Anthropic format requirements + description quality | [d4-spec-compliance.md](reference/d4-spec-compliance.md)               |
| D5  | Progressive Disclosure | 15  | Content layering and file organization              | [d5-progressive-disclosure.md](reference/d5-progressive-disclosure.md) |
| D6  | Freedom Calibration    | 15  | Specificity matched to task fragility               | [d6-freedom-calibration.md](reference/d6-freedom-calibration.md)       |
| D7  | Pattern Recognition    | 10  | Follows established skill design pattern            | [d7-pattern-recognition.md](reference/d7-pattern-recognition.md)       |
| D8  | Practical Usability    | 15  | Agent can actually use this effectively             | [d8-usability.md](reference/d8-usability.md)                           |

## Evaluation Protocol

### Step 1: Knowledge Scan

Read the target SKILL.md completely. For each section ask: "Does Claude already know this?"

Mark sections: `**[E]**xpert` / `**[A]**ctivation` / `**[R]**edundant`

Target ratio: >70% Expert, <20% Activation, <10% Redundant

-> Load [d1-knowledge-delta.md](reference/d1-knowledge-delta.md) for D1 scoring criteria
-> Load [d2-mindset-procedures.md](reference/d2-mindset-procedures.md) for D2 scoring criteria

### Step 2: Structure Audit

Check:

- Frontmatter validity (name format, description quality)
- Naming conventions and collection consistency
- Description clarity and discovery triggers
- Total line count (target: <500 lines)
- Reference file organization (one level deep from SKILL.md)
- Loading triggers embedded in workflow

-> Load [d4-spec-compliance.md](reference/d4-spec-compliance.md) for Anthropic spec requirements
-> Load [naming-conventions.md](reference/naming-conventions.md) for naming checks
-> Load [description-guidelines.md](reference/description-guidelines.md) for description quality
-> Load [d5-progressive-disclosure.md](reference/d5-progressive-disclosure.md) for architecture scoring

### Step 3: Quality Assessment

Evaluate antipatterns, freedom calibration, pattern fit, and usability.

-> Load [d3-anti-patterns.md](reference/d3-anti-patterns.md) for NEVER list evaluation
-> Load [d6-freedom-calibration.md](reference/d6-freedom-calibration.md) for freedom spectrum
-> Load [d7-pattern-recognition.md](reference/d7-pattern-recognition.md) for pattern identification
-> Load [d8-usability.md](reference/d8-usability.md) for practical usability checks

### Step 4: Diagnose Issues

If any dimension scores below 80%, identify the root cause.

-> Load [failure-patterns.md](reference/failure-patterns.md) for 9 common failure patterns

### Step 5: Generate Report

-> Load [report-template.md](reference/report-template.md) for output format

## Grade Scale

| Grade | %      | Points | Meaning                            |
| ----- | ------ | ------ | ---------------------------------- |
| A     | 90%+   | 108+   | Production-ready expert Skill      |
| B     | 80-89% | 96-107 | Good — minor improvements          |
| C     | 70-79% | 84-95  | Adequate — clear improvement path  |
| D     | 60-69% | 72-83  | Below average — significant issues |
| F     | <60%   | <72    | Needs fundamental redesign         |

## NEVER Do When Evaluating

- **NEVER** give high scores because it looks professional or well-formatted
- **NEVER** ignore token waste — every redundant paragraph costs a deduction
- **NEVER** let length impress you — a 43-line Skill can outperform a 500-line Skill
- **NEVER** skip testing decision trees — do they lead to correct choices?
- **NEVER** forgive explaining basics with "but it provides helpful context"
- **NEVER** undervalue the description field — poor description = skill never activated
- **NEVER** assume all procedures are valuable — distinguish domain-specific from generic

## The Meta-Question

> **"Would an expert in this domain say: 'Yes, this captures knowledge that took me years to learn'?"**

If yes -> genuine value. If no -> compressing what Claude already knows.

The best Skills are **compressed expert brains** — years of expertise compressed into a focused reference an agent applies immediately. What gets compressed must be things Claude doesn't have.
