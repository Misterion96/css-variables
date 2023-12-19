import { NgForOf } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartType } from 'chart.js/dist/types';
import { ThemeSwitcherService } from '../../services/theme-switcher.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  imports: [
    NgForOf
  ],
  standalone: true
})
export class ChartsComponent implements AfterViewInit {
  public charts: {
    id: string,
    type: ChartType,
  }[] = [
    {
      id: crypto.randomUUID(),
      type: 'line'
    },
    {
      id: crypto.randomUUID(),
      type: 'bar'
    },
  ]

  constructor(
    private themeSwitcher: ThemeSwitcherService
  ) {
  }

  public ngAfterViewInit(): void {
    const labels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const charts = this.charts.map((meta) => {
      return new Chart(meta.id, {
        data: {
          labels: labels,
          datasets: generateData(3, labels.length),
        },
        type: meta.type
      });
    })

    this.themeSwitcher.eventBus$.subscribe(() => {
      charts.forEach(chart => chart?.update())
    })
  }
}


function generateData(series: number, points: number) {
  return Array(series).fill(null).map((_, i) => {
    const data = [...crypto.getRandomValues(new Uint8Array(points))]
    return {
      data,
      label: `Series ${i + 1}`,
    }
  })
}
