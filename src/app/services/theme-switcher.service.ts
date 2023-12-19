import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export type TThemes = 'default' | 'dark' | 'new-theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitcherService {
  private r2: Renderer2;
  private readonly eventBusSubject$: BehaviorSubject<TThemes> = new BehaviorSubject<TThemes>('default')

  public readonly hostEl: HTMLElement = this.docRef.body;
  public readonly eventBus$: Observable<TThemes> = this.eventBusSubject$.asObservable().pipe(
    tap((v) => this.r2.setAttribute(this.hostEl, 'data-theme', v))
  )

  constructor(
    @Inject(DOCUMENT)
    private docRef: Document,
    rendererFactory: RendererFactory2
  ) {
    this.r2 = rendererFactory.createRenderer(null, null)
  }

  public change(value: TThemes): void {
    this.eventBusSubject$.next(value)
  }
}
