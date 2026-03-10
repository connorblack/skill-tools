---
name: skills:skill-judge
description: Evaluate Agent Skill design quality against Anthropic specifications, persuasion research, and expert-knowledge principles. Use when reviewing, auditing, scoring, or improving SKILL.md files, skill packages, or agent prompt files. When the target is an agent file, adjust skill-only rubric checks to the agent's native format and report the normalization. Provides 10-dimension scoring (150 points) with actionable improvements.
---

# Skill Judge

Evaluate Agent Skills against Anthropic specifications, persuasion research, and expert-knowledge principles.

## Core Formula

> **Good Skill = Expert-only Knowledge - What Claude Already Knows**

A Skill's value is its **knowledge delta** — the gap between what it provides and what the model already knows. The context window is a public good shared with system prompts, conversation history, other Skills, and user requests. Every redundant token has a cost.

### Knowledge Classification

| Type           | Definition                         | Treatment                             |
| -------------- | ---------------------------------- | ------------------------------------- |
| **Expert**     | Claude genuinely doesn't know this | Must keep — this is the Skill's value |
| **Activation** | Claude knows but often overlooks   | Keep if brief — serves as reminder    |
| **Redundant**  | Claude definitely knows this       | Delete — wastes tokens                |

Good Skills pack in `Expert` content, use `Activation` sparingly, and eliminate `Redundant` ruthlessly.

## Evaluation Dimensions (150 points)

Ordered by impact on skill effectiveness:

| #   | Dimension                | Pts | What It Measures                                     | Reference                                                                  |
| --- | ------------------------ | --- | ---------------------------------------------------- | -------------------------------------------------------------------------- |
| D1  | Knowledge Delta          | 20  | Expert knowledge vs what Claude already knows        | [d1-knowledge-delta.md](references/d1-knowledge-delta.md)                   |
| D2  | Persuasion Effectiveness | 15  | Whether the skill actually changes Claude's behavior | [d2-persuasion-effectiveness.md](references/d2-persuasion-effectiveness.md) |
| D3  | Anti-Pattern Quality     | 15  | Effective NEVER lists with reasoning                 | [d3-anti-patterns.md](references/d3-anti-patterns.md)                       |
| D4  | Mindset + Procedures     | 15  | Thinking patterns + domain-specific workflows        | [d4-mindset-procedures.md](references/d4-mindset-procedures.md)             |
| D5  | Practical Usability      | 15  | Agent can actually follow this step by step          | [d5-usability.md](references/d5-usability.md)                               |
| D6  | Freedom Calibration      | 15  | Specificity matched to task fragility                | [d6-freedom-calibration.md](references/d6-freedom-calibration.md)           |
| D7  | Anthropic Best Practices | 15  | Official Anthropic skill authoring compliance        | [d7-anthropic-best-practices.md](references/d7-anthropic-best-practices.md) |
| D8  | Spec Compliance          | 15  | Frontmatter, naming, format requirements             | [d8-spec-compliance.md](references/d8-spec-compliance.md)                   |
| D9  | Progressive Disclosure   | 15  | Content layering and file organization               | [d9-progressive-disclosure.md](references/d9-progressive-disclosure.md)     |
| D10 | Pattern Recognition      | 10  | Follows established skill design pattern             | [d10-pattern-recognition.md](references/d10-pattern-recognition.md)         |

### Why This Order

- **D1** is the foundation — without expert knowledge, nothing else matters
- **D2** determines whether the skill changes behavior — a perfect skill Claude ignores under pressure is worthless
- **D3** prevents the worst failures — missing NEVER lists cause silent errors
- **D4-D6** cover execution quality — can the agent think correctly, follow the workflow, and operate at the right freedom level?
- **D7-D9** cover structural compliance — does it follow Anthropic's patterns, meet spec, and organize content well?
- **D10** is lowest weight — following archetypes helps but isn't essential

## Evaluation Protocol

### Step 0: Classify the Artifact

Before scoring, determine whether the target is a **skill** or an **agent**.

- **Skill**: `SKILL.md` file or skill directory. Use the rubric directly.
- **Agent**: standalone agent prompt file, often under `agents/`, with host-specific metadata such as `tools:`, `model:`, `color:`, `skills:`, or `whenToUse:`.

For agent targets:

- Keep D1-D6 and D10 fully in play. Agents still have knowledge delta, persuasion, mindset, usability, freedom, and pattern quality.
- Translate D7-D9 to the host format instead of treating missing `SKILL.md` conventions as defects.
- For D7, apply portable authoring principles such as concise routing metadata, clear workflows, verification loops, and predictable structure. Do **NOT** reintroduce `SKILL.md`-only packaging requirements through the best-practices check.
- Do **NOT** deduct just because the file uses agent-native frontmatter or ships as a single prompt file instead of a `SKILL.md` package.
- Do **NOT** require skill-only checks with no agent analogue, such as directory-name matches or one-level-deep skill references, unless the host actually uses those concepts.
- State the adjustment explicitly in the report. This is a rubric normalization, not a reason to re-run the evaluation from scratch.

