import { Component, Input, ViewEncapsulation, Output, EventEmitter, AfterViewInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";

import { IHistoricalValue } from "../../core/common/types";

import { DialogHistoricalValueEditComponent, DialogHistoricalValueEditData } from "../../shared/dialog-historical-value-edit/dialog-historical-value-edit.component";
import { DialogService } from "../../shared/dialog.service";

@Component({
  selector: 'measurement-item-component',
  templateUrl: './measurement-item.component.html',
  // styleUrls: ['./measurement-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MeasurementItemComponent implements AfterViewInit {
  
  private displayedColumns = ['timestamp', 'value'];
  private dataSource: MatTableDataSource<IHistoricalValue>

  @Input()
  data: IHistoricalValue[];

  @Input()
  valueLabel: string;

  @Input()
  unit: string;

  @Output()
  measurementEdited: EventEmitter<IHistoricalValue> = new EventEmitter<IHistoricalValue>();

  constructor(private _dialog: DialogService) {
  }

  ngAfterViewInit() {
    this.update_table();
  }

  private update_table(): void {
    if (this.data)
		  this.dataSource = new MatTableDataSource(this.data);
  }

  private on_edit_measurement_value_clicked(histValue?: IHistoricalValue): void {
    var dialogData: DialogHistoricalValueEditData = {
      caption: 'Nova medida',
      valueLabel: this.valueLabel,
      unit: this.unit,
      value: histValue ? histValue : null
    };

    var dialogRef = this._dialog.open(DialogHistoricalValueEditComponent, { data: dialogData });
    dialogRef.afterClosed().subscribe((result: IHistoricalValue) => {
      if (!result)
        return;

        //TODO: format result before add
      this.data.push(result);
      this.measurementEdited.emit(result);
      this.update_table();
    });
  }

}