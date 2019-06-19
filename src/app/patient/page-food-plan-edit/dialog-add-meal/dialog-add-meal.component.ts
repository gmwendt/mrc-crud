import { Component, ViewEncapsulation, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'dialog-add-meal',
  templateUrl: './dialog-add-meal.component.html',
  // styleUrls: ['./dialog-add-meal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogAddMeal {
  constructor(private _dialogRef: MatDialogRef<DialogAddMeal>, @Inject(MAT_DIALOG_DATA) data: any) {
  }
}