### Step 1: Knowledge Scan

Read the target artifact completely. For a skill target, read `SKILL.md`. For an agent target, read the agent file and treat host-specific frontmatter as first-class evidence. For each section ask: "Does Claude already know this?"

Mark sections: **[E]**xpert / **[A]**ctivation / **[R]**edundant

Target ratio: >70% Expert, <20% Activation, <10% Redundant

-> Load [d1-knowledge-delta.md](references/d1-knowledge-delta.md) for D1 scoring criteria

### Step 2: Persuasion & Mindset Assessment

Classify the artifact type and evaluate whether the right persuasion principles are applied.

-> Load [d2-persuasion-effectiveness.md](references/d2-persuasion-effectiveness.md) for principle selection by skill type
-> Load [d4-mindset-procedures.md](references/d4-mindset-procedures.md) for domain-specific thinking patterns

**Key questions:**

- Does the artifact use Authority language on fragile operations? (MUST, NEVER, No exceptions)
- Does it create Commitment devices? (announcements, checklists, TodoWrite tracking)
- Does it establish Social Proof norms? ("X without Y fails. Every time.")
- Does it AVOID Liking/Reciprocity? (these create sycophancy)
- Is the mindset domain-specific or generic? (generic = Redundant)

### Step 3: Structure Audit

Check:

- Frontmatter validity (name format, description quality)
- Naming conventions and collection consistency
- Description clarity and discovery triggers
- Total line count (target: <500 lines)
- Reference file organization (one level deep from SKILL.md)
- Loading triggers embedded in workflow
- Anthropic patterns: conciseness, degrees of freedom, progressive disclosure, feedback loops

For agent targets, translate skill-package checks into agent equivalents:

- native frontmatter quality and routing clarity
- tool/runtime surface matches the job
- supporting references are discoverable in the host's actual structure
- packaging fits the host instead of forcing `SKILL.md`-specific rules

-> Load [d7-anthropic-best-practices.md](references/d7-anthropic-best-practices.md) for official Anthropic authoring patterns. For agent targets, use the portable instruction-design principles and ignore `SKILL.md`-only packaging requirements already normalized in Step 0.
-> Load [d8-spec-compliance.md](references/d8-spec-compliance.md) for format requirements
-> Load [naming-conventions.md](references/naming-conventions.md) for naming checks
-> Load [description-guidelines.md](references/description-guidelines.md) for description quality
-> Load [d9-progressive-disclosure.md](references/d9-progressive-disclosure.md) for architecture scoring

### Step 4: Quality Assessment

Evaluate anti-patterns, freedom calibration, pattern fit, and usability.

-> Load [d3-anti-patterns.md](references/d3-anti-patterns.md) for NEVER list evaluation
-> Load [d6-freedom-calibration.md](references/d6-freedom-calibration.md) for freedom spectrum
-> Load [d10-pattern-recognition.md](references/d10-pattern-recognition.md) for pattern identification
-> Load [d5-usability.md](references/d5-usability.md) for practical usability checks

### Step 5: Diagnose Issues

If any dimension scores below 80%, identify the root cause.

-> Load [failure-patterns.md](references/failure-patterns.md) for 9 common failure patterns

### Step 6: Generate Report

-> Load [report-template.md](references/report-template.md) for output format

If the target is an agent file, include the artifact type and the normalization note in the summary before presenting scores.

## Grade Scale

| Grade | %      | Points  | Meaning                            |
| ----- | ------ | ------- | ---------------------------------- |
| A     | 90%+   | 135+    | Production-ready expert Skill      |
| B     | 80-89% | 120-134 | Good — minor improvements          |
| C     | 70-79% | 105-119 | Adequate — clear improvement path  |
| D     | 60-69% | 90-104  | Below average — significant issues |
| F     | <60%   | <90     | Needs fundamental redesign         |

## NEVER Do When Evaluating

- **NEVER** give high scores because it looks professional or well-formatted
- **NEVER** ignore token waste — every redundant paragraph costs a deduction
- **NEVER** let length impress you — a 43-line Skill can outperform a 500-line Skill
- **NEVER** skip testing decision trees — do they lead to correct choices?
- **NEVER** forgive explaining basics with "but it provides helpful context"
- **NEVER** undervalue the description field — poor description = skill never activated
- **NEVER** assume all procedures are valuable — distinguish domain-specific from generic
- **NEVER** score D2 high just because it uses strong language — check principle-to-skill-type match
- **NEVER** skip the Anthropic best practices check — official docs define the ground truth
- **NEVER** deduct agent files just for using native agent metadata or host-specific packaging

## The Meta-Question

> **"Would an expert in this domain say: 'Yes, this captures knowledge that took me years to learn'?"**

If yes -> genuine value. If no -> compressing what Claude already knows.

The best Skills are **compressed expert brains** — years of expertise compressed into a focused reference an agent applies immediately. What gets compressed must be things Claude doesn't have.
