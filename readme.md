# get-text-nodes

> get child text nodes

## Install

```sh
yarn add get-text-nodes
```

## Files

```text
lib/
├─ index.js         ( UMD )
├─ index.min.js     ( UMD, compressed )
├─ index.mjs        ( ES Module )
└─ index.min.mjs    ( ES Module, compressed )
```

## Usage

```html
<!-- ES Module -->
<script type="module">
  import getTextNodes from 'https://unpkg.com/get-text-nodes?module'
</script>

<!-- UMD -->
<script src="https://unpkg.com/get-text-nodes" nomodule></script>
```

`UMD` build exports a global function `getTextNodes`


## API

### getTextNodes(node, options?)

get child text nodes from `node`

```js
getTextNodes(document.body)
// -> [text, text, ...]
```

#### options.ignoreWhiteSpace

- Type: `boolean`
- Default: `true`
- ignore WhiteSpace text node

#### options.deep

- Type: `boolean`
- Default: `true`
- get text nodes from children
