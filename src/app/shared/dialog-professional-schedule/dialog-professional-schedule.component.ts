import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export enum DialogProfessionalScheduleResult {
  Cancel,
  OK
}

export interface ScheduleInterval {
  end: string;
  start: string;
}

@Component({
  selector: 'dialog-professional-schedule',
  templateUrl: './dialog-professional-schedule.component.html',
  styleUrls: ['./dialog-professional-schedule.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogProfessionalScheduleComponent {
  private displayedColumns: string[] = ['start', 'end', 'commands' ];
  private dataSource = TABLE_DATA;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _dialogRef: MatDialogRef<DialogProfessionalScheduleComponent>) { }

  private ok_clicked(): void {
    this._dialogRef.close(DialogProfessionalScheduleResult.OK);
  }

  private cancel_clicked(): void {
    this._dialogRef.close(DialogProfessionalScheduleResult.Cancel);
  }
}

const TABLE_DATA: ScheduleInterval[] = [
  { start: '9:00', end: '12:00' },
  { start: '13:00', end: '18:00' }
];