import { Component, ViewEncapsulation, AfterViewInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef } from "@angular/core";
import { Location } from '@angular/common';
import { HttpErrorResponse } from "@angular/common/http";
import { FormControl, Validators } from "@angular/forms";
import { MatRadioChange, MatRadioButton } from "@angular/material/radio";
import { ActivatedRoute } from "@angular/router";

import { DialogAddMeal, IDialogAddMealData } from "./dialog-add-meal/dialog-add-meal.component";
import { DialogNutrients } from './dialog-nutrients/dialog-nutrients.component';

import { FoodPlan, Patient, FileSystemCommands, IMeal, IFoodDetail } from "../../core/common/types";
import { PatientService } from "../../core/patient.service";

import { DialogAlertButton, DialogAlertData, DialogAlertResult } from "../../shared/dialog-alert/dialog-alert.component";
import { DialogService } from "../../shared/dialog.service";

import { seriesColors as SeriesColors } from '../../widgets/common/constants';
import { IPieChartData } from '../../widgets/pie-chart/pie-chart.component';

import { Subscription } from "rxjs/internal/Subscription";

import * as moment from 'moment';
import * as Chart from 'chart.js';

@Component({
  selector: 'page-food-plan-edit',
  templateUrl: './page-food-plan-edit.component.html',
  styleUrls: ['./page-food-plan-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PageFoodPlanEditComponent implements AfterViewInit, OnDestroy {
  private _paramsDisposable: Subscription;
  private _queryParamsDisposable: Subscription;
  private _dirty: boolean;
  private _patient: Patient;

  private _dialogAddMealHeight = 630;

  private descriptionFormControl: FormControl;

  private loading: boolean;
  private isNew: boolean;
  private foodPlan: FoodPlan;
  
  private ptnSum: number = 0;
  private choSum: number = 0;
  private lipSum: number = 0;
  private energySum: number = 0;

  private pieChartData: IPieChartData[] = [];
  private pieChartUnit: string = '%';
  private seriesColors: string[] = SeriesColors;

  @ViewChild('radioBtnCalc', { static: false }) matRadioBtnCalc: MatRadioButton; 
  @ViewChild('radioBtnFree', { static: false }) matRadioBtnFree: MatRadioButton; 

  constructor(private _route: ActivatedRoute, private _detector: ChangeDetectorRef, private _patientService: PatientService, 
    private _dialog: DialogService, private _location: Location) {

  }
  
  ngAfterViewInit() {
    this._paramsDisposable = this._route.params.subscribe(async (params) => {
      let patientId = params['id'];
      let foodPlanId = params['foodPlanId'];
      this.loading = true;

      try {
        await this.loadFoodPlan(patientId, foodPlanId);
      }
      catch (error) {
        this.on_error(error);
      }
      finally {
        this.initializeFields();
        this.updateChartData();

        this.loading = false;
        this._detector.detectChanges();
      }
    });
  }

  private async loadFoodPlan(patientId: string, foodPlanId: string): Promise<void> {
    this.isNew = parseInt(foodPlanId) == FileSystemCommands.AddType1 || parseInt(foodPlanId) == FileSystemCommands.AddType2; 
    this._patient = await this._patientService.getPatientById(patientId);

    if (this.isNew) {
      let isRecall = parseInt(foodPlanId) == FileSystemCommands.AddType1;
      let description = parseInt(foodPlanId) == FileSystemCommands.AddType1 ? 'Novo recordatório alimentar' : 'Novo plano alimentar';
      this.foodPlan = new FoodPlan(this.guid(), description, new Date().toISOString(), isRecall);

      if (!this._patient.foodPlans)
        this._patient.foodPlans = [];

      this._patient.foodPlans.push(this.foodPlan);
    }
    else {
      this.foodPlan = this._patient.foodPlans.find(fp => fp.id == foodPlanId);

      if (!this.foodPlan)
        throw Error("Cound not find LabAnalyse content on server.");
    }
  }
  
  private initializeFields(): void {
    let desc = this.foodPlan ? this.foodPlan.description : '';
    let timestamp = this.foodPlan ? this.foodPlan.date : new Date(Date.now());

    this.descriptionFormControl = new FormControl(desc, Validators.required);
  }

  private checkErrors(): boolean {
    if (!this.descriptionFormControl.valid)
      return false;

    return true;
  }

  private async on_food_source_change(event: MatRadioChange): Promise<void> {
    if (this.foodPlan.meals && this.foodPlan.meals.length > 0) {
      let dialogData: DialogAlertData = {
        text: `Esta ação irá remover todas as refeições já adicionadas. Deseja prosseguir?`,
        button: DialogAlertButton.YesNo,
        textAlign: 'center',
      };
      
      let dialogResult = await this._dialog.openAlert(dialogData);
      if (dialogResult == DialogAlertResult.No) {
        if (event.value) 
          this.matRadioBtnFree.checked = true;
        else
          this.matRadioBtnCalc.checked = true;

        this._detector.detectChanges();
        return;
      }
      
      this.foodPlan.meals = [];
      this._detector.detectChanges();
    }
    
    this.foodPlan.useFoodDb = event.value;
    this.markAsDirty();
  }

  private on_add_meal_click(meal?: IMeal, index?: number): void {
    let editing = meal ? true : false;    
    let selectedFoodsCloned: IFoodDetail[] = [];

    if (editing)
      meal.selectedFoods.map(food => selectedFoodsCloned.push(Object.assign({}, food)));

    let dialogData: IDialogAddMealData = {
      editing : editing,
      useFoodDb: this.foodPlan.useFoodDb,
      dialogHeight: this._dialogAddMealHeight,
      mealName: editing ? meal.mealName : undefined,
      mealTime: editing ? meal.mealTime : undefined,
      notes: editing ? meal.notes : undefined,
      selectedFoods: editing ? selectedFoodsCloned : undefined,
      mealAsText: editing ? meal.mealAsText : undefined
    };
    let dialogRef = this._dialog.open(DialogAddMeal, { data: dialogData, width: '800px', height: this._dialogAddMealHeight + 'px' });
    
    dialogRef.afterClosed().subscribe((result: IMeal) => {
      if (!result)
        return;

      if (editing)
        this.foodPlan.meals[index] = result;
      else 
        this.foodPlan.meals.push(result);
        
      this.updateChartData();
      this.markAsDirty();
      this._detector.detectChanges();
    });
  }

  private async on_remove_meal_click(meal: IMeal, index: number): Promise<void> {
    let dialogData: DialogAlertData = {
			text: `Deseja remover a refeição ${meal.mealName}?`,
			button: DialogAlertButton.YesNo,
			textAlign: 'center',
    };

    let dialogResult = await this._dialog.openAlert(dialogData);
    if (dialogResult == DialogAlertResult.No)
      return;

    this.foodPlan.meals.splice(index, 1);

    this.markAsDirty();
    this._detector.detectChanges();
  }

  private show_food_details(): void {
    let foods = [];
    this.foodPlan.meals.forEach(meal => foods.push(...meal.selectedFoods));

    this._dialog.open(DialogNutrients, { data: foods })
  }

  private async on_save_clicked(): Promise<void> {
    if (!this.checkErrors())
      return;

    this.foodPlan.date = new Date().toISOString();

    this.loading = true;
    this._detector.detectChanges();

    try {
      await this._patientService.updatePatient(this._patient);
      this._location.back();
    }
    catch (error) {
      this.on_error(error);
    }
    finally {
      this.loading = false;
    }
  }

  private on_cancel_clicked(): void {
    this._location.back();
  }

  private updateChartData(): void {
    this.ptnSum = 0;
    this.choSum = 0;
    this.lipSum = 0;
    this.energySum = 0;

    this.foodPlan.meals.forEach(meal => {
      if (!meal.macros)
        return;

      this.ptnSum += meal.macros.protein;
      this.choSum += meal.macros.carbohydrate;
      this.lipSum += meal.macros.lipid;
      this.energySum += meal.macros.energy;
    });

    let data: IPieChartData[] = [{
      data: this.getMacroPercent(this.ptnSum),
      label: 'Proteínas'
    }, {
      data: this.getMacroPercent(this.choSum),
      label: 'Carboidratos'
    }, {
      data: this.getMacroPercent(this.lipSum),
      label: 'Lipídios'
    }];
    
    this.pieChartData = data;
  }

  private formatFoodDetail(food: IFoodDetail): string {
    let measurement = food.measurements.find(m => m.id === food.selectedMeasurement);
    return food.description + ' - ' + food.quantity + " " + measurement.description;
  }

  private freeTextFoodsList(meal: IMeal): string[] {
    if (this.foodPlan.useFoodDb || this.isNullOrEmpty(meal.mealAsText))
      return;

    return meal.mealAsText.split(/\n/);
  }

  private getMacroPercent(value: number): number {
    let total = this.ptnSum + this.choSum + this.lipSum;
    return value / total * 100;
  }

  private getGramsPerKg(value: number): number {
    if (!this._patient.weight)
      return null;

    return value / this._patient.weight.value;
  }

  private get patientWeight(): number {
    if (!this._patient.weight)
      return null;

    return this._patient.weight.value;
  }

  private get pageTitle(): string {
    if (!this.foodPlan)
      return;

    let title = this.foodPlan.isRecall ? 'Recordatório Alimentar' : 'Plano Alimentar';
    return title;
  }

  private get pageSubtitle(): string {
    if (!this.foodPlan)
      return;

    if (this.isNew) {
      if (this.foodPlan.isRecall)
        return 'Novo recordatório';
      return 'Novo plano';
    }
    else if (this.foodPlan.isRecall)
      return 'Editar recordatório';
    return 'Editar plano';
  }

  private get foodTypeSelectTxt(): string {
    if (this.foodPlan.isRecall)
      return 'Tipo do recordatório';
    return 'Tipo do plano alimentar';
  }

  get dirty(): boolean {
    if (this.descriptionFormControl && this.descriptionFormControl.dirty)
      return true;

    return this._dirty;
  }

  private markAsDirty(): void {
    if (this._dirty)
      return;

    this._dirty = true;
    this._detector.markForCheck();
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

  private guid(): string {
    return this.guidS4() + this.guidS4() + '-' +
      this.guidS4() + '-' + this.guidS4() + '-' +
      this.guidS4() + '-' + this.guidS4() + this.guidS4() + this.guidS4();
  }

  private guidS4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  private isNullOrEmpty(content: string): boolean {
    return content == null || content.length < 1;
  }

  ngOnDestroy() {
    if (this._paramsDisposable != null) {
      this._paramsDisposable.unsubscribe();
      this._paramsDisposable = null;
    }

    if (this._queryParamsDisposable != null) {
      this._queryParamsDisposable.unsubscribe();
      this._queryParamsDisposable = null;
    }
  }

}