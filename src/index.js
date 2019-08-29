import isTextNode from './is-text-node'
import isWhiteSpaceNode from './is-white-space-node'

const {push} = Array.prototype

function getTextNodes(node, options) {
  const {ignoreWhiteSpace = true, deep = true} = options

  if (isTextNode(node)) {
    if (!ignoreWhiteSpace || !isWhiteSpaceNode(node)) {
      return [node]
    }

    return []
  }

  const textNodes = []
  let index = 0
  const {childNodes = []} = node
  const {length} = childNodes

  for (; index < length; index++) {
    const child = childNodes[index]

    if (deep || isTextNode(child)) {
      push.apply(textNodes, getTextNodes(child, options))
    }
  }

  return textNodes
}

export default getTextNodes
