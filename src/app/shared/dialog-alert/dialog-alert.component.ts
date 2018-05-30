import { Component, Inject, ViewEncapsulation } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '../dialog.service';

export enum DialogAlertButton {
  OK,
  OKCancel,
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

  constructor( @Inject(MAT_DIALOG_DATA) private m_data: DialogAlertData, private m_dialog: MatDialogRef<DialogAlertComponent>) {
  }

  get button(): DialogAlertButton {
    return this.m_data.button;
  }

  get caption(): string {
    return this.m_data.caption;
  }

  get text(): string {
    return this.m_data.text;
  }

  on_close(result: DialogAlertResult): void {
    this.m_dialog.close(result);
  }
}