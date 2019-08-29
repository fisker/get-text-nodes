const WHITE_SPACE = /^\s*$/

function isWhiteSpaceNode(node) {
  return WHITE_SPACE.test(node.nodeValue)
}

export default isWhiteSpaceNode
