// @flow

const printers = require('./index')
/*:: import type { RawNode } from '../nodes/node' */
/*:: import type { JSDocTypeExpression } from 'typescript' */

function parameter(param /*: RawNode*/) /*: string*/ {
  let left = param.name.text
  let right

  if (param.name.kind === 'ObjectBindingPattern') {
    left = `{${param.name.elements.map(printers.node.printType).join(', ')}}`
  }

  if (!param.type) {
    right = '<<UNKNOWN PARAM FORMAT>>'
  } else {
    right = printers.node.printType(param.type)
  }

  if (param.questionToken) {
    left += '?'
  }

  if (param.dotDotDotToken) {
    left = '...' + left
  }

  return `${left}: ${right}`
}

function parseTypeReference(node /*: RawNode*/) /*: string*/ {
  if (node.typeName.left && node.typeName.right) {
    return printers.node.printType(node.typeName) + generics(node.typeArguments)
  }

  return node.typeName.text + generics(node.typeArguments)
}

function generics(types /*: ?Array<RawNode>*/) /*: string*/ {
  if (types && types.length) {
    return `<${types.map(printers.node.printType).join(', ')}>`
  }

  return ''
}

const comment = (jsdoc /*: Array<JSDocTypeExpression>*/) => {
  const blocks = jsdoc
    .map(doc => {
      const comment = (doc.comment || '').replace('\n', '\n * ')

      const tags = (doc.tags || []).map(tag => {
        return `\n * @${tag.tagName.text} ${(tag.preParameterName || {}).text ||
          ''} ${tag.comment}`
      })

      return comment + tags.join('')
    })
    .join('')

  return `\n/**\n * ${blocks}\n*/\n`
}

module.exports = { parameter, parseTypeReference, generics, comment }
