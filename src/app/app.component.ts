import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChartsComponent, ExternalComponentComponent } from './components';
import { ThemeSwitcherService, TThemes } from './services/theme-switcher.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ChartsComponent, ExternalComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private themeSwitcherService: ThemeSwitcherService
  ) {
  }

  public onChangeTheme(value: TThemes): void {
    this.themeSwitcherService.change(value)
  }
}
