# get-text-nodes

> get child text nodes

## Install

```sh
yarn add get-text-nodes
```

## Files

```text
dist/
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

### getTextNodes(nodeList, options?)

get child text nodes from `nodeList`

```js
getTextNodes(document.body)
// -> [text, text, ...]
```

#### nodeList

- `NodeList`, `Node`, `Array` or any `arrayLike`

```js
// Node
getTextNodes(document.body)

// HTMLCollection
getTextNodes(document.getElementsByTagName('*'))

// NodeList
getTextNodes(document.querySelectorAll('*'))

// Array
getTextNodes([...document.getElementsByTagName('*')])
```

#### options.ignoreWhiteSpace

- Type: `boolean`
- Default: `true`
- ignore WhiteSpace text node

#### options.deep

- Type: `boolean`
- Default: `true`
- get text nodes from children
