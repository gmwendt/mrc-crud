import { Component, ViewEncapsulation, Input, ViewChild, ElementRef } from "@angular/core";

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
export class PieChartComponent {

  private _colors: string[] = ["#FF6384", "#FFCE56", "#4BC0C0", "#E7E9ED", "#36A2EB"];
  
  private _data: IPieChartData[] = [];
  private _chart: Chart;
  private _config: Chart.ChartConfiguration;

  @ViewChild('container', { static: false }) _container: ElementRef;

  @Input()
  set data(value: IPieChartData[]) {
    debugger;
    if (this.isEqual(value, this._data))
      return;

    this._data = value;

    if (!this._chart)
      this.createChart();
    else
      this._chart.update();
  }

  get data(): IPieChartData[] {
    return this._data;
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
    this.data.forEach(item => values.push(item.data));

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
      }
    }
  }

  private createChart(): void {
    this.createChartConfig();
    this._chart = new Chart(this._container.nativeElement, this._config);
  }

  private isEqual(arrayOne: any[], arrayTwo: any[]): boolean {
    
    if (arrayOne && arrayTwo && arrayOne.length != arrayTwo.length)
    return false;
    
    //TODO
    
    // return arrayOne.every((item, i) => {
    //   let keys = Object.keys(item);
    //   return keys.length === Object.keys(arrayTwo[i]).length &&
    //       keys.every(key => arrayTwo[i][key] === item[key]);
    //   });
  }
  
}