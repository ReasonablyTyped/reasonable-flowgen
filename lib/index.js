// @flow

const ts = require('typescript')
const fs = require('fs')
const tsc = require('typescript-compiler')
const namespaceManager = require('./namespaceManager')
const { recursiveWalkTree } = require('./parse')

const compile = sourceFile => {
  const rootNode = recursiveWalkTree(sourceFile)

  const output = rootNode
    .getChildren()
    .map(child => {
      return child.print()
    })
    .join('')

  return output
}

/**
 * Compiles typescript files
 */
module.exports = {
  compileTest: (path /*: string*/, target /*: string*/) => {
    tsc.compile(path, '--module commonjs -t ES5 --out ' + target)
  },

  compileDefinitionString: (string /*: string*/) => {
    namespaceManager.reset()

    return compile(
      ts.createSourceFile('/dev/null', string, ts.ScriptTarget.ES6, false)
    )
  },

  compileDefinitionFile: (path /*: string*/) => {
    namespaceManager.reset()

    return compile(
      ts.createSourceFile(
        path,
        fs.readFileSync(path).toString(),
        ts.ScriptTarget.ES6,
        false
      )
    )
  }
}
