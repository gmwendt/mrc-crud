import { Component, ViewEncapsulation, Inject, OnInit, AfterViewInit, OnDestroy, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSelect, MatSelectChange } from "@angular/material/select";
import { MatTableDataSource } from "@angular/material/table";
import { HttpErrorResponse } from "@angular/common/http";
import { FormControl, Validators } from "@angular/forms";

import { MealGroups } from "../../../core/common/constants";
import { IFoodDetail, IFoodMeasurement } from "../../../core/common/types";
import { FoodService } from "../../../core/food.service";
import { DialogAlertData, DialogAlertButton } from "../../../shared/dialog-alert/dialog-alert.component";
import { DialogService } from "../../../shared/dialog.service";

import { ReplaySubject, Subject } from "rxjs";
import { take, takeUntil } from 'rxjs/operators';

export interface IDialogAddMealData {
  useFoodDb: boolean;
}

export interface IDialogAddMealResult {
  mealId: string;
  mealTime: string;
  selectedFoods: IFoodDetail[];
  notes: string;
}

export enum FoodSourceEnum {
  All,
  Taco,
  MyFoods,
  MySupplements
}

export interface IMacroNutrients {
  protein?: number;
  carbohydrate?: number;
  lipid?: number;
  energy?: number;
}

//TODO Export to widgets
export interface IPieChartData {
  name: string;
  value: number;
  extra?: any;
}

