import { Inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WINDOW } from '@ng-web-apis/common';
import { ThemeSwitcherService } from '../../../services/theme-switcher.service';

type TColorName =
  | 'primary'
  | 'secondary'
  | 'chart-color-1'
  | 'chart-color-2'
  | 'chart-color-3'
  | 'base-1'
  | 'base-2'

type TCssPropName<T extends string> = `--${T}`;

@Injectable({
  providedIn: 'root'
})
export class ColorsCssService {
  private readonly paletteMap = new Map<TCssPropName<TColorName>, string>([
    ['--primary', '#d75894'],
    ['--secondary', '#9b3dca'],
    ['--chart-color-1', '#526ed3'],
    ['--chart-color-2', '#ea97c4'],
    ['--chart-color-3', '#fee797'],
    ['--base-1', '#808080'],
    ['--base-2', '#bebebe'],
  ])

  constructor(
    private themeSwitcher: ThemeSwitcherService,
    @Inject(WINDOW)
    private window: Window,
  ) {
    this.themeSwitcher.eventBus$.pipe(
      takeUntilDestroyed()
    ).subscribe(() => {
      const styles: CSSStyleDeclaration = this.window.getComputedStyle(this.themeSwitcher.hostEl);

      for (const cssColorProp of this.paletteMap.keys()) {
        const cssColorValue = styles.getPropertyValue(cssColorProp);
        if (!cssColorValue) {
          continue
        }

        this.paletteMap.set(cssColorProp, cssColorValue)
      }
    })
  }

  public getColor(prop: TColorName): string {
    return this.paletteMap.get(`--${prop}`)!;
  }
}
