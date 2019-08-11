import { Component, ViewEncapsulation, Inject, Optional, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DialogServiceEditComponent {
  private _dirty: boolean;

  private profService: DialogServiceEditData;
  private isNew: boolean;
  private errorList: string[];
  private saveTouched: boolean;

  private serviceNameCtrl: FormControl;
  private servicePriceCtrl: FormControl;
  private pickerInputCtrl: FormControl;

  constructor(private _dialogRef: MatDialogRef<DialogServiceEditComponent>, @Optional() @Inject(MAT_DIALOG_DATA) data: DialogServiceEditData, private _detector: ChangeDetectorRef) {
    this.profService = data;
    this.initializeConstrols();
  }

  private initializeConstrols(): void{
    let duration = this.profService.duration ? this.profService.duration : '00:00';

    this.serviceNameCtrl = new FormControl(this.profService.name, [Validators.required, Validators.maxLength(100), this.validateName.bind(this.serviceNameCtrl, this.profService.usageNames)]);
    this.servicePriceCtrl = new FormControl(this.profService.price, [Validators.min(0), Validators.max(999999)]);
    this.pickerInputCtrl = new FormControl(duration);
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

  private markAsDirty(): void {
    if (this._dirty)
      return;

    this._dirty = true;
    this._detector.markForCheck();
  }

  private on_color_picker_changed(color: string): void {
    this.markAsDirty();
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
    if (this._dirty)
      return true;
    
    if (!this.serviceNameCtrl || !this.servicePriceCtrl || !this.pickerInputCtrl)
      return;

    if (this.serviceNameCtrl.dirty || this.servicePriceCtrl.dirty || this.pickerInputCtrl.dirty)
      return true;
  }
}