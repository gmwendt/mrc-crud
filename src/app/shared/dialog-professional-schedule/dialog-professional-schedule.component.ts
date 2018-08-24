import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'dialog-professional-schedule',
  templateUrl: './dialog-professional-schedule.component.html',
  encapsulation: ViewEncapsulation.None,
  //styleUrls: ['./dialog-professional-schedule.component.css']
})
export class DialogProfessionalScheduleComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _dialogRef: MatDialogRef<DialogProfessionalScheduleComponent>) { }
}