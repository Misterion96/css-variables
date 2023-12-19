import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeSwitcherService, TThemes } from '../../../services/theme-switcher.service';

type TColorName =
    | 'primary'
    | 'secondary'
    | 'chart-color-1'
    | 'chart-color-2'
    | 'chart-color-3'
    | 'base-1'
    | 'base-2'

@Injectable({
    providedIn: 'root'
})
export class ColorsScssService {
    private themeMap: Map<TThemes, Map<TColorName, string>> = new Map([
        ['default', new Map<TColorName, string>([
            ['primary', '#d75894'],
            ['secondary', '#9b3dca'],
            ['chart-color-1', '#526ed3'],
            ['chart-color-2', '#ea97c4'],
            ['chart-color-3', '#fee797'],
            ['base-1', '#808080'],
            ['base-2', '#bebebe'],
        ])],
        ['dark', new Map<TColorName, string>([
            ['primary', '#5e84ff'],
            ['secondary', '#0dd0ff'],
            ['chart-color-1', '#ffce56'],
            ['chart-color-2', '#36a2eb'],
            ['chart-color-3', '#ff6384'],
            ['base-1', '#c7c7c7'],
            ['base-2', '#bcbcbc'],
        ])],
    ])

    private paletteMap: Map<TColorName, string> | null = null;

    constructor(
        private themeSwitcher: ThemeSwitcherService,
    ) {
        this.themeSwitcher.eventBus$.pipe(
            takeUntilDestroyed()
        ).subscribe(theme => {
            this.paletteMap = this.themeMap.get(theme)!;
        })
    }

    public getColor(prop: TColorName): string {
        return this.paletteMap?.get(prop)!;
    }
}
