import { Component, ViewEncapsulation, Inject, OnInit, AfterViewInit, OnDestroy, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSelect, MatSelectChange } from "@angular/material/select";
import { MatTableDataSource } from "@angular/material/table";
import { HttpErrorResponse } from "@angular/common/http";
import { FormControl } from "@angular/forms";

import { FoodGroups as MealGroups } from "../../../core/common/constants";
import { IFoodDetail, IFoodMeasurement } from "../../../core/common/types";
import { FoodService } from "../../../core/food.service";
import { DialogAlertData, DialogAlertButton } from "../../../shared/dialog-alert/dialog-alert.component";
import { DialogService } from "../../../shared/dialog.service";

import { ReplaySubject, Subject } from "rxjs";
import { take, takeUntil } from 'rxjs/operators';

export interface IDialogAddMealData {
  useFoodDb: boolean;
}

export enum FoodSourceEnum {
  All,
  Taco,
  MyFoods,
  MySupplements
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
  private tableDisplayedColumns: string[] = ['description', 'quantity', 'protein', 'carbs', 'lipids', 'energy', 'measurements', 'commands'];

  /** Form Controls declaration */
  /** control for the selected food */
  private foodCtrl: FormControl = new FormControl();
  /** control for the MatSelect filter keyword */
  private foodFilterCtrl: FormControl = new FormControl();
  private quantityFormControls: FormControl[] = [];
  private mealSelectCtrl: FormControl = new FormControl();
  private descriptionFormControl: FormControl = new FormControl(); 
  private mealTime: string;
  private selecteMealId: string;
  private mealGroups = MealGroups;

  private foodSourceEnum = FoodSourceEnum;
  private selectedFoodSource: number = FoodSourceEnum.All;

  private proteinSum: number;
  private carbohydrateSum: number;
  private lipidSum: number;
  private energySum: number;

  /** Pie Chart Options */
  private view: any[] = [300, 180];
  private gradient = false;
  private showLegend = false;
  private showLabels = true;
  private legendPosition = 'below';
  private colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  private chartData: IPieChartData[] = [];
  /** */

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
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }


  private refreshTable(): void {
    this.dataSource = new MatTableDataSource(this._selectedFoods);
    this._detector.detectChanges();
  }

  private addValueFormControl(): void {
    this.quantityFormControls.push(new FormControl());
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
      let energy = food.attributes["energy"] && !isNaN(food.attributes["energy"].qty) ? food.attributes["energy"].qty : 0;

      this.proteinSum += food.quantity ? protein * converter * food.quantity : 0;
      this.carbohydrateSum += food.quantity ? carbohydrate * converter * food.quantity : 0;
      this.lipidSum += food.quantity ? lipid * converter * food.quantity : 0;
      this.energySum += food.quantity ? energy * converter * food.quantity : 0;
    })
  }

  private updateChart(): void {
    this.chartData = [];
    this.chartData.push({
      name: "Proteínas",
      value: this.proteinSum
    }, {
      name: "Carboidratos",
      value: this.carbohydrateSum
    }, {
      name: "Lipídios",
      value: this.lipidSum
    });
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

  private on_quantity_change(): void {
    this.calcMacros();
    this.updateChart();
  }

  private on_remove_food_click(event: MouseEvent, food: IFoodDetail, index: number): void {
    event.stopPropagation();

    this._selectedFoods.splice(index, 1);
    this.quantityFormControls.splice(index, 1); //TODO: testar

    this.calcMacros();
    this.updateChart();
    this.refreshTable();
  }

  private on_cancel_click(): void {
    this._dialogRef.close();
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
      this.updateChart();
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