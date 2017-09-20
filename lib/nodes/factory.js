/* @flow */
/*:: import type { RawNode } from './node';*/


import _ from 'lodash';

import ImportNode from './import';
import ExportNode from './export';
import ModuleNode from './module';
import VariableNode from './variable';
import PropertyNode from './property';
import NamespaceNode from './namespace';

import { getMembersFromNode, stripDetailsFromTree } from '../parse';

class Factory {

  constructor() {
    this.createNamespaceNode = (name /*: string*/) => new NamespaceNode(name);

    this.createImportNode = (node /*: RawNode*/) => new ImportNode(node);

    this.createExportNode = (node /*: RawNode*/) => new ExportNode(node);

    this.createVariableNode = (node /*: RawNode*/) => new VariableNode(node);

    this._modules = {};
    this._propDeclarations = {};
  }

  // If multiple declarations are found for the same module name
  // return the memoized instance of the module instead
  createModuleNode(name /*: string*/) {
    if (Object.keys(this._modules).includes(name)) {
      return this._modules[name];
    }

    const module = new ModuleNode(name);

    this._modules[name] = module;

    return module;
  }

  // Some definition files (like lodash) declare the same
  // interface/type/function multiple times as a way of overloading.
  // Flow does not support that, and this is where we handle that
  createPropertyNode(node /*: RawNode*/, name /*:: ?: string*/) {
    if (!name) {
      return new PropertyNode(node);
    }

    if (Object.keys(this._propDeclarations).includes(name)) {
      this._propDeclarations[name].maybeAddMember(getMembersFromNode(node));

      return this._propDeclarations[name];
    }

    const propNode = new PropertyNode(node);
    this._propDeclarations[name] = propNode;

    return propNode;
  }

}

export default {
  create: () => new Factory()
};