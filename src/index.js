import isTextNode from './is-text-node'
import isWhiteSpaceNode from './is-white-space-node'

const {push} = Array.prototype

function getTextNodes(nodeList, options = {}) {
  const {ignoreWhiteSpace = true, deep = true} = options

  if (isTextNode(nodeList)) {
    if (!ignoreWhiteSpace || !isWhiteSpaceNode(nodeList)) {
      return [nodeList]
    }

    return []
  }

  const textNodes = []

  // Node
  const {childNodes} = nodeList
  if (childNodes) {
    let index = 0
    const {length} = childNodes

    for (; index < length; index++) {
      const child = childNodes[index]

      if (deep || isTextNode(child)) {
        push.apply(textNodes, getTextNodes(child, options))
      }
    }
  }

  // NodeList or any arrayLike
  const {length} = nodeList

  if (length) {
    let index = 0

    for (; index < length; index++) {
      const node = nodeList[index]

      push.apply(textNodes, getTextNodes(node, options))
    }
  }

  return textNodes
}

export default getTextNodes
