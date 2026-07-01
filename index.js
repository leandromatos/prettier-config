/** @type {import('prettier').Config} */
const config = {
  arrowParens: 'avoid',
  printWidth: 120,
  semi: false,
  singleQuote: true,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['tv', 'clsx', 'cva', 'tw'],
  overrides: [
    {
      files: ['*.yml', '*.yaml'],
      options: {
        singleQuote: false,
      },
    },
  ],
}

export default config