@Component({
  selector: 'dialog-add-meal',
  templateUrl: './dialog-add-meal.component.html',
  styleUrls: ['./dialog-add-meal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DialogAddMeal implements OnInit, AfterViewInit, OnDestroy {
  private useFoodDb: boolean;
  private foods: IFoodDetail[] = [];
  
  /** list of foods filtered by search keyword */
  private filteredFoods: ReplaySubject<IFoodDetail[]> = new ReplaySubject<IFoodDetail[]>(1);
  private dataSource: MatTableDataSource<IFoodDetail>;
  private totalizerSource: MatTableDataSource<IMacroNutrients>;
  private tableDisplayedColumns: string[] = ['description', 'quantity', 'measurements', 'protein', 'carbs', 'lipids', 'energy', 'commands'];

  /** Form Controls declaration */
  /** control for the selected food */
  private foodCtrl: FormControl = new FormControl();
  /** control for the MatSelect filter keyword */
  private foodFilterCtrl: FormControl = new FormControl();
  private quantityFormControls: FormControl[] = [];
  private mealSelectCtrl: FormControl;
  private notesFormControl: FormControl; 
  private mealNameCtrl: FormControl;

  private mealTime: string;
  private selecteMealId: string;
  private mealGroups = MealGroups;
  private errorList: string[];

  private foodSourceEnum = FoodSourceEnum;
  private selectedFoodSource: number = FoodSourceEnum.All;

  private proteinSum: number;
  private carbohydrateSum: number;
  private lipidSum: number;
  private energySum: number;

  private _selectedFoods: IFoodDetail[] = [];

  @ViewChild('select', {static: false}) select: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(private _dialogRef: MatDialogRef<DialogAddMeal>, private _detector: ChangeDetectorRef, private _dialog: DialogService, @Inject(MAT_DIALOG_DATA) data: IDialogAddMealData, 
    private _food: FoodService) {
    this.useFoodDb = data.useFoodDb;
  }

  async ngOnInit() {
    // load the initial food list
    this.filteredFoods.next(this.foods.slice());

    // listen for search field value changes
    this.foodFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterFoods();
      });

    this.initializeControls();
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private initializeControls(): void {
    this.mealSelectCtrl = new FormControl(null, Validators.required);
    this.mealNameCtrl = new FormControl(null, Validators.required);
    this.notesFormControl = new FormControl();
  }

  private refreshTable(): void {
    this.dataSource = new MatTableDataSource(this._selectedFoods);
    this._detector.detectChanges();
  }

  private refreshTotalizer(): void {
    let arr: IMacroNutrients[] = [];
    arr.push({
      carbohydrate: this.carbohydrateSum,
      energy: this.energySum,
      lipid: this.lipidSum,
      protein: this.proteinSum
    });

    this.totalizerSource = new MatTableDataSource(arr);
    this._detector.detectChanges();
  }

  private addValueFormControl(): void {
    this.quantityFormControls.push(new FormControl(0, Validators.required));
  }

  private calcMacros(): void {
    this.proteinSum = 0;
    this.carbohydrateSum = 0;
    this.lipidSum = 0;
    this.energySum = 0;

    this._selectedFoods.forEach(food => {
      let converter = food.measurements.find(m => m.id === food.selectedMeasurement).converter;

      let protein = food.attributes["protein"] && !isNaN(food.attributes["protein"].qty) ? food.attributes["protein"].qty : 0;
      let carbohydrate = food.attributes["carbohydrate"] && !isNaN(food.attributes["carbohydrate"].qty) ? food.attributes["carbohydrate"].qty : 0;
      let lipid = food.attributes["lipid"] && !isNaN(food.attributes["lipid"].qty) ? food.attributes["lipid"].qty : 0;
      let energy = food.attributes["energy"] && !isNaN(food.attributes["energy"].kcal) ? food.attributes["energy"].kcal : 0;

      this.proteinSum += food.quantity ? protein * converter * food.quantity : 0;
      this.carbohydrateSum += food.quantity ? carbohydrate * converter * food.quantity : 0;
      this.lipidSum += food.quantity ? lipid * converter * food.quantity : 0;
      this.energySum += food.quantity ? energy * converter * food.quantity : 0;
    });

    this.refreshTotalizer();
  }

  /**
   * Sets the initial value after the filteredFoods are loaded initially
   */
  private setInitialValue() {
    this.filteredFoods
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredFoods are loaded initially
        // and after the mat-option elements are available
        this.select.compareWith = (a: IFoodDetail, b: IFoodDetail) => a && b && a.id === b.id;
      });

      this.mealTime = new Date().toTimeString();
  }

  private async filterFoods(): Promise<void> {
    // get the search keyword
    let search = this.foodFilterCtrl.value;

    if (!this.foodFilterCtrl.value || this.foodFilterCtrl.value.length <= 2) {
      this.foods = [];
      this.filteredFoods.next(this.foods.slice());
      return;
    }

    try {
      this.foods = await this._food.tacoFilter(this.foodFilterCtrl.value, ['id', 'description', 'measurements']);
    }
    catch (error) {
      this.on_error(error);
    }
    finally {
      if (!this.foods) 
        return;
      
      // filter the foods
      this.filteredFoods.next(
        this.foods.filter(food => food.description.toLowerCase().indexOf(search) > -1)
      );
    }
  }

  private formatTooltip(tooltip: any): any {
    let template = Math.round(tooltip.value * 100) / 100;
    return `<span>${tooltip.data.label} </br> ${template.toLocaleString()} g</span>`;
  }

  private getFoodDetail(food: IFoodDetail, detail: string, qtyPath: string, unit?: string): string {
    let converter = food.measurements.find(m => m.id === food.selectedMeasurement).converter;
    
    let detailQty = food.attributes[detail] && !isNaN(food.attributes[detail][qtyPath]) ? food.attributes[detail][qtyPath] : 0;
    let detailCalc = food.quantity ? detailQty * converter * food.quantity : 0;
    let unitSpacing = unit ? ' ' + unit : '';

    return (Math.round(detailCalc * 100) / 100).toLocaleString() + unitSpacing;
  }

  private checkErrors(): boolean {
    this.errorList = [];

    if (!this.mealSelectCtrl.valid || (!this.mealGroups.some(meal => meal.id === this.mealSelectCtrl.value) && !this.mealNameCtrl.valid)) {
      this.errorList.push('Todos os campos devem ser preenchidos.');
      return false;
    }

    if (!this._selectedFoods || this._selectedFoods.length == 0) {
      this.errorList.push('Pelo menos 1 alimento deve ser adicionado.');
      return false;
    }

    if (this.quantityFormControls.some(form => !form.valid)) {
      this.errorList.push('Informe a quantidade de todos os alimentos adicionados.');
      return false;
    }

    return true;
  }

  private on_quantity_change(): void {
    this.calcMacros();
  }

  private on_remove_food_click(event: MouseEvent, food: IFoodDetail, index: number): void {
    event.stopPropagation();

    this._selectedFoods.splice(index, 1);
    this.quantityFormControls.splice(index, 1); 

    this.refreshTable();
    this.calcMacros();
  }

  private on_cancel_click(): void {
    this._dialogRef.close();
  }

  private on_save_clicked(): void {
    this.checkErrors();
  }

  private async on_selection_change(event: MatSelectChange): Promise<void> {
    if (!event.value || !event.value.id)
      return;

    this.addValueFormControl();

    let food: IFoodDetail;

    try {
      food = await this._food.getFoodById(event.value.id);
    }
    catch (error) {
      this.on_error(error);
    }
    finally {
      this._selectedFoods.push(food);
  
      this.refreshTable();
      this.calcMacros();
    }
  }

  private show_error_dialog(error: any): void {
    var msg = error instanceof HttpErrorResponse ? error["message"] : error;

    var dialogData: DialogAlertData = {
      text: msg,
      caption: 'Erro',
			button: DialogAlertButton.OK,
    };
    this._dialog.openAlert(dialogData).then(result => { });
	}

	private on_error(error: any): void {
    console.log(error);
		this.show_error_dialog(error);
  }
}