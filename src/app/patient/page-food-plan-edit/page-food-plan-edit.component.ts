import { Component, ViewEncapsulation, AfterViewInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { Location } from '@angular/common';
import { HttpErrorResponse } from "@angular/common/http";
import { FormControl, Validators } from "@angular/forms";
import { MatRadioChange } from "@angular/material/radio";
import { ActivatedRoute } from "@angular/router";

import { FoodPlan, Patient, FileSystemCommands } from "../../core/common/types";
import { PatientService } from "../../core/patient.service";
import { DialogAlertButton, DialogAlertData } from "../../shared/dialog-alert/dialog-alert.component";
import { DialogService } from "../../shared/dialog.service";

import { Subscription } from "rxjs/internal/Subscription";

import * as moment from 'moment';
import { DialogAddMeal, IDialogAddMealData } from "./dialog-add-meal/dialog-add-meal.component";

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

  private descriptionFormControl: FormControl;
  private dateFormControl: FormControl;

  private loading: boolean;
  private isNew: boolean;
  private foodPlan: FoodPlan;

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
    this.dateFormControl = new FormControl(moment(timestamp), Validators.required);
  }

  private on_food_source_change(event: MatRadioChange): void {
    this.foodPlan.useFoodDb = event.value;
    this.markAsDirty();
  }

  private on_add_meal_click(): void {
    let dialogData: IDialogAddMealData = {
      useFoodDb: this.foodPlan.useFoodDb
    };
    let dialogRef = this._dialog.open(DialogAddMeal, { data: dialogData });
    
    dialogRef.afterClosed().subscribe(result => {

    });
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
    if (!this.dateFormControl || !this.descriptionFormControl)
      return false;

    if (this.dateFormControl.dirty || this.descriptionFormControl.dirty)
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