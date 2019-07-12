import { 
  AfterViewInit, 
  Component, 
  ElementRef, 
  Input, 
  ViewChild, 
  ViewEncapsulation
} from "@angular/core";

import * as Chart from 'chart.js';

export interface IPieChartData {
  label: string;
  data: number;
}

@Component({
  selector: 'mrc-pie-chart',
  templateUrl: 'pie-chart.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PieChartComponent implements AfterViewInit {

  private _colors: string[] = ["#FF6384", "#FFCE56", "#4BC0C0", "#E7E9ED", "#36A2EB"];
  
  private _unit: string;
  private _hideLegend: boolean = false;
  private _data: IPieChartData[] = [];

  private _chart: Chart;
  private _config: Chart.ChartConfiguration;

  @ViewChild('container', { static: false }) _container: ElementRef;

  ngAfterViewInit() {
    this.createChart();
  }

  @Input()
  set data(value: IPieChartData[]) {
    if (this.isEqual(value, this._data))
      return;

    this._data = value;
    this.createChart();
  }

  get data(): IPieChartData[] {
    return this._data;
  }

  @Input()
  set unit(value: string) {
    if (this._unit == value)
      return;

    this._unit = value;
    this.createChart();
  }

  get unit(): string {
    return this._unit;
  }

  @Input()
  set hideLegend(value: boolean) {
    if (this._hideLegend == value)
      return;

    this._hideLegend = value;
    this.createChart();
  }

  get hideLegend(): boolean {
    return this._hideLegend;
  }

  private get dataLabels(): string[] {
    if (!this.data)
      return [];

    let labels = [];
    this.data.forEach(item => labels.push(item.label));

    return labels;
  }

  private get dataValues(): number[] {
    if (!this.data)
      return [];

    let values = [];
    this.data.forEach(item => values.push(Math.round(item.data * 100) / 100));

    return values;
  }

  private createChartConfig(): void {
    this._config = {
      type: 'pie',
      data: {
        labels: this.dataLabels,
        datasets: [{
          data: this.dataValues,
          backgroundColor: this._colors
        }]
      },
      options: {
        legend: {
          display: !this.hideLegend,
          labels: {
            fontSize: 9,
            fontFamily: 'Segoe UI'
          }
        },
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            label: (tooltipItems, data) => { 
              let unit = this.unit ? this.unit : '';
              let value = data.datasets[0].data[tooltipItems.index].toLocaleString();
              let label = data.labels[tooltipItems.index];

              return ` ${label}: ${value} ${unit}`;
            }
          }
        }
      }
    }
  }

  private createChart(): void {
    if (!this._container)
      return;

    this.createChartConfig();
    this._chart = new Chart(this._container.nativeElement, this._config);
  }

  private isEqual(array1: IPieChartData[], array2: IPieChartData[]): boolean {

    if (!array1 && !array2)
      return true;
    
    if (array1 && array2 && array1.length != array2.length)
      return false;

    for (let i = 0; i < array1.length; i++) {
      if (array1[i].label != array2[i].label || array1[i].data != array2[i].data)
        return false;
    }
    
    return true;
  }
}