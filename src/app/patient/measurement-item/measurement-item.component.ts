import { Component, Input, ViewEncapsulation, Output, EventEmitter, AfterViewInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";

import { IHistoricalValue } from "../../core/common/types";

import { DialogHistoricalValueEditComponent, DialogHistoricalValueEditData } from "../../shared/dialog-historical-value-edit/dialog-historical-value-edit.component";
import { DialogService } from "../../shared/dialog.service";

import * as moment from 'moment';

@Component({
  selector: 'measurement-item',
  templateUrl: './measurement-item.component.html',
  styleUrls: ['./measurement-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MeasurementItemComponent implements AfterViewInit {
  
  private displayedColumns = ['timestamp', 'value', 'commands'];
  private dataSource: MatTableDataSource<IHistoricalValue>;
  private goalDataSource: MatTableDataSource<IHistoricalValue>;

  @Input()
  data: IHistoricalValue[];

  @Input()
  goalData: IHistoricalValue[];

  @Input()
  valueLabel: string;

  @Input()
  unit: string;

  @Output()
  measurementEdited: EventEmitter<IHistoricalValue | null> = new EventEmitter<IHistoricalValue | null>();

  constructor(private _dialog: DialogService) {
  }

  ngAfterViewInit() {
    this.updateTable(this.data);
    this.updateTable(this.goalData, true);
  }

  private updateTable(data: IHistoricalValue[], isGoal?: boolean): void {
    if (!data)
      return;
      
    this.sortData(data);

    if (isGoal)
      this.goalDataSource = new MatTableDataSource(data);
    else
      this.dataSource = new MatTableDataSource(data);
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
      if (!result || !this.data)
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
    var timestamp = moment(isoDate).format('L');
    return timestamp;
  }

  private sortData(data: IHistoricalValue[]): void {
    data.sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }
}