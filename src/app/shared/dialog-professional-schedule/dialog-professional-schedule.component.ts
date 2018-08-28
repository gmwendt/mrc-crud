import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export enum DialogProfessionalScheduleResult {
  Cancel,
  OK
}

@Component({
  selector: 'dialog-professional-schedule',
  templateUrl: './dialog-professional-schedule.component.html',
  styleUrls: ['./dialog-professional-schedule.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogProfessionalScheduleComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _dialogRef: MatDialogRef<DialogProfessionalScheduleComponent>) { }

  private ok_clicked(): void {
    this._dialogRef.close(DialogProfessionalScheduleResult.OK);
  }

  private cancel_clicked(): void {
    this._dialogRef.close(DialogProfessionalScheduleResult.Cancel);
  }
}