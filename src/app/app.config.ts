import { ApplicationConfig, ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import Chart from 'chart.js/auto';

import { routes } from './app.routes';
import { ColorsChartJsPlugin } from './components/part-3/plugins';
import { ColorsCssService } from './components';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useFactory: () => {
        const colorsService: ColorsCssService = inject(ColorsCssService);
        return () => {
          Chart.register([new ColorsChartJsPlugin(colorsService)])
        }
      }
    }
  ]
};

