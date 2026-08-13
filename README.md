# Prettier Config

Personal [Prettier](https://prettier.io) configuration: no semicolons, single quotes, 120-column line width, and Tailwind CSS class sorting.

## ✨ Features

- **One formatter, every project** — a single source of truth for Prettier options, so formatting never drifts between repositories.
- **Tailwind class sorting built in** — bundles `prettier-plugin-tailwindcss` and sorts `className` and the `tv`, `clsx`, `cva`, and `tw` calls with no extra setup.
- **ESM, Prettier 3** — ships as an ES module against the current Prettier major.
- **Typed** — publishes type declarations, so importing it from TypeScript gives you a checked `Config` instead of an implicit `any`.
- **Reference by string** — no config body to copy; point Prettier at the package name and you are done.
- **Override-friendly** — spread it in a flat config file and change any option locally.

## 🧭 How It Works

Prettier reads a shared config by resolving a package name to the object it exports, the same way it resolves a local `.prettierrc`. You reference `@leandromatos/prettier-config` as a string; Prettier loads this package's `src/index.js`, which exports the options object, and formats as if those options were written in your own config.

The Tailwind plugin travels with the config as a dependency, so class sorting works on install with nothing else to wire. It only rewrites where Tailwind classes live — `className` attributes and the configured `tailwindFunctions` — and leaves every other string untouched.

There is no merge step. Prettier applies exactly what the package exports; to change anything, you spread the object and override, shown under Configuration below.

## 📦 Installation

Install Prettier and the config as dev dependencies:

```bash
yarn add --dev prettier @leandromatos/prettier-config
```

Prettier `>= 3` is a peer dependency, so you bring your own. `prettier-plugin-tailwindcss` ships with the config; you do not install it separately.

Node `>= 22.12.0` is required.

## 🚀 Quick Start

Reference the config by name from a `.prettierrc` file at your project root:

```json
"@leandromatos/prettier-config"
```

That is the whole setup. Run Prettier as usual:

```bash
yarn prettier --write .
```

### Editor and lint-staged setup

Format on save with Prettier as the default formatter (VSCode, with the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), `.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

[lint-staged](https://github.com/lint-staged/lint-staged) (`lint-staged.config.mjs`) — format staged files on commit:

```js
export default {
  '*': 'prettier --write --ignore-unknown',
}
```

## 🧩 What's Included

The base options, applied to every file:

| Option              | Value                         | Description                                                |
| ------------------- | ----------------------------- | ---------------------------------------------------------- |
| `arrowParens`       | `avoid`                       | Omit parentheses around a single arrow-function parameter. |
| `printWidth`        | `120`                         | Wrap past 120 columns.                                     |
| `semi`              | `false`                       | No semicolons.                                             |
| `singleQuote`       | `true`                        | Single quotes.                                             |
| `plugins`           | `prettier-plugin-tailwindcss` | Sort Tailwind CSS classes.                                 |
| `tailwindFunctions` | `tv`, `clsx`, `cva`, `tw`     | Calls whose string arguments get class sorting.            |

Two overrides:

| Files             | Option                       | Value   | Why                                                 |
| ----------------- | ---------------------------- | ------- | --------------------------------------------------- |
| `*.yml`, `*.yaml` | `singleQuote`                | `false` | Double quotes read more naturally in YAML.          |
| `*.md`, `*.mdx`   | `embeddedLanguageFormatting` | `off`   | A fenced example keeps the shape it was written in. |

The Markdown one is worth spelling out. Prettier formats code embedded in another language, so a fenced block in a document gets the same rules as source — and at a print width of 120, an example that fits on one line is joined into one, however it was written. That is right for source files and wrong for prose: in an example the line breaks are the explanation. A type written across four lines to show what the alternatives are collapses into a line nobody can read, and the point it was making disappears with the breaks.

The override is scoped to documents, so a template literal in TypeScript is still formatted as before.

`plugins` holds a resolved absolute URL rather than the plugin's name, and that is deliberate. Prettier resolves a plugin name from the formatted project's root, not from the config that asked for it, so a bare name only works when the package manager happens to hoist the plugin there — pnpm does not. Resolving it here means the dependency this package declares is the one that loads, whatever the consumer installs with.

## ⚙️ Configuration

Prettier has no `extends`, so you override by spreading the config. Import it in a `prettier.config.mjs` and change any option:

```js
import config from '@leandromatos/prettier-config'

export default {
  ...config,
  semi: true, // this project keeps semicolons
}
```

## 🏷️ Versioning

Semver, published to npm. The peer range is Prettier `>= 3` on Node `>= 22.12.0`; a Prettier major that changes formatting defaults ships as a major here too. Snapshots publish to the `snapshot` dist-tag as `X.Y.Z-snapshot.YYYYMMDD.N`; stable releases go to `latest`.

## 🤝 Contributing

This repository follows [Conventional Commits](https://www.conventionalcommits.org). See [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow, releases, and local setup.

## 📄 License

This software is free and open source, released by Leandro Matos under the MIT License. See the [LICENSE](LICENSE) file for the full terms.
