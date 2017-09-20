// @flow

const types = {
  VoidKeyword: 'void',
  StringKeyword: 'string',
  AnyKeyword: 'any',
  NumberKeyword: 'number',
  BooleanKeyword: 'boolean',
  NullKeyword: 'null',
  UndefinedKeyword: 'void'
}

function print(kind /*: string*/) /*: string*/ {
  return types[kind]
}

module.exports = { print }
