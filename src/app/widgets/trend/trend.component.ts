import { Component, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, Input } from "@angular/core";

import * as moment from 'moment';
import * as Chartist from "chartist";

import { ChartType, ChartEvent } from "ng-chartist";

import 'chartist-plugin-tooltips';

@Component({
  selector: 'mrc-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TrendComponent implements AfterViewInit {

  @ViewChild('container') _chartRef: ElementRef;
              
  private _height: number;
  private _width: number;
  private _data: Chartist.IChartistData; 
  private _series: Chartist.IChartistSeriesData[] = [];
  private _options: Chartist.ILineChartOptions;
  private _chart: Chartist.IChartistLineChart;

  constructor() {
    this._data = {
      series: []
    };
  }

  ngAfterViewInit() {
    this.createChart();
  }

  @Input()
  unit: string;

  @Input()
  get height(): number {
    return this._height;
  }

  set height(value: number) {
    if (this._width == value || !value)
      return;

    this._height = value;

    if (this._chart) {
      this._options.height = value;
      this._chart.update(this._data, this._options);
    }
  }

  @Input()
  get width(): number {
    return this._width;
  }

  set width(value: number) {
    if (this._width == value || !value)
      return;

    this._width = value;

    if (this._chart) {
      this._options.width = value;
      this._chart.update(this._data, this._options);
    }
  }

  @Input()
  get series(): Chartist.IChartistSeriesData[] {
    return this._series;
  }

  set series(value: Chartist.IChartistSeriesData[]) {
    if (this._series == value)
      return;

    this._series = value;
    this._data.series = value;

    if (this._chart) 
      this._chart.update(this._data, this._options);
  }

  private get browserLocale(): string {
    return navigator.language || (<any>navigator).userLanguage;
  }

  private createOptions(): void {
    
    this._options = {
      axisX: {
        type: Chartist.FixedScaleAxis,
        divisor: 5,
        labelInterpolationFnc: (value) => {
          return moment(value).locale(this.browserLocale).format('D MMM');
        }
      },
      height: this.height,
      width: this.width,
      plugins: [Chartist.plugins.tooltip({
        transformTooltipTextFnc: (tooltip) => {
          var xy = tooltip.split(',');
          return moment(new Date(parseInt(xy[0])).toISOString()).locale(this.browserLocale).format('L') + ': ' + xy[1] + ' ' + this.unit;
        }
      })]
    };
  }

  private createChart(): void {
    setTimeout(() => {
      this.createOptions();
      this._chart = new Chartist.Line(this._chartRef.nativeElement, this._data, this._options);  
    });
  }
}