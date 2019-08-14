import { Component, ViewEncapsulation, Optional, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Patient, ProfessionalService } from '../../core/common/types';

export interface DialogCalendarEventData {
  title: string;
  start: Date;
  end?: Date;
  allDay?: boolean;
  patient?: Patient;
  service?: ProfessionalService;
  color?: string;
}

@Component({
  selector: 'dialog-calendar-event-edit',
  templateUrl: './dialog-calendar-event-edit.component.html',
  styleUrls: ['./dialog-calendar-event-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogCalendarEventEdit {

  constructor(private _dialogRef: MatDialogRef<DialogCalendarEventEdit>, @Optional() @Inject(MAT_DIALOG_DATA) data: DialogCalendarEventData) {

  }

  private on_cancel_click(): void {
    this._dialogRef.close();
  }
}