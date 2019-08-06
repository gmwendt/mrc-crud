import { Component, ViewEncapsulation, AfterViewInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from "@angular/core";
import { Location } from '@angular/common';
import { HttpErrorResponse } from "@angular/common/http";
import { FormControl, Validators } from "@angular/forms";
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange, MatRadioButton } from "@angular/material/radio";
import { ActivatedRoute } from "@angular/router";

import { DialogAddMeal, IDialogAddMealData } from "./dialog-add-meal/dialog-add-meal.component";
import { DialogNutrients } from './dialog-nutrients/dialog-nutrients.component';
import { DialogPlanning } from './dialog-planning/dialog-planning.component';

import { DaysWeek } from '../../core/common/constants';
import { FoodPlan, Patient, FileSystemCommands, IMeal, IFoodDetail, FoodPlanning, ISubstituteMeal } from "../../core/common/types";
import { PatientService } from "../../core/patient.service";

import { DialogAlertButton, DialogAlertData, DialogAlertResult } from "../../shared/dialog-alert/dialog-alert.component";
import { DialogService } from "../../shared/dialog.service";

import { seriesColors as SeriesColors } from '../../widgets/common/constants';
import { IPieChartData } from '../../widgets/pie-chart/pie-chart.component';

import { Subscription } from "rxjs/internal/Subscription";

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
  private _loading: boolean;
  private _patient: Patient;

  private _dialogAddMealHeight = 630;

  private descriptionFormControl: FormControl;

  private isNew: boolean;
  private foodPlan: FoodPlan;

  private ptnSum: number = 0;
  private choSum: number = 0;
  private lipSum: number = 0;
  private energySum: number = 0;

  private pieChartData: IPieChartData[] = [];
  private pieChartUnit: string = '%';
  private seriesColors: string[] = SeriesColors;

  private daysWeek = DaysWeek;

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

        setTimeout(() => {
          this.updateChartData();
          this._detector.detectChanges();
        });

        this.loading = false;
      }
    });
  }

  private async loadFoodPlan(patientId: string, foodPlanId: string): Promise<void> {
    this.isNew = parseInt(foodPlanId) == FileSystemCommands.AddType1 || parseInt(foodPlanId) == FileSystemCommands.AddType2;
    this._patient = await this._patientService.getPatientById(patientId);

    if (this.isNew) {
      let isRecall = parseInt(foodPlanId) == FileSystemCommands.AddType1;
      this.foodPlan = new FoodPlan(this.guid(), this.newName(isRecall), new Date().toISOString(), isRecall);

      if (!this._patient.foodPlans)
        this._patient.foodPlans = [];

      this._patient.foodPlans.push(this.foodPlan);
    }
    else {
      this.foodPlan = this._patient.foodPlans.find(fp => fp.id == foodPlanId);

      if (!this.foodPlan)
        throw Error("Could not find LabAnalyse content on server.");
    }
  }

  private initializeFields(): void {
    let desc = this.foodPlan ? this.foodPlan.description : '';
    let timestamp = this.foodPlan ? this.foodPlan.date : new Date(Date.now());

    this.descriptionFormControl = new FormControl(desc, Validators.required);
  }

  private newName(isRecall: boolean): string {
    if (!this._patient)
      return '';

    let name = isRecall ? 'Recordatório alimentar' : 'Plano alimentar';
    let inc = 1;
    let incName = name + ' ' + inc;

    if (!this._patient.foodPlans || this._patient.foodPlans.every(e => e.description != incName))
      return incName;

    for (let i = 0; i < this._patient.foodPlans.length; i++) {
      inc++;
      incName = name + ' ' + inc;

      if (this._patient.foodPlans.every(e => e.description != incName))
        return incName;
    }
  }

  private checkErrors(): boolean {
    if (this.descriptionFormControl.hasError('required'))
      return false;

    return true;
  }

  private isDaySelected(value: number): boolean {
    if (!this.foodPlan)
      return;
    
    return this.foodPlan.selectedDays.some(d => d === value);
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
      editing: editing,
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
    let text = `Deseja remover a refeição ${meal.mealName}?`;
    text += meal.selectedFoods && meal.selectedFoods.length > 0 ? ` Esta ação também removerá todas as refeições substitutas de ${meal.mealName}` : '';

    let dialogData: DialogAlertData = {
      text: text,
      button: DialogAlertButton.YesNo,
      textAlign: 'center',
    };

    let dialogResult = await this._dialog.openAlert(dialogData);
    if (dialogResult == DialogAlertResult.No)
      return;

    this.foodPlan.meals.splice(index, 1);

    this.updateChartData();
    this.markAsDirty();
    this._detector.detectChanges();
  }

  private async on_remove_substitute_click(meal: IMeal, subsIndex: number): Promise<void> {
    let dialogData: DialogAlertData = {
      text: `Deseja remover a ${subsIndex + 2}ª opção de ${meal.mealName}?`,
      button: DialogAlertButton.YesNo,
      textAlign: 'center',
    };

    let dialogResult = await this._dialog.openAlert(dialogData);
    if (dialogResult == DialogAlertResult.No)
      return;
    
    meal.substituteMeals.splice(subsIndex, 1)
    this.markAsDirty();
    this._detector.detectChanges();
  }

  private show_meal_details(meal?: IMeal | ISubstituteMeal): void {
    let foods = [];

    if (meal)
      foods = meal.selectedFoods;
    else
      this.foodPlan.meals.forEach(food => foods.push(...food.selectedFoods));

    this._dialog.open(DialogNutrients, { data: foods })
  }

  private open_planning_dialog(): void {
    let planning = this.foodPlan.foodPlanning ? this.foodPlan.foodPlanning : new FoodPlanning(this.patientWeight, this.patientGet); 

    var dialogRef = this._dialog.open(DialogPlanning, { data: planning });
    dialogRef.afterClosed().subscribe((result: FoodPlanning) => {
      if (!result)
        return;
      
      this.foodPlan.foodPlanning = result;
      this._detector.detectChanges();

      this.markAsDirty();
    })
  }

  private on_selected_days_changed(event: MatCheckboxChange): void {
    let index = this.foodPlan.selectedDays.indexOf(parseInt(event.source.value));

    if (event.checked && index == -1)
      this.foodPlan.selectedDays.push(parseInt(event.source.value));
    else if (!event.checked && index > -1)
      this.foodPlan.selectedDays.splice(index, 1);

    this.markAsDirty();
  }

  private on_use_ref_change(value: boolean): void {
    if (value && !this.foodPlan.foodPlanning) 
      this.open_planning_dialog();
    
    this.foodPlan.useReference = value;
    this.markAsDirty();
  }

  private on_add_substitute_click(meal: IMeal, index?: number): void {
    let editing = (index === undefined || index === null) ? false : true;
    let selectedFoodsCloned: IFoodDetail[] = [];

    if (editing) {
      if (!meal.substituteMeals || meal.substituteMeals.length == 0)
        throw "Error: missing susbtitute meal";
      
      meal.substituteMeals[index].selectedFoods.map(food => selectedFoodsCloned.push(Object.assign({}, food)));
    }
    
    let dialogData: IDialogAddMealData = {
      isSubstitute: true,
      editing: editing,
      useFoodDb: this.foodPlan.useFoodDb,
      dialogHeight: this._dialogAddMealHeight,
      mealName: meal.mealName,
      mealTime: meal.mealTime,
      selectedFoods: editing ? selectedFoodsCloned : undefined
    };
    let dialogRef = this._dialog.open(DialogAddMeal, { data: dialogData, width: '800px', height: this._dialogAddMealHeight + 'px' });

    dialogRef.afterClosed().subscribe((result: ISubstituteMeal) => {
      if (!result)
        return;

      if (editing) 
        meal.substituteMeals[index] = result;
      else {
        if (!meal.substituteMeals)
          meal.substituteMeals = [];
        meal.substituteMeals.push(result);
      }

      this.markAsDirty();
      this._detector.detectChanges();
    });
  }

  private async on_save_clicked(): Promise<void> {
    if (!this.checkErrors())
      return;
    
    let conflictsOk = await this.checkDaysConflict();
    if (!conflictsOk)
      return;

    this.foodPlan.date = new Date().toISOString();

    this.loading = true;

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

  private async checkDaysConflict(): Promise<boolean> {
    let conflictPlans: FoodPlan[] = [];
    
    if (!this.foodPlan.selectedDays || !this.foodPlan.active)
      return Promise.resolve(true);

    this._patient.foodPlans.forEach(plan => {
      if (plan.isRecall || !plan.active || plan.id === this.foodPlan.id || !plan.selectedDays)
        return;
      
      if (plan.selectedDays.some(a => this.foodPlan.selectedDays.some(b => b === a)))
        conflictPlans.push(plan);
    });

    if (conflictPlans.length == 0)
      return Promise.resolve(true);

    let allEqual = conflictPlans.length == 1 && conflictPlans[0].selectedDays.every(a => this.foodPlan.selectedDays.some(b => b === a));
    let dialogData: DialogAlertData = {
      text: `Já existem refeições ativas para estes dias. ` + (allEqual ? 'Deseja desativar os planos ativos?' : 'Deseja sobrescrever os dias das refeições ativas?'), //TODO: review text
      button: DialogAlertButton.YesNo,
      textAlign: 'center',
    };

    let dialogResult = await this._dialog.openAlert(dialogData);
    if (dialogResult == DialogAlertResult.No)
      return Promise.resolve(false);
    
    if (allEqual) 
      conflictPlans[0].active = false;
    else {
      conflictPlans.forEach(activePlan => {
        this.foodPlan.selectedDays.forEach(d => {
          let i = activePlan.selectedDays.indexOf(d);
          if (i > -1)
            activePlan.selectedDays.splice(i, 1);
        });
      });
    }

    return Promise.resolve(true);
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
    if (!this.patientWeight)
      return null;

    return value / this.patientWeight;
  }

  private getSubstituteMealName(meal: IMeal): string {
    if (!meal)
      return;
    
    let count = meal.substituteMeals ? meal.substituteMeals.length + 2 : 2;
    return `Adicionar ${count}ª opção`;
  }

  private get patientWeight(): number {
    if (this.foodPlan.useReference && this.foodPlan.foodPlanning && this.foodPlan.foodPlanning.weight)
      return this.foodPlan.foodPlanning.weight;
    
    if (!this._patient.weight)
      return null;

    return this._patient.weight.value;
  }

  private get patientGet(): number {
    if (!this._patient || !this._patient.energyExpend || this._patient.energyExpend.length == 0)
      return null;
    
    let mostRecentDate = new Date(Math.max.apply(null, this._patient.energyExpend.map(e => {
      return new Date(e.date);
    })));
    
    let mostRecentObject = this._patient.energyExpend.filter(e => {
      var d = new Date(e.date);
      return d.getTime() == mostRecentDate.getTime();
    })[0];

    return mostRecentObject.totalEnergyExpend;
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

  private get canShowMacroRef(): boolean {
    if (!this.foodPlan.useReference)
      return false;
    
    if (this.foodPlan.foodPlanning && this.foodPlan.foodPlanning.carbohydrate && this.foodPlan.foodPlanning.lipid && this.foodPlan.foodPlanning.protein)
      return true;
  }

  private get canShowEnergyRef(): boolean {
    if (!this.foodPlan.useReference)
      return false;
    
    if (this.foodPlan.foodPlanning && this.foodPlan.foodPlanning.energy)
      return true;
  }

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    if (value == this._loading)
      return;

    this._loading = value;
    this._detector.detectChanges();
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