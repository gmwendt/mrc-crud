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

export interface IEnergyDetail {
  id: string;
  description: string;
  kcal: number;
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
  private energy: IEnergyDetail = {
    description: 'Energia',
    id: 'energy',
    kcal: 0,
    unit: 'kcal'
  };
  
  private _micronutrientsRef = MicroNutrients;
  private _foodCategoriesRef = FoodCategories;
  private _macrosRef = Macronutrients;
  private _energyRef = { id: 'energy', description: 'Energia' };
  
  constructor(private _dialogRef: MatDialogRef<DialogNutrients>, @Inject(MAT_DIALOG_DATA) data: IFoodDetail[]) {
    this.foods = data;
    this.totalizer();
  }

  private totalizer(): void {
    this.foods.forEach(food => {
      this._micronutrientsRef.forEach(availMicro => {
        let nutrient: IFoodAttributeDetail = food.attributes[availMicro.id];
        if (nutrient && nutrient.qty && typeof(nutrient.qty) === 'number') 
          this.addOrCreateMicro(food, nutrient, availMicro);
      });

      this._macrosRef.forEach(availMacro => {
        let nutrient: IFoodAttributeDetail = food.attributes[availMacro.id];
        if (nutrient && nutrient.qty && typeof(nutrient.qty) === 'number') 
          this.addOrCreateMacro(food, nutrient, availMacro);
      });

      let energy = food.attributes[this.energy.id]
      if (energy && energy.kcal && typeof(energy.kcal) === 'number')
        this.energy.kcal += energy.kcal * food.quantity / 100;

      this.addOrCreateCategory(food);
    });
  }

  private addOrCreateCategory(food: IFoodDetail): void {
    let cat = this.categories.find(c => c.id === food.category_id);

    if (cat) 
      cat.qty = cat.qty ? cat.qty + food.quantity : food.quantity;
    else {
      let ref = this._foodCategoriesRef.find(c => c.id === food.category_id);

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

  private getMacroPercent(qty: number): number {
    let total = 0;
    this.macros.forEach(m => total += m.qty);

    return qty / total * 100;
  }

  private on_close_click(): void {
    this._dialogRef.close();
  }
}
