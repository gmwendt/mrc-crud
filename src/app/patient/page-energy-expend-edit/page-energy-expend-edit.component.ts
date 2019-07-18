import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, OnDestroy } from "@angular/core";
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { ActiviFactorHeB, EnergyExpendProtocol } from './common/constants';
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

  private protocols = EnergyExpendProtocol;

  private isNew: boolean;
  private energyExpend: EnergyExpend;  

  private descriptionFormControl: FormControl;
  private dateFormControl: FormControl;
  private heightFormControl: FormControl;
  private weightFormControl: FormControl;
  private protocolFormControl: FormControl;
  
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
      //TODO: others
      
      default:
        return [];
    }
  }

  get tmb(): number {
    return Math.round(EnergyExpendCalculator.tmbHarrisBenedict(this._patient.gender, this.energyExpend.weight, this.energyExpend.height, this._patient.age));
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