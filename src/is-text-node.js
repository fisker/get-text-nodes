// const {TEXT_NODE = 3} = Node

const TEXT_NODE = 3

function isTextNode(node) {
  return node.nodeType === TEXT_NODE
}

export default isTextNode
