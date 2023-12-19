import { ChartType, ChartTypeRegistry, Color, Plugin, ScriptableContext } from 'chart.js';
import Chart from 'chart.js/auto';
import { ColorsCssService } from '../services';
export class ColorsChartJsPlugin implements Plugin {
    public readonly id = 'my-colors'

    constructor(
        private colorsService: ColorsCssService
    ) {
    }

    public beforeUpdate(chart: Chart<ChartType>): boolean | void {
        this.customizeData(chart)
        this.customizeScales(chart)
    }

    private customizeData(chart: Chart<ChartType>,): void {
        chart.options.backgroundColor = this.getDatasetColor.bind(this);
        chart.options.borderColor = this.getDatasetColor.bind(this);
        chart.options.color = this.getDatasetColor.bind(this);
    }

    private getDatasetColor(
        ctx: ScriptableContext<keyof ChartTypeRegistry>,
    ): Color {
        switch (ctx.type) {
            case 'data':
            case 'dataset': {
                return this.colorsService.getColor(`chart-color-${ctx.datasetIndex + 1}` as any)
            }

            case 'chart': {
                return this.colorsService.getColor('base-1')
            }

            default: {
                return ''
            }
        }
    }

    private customizeScales(chart: Chart<ChartType>): void {
        for (const scaleId of ['x', 'y']) {
            if (!(
                chart.options.scales
                && chart.options.scales[scaleId]
                && chart.options.scales[scaleId]!.grid)) {
                continue;
            }

            chart.options.scales![scaleId]!.grid!.color = () => this.getScaleColor('grid');
            chart.options.scales![scaleId]!.ticks!.color = () => this.getScaleColor('label');
        }
    }

    private getScaleColor(type: 'grid' | 'label'): Color {
        switch (type) {
            case 'grid': {
                return this.colorsService.getColor('base-2')
            }

            case 'label': {
                return this.colorsService.getColor('base-1')
            }

            default: {
                return ''
            }
        }
    }
}
