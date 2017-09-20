const { SyntaxKind } = require('typescript')

module.exports = function getNodeName(node) {
  return SyntaxKind[node.kind] || node.constructor + ''
}
