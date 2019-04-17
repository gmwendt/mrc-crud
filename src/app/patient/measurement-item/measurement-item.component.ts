import { Component, Input, ViewEncapsulation, Output, ElementRef, EventEmitter, AfterViewInit, HostListener, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { MatTableDataSource } from "@angular/material";

import { IHistoricalValue } from "../../core/common/types";

import { DialogHistoricalValueEditComponent, DialogHistoricalValueEditData } from "../../shared/dialog-historical-value-edit/dialog-historical-value-edit.component";
import { DialogService } from "../../shared/dialog.service";

import * as moment from 'moment';
import { IChartistSeriesData } from "chartist";

@Component({
  selector: 'measurement-item',
  templateUrl: './measurement-item.component.html',
  styleUrls: ['./measurement-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MeasurementItemComponent implements AfterViewInit {

  private ChartMargin = 44;
  private ChartHeight = 250;

  private displayedColumns = ['timestamp', 'value', 'commands'];
  private dataSource: MatTableDataSource<IHistoricalValue>;
  private goalDataSource: MatTableDataSource<IHistoricalValue>;
  private chartSeries: IChartistSeriesData[] = [];

  private _chartWidth: number;

  @Input()
  data: IHistoricalValue[];

  @Input()
  goalData: IHistoricalValue[];

  @Input()
  valueLabel: string;

  @Input()
  unit: string;

  @Input()
  predictiveEquations: string[];

  @Output()
  measurementEdited: EventEmitter<IHistoricalValue | null> = new EventEmitter<IHistoricalValue | null>();

  @ViewChild('container') _chartContainer: ElementRef;

  constructor(private _dialog: DialogService, private _detector: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.updateTable(this.data);
    this.updateTable(this.goalData, true);

    this.chartWidth = window.innerWidth > 400 + this.ChartMargin ? 400 : window.innerWidth - this.ChartMargin;
  }

  get chartWidth(): number {
    return this._chartWidth;
  }

  set chartWidth(value: number) {
    if (this._chartWidth == value)
      return;

    this._chartWidth = value;
    this._detector.detectChanges();
  }

  private updateTable(data: IHistoricalValue[], isGoal?: boolean): void {
    if (!data)
      return;
      
    this.sortData(data);

    if (isGoal)
      this.goalDataSource = new MatTableDataSource(data);
    else
      this.dataSource = new MatTableDataSource(data);

    this.updateChart();
  }

  private updateChart(): void {
    let series: IChartistSeriesData[] = [];
    let s1: IChartistSeriesData = {
      name: '',
      data: []
    }

    let s2: IChartistSeriesData = {
      name: 'Meta',
      data: []
    }

    if (this.dataSource)
      for (let i = this.dataSource.data.length - 1; i >= 0; i--) {
        let data = this.dataSource.data[i];
        s1.data.push(<any>{
          x: new Date(data.timestamp), y: data.value
        });
      }

    if (this.goalDataSource)
      for (let i = this.goalDataSource.data.length - 1; i >= 0; i--) {
        let data = this.goalDataSource.data[i];
        s2.data.push(<any>{
          x: new Date(data.timestamp), y: data.value
        });
      }

    series.push(s1);
    series.push(s2);

    this.chartSeries = series;
  }

  private on_edit_measurement_value_clicked(data: IHistoricalValue[], histValue?: IHistoricalValue, isGoal?: boolean): void {
    var caption = isGoal ? (histValue ? 'Editar meta' : 'Nova meta') : (histValue ? 'Editar medida' : 'Nova medida');

    var dialogData: DialogHistoricalValueEditData = {
      caption: caption,
      valueLabel: this.valueLabel,
      unit: this.unit,
      value: histValue ? histValue : null
    };

    var dialogRef = this._dialog.open(DialogHistoricalValueEditComponent, { data: dialogData });
    dialogRef.afterClosed().subscribe((result: IHistoricalValue) => {
      if (!result || !data)
        return;

      if (histValue) {
        histValue.timestamp = result.timestamp;
        histValue.value = result.value;
      }
      else 
        data.push({
              timestamp: result.timestamp,
              unit: result.unit,
              value: result.value
        });

      this.updateTable(data, isGoal);
      this.measurementEdited.emit(result);
    });
  }

  private on_remove_clicked(index: number, data: IHistoricalValue[], isGoal?: boolean): void {
    data.splice(index, 1);
    this.updateTable(data, isGoal);
    this.measurementEdited.emit();
  }

  private format_timestamp(isoDate: string): string {
    if (isoDate)
      return moment(isoDate).locale(this.browserLocale).format('L');
  }

  private format_value(data: IHistoricalValue | string): string {
    if (!data)
      return;

    if (typeof data === 'string')
      return data;

    var value = typeof data.value === 'number' ? data.value.toLocaleString() : data.value.toString();
    return value + ' ' + data.unit;
  }

  private sortData(data: IHistoricalValue[]): void {
    data.sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }

  private get showChart(): boolean {
    return this.chartSeries.some(c => c.data.length > 0);
  }

  private get browserLocale(): string {
    return navigator.language || (<any>navigator).userLanguage;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this._chartContainer)
      this.chartWidth = this._chartContainer.nativeElement.clientWidth;
  }
}