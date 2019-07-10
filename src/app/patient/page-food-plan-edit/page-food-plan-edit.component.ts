import { Component, ViewEncapsulation, AfterViewInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef } from "@angular/core";
import { Location } from '@angular/common';
import { HttpErrorResponse } from "@angular/common/http";
import { FormControl, Validators } from "@angular/forms";
import { MatRadioChange, MatRadioButton } from "@angular/material/radio";
import { ActivatedRoute } from "@angular/router";

import { DialogAddMeal, IDialogAddMealData } from "./dialog-add-meal/dialog-add-meal.component";

import { FoodPlan, Patient, FileSystemCommands, IMeal, IFoodDetail } from "../../core/common/types";
import { PatientService } from "../../core/patient.service";
import { DialogAlertButton, DialogAlertData, DialogAlertResult } from "../../shared/dialog-alert/dialog-alert.component";
import { DialogService } from "../../shared/dialog.service";

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

  private pieChartLabels: string[] = ["Proteínas (g)", "Carboidratos (g)", "Lipídios (g)"];
  private pieChartData: number[] = [];
  private pieChartType: string = 'pie';
  private pieChartOptions :any = { 'backgroundColor': [
               "#FF6384",
               "#FFCE56",
               "#4BC0C0",
            // "#E7E9ED",
            // "#36A2EB"
            ]};

  @ViewChild('radioBtnCalc', { static: false }) matRadioBtnCalc: MatRadioButton; 
  @ViewChild('radioBtnFree', { static: false }) matRadioBtnFree: MatRadioButton; 
  @ViewChild('myPie', { static: false }) pieChart: ElementRef;

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
        //this.updateChartData();
        this.createChart();

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

  private createChart(): void {
    let options: Chart.ChartConfiguration = {
      data: {
        labels: this.pieChartLabels,
        datasets: [{ 
          data: [10, 20, 30],
          backgroundColor: ["#FF6384", "#FFCE56", "#4BC0C0"] 
        }],
      },
      type: 'pie',
    };

    setTimeout(() => {
      let chart = new Chart(this.pieChart.nativeElement, options);
    });
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
    let p = 0, c = 0, l = 0, e = 0;

    this.foodPlan.meals.forEach(meal => {
      if (!meal.macros)
        return;

      p += meal.macros.protein;
      c += meal.macros.carbohydrate;
      l += meal.macros.lipid;
      e += meal.macros.energy;
    });

    this.pieChartData.push(p);
    this.pieChartData.push(c);
    this.pieChartData.push(l);
    console.log(this.pieChartData);
    console.log(this.pieChart);
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