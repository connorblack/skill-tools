#!/usr/bin/env bun

/**
 * Render graphviz diagrams from a skill's SKILL.md to SVG files.
 *
 * Usage:
 *   ./render-graphs.ts <skill-directory>           # Render each diagram separately
 *   ./render-graphs.ts <skill-directory> --combine  # Combine all into one diagram
 *
 * Extracts all ```dot blocks from SKILL.md and renders to SVG.
 * Requires: graphviz (dot) installed on system
 */

import path from 'node:path'

import { $ } from 'bun'

type DotBlock = Readonly<{
  name: string
  content: string
}>

function extractDotBlocks(markdown: string): DotBlock[] {
  const blocks: DotBlock[] = []
  const regex = /```dot\n([\s\S]*?)```/g
  let match: RegExpExecArray | null

  while ((match = regex.exec(markdown)) !== null) {
    const content = match[1]!.trim()
    const nameMatch = /digraph\s+(\w+)/.exec(content)
    const name = nameMatch?.[1] ?? `graph_${blocks.length + 1}`
    blocks.push({ name, content })
  }

  return blocks
}

function extractGraphBody(dotContent: string): string {
  const match = /digraph\s+\w+\s*\{([\s\S]*)\}/.exec(dotContent)
  if (!match?.[1]) return ''

  const body = match[1].replace(/^\s*rankdir\s*=\s*\w+\s*;?\s*$/gm, '')
  return body.trim()
}

function combineGraphs(blocks: readonly DotBlock[], skillName: string): string {
  const bodies = blocks.map((block, i) => {
    const body = extractGraphBody(block.content)
    return `  subgraph cluster_${i} {
    label="${block.name}";
    ${body
      .split('\n')
      .map((line) => '  ' + line)
      .join('\n')}
  }`
  })

  return `digraph ${skillName}_combined {
  rankdir=TB;
  compound=true;
  newrank=true;

${bodies.join('\n\n')}
}`
}

async function renderToSvg(dotContent: string): Promise<string | null> {
  try {
    const proc = Bun.spawn(['dot', '-Tsvg'], {
      stdin: new Blob([dotContent]),
      stderr: 'pipe',
    })

    const output = await new Response(proc.stdout).text()
    const exitCode = await proc.exited

    if (exitCode !== 0) {
      const stderr = await new Response(proc.stderr).text()
      console.error('Error running dot:', stderr)
      return null
    }

    return output
  } catch (err) {
    console.error('Error running dot:', (err as Error).message)
    return null
  }
}

async function main() {
  const args = process.argv.slice(2)
  const combine = args.includes('--combine')
  const skillDirArg = args.find((a) => !a.startsWith('--'))

  if (!skillDirArg) {
    console.error('Usage: render-graphs.ts <skill-directory> [--combine]')
    console.error('')
    console.error('Options:')
    console.error('  --combine    Combine all diagrams into one SVG')
    console.error('')
    console.error('Example:')
    console.error('  ./render-graphs.ts ../subagent-driven-development')
    console.error(
      '  ./render-graphs.ts ../subagent-driven-development --combine'
    )
    process.exit(1)
  }

  const skillDir = path.resolve(skillDirArg)
  const skillFile = path.join(skillDir, 'SKILL.md')
  const skillName = path.basename(skillDir).replace(/-/g, '_')

  if (!(await Bun.file(skillFile).exists())) {
    console.error(`Error: ${skillFile} not found`)
    process.exit(1)
  }

  const whichResult = await $`which dot`.nothrow().quiet()
  if (whichResult.exitCode !== 0) {
    console.error('Error: graphviz (dot) not found. Install with:')
    console.error('  brew install graphviz    # macOS')
    console.error('  apt install graphviz     # Linux')
    process.exit(1)
  }

  const markdown = await Bun.file(skillFile).text()
  const blocks = extractDotBlocks(markdown)

  if (blocks.length === 0) {
    console.log('No ```dot blocks found in', skillFile)
    process.exit(0)
  }

  console.log(
    `Found ${blocks.length} diagram(s) in ${path.basename(skillDir)}/SKILL.md`
  )

  const outputDir = path.join(skillDir, 'diagrams')
  await $`mkdir -p ${outputDir}`.quiet()

  if (combine) {
    const combined = combineGraphs(blocks, skillName)
    const svg = await renderToSvg(combined)
    if (svg) {
      const outputPath = path.join(outputDir, `${skillName}_combined.svg`)
      await Bun.write(outputPath, svg)
      console.log(`  Rendered: ${skillName}_combined.svg`)

      const dotPath = path.join(outputDir, `${skillName}_combined.dot`)
      await Bun.write(dotPath, combined)
      console.log(`  Source: ${skillName}_combined.dot`)
    } else {
      console.error('  Failed to render combined diagram')
    }
  } else {
    for (const block of blocks) {
      const svg = await renderToSvg(block.content)
      if (svg) {
        const outputPath = path.join(outputDir, `${block.name}.svg`)
        await Bun.write(outputPath, svg)
        console.log(`  Rendered: ${block.name}.svg`)
      } else {
        console.error(`  Failed: ${block.name}`)
      }
    }
  }

  console.log(`\nOutput: ${outputDir}/`)
}

main()
