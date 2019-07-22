import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, OnDestroy } from "@angular/core";
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { ActiviFactorHeB, EnergyExpendProtocol, InjuryFactorList, ActiviFactorFaoOms } from './common/constants';
import { EnergyExpendCalculator, IActivityFactor } from './common/types';

import { Patient, FileSystemCommands, EnergyExpend } from '../../core/common/types';
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
  private protocols = EnergyExpendProtocol;
  private injuries = InjuryFactorList;
  
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
  private leanMassFormControl: FormControl;
  
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

  get activityFactorList(): IActivityFactor[] {
    if (!this.energyExpend)
      return [];
    
    switch (this.energyExpend.selectedProtocol) {
      case 0:
        return ActiviFactorHeB;
      case 1:
        return ActiviFactorFaoOms;
      case 2:
        return ActiviFactorFaoOms;
      case 4:
        return ActiviFactorFaoOms;
        
        //TODO: others
      
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
        return EnergyExpendCalculator.get_schofield(this._patient.gender, this._patient.age, this.energyExpend.weight, this.energyExpend.activityFactor, this.energyExpend.injuryFactor);
    }
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

  get result(): number {
    return this._result;
  }

  set result(value: number) {
    if (value == this._result)
      return;
    
    this._result = Math.round(value * 100) / 100;
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
    this.heightFormControl = new FormControl(this.energyExpend.height, Validators.required);
    this.weightFormControl = new FormControl(this.energyExpend.weight, Validators.required);
    this.protocolFormControl = new FormControl(this.energyExpend.selectedProtocol);
    this.activityFormControl = new FormControl(this.energyExpend.activityFactor, Validators.required);
    this.injurySelectFormControl = new FormControl(this.energyExpend.injuryId);
    this.injuryFactorFormControl = new FormControl(this.energyExpend.injuryFactor);
    this.resultFactorFormControl = new FormControl(this.energyExpend.result, Validators.required);
    this.leanMassFormControl = new FormControl(this.energyExpend.leanMass);

    if (this.energyExpend.selectedProtocol == 3)
      this.leanMassFormControl.setValidators(Validators.required);
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
    this.result = this.get;
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

    this.result = this.get;
  }

  private on_protocol_changed(value: number): void {
    if (value == this.energyExpend.selectedProtocol)
      return;
    
    this.energyExpend.selectedProtocol = value;
    this.energyExpend.activityFactor = -1;

    if (value == 3)
      this.leanMassFormControl.setValidators(Validators.required);
    else
      this.leanMassFormControl.clearValidators();      

    this.result = this.get;
  }

  private on_cancel_clicked(): void {
    this._location.back();
  }

  private on_activity_factor_changed(value: number): void {
    if (value == this.energyExpend.activityFactor)
      return;

    this.energyExpend.activityFactor = value;
    this.result = this.get;
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