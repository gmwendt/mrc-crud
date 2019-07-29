import { Component, ViewEncapsulation, ChangeDetectionStrategy, Inject } from "@angular/core";
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FoodPlanning } from '../../../core/common/types';

@Component({
  selector: 'dialog-planning',
  templateUrl: './dialog-planning.component.html',
  // styleUrls: ['./dialog-planning.component.css'],
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
    this.planning = data;

    this.initializeControls();
  }

  private initializeControls(): void {
    this.weightFormControl = new FormControl(this.planning.weight);
    this.energyFormControl = new FormControl(this.planning.energy);
    this.proteinFormControl = new FormControl(this.planning.protein);
    this.carbohydrateFormControl = new FormControl(this.planning.carbohydrate);
    this.lipidFormControl = new FormControl(this.planning.lipid);
  }
}