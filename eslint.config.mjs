import config from '@leandromatos/eslint-config'

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  ...config,
  {
    ignores: ['coverage', 'CHANGELOG.md'],
  },
  {
    files: ['.prettierrc.mjs', 'test/**/*.js'],
    rules: {
      'import-x/no-relative-parent-imports': 'off',
      'no-restricted-imports': 'off',
    },
  },
]
