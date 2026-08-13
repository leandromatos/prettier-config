/**
 * The plugin is resolved to an absolute URL rather than named as a string, because Prettier
 * resolves a plugin name from the formatted project's root — not from the config that asked for it.
 * Under a hoisting package manager the two happen to coincide; under pnpm they do not, and every
 * consumer would have to install `prettier-plugin-tailwindcss` itself to make a dependency this
 * package already declares resolvable.
 *
 * `import.meta.resolve` over `createRequire().resolve` so the package needs no `@types/node` for one
 * line; Prettier hands the value to `import()`, which takes a `file:` URL as readily as a path.
 *
 * @type {import('prettier').Config}
 */
const config = {
  arrowParens: 'avoid',
  printWidth: 120,
  semi: false,
  singleQuote: true,
  plugins: [import.meta.resolve('prettier-plugin-tailwindcss')],
  tailwindFunctions: ['tv', 'clsx', 'cva', 'tw'],
  overrides: [
    {
      files: ['*.yml', '*.yaml'],
      options: {
        singleQuote: false,
      },
    },
    {
      // Prettier formats code embedded in another language, so a fenced block in a document is
      // reformatted with the same rules as source — and at a print width of 120, any example that
      // fits on one line is joined into one, however it was written.
      //
      // That is right for source files and wrong for prose: in an example the line breaks are the
      // explanation. A type written across four lines to show what the alternatives are, or a JSON
      // payload with one field per line, both collapse into a line nobody can read, and the point
      // they were making disappears with the breaks.
      //
      // Scoped to Markdown, so a template literal in TypeScript is still formatted as before.
      files: ['*.md', '*.mdx'],
      options: {
        embeddedLanguageFormatting: 'off',
      },
    },
  ],
}

export default config
