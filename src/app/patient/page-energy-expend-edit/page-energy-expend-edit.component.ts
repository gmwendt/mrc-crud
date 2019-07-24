import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, OnDestroy } from "@angular/core";
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { ActiviFactorHeB, EnergyExpendProtocol, InjuryFactorList, ActiviFactorFaoOms, ActiviFactorForEER_Mens_3to18, ActiviFactorForEER_Womans_3to18, ActiviFactorForEER_Mens_19orMore, ActiviFactorForEER_Womans_19orMore, ActiviFactorForTEE_Womans_3to18, ActiviFactorForTEE_Mens_3to18, WomanSituation } from './common/constants';
import { EnergyExpendCalculator, IActivityFactor, IEnergyExpendProtocol } from './common/types';

import { Patient, FileSystemCommands, EnergyExpend, GenderEnum } from '../../core/common/types';
import { PatientService } from '../../core/patient.service';

import { DialogAlertButton, DialogAlertData } from '../../shared/dialog-alert/dialog-alert.component';
import { DialogService } from '../../shared/dialog.service';

import { Subscription } from "rxjs";
import * as moment from 'moment';

@Component({
  selector: 'page-energy-expend-edit',
  templateUrl: './page-energy-expend-edit.component.html',
  styleUrls: ['./page-energy-expend-edit.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageEnergyExpendEditComponent implements AfterViewInit, OnDestroy {
  private _paramsDisposable: Subscription;
  private _queryParamsDisposable: Subscription;
  private _dirty: boolean;
  private _patient: Patient;
  private _loading: boolean;
  private _result: number;

  private isNew: boolean;
  private energyExpend: EnergyExpend;
  
  //** Constants */
  private protocolsAvail = EnergyExpendProtocol;
  private injuries = InjuryFactorList;
  private womanSituation = WomanSituation;
  
  //** Controls */
  private descriptionFormControl: FormControl;
  private dateFormControl: FormControl;
  private heightFormControl: FormControl;
  private weightFormControl: FormControl;
  private protocolFormControl: FormControl;
  private activityFormControl: FormControl;
  private injurySelectFormControl: FormControl;
  private injuryFactorFormControl: FormControl;
  private resultFactorFormControl: FormControl;
  // private leanMassFormControl: FormControl;
  private womanSituationFormControl: FormControl;
  private womanSituationTimeFormControl: FormControl;
  
  constructor(private _detector: ChangeDetectorRef, private _route: ActivatedRoute, private _patientService: PatientService,
    private _dialog: DialogService, private _location: Location) {
  }

  ngAfterViewInit() {
    this._paramsDisposable = this._route.params.subscribe(async (params) => {
      let patientId = params['id'];
      let getId = params['getId'];
      this.loading = true;

      try {
        await this.loadGet(patientId, getId);
      }
      catch (error) {
        this.on_error(error);
      }
      finally {
         this.initializeFields();

        this.loading = false;
      }
    });
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

  get patientWeight(): number {
    if (!this._patient.weight)
      return null;

    return this._patient.weight.value;
  }

  get patientHeight(): number {
    if (!this._patient.height)
      return null;

    return this._patient.height.value;
  }

  get protocols(): IEnergyExpendProtocol[] {
    let arr = this.protocolsAvail.slice();

    if (this._patient && this._patient.age > 18) {
      let eerOb = arr.find(p => p.id === 4); 
      let i = arr.indexOf(eerOb);
      arr.splice(i, 1);
    }

    return arr;
  }

  get activityFactorList(): IActivityFactor[] {
    if (!this.energyExpend || !this._patient)
      return [];
    
    let age = this._patient.age;
    let gender = this._patient.gender;
    
    switch (this.energyExpend.selectedProtocol) {
      case 0:
        return ActiviFactorHeB;
      case 1:
        return ActiviFactorFaoOms;
      case 2:
        return ActiviFactorFaoOms;
      case 3:
        if (age >= 3 && age <= 18)
          return gender == GenderEnum.Male ? ActiviFactorForEER_Mens_3to18 : ActiviFactorForEER_Womans_3to18;
        else
          return gender == GenderEnum.Male ? ActiviFactorForEER_Mens_19orMore : ActiviFactorForEER_Womans_19orMore;
      case 4:
        if (age <= 18)
          return gender == GenderEnum.Male ? ActiviFactorForTEE_Mens_3to18 : ActiviFactorForTEE_Womans_3to18;
      case 5:
        return ActiviFactorFaoOms;
      
      default:
        return [];
    }
  }

  get tmb(): number {
    if (this.energyExpend.activityFactor == -1)
      return;
    
    switch (this.energyExpend.selectedProtocol) {
      case 0:
        return EnergyExpendCalculator.tmbHarrisBenedict(this._patient.gender, this.energyExpend.weight, this.energyExpend.height, this._patient.age);
      case 1:
        return EnergyExpendCalculator.tmb_FAO_OMS_2001(this._patient.gender, this._patient.age, this.energyExpend.weight);
      case 2:
        return EnergyExpendCalculator.tmb_FAO_OMS_1985(this._patient.gender, this._patient.age, this.energyExpend.weight);
      case 4:
        return EnergyExpendCalculator.bee_iom(this._patient.gender, this._patient.age, this.energyExpend.weight, this.energyExpend.height / 100);
      case 5:
        return EnergyExpendCalculator.tmb_schofield(this._patient.gender, this._patient.age, this.energyExpend.weight);
    }
  }

  get get(): number {
    if (this.energyExpend.activityFactor == -1)
      return;
    
    switch (this.energyExpend.selectedProtocol) {
      case 0:
        return EnergyExpendCalculator.getHarrisBenedict(this._patient.gender, this.energyExpend.weight, this.energyExpend.height, this._patient.age, this.energyExpend.activityFactor, this.energyExpend.injuryFactor);
      case 1:
        return EnergyExpendCalculator.get_FAO_OMS_2001(this._patient.gender, this._patient.age, this.energyExpend.weight, this.energyExpend.activityFactor, this.energyExpend.injuryFactor);
      case 2:
        return EnergyExpendCalculator.get_FAO_OMS_1985(this._patient.gender, this._patient.age, this.energyExpend.weight, this.energyExpend.activityFactor, this.energyExpend.injuryFactor);
      case 4:
        return EnergyExpendCalculator.tee_iom(this._patient.gender, this._patient.age, this.energyExpend.weight, this.energyExpend.height / 100, this.energyExpend.activityFactor, this.energyExpend.injuryFactor);
      case 5:
        return EnergyExpendCalculator.get_schofield(this._patient.gender, this._patient.age, this.energyExpend.weight, this.energyExpend.activityFactor, this.energyExpend.injuryFactor);
    }
  }

  get eer(): number {
    if (this.energyExpend.activityFactor == -1)
      return;
    
    switch (this.energyExpend.selectedProtocol) {
      case 3:
        return EnergyExpendCalculator.eer_iom_2005(this._patient.gender, this._patient.age, this.energyExpend.weight, this.energyExpend.height / 100, this.energyExpend.activityFactor,
          this._patient.ageInMonths, this.energyExpend.injuryFactor, this.energyExpend.womanSituation, this.energyExpend.womanSituationTime);
    }
  }

  get canShowEER(): boolean {
    return this.energyExpend.selectedProtocol == 3;
  }

  get injuryRange(): string {
    if (!this.energyExpend.injuryId)
      return;

    let injury = this.injuries.find(i => i.id == this.energyExpend.injuryId);
    if (!injury)
      return;

    return injury.min + ' - ' + injury.max;
  }

  get injuryMax(): number {
    if (!this.energyExpend.injuryId)
      return;

    let injury = this.injuries.find(i => i.id == this.energyExpend.injuryId);
    if (!injury)
      return;
    
    return injury.max;
  }

  get injuryMin(): number {
    if (!this.energyExpend.injuryId)
      return;

    let injury = this.injuries.find(i => i.id == this.energyExpend.injuryId);
    if (!injury)
      return;

    return injury.min;
  }

  get canBePregOrLact(): boolean {
    return this._patient && this._patient.gender == GenderEnum.Female && this._patient.age >= 14;
  }

  get result(): number {
    return this._result;
  }

  set result(value: number) {
    if (value == this._result)
      return;
    
    this._result = Math.round(value * 100) / 100;
  }

  get maxTime(): number {
    if (this.energyExpend.womanSituation === 2)
      return 36;
    if (this.energyExpend.womanSituation === 3)
      return 12;
    
    return 0;
  }

  get weightLossRange(): string {
    if (this.energyExpend && this.energyExpend.weight)
      return `${this.energyExpend.weight * 0.2} kcal - ${this.energyExpend.weight * 0.25} kcal`;
  }

  get weightGainRange(): string {
    if (this.energyExpend && this.energyExpend.weight)
      return `${this.energyExpend.weight * 0.3} kcal - ${this.energyExpend.weight * 0.35} kcal`;
  }

  get descriptionBottom(): string {
    if (this.descriptionFormControl.hasError('required'))
      return '8px';

    return '';
  }

  get dateBottom(): string {
    if (this.dateFormControl.hasError('required'))
      return '8px';

    return '';
  }

  get heightCtrlBottom(): string {
    if (this.heightFormControl.hasError('required') || this.heightFormControl.hasError('min') || this.heightFormControl.hasError('max'))
      return '16px';
    
    return '';
  }

  get weightCtrlBottom(): string {
    if (this.weightFormControl.hasError('required') || this.weightFormControl.hasError('min') || this.weightFormControl.hasError('max'))
      return '16px';

    return '';
  }

  private async loadGet(patientId: string, getId: string): Promise<void> {
    this.isNew = parseInt(getId) == FileSystemCommands.Add;
    this._patient = await this._patientService.getPatientById(patientId);

    if (this.isNew) {
      let weight = this._patient.weight ? this._patient.weight.value : null;
      let height = this._patient.height ? this._patient.height.value : null;

      this.energyExpend = new EnergyExpend(this.guid(), '', new Date().toISOString(), weight, height);
      
      if (!this._patient.energyExpend)
        this._patient.energyExpend = [];
      
      this._patient.energyExpend.push(this.energyExpend);
    }
    else {
      this.energyExpend = this._patient.energyExpend.find(get => get.id == getId);

      if (!this.energyExpend)
        throw Error("Cound not find EnergyExpend content on server.");
    }
  }

  private initializeFields(): void {
    let timestamp = this.energyExpend ? this.energyExpend.date : new Date(Date.now());
    let desc = this.energyExpend ? this.energyExpend.description : '';

    this.descriptionFormControl = new FormControl(desc, Validators.required);
    this.dateFormControl = new FormControl(moment(timestamp), Validators.required);
    this.heightFormControl = new FormControl(this.energyExpend.height, [Validators.required, Validators.min(10), Validators.max(299)]);
    this.weightFormControl = new FormControl(this.energyExpend.weight, [Validators.required, Validators.min(0.1), Validators.max(499)]);
    this.protocolFormControl = new FormControl(this.energyExpend.selectedProtocol);
    this.activityFormControl = new FormControl(this.energyExpend.activityFactor, Validators.required);
    this.injurySelectFormControl = new FormControl(this.energyExpend.injuryId);
    this.injuryFactorFormControl = new FormControl(this.energyExpend.injuryFactor);
    this.resultFactorFormControl = new FormControl(this.energyExpend.result, Validators.required);
    this.womanSituationFormControl = new FormControl(this.energyExpend.womanSituation);
    this.womanSituationTimeFormControl = new FormControl(this.energyExpend.womanSituationTime);
    // this.leanMassFormControl = new FormControl(this.energyExpend.leanMass);

    // if (this.energyExpend.selectedProtocol == 3)
    //   this.leanMassFormControl.setValidators(Validators.required);
  }

  private updateResult(): void {
    if (this.energyExpend.selectedProtocol == 3)
      this.result = this.eer;
    else
      this.result = this.get;
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

  private on_weight_changed(value: number): void {
    if (value == this.energyExpend.weight)
      return;
    
    this.energyExpend.weight = value;
    this.updateResult();
  }

  private on_injury_factor_change(value: number): void {
    if (value == this.energyExpend.injuryId)
      return;
    
    let injury = this.injuries.find(i => i.id == value);
    if (!injury) {
      this.on_error("ERROR: can't find injury.")
      return;
    }

    this.energyExpend.injuryId = value;
    this.energyExpend.injuryFactor = injury.min;

    this.injuryFactorFormControl.clearValidators();
    this.injuryFactorFormControl.setValidators([Validators.min(injury.min), Validators.max(injury.max)]);

    this.updateResult();
  }

  private on_protocol_changed(value: number): void {
    if (value == this.energyExpend.selectedProtocol)
      return;
    
    this.energyExpend.selectedProtocol = value;
    this.energyExpend.activityFactor = -1;

    // if (value == 3)
    //   this.leanMassFormControl.setValidators(Validators.required);
    // else
    //   this.leanMassFormControl.clearValidators();      

    this.updateResult();
  }

  private on_cancel_clicked(): void {
    this._location.back();
  }

  private on_activity_factor_changed(value: number): void {
    if (value == this.energyExpend.activityFactor)
      return;

    this.energyExpend.activityFactor = value;
    this.updateResult();
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