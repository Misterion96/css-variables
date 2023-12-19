import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-external-component',
  standalone: true,
  imports: [],
  template: `
    <h2 class="header">{{header}}</h2>
    <span class="description">{{description}}</span>
  `,
  styleUrl: './external-component.component.scss'
})
export class ExternalComponentComponent {
  @Input()
  public header = 'External component header'

  @Input()
  public description = 'External component description'
}
