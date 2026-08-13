import { resolve } from 'node:path'

import { format, resolveConfig } from 'prettier'
import { describe, expect, it } from 'vitest'

import config from '../index.js'

const fmt = (code, filepath) => format(code, { ...config, filepath })

// Overrides are applied while Prettier *resolves* a config for a path, not by
// format() when options are handed to it directly. Testing them means going
// through resolution — here via this repository's own .prettierrc.mjs, which
// re-exports the config, exactly as a consumer's config file would.
const fmtResolved = async (code, filename) => {
  const filepath = resolve(process.cwd(), filename)
  const resolved = await resolveConfig(filepath, { editorconfig: false })

  return format(code, { ...resolved, filepath })
}

describe('prettier-config', () => {
  it('removes semicolons and uses single quotes', async () => {
    expect(await fmt('const value = "a";\n', 'sample.js')).toBe("const value = 'a'\n")
  })

  it('omits parentheses around single arrow parameters', async () => {
    expect(await fmt('const identity = (value) => value\n', 'sample.js')).toBe('const identity = value => value\n')
  })

  it('wraps past the configured print width', async () => {
    const call = `const value = compute(${Array.from({ length: 12 }, (_, index) => `argument${index}`).join(', ')})\n`
    const output = await fmt(call, 'sample.js')

    expect(call.length).toBeGreaterThan(120)
    expect(output.split('\n').every(line => line.length <= 120)).toBe(true)
  })

  it('sorts Tailwind classes in className', async () => {
    const output = await fmt('const box = () => <div className="p-4 flex items-center" />\n', 'sample.tsx')

    expect(output).toContain('flex items-center p-4')
  })

  // Sorting inside className is a plugin default; sorting inside these calls is
  // this config's own choice, so a dropped tailwindFunctions entry would
  // otherwise go unnoticed.
  it.each(['tv', 'clsx', 'cva', 'tw'])('sorts Tailwind classes passed to %s()', async fn => {
    const output = await fmt(`const styles = ${fn}('p-4 flex items-center')\n`, 'sample.ts')

    expect(output).toContain("'flex items-center p-4'")
  })

  it('formats YAML with double quotes', async () => {
    // Asserted by formatting, not by reading config.overrides. The shape of the
    // override says nothing about whether Prettier honors it.
    expect(await fmtResolved("name: 'sandbox'\n", 'sample.yaml')).toBe('name: "sandbox"\n')
  })

  it('keeps single quotes outside YAML', async () => {
    // The pair is the point: double quotes in YAML is also Prettier's default,
    // so the assertion above would still pass with the override removed.
    expect(await fmtResolved('const value = "a"\n', 'sample.js')).toContain("'a'")
  })

  it('leaves a fenced code block in Markdown exactly as written', async () => {
    // The line breaks in an example are the explanation, and this one fits well
    // inside the print width — so with embedded formatting on, Prettier joins it
    // into one line and the point the example was making disappears with them.
    const fence = "```ts\ntype Locale =\n  | 'pt-BR'\n  | 'en-US'\n```\n"

    expect(await fmtResolved(fence, 'sample.md')).toBe(fence)
  })

  it('still formats code embedded outside Markdown', async () => {
    // The pair is the point again: the override is scoped to documents, so a
    // tagged template in TypeScript keeps being formatted as it always was.
    expect(await fmtResolved('const styles = css`color:red;`\n', 'sample.ts')).toContain('color: red;')
  })
})
