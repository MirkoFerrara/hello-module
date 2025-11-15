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
    <div class="hello-module-container">
      <h1>🎉 Hello from Hello Module!</h1>
      <p>This is a <strong>standalone component</strong> loaded dynamically!</p>
      <p>Module version: <code>2.0.0</code></p>
      <button (click)="count = count + 1">
        Clicked {{ count }} times
      </button>
    </div>
  `,
    styles: [`
    .hello-module-container {
      padding: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      color: white;
      text-align: center;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    }
    
    h1 {
      margin: 0 0 1rem 0;
      font-size: 2rem;
    }
    
    p {
      margin: 0.5rem 0;
      font-size: 1.1rem;
    }
    
    code {
      background: rgba(255,255,255,0.2);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
    }
    
    button {
      margin-top: 1.5rem;
      padding: 0.8rem 2rem;
      font-size: 1.1rem;
      font-weight: 600;
      background: white;
      color: #667eea;
      border: none;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.3);
    }
  `]
  })
], HelloComponent);
export {
  HelloComponent as default
};
//# sourceMappingURL=plugin.mjs.map
