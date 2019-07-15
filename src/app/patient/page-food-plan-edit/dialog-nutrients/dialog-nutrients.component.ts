import { Component, ViewEncapsulation, Inject, OnInit, AfterViewInit, OnDestroy, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { MicroNutrients, FoodCategories, Macronutrients } from '../../../core/common/constants';
import { IFoodDetail, IFoodAttributeDetail, INutrient, IFoodCategory } from '../../../core/common/types';

export interface INutrientDetail {
  id: string;
  description: string;
  qty: number;
  unit: string;
}

@Component({
  selector: 'dialog-nutrients',
  templateUrl: './dialog-nutrients.component.html',
  styleUrls: ['./dialog-nutrients.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogNutrients {

  private foods: IFoodDetail[];
  private micros: INutrientDetail[] = [];
  private macros: INutrientDetail[] = [];
  private categories: IFoodCategory[] = [];
  
  private micronutrientsRef = MicroNutrients;
  private foodCategoriesRef = FoodCategories;
  private macrosRef = Macronutrients;
  
  constructor(private _dialogRef: MatDialogRef<DialogNutrients>, @Inject(MAT_DIALOG_DATA) data: IFoodDetail[]) {
    this.foods = data;
    this.totalizer();
  }

  private totalizer(): void {
    this.foods.forEach(food => {
      this.micronutrientsRef.forEach(availMicro => {
        let nutrient: IFoodAttributeDetail = food.attributes[availMicro.id];
        if (nutrient && nutrient.qty && typeof(nutrient.qty) === 'number') 
          this.addOrCreateMicro(food, nutrient, availMicro);
      });

      this.macrosRef.forEach(availMacro => {
        let nutrient: IFoodAttributeDetail = food.attributes[availMacro.id];
        if (nutrient && nutrient.qty && typeof(nutrient.qty) === 'number') 
          this.addOrCreateMacro(food, nutrient, availMacro);
      });

      this.addOrCreateCategory(food);
    });
  }

  private addOrCreateCategory(food: IFoodDetail): void {
    let cat = this.categories.find(c => c.id === food.category_id);

    if (cat) 
      cat.qty = cat.qty ? cat.qty + food.quantity : food.quantity;
    else {
      let ref = this.foodCategoriesRef.find(c => c.id === food.category_id);

      if (!ref)
        return;

      this.categories.push({
        description: ref.description,
        id: ref.id,
        qty: food.quantity
      });
    }
  }

  private addOrCreateMicro(food: IFoodDetail, foodAttr: IFoodAttributeDetail, ref: INutrient): void {
    let nutTotalizer = this.micros.find(n => n.id === ref.id);

    if (nutTotalizer) {
      if (nutTotalizer.unit == foodAttr.unit)
        nutTotalizer.qty += foodAttr.qty * food.quantity / 100;
      else {
        //TODO: unit converter
        console.log("unit converter conflict");
      }
    }
    else 
      this.micros.push({
        id: ref.id,
        description: ref.description,
        qty: foodAttr.qty * food.quantity / 100,
        unit: foodAttr.unit
      });
  }

  private addOrCreateMacro(food: IFoodDetail, nutrient: IFoodAttributeDetail, ref: INutrient): void {
    let nutTotalizer = this.macros.find(n => n.id === ref.id);

    if (nutTotalizer) {
      if (nutTotalizer.unit == nutrient.unit)
        nutTotalizer.qty += nutrient.qty * food.quantity / 100;
      else {
        //TODO: unit converter
        console.log("unit converter conflict");
      }
    }
    else 
      this.macros.push({
        id: ref.id,
        description: ref.description,
        qty: nutrient.qty * food.quantity / 100,
        unit: nutrient.unit
      });
  }

  private getCategoryPercent(qty: number): number {
    let total = 0;
    this.categories.forEach(c => total += c.qty);

    return qty / total * 100;
  }

  private on_close_click(): void {
    this._dialogRef.close();
  }
}
