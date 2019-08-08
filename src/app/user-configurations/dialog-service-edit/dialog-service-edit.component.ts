import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ProfessionalService } from '../../core/common/types';
import { Util } from '../../core/common/worker';

@Component({
  selector: 'dialog-service-edit',
  templateUrl: './dialog-service-edit.component.html',
  styleUrls: ['./dialog-service-edit.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogServiceEditComponent {
  private isNew: boolean;
  private profService: ProfessionalService;

  private serviceNameCtrl: FormControl;
  private servicePriceCtrl: FormControl;

  constructor(private _dialogRef: MatDialogRef<DialogServiceEditComponent>, @Inject(MAT_DIALOG_DATA) data: ProfessionalService) {
    this.profService = data ? data : new ProfessionalService(Util.guid(), undefined);
  }

  private initializeConstrols(): void{
    this.serviceNameCtrl = new FormControl(this.profService.name, [Validators.required, Validators.maxLength(100)]);
    this.servicePriceCtrl = new FormControl(this.profService.price);
  }

  private on_save_clicked(): void {
    // TODO
  }

  private on_cancel_click(): void {
    this._dialogRef.close();
  }
}