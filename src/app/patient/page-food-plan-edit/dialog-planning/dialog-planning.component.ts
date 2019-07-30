import { Component, ViewEncapsulation, ChangeDetectionStrategy, Inject } from "@angular/core";
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FoodPlanning } from '../../../core/common/types';

@Component({
  selector: 'dialog-planning',
  templateUrl: './dialog-planning.component.html',
  styleUrls: ['./dialog-planning.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogPlanning  {
  private errorList: string[];
  private planning: FoodPlanning;
  private saveTouched: boolean;

  //**Controls */
  private weightFormControl: FormControl;
  private energyFormControl: FormControl;
  private proteinFormControl: FormControl;
  private carbohydrateFormControl: FormControl;
  private lipidFormControl: FormControl;

  constructor(private _dialogRef: MatDialogRef<DialogPlanning>, @Inject(MAT_DIALOG_DATA) data: FoodPlanning) {
    this.planning = new FoodPlanning(data.weight, data.energy, data.protein, data.carbohydrate, data.lipid);

    this.initializeControls();
  }

  get total(): number {
    if (!this.planning)
      return;
    
    let total: number = 0;

    if (!isNaN(this.planning.protein) && !this.proteinFormControl.invalid)
      total += this.planning.protein;
    
    if (!isNaN(this.planning.carbohydrate) && !this.carbohydrateFormControl.invalid)
      total += this.planning.carbohydrate;
    
    if (!isNaN(this.planning.lipid) && !this.lipidFormControl.invalid)
      total += this.planning.lipid;
    
    return total;
  }

  private initializeControls(): void {
    this.weightFormControl = new FormControl(this.planning.weight, [Validators.min(0), Validators.max(999)]);
    this.energyFormControl = new FormControl(this.planning.energy, [Validators.min(0), Validators.max(99999)]);
    this.proteinFormControl = new FormControl(this.planning.protein, [Validators.min(0), Validators.max(100)]);
    this.carbohydrateFormControl = new FormControl(this.planning.carbohydrate, [Validators.min(0), Validators.max(100)]);
    this.lipidFormControl = new FormControl(this.planning.lipid, [Validators.min(0), Validators.max(100)]);
  }

  private updateErrors(): void {
    this.errorList = [];

    if (this.proteinFormControl.invalid || this.carbohydrateFormControl.invalid || this.lipidFormControl.invalid ||
      this.weightFormControl.invalid || this.energyFormControl.invalid)
      this.errorList.push('Verifique todos os campos do formulário');

    if (this.total != 100)
      this.errorList.push('A soma dos percentuais de proteína, carboidrato e lipídeo devem totalizar 100%');
  }

  private roundValue(value: string): number {
    return Math.round(parseFloat(value) * 100) / 100;
  }

  private on_blur(target: HTMLInputElement, path: string): void {
    let roundedValue = this.roundValue(target.value);

    this.planning[path] = roundedValue;
    target.value = roundedValue.toString();

    this.updateErrors();
  }

  private on_save_click(): void {
    this.updateErrors();
    
    this.saveTouched = true;

    if (this.errorList.length > 0)
      return;
    
    this._dialogRef.close(this.planning);
  }

  private on_close_click(): void {
    this._dialogRef.close();
  }
}