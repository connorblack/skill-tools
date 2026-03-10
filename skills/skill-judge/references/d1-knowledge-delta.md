# D1: Knowledge Delta (20 points)

The most important dimension. Does the Skill add genuine expert knowledge?

## Scoring

| Score | Criteria                                                             |
| ----- | -------------------------------------------------------------------- |
| 0-5   | Explains basics Claude knows (what is X, standard library tutorials) |
| 6-10  | Mixed: some expert knowledge diluted by obvious content              |
| 11-15 | Mostly expert knowledge with minimal redundancy                      |
| 16-20 | Pure knowledge delta — every paragraph earns its tokens              |

## Red Flags (instant score <=5)

- "What is [basic concept]" sections
- Step-by-step tutorials for standard operations
- Explaining how to use common libraries
- Generic best practices ("write clean code", "handle errors")
- Definitions of industry-standard terms

## Green Flags (high knowledge delta)

- Decision trees for non-obvious choices ("when X fails, try Y because Z")
- Trade-offs only an expert would know ("A is faster but B handles edge case C")
- Edge cases from real-world experience
- "NEVER do X because [non-obvious reason]"
- Domain-specific thinking frameworks

## Evaluation Method

1. For each section, ask: "Does Claude already know this?"
2. If explaining something: "Is this explaining TO Claude or FOR Claude?"
3. Count paragraphs: Expert vs Activation vs Redundant

## The Default Assumption

From Anthropic's official guidance:

> Claude is already very smart. Only add context Claude doesn't already have.

Challenge each piece of information:

- "Does Claude really need this explanation?"
- "Can I assume Claude knows this?"
- "Does this paragraph justify its token cost?"

## Conciseness Examples (from Anthropic)

**Good** (~50 tokens):

```markdown
## Extract PDF text

Use pdfplumber for text extraction:
import pdfplumber
with pdfplumber.open("file.pdf") as pdf:
text = pdf.pages[0].extract_text()
```

**Bad** (~150 tokens):

```markdown
## Extract PDF text

PDF (Portable Document Format) files are a common file format that contains
text, images, and other content. To extract text from a PDF, you'll need to
use a library. There are many libraries available...
```

The concise version assumes Claude knows what PDFs are and how libraries work.
