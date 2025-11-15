import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hello-module',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Hello from plugin ES module!</h1>
    <button (click)="count = count + 1">Clicked {{ count }} times</button>
  `
})
export default class HelloComponent {
  count = 0;
}
