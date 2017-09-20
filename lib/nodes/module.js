/* @flow */
/*:: import type { RawNode } from './node';*/

import Node from './node';

export default class Module extends Node {

  constructor(name /*: string*/) {
    super(null);

    this.print = () => {
      return `declare module '${this.name}' {
        ${this.getChildren().map(child => {
        return child.print();
      }).join('\n\t')}
    }\n`;
    };

    this.name = name;
  }

}