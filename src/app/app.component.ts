import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None // don't generate "shadow DOM" identifier, so css can target all elements
})
export class AppComponent {
  title = 'recipe-app';
}
