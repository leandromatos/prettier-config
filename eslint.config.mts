import type { Config } from '@leandromatos/eslint-config'
import { configs } from '@leandromatos/eslint-config'

const eslintConfig: Config[] = [
  ...configs.recommended({ ignores: ['src/index.d.ts'] }),
  {
    files: ['.prettierrc.mjs', 'src/__tests__/**/*.js'],
    rules: {
      'import-x/no-relative-parent-imports': 'off',
      'no-restricted-imports': 'off',
    },
  },
]

export default eslintConfig
