# Prettier Config

Personal [Prettier](https://prettier.io) configuration: no semicolons, single quotes, 120-column line width, and Tailwind CSS class sorting, in a single package.

## ✨ Features

- **One formatter, every project** — a single source of truth for Prettier options, so formatting never drifts between repositories.
- **Tailwind class sorting built in** — bundles `prettier-plugin-tailwindcss` and sorts `className` and the `tv`, `clsx`, `cva`, and `tw` calls with no extra setup.
- **ESM, Prettier 3** — ships as an ES module against the current Prettier major.
- **Reference by string** — no config body to copy; point Prettier at the package name and you are done.
- **Override-friendly** — spread it in a flat config file and change any option locally.

## 🧭 How It Works

Prettier reads a shared config by resolving a package name to the object it exports, the same way it resolves a local `.prettierrc`. You reference `@leandromatos/prettier-config` as a string; Prettier loads this package's `index.js`, which exports the options object, and formats as if those options were written in your own config.

The Tailwind plugin travels with the config as a dependency, so class sorting works on install with nothing else to wire. It only rewrites where Tailwind classes live — `className` attributes and the configured `tailwindFunctions` — and leaves every other string untouched.

There is no merge step. Prettier applies exactly what the package exports; to change anything, you spread the object and override, shown under Configuration below.

## 📦 Installation

Install Prettier and the config as dev dependencies:

```bash
yarn add --dev prettier @leandromatos/prettier-config
```

Prettier `>= 3` is a peer dependency, so you bring your own. `prettier-plugin-tailwindcss` ships with the config; you do not install it separately.

## 🚀 Quick Start

Point the `prettier` field of your `package.json` at the package name:

```json
{
  "prettier": "@leandromatos/prettier-config"
}
```

Or put the same string in a dedicated `.prettierrc.json`:

```json
"@leandromatos/prettier-config"
```

That is the whole setup. Run Prettier as usual:

```bash
yarn prettier --write .
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

One override, for YAML, where double quotes read more naturally:

| Files             | Option        | Value   |
| ----------------- | ------------- | ------- |
| `*.yml`, `*.yaml` | `singleQuote` | `false` |

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

Semver, published to npm. The peer range is Prettier `>= 3`; a Prettier major that changes formatting defaults ships as a major here too. Snapshots publish as `X.Y.Z-snapshot.YYYYMMDD.N` to test a change before a stable release.

## 🤝 Contributing

Commits follow Conventional Commits, validated by [@leandromatos/commitlint-config](https://github.com/leandromatos/commitlint-config). Work on a `release/vMAJOR` branch and open a pull request. A release is a separate, explicit step: bump the version (the `snapshot-version-bump.sh` script for pre-releases), then push a `v*` tag, which the publish workflow picks up.

## 📄 License

This software is free and open source, released by Leandro Matos under the MIT License. See the [LICENSE](LICENSE) file for the full terms.
