import { Component, ViewEncapsulation, Input } from "@angular/core";

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
  
  private _data: IPieChartData[] = [];

  @Input()
  set data(value: IPieChartData[]) {
    if (this.isEqual(value, this._data))
      return;

    //TODO
  }

  get data(): IPieChartData[] {
    return this._data;
  }

  private isEqual(arrayOne: any[], arrayTwo: any[]): boolean {
    return arrayOne.every((item, i) => {
        let keys = Object.keys(item);
        return keys.length === Object.keys(arrayTwo[i]).length &&
            keys.every(key => arrayTwo[i][key] === item[key]);
        });
  }
  
}