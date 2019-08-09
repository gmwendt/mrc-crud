import { Component, ViewEncapsulation, Inject, Optional } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogServiceEditData {
  name: string;
  color: string;
  duration: string;
  price: number;
  usageNames: string[];
}

@Component({
  selector: 'dialog-service-edit',
  templateUrl: './dialog-service-edit.component.html',
  styleUrls: ['./dialog-service-edit.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogServiceEditComponent {
  private profService: DialogServiceEditData;
  private isNew: boolean;
  private errorList: string[];
  private saveTouched: boolean;

  private serviceNameCtrl: FormControl;
  private servicePriceCtrl: FormControl;

  constructor(private _dialogRef: MatDialogRef<DialogServiceEditComponent>, @Optional() @Inject(MAT_DIALOG_DATA) data: DialogServiceEditData) {
    this.profService = data;
    this.initializeConstrols();
  }

  private initializeConstrols(): void{
    this.serviceNameCtrl = new FormControl(this.profService.name, [Validators.required, Validators.maxLength(100), this.validateName.bind(this.serviceNameCtrl, this.profService.usageNames)]);
    this.servicePriceCtrl = new FormControl(this.profService.price, [Validators.min(0), Validators.max(999999)]);
  }

  private updateErrors(): void {
    this.errorList = [];

    if (this.serviceNameCtrl.invalid || this.servicePriceCtrl.invalid)
      this.errorList.push('Verifique todos os campos do formulário'); 
  }

  private validateName(usageNames: string[], control: FormControl): any {
    if (!usageNames || usageNames.length == 0)
      return null;

    let name = control.value;
    if (usageNames.indexOf(name) >= 0)
      return { nameExists: 'name already exists' };
    
    return null;
  }

  private on_save_clicked(): void {
    this.updateErrors();

    this.saveTouched = true;

    if (this.errorList.length > 0)
      return;
    
    this._dialogRef.close(this.profService);
  }

  private on_cancel_click(): void {
    this._dialogRef.close();
  }

  get dirty(): boolean {
    if (!this.serviceNameCtrl || !this.servicePriceCtrl)
      return;

    if (this.serviceNameCtrl.dirty || this.servicePriceCtrl.dirty)
      return true;
  }
}