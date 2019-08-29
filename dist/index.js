;(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : ((global = global || self), (global.getTextNodes = factory()))
})(this, function() {
  'use strict'

  // const {TEXT_NODE = 3} = Node
  var TEXT_NODE = 3

  function isTextNode(node) {
    return node.nodeType === TEXT_NODE
  }

  var WHITE_SPACE = /^\s*$/

  function isWhiteSpaceNode(node) {
    return WHITE_SPACE.test(node.nodeValue)
  }

  var push = Array.prototype.push

  function getTextNodes(node) {
    var options =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
    var _options$ignoreWhiteS = options.ignoreWhiteSpace,
      ignoreWhiteSpace =
        _options$ignoreWhiteS === void 0 ? true : _options$ignoreWhiteS,
      _options$deep = options.deep,
      deep = _options$deep === void 0 ? true : _options$deep

    if (isTextNode(node)) {
      if (!ignoreWhiteSpace || !isWhiteSpaceNode(node)) {
        return [node]
      }

      return []
    }

    var textNodes = []
    var index = 0
    var _node$childNodes = node.childNodes,
      childNodes = _node$childNodes === void 0 ? [] : _node$childNodes
    var length = childNodes.length

    for (; index < length; index++) {
      var child = childNodes[index]

      if (deep || isTextNode(child)) {
        push.apply(textNodes, getTextNodes(child, options))
      }
    }

    return textNodes
  }

  return getTextNodes
})
//# sourceMappingURL=index.js.map
