import { Component as c } from "@angular/core";
import { CommonModule as s } from "@angular/common";
var p = Object.getOwnPropertyDescriptor, a = (e, l, m, r) => {
  for (var o = r > 1 ? void 0 : r ? p(l, m) : l, t = e.length - 1, n; t >= 0; t--)
    (n = e[t]) && (o = n(o) || o);
  return o;
};
let u = class {
  constructor() {
    this.count = 0;
  }
};
u = a([
  c({
    selector: "hello-module",
    standalone: !0,
    imports: [s],
    template: `
    <h1>Hello from plugin ES module!</h1>
    <button (click)="count = count + 1">Clicked {{ count }} times</button>
  `
  })
], u);
export {
  u as default
};
//# sourceMappingURL=plugin.mjs.map
