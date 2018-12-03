import { Component, ViewEncapsulation, ElementRef } from "@angular/core";

import { DialogClinicEditComponent } from "./dialog-clinic-edit/dialog-clinic-edit.component";

import { DialogService, MatDialogConfig } from "../shared/dialog.service";

@Component({
  selector: 'mrc-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClinicComponent {
  constructor(private _dialog: DialogService) {

  }

  add_clinic_clicked(): void {
    var dialogConfig: MatDialogConfig = {
      height: '100%',
      width: '100%'
    }
    var dialogRef = this._dialog.open(DialogClinicEditComponent, dialogConfig);
  }
}