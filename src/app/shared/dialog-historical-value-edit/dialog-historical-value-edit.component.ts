import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormControl, Validators } from '@angular/forms';

import { IHistoricalValue } from "../../core/common/types";

import { Moment } from 'moment';
import * as moment from 'moment';

export interface DialogHistoricalValueEditData {
  caption?: string;
  value?: IHistoricalValue;
  valueLabel: string;
  unit?: string;
}

export interface DialogHistoricalValueEditResult {
  data: IHistoricalValue
}

 enum DialogResult {
  Cancel,
  OK
}

@Component({
  selector: 'dialog-historical-value-edit',
  templateUrl: './dialog-historical-value-edit.component.html',
  styleUrls: ['./dialog-historical-value-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogHistoricalValueEditComponent {

  private dateFormControl: FormControl;
  private valueFormControl: FormControl;

  private dialogResult = DialogResult;

  constructor(@Inject(MAT_DIALOG_DATA) private _data: DialogHistoricalValueEditData, private _dialog: MatDialogRef<DialogHistoricalValueEditComponent>) {
    this.initializeFields(_data.value);
  }

  get caption(): string {
    return this._data.caption;
  }

  get valueLabel(): string {
    return this._data.valueLabel;
  }

  get unit(): string {
    return this._data.unit;
  }

  private initializeFields(histValue?: IHistoricalValue): void {
    var timestamp = histValue ? histValue.timestamp : new Date(Date.now());
    var value = histValue ? histValue.value : '';

    this.dateFormControl = new FormControl(moment(timestamp), Validators.required);
    this.valueFormControl = new FormControl(value, Validators.required);
  }

  private on_close(action?: DialogResult): void {
    this.valueFormControl.markAsTouched();

    if (action == DialogResult.OK && (this.dateFormControl.invalid || this.valueFormControl.invalid))
      return;

    var histValue: IHistoricalValue = { 
      timestamp: this.dateFormControl.value.format(), 
      value: this.valueFormControl.value,
      unit: this.unit
    }

    var result: IHistoricalValue = action == DialogResult.OK ? histValue : null;
    this._dialog.close(result);
  }
}