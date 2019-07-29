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
  private planning: FoodPlanning;

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

  private checkErrors(): boolean {
    if (this.proteinFormControl.invalid || this.carbohydrateFormControl.invalid || this.lipidFormControl.invalid ||
      this.weightFormControl.invalid || this.energyFormControl.invalid)
      return false;
    
    if (this.total > 0 && this.total < 100)
      return false;
    
    return true;
  }

  private roundValue(value: string): number {
    return Math.round(parseFloat(value) * 100) / 100;
  }

  private on_blur(target: HTMLInputElement, path: string): void {
    let roundedValue = this.roundValue(target.value);

    this.planning[path] = roundedValue;
    target.value = roundedValue.toString();
  }

  private on_save_click(): void {
    if (!this.checkErrors())
      return;
    
    //TODO
  }

  private on_close_click(): void {
    this._dialogRef.close();
  }
}