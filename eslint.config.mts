import config from '@leandromatos/eslint-config'

export default [
  ...config,
  {
    ignores: ['coverage', 'src/index.d.ts'],
  },
  {
    files: ['.prettierrc.mjs', 'src/__tests__/**/*.js'],
    rules: {
      'import-x/no-relative-parent-imports': 'off',
      'no-restricted-imports': 'off',
    },
  },
]
