# Prettier Config

### Setup

Use yarn to install Prettier and custom config:

```sh
yarn add --dev prettier @leandromatos/prettier-config
```

Create a new `.prettierrc.js` file and export an object containing your settings:

```js
module.exports = {
  ...require('@leandromatos/prettier-config'),
}
```

---

&copy; All rights reserved
