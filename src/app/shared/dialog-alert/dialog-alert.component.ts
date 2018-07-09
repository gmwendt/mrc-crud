import { Component, Inject, ViewEncapsulation } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '../dialog.service';

export enum DialogAlertButton {
  OK,
  OKCancel,
  None,
  YesNo,
  YesNoCancel,
}

export enum DialogAlertResult {
  Cancel,
  No,
  None,
  OK,
  Yes,
}

export interface DialogAlertData {
  caption?: string;
  text?: string;
  button?: DialogAlertButton;
  textAlign?: string;
  textHeight?: string;
  timer?: number;
}

@Component({
  selector: 'dialog-alert',
  templateUrl: './dialog-alert.component.html',
  styleUrls: ['./dialog-alert.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogAlertComponent {

  public alertButton = DialogAlertButton;
  public alertResult = DialogAlertResult;

  public message: string;

  constructor( @Inject(MAT_DIALOG_DATA) private _data: DialogAlertData, private _dialog: MatDialogRef<DialogAlertComponent>) {
  }

  get button(): DialogAlertButton {
    return this._data.button;
  }

  get caption(): string {
    return this._data.caption;
  }

  get text(): string {
    return this._data.text;
  }

  get textAlign(): string {
    var align = this._data.textAlign ? this._data.textAlign : 'left';
    return align;
  }

  get textHeight(): string {
    if (this._data.textHeight)
      return this._data.textHeight;
  }

  on_close(result: DialogAlertResult): void {
    this._dialog.close(result);
  }
}