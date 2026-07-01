import { format } from 'prettier'
import { describe, expect, it } from 'vitest'

import config from '../index.js'

const fmt = (code, filepath) => format(code, { ...config, filepath })

describe('prettier-config', () => {
  it('removes semicolons and uses single quotes', async () => {
    expect(await fmt('const value = "a";\n', 'sample.js')).toBe("const value = 'a'\n")
  })

  it('omits parentheses around single arrow parameters', async () => {
    expect(await fmt('const identity = (value) => value\n', 'sample.js')).toBe('const identity = value => value\n')
  })

  it('sorts Tailwind classes in className', async () => {
    const output = await fmt('const box = () => <div className="p-4 flex items-center" />\n', 'sample.tsx')

    expect(output).toContain('flex items-center p-4')
  })

  it('overrides YAML to double quotes', () => {
    const yamlOverride = config.overrides.find(override => override.files.includes('*.yaml'))

    expect(yamlOverride?.options.singleQuote).toBe(false)
  })
})
