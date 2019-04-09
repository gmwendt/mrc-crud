import { Component, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from "@angular/core";

import * as moment from 'moment';
import * as Chartist from "chartist";

import { ChartType, ChartEvent } from "ng-chartist";

import 'chartist-plugin-tooltips';

@Component({
  selector: 'mrc-chart',
  templateUrl: './chart.component.html',
  //styleUrls: ['./chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChartComponent implements AfterViewInit {

  @ViewChild('container') _chartRef: ElementRef;

  type: ChartType = 'Line';
  data: Chartist.IChartistData = {
    
    series: [
      {
        name: '',
        data: <any>[
           {x: new Date('2019-01-01'), y: 110},
           {x: new Date('2019-02-01'), y: 108},
           {x: new Date('2019-03-01'), y: 108},
           {x: new Date('2019-04-01'), y: 105},
           {x: new Date('2019-04-09'), y: 104},
        ]
      },
      {
        name: 'Meta',
        data: [
          {x: new Date('2020-01-01'), y: 90},
        ]
      }
    ]
  };

  options: Chartist.ILineChartOptions = {
    axisX: {
      type: Chartist.FixedScaleAxis,
      divisor: 5,
      labelInterpolationFnc: function(value) {
        return moment(value).format('MMM D');
      }
    },
    height: 300,
    width: 400,
    plugins: [Chartist.plugins.tooltip({
      transformTooltipTextFnc: function(tooltip) {
        var xy = tooltip.split(",");
        console.log(xy[0]);
        var text = moment(new Date(parseInt(xy[0])).toISOString()).format('L') + ': ' + xy[1] + ' kg';
        return text;
      }
    })]
  };

  constructor() {
  }

  ngAfterViewInit() {
    var chart = new Chartist.Line(this._chartRef.nativeElement, this.data, this.options);
  }
}