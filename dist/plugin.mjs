import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(result) || result;
  return result;
};
let HelloComponent = class {
  constructor() {
    this.count = 0;
  }
};
HelloComponent = __decorateClass([
  Component({
    selector: "hello-module",
    standalone: true,
    imports: [CommonModule],
    template: `
    <h1>Hello from plugin ES module!</h1>
    <button (click)="count = count + 1">Clicked {{ count }} times</button>
  `
  })
], HelloComponent);
export {
  HelloComponent as default
};
//# sourceMappingURL=plugin.mjs.map
