import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, QueryList, ViewChild, ViewEncapsulation, ViewChildren } from '@angular/core';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { Clinic, Patient, FileSystemCommands, GenderEnum, AddressInfo } from '../../core/common/types';
import { ClinicService } from '../../core/clinic.service';
import { PatientService } from '../../core/patient.service';
import { UserService } from '../../core/user.service';

import { DialogAlertData, DialogAlertButton } from '../../shared/dialog-alert/dialog-alert.component';
import { ZipcodeInputComponent } from '../../shared/zipcode-input/zipcode-input.component';
import { DialogService } from '../../shared/dialog.service';
import { MrcInputEmailValidatorDirective } from '../../shared/input-email-validator.directive';
import { MrcInputDateValidator } from '../../shared/input-mrc-date-validator.directive';
import { MrcInputPhoneMaskDirective } from '../../shared/input-phone-mask.directive';
import { MrcInputRequiredDirective } from '../../shared/input-required.directive';

import { IDatePickerConfig } from 'ng2-date-picker';
import { Subscription } from 'rxjs';
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'page-patient-edit',
  templateUrl: './page-patient-edit.component.html',
  styleUrls: ['./page-patient-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PagePatientEdit implements AfterViewInit, OnDestroy {

  private loading: boolean = true;
  private isNew: boolean;
  private patient: Patient;
  private errorList: string[] = [];
  private dpIsOpen: boolean;
  private clinics: Clinic[];

  private genderEnum = GenderEnum;

  private _paramsDisposable: Subscription;
  private _dirty: boolean;

  private dpConfig: IDatePickerConfig;
  private _dpModel: Moment;

  @ViewChild(MrcInputDateValidator) dateInput: MrcInputDateValidator;
  @ViewChild(MrcInputEmailValidatorDirective) emailInput: MrcInputEmailValidatorDirective;
  @ViewChild(MrcInputRequiredDirective) nameInput: MrcInputRequiredDirective;
  @ViewChild(ZipcodeInputComponent) zipcodeInput: ZipcodeInputComponent;
  @ViewChildren(MrcInputPhoneMaskDirective) phoneInputs: QueryList<MrcInputPhoneMaskDirective>;

  constructor(private _route: ActivatedRoute, private _detector: ChangeDetectorRef, private _patientService: PatientService, 
    private _userService: UserService, private _clinicService: ClinicService, private _dialog: DialogService, private _location: Location) {

  }

  ngAfterViewInit() {
    this._paramsDisposable = this._route.params.subscribe(async (params) => {
      var patientId = params['id'];
      var isNew = parseInt(patientId) == FileSystemCommands.Add; 

      try {
        await Promise.all([
          this.loadPatient(patientId, isNew),
          this.loadClinics()
        ]);
      }
      catch (error) {

      }
      finally {
        this.initializeDatePicker();
        this.loading = false;
        this.isNew = isNew;
      }
    });
  }

  get dirty(): boolean {
    return this._dirty;
  }

  private get browserLocale(): string {
    return navigator.language || (<any>navigator).userLanguage;
  }

  private get dpModel(): Moment {
    return this._dpModel;
  }

  private set dpModel(value: Moment) {
    if (!(value instanceof moment))
      return;

    if (this._dpModel && this._dpModel.format() == value.format())
      return;

    this._dpModel = moment(value.format()).locale(this.browserLocale);
    this.patient.birthDate = value.format();
    this.markAsDirty();
  }

  private markAsDirty(): void {
    if (this._dirty)
      return;

    this._dirty = true;
    this._detector.markForCheck();
  }

  private initializeDatePicker(): void {
    if (this.patient.birthDate)
      this._dpModel = moment(this.patient.birthDate).locale(this.browserLocale);

    this.dpConfig = {
      format: 'L', 
      locale: this.browserLocale,
      openOnClick: false,
      openOnFocus: false
    };
  }

  private checkErrors(): void {
    this.errorList = [];

    //check generic inputs
    if (this.nameInput.showErrors)
      this.nameInput.updateBorderColor();
    else
      this.nameInput.showErrors = true;

    if (this.nameInput.isNullOrEmpty)
      this.errorList.push(this.nameInput.emptyError);

    //check zipcode input
    if (this.zipcodeInput.showErrors)
      this.zipcodeInput.updateBorderColor();
    else
      this.zipcodeInput.showErrors = true;

    if (this.zipcodeInput.error)
      this.errorList.push(this.zipcodeInput.error);

    //check phone1 errors
    this.phoneInputs.forEach(input => {
      if (input.showErrors)
        input.updateBorderColor();
      else
        input.showErrors = true;

      if (input.error)
        this.errorList.push(input.error);
    });

    //check email errors
    if (this.emailInput.showErrors)
      this.emailInput.updateBorderColor();
    else
      this.emailInput.showErrors = true;

    if (this.emailInput.error)
      this.errorList.push(this.emailInput.error);

    //check dp erros
    if (this.dateInput.showErrors) 
      this.dateInput.updateBorderColor();
    else 
      this.dateInput.showErrors = true;

    if (this.dateInput.error) 
      this.errorList.push(this.dateInput.error)
  }

  private on_zipcode_update(address: AddressInfo): void {
    this.patient.address = address ? address : new AddressInfo('', '', '', '', '', '', '');
    this.markAsDirty();
  }

  private async on_apply_clicked(): Promise<void> {
    if (!this.dirty)
      return;

      this.checkErrors();
      
      if (this.errorList.length > 0)
      return;
      
    this.loading = true;
    try {
      if (this.isNew) 
        await this._patientService.addPatient(this.patient);
      else
        await this._patientService.updatePatient(this.patient);

      this._location.back();
    }
    catch (error) {
      this.on_error(error);
    }
    finally {
      this.loading = false;
    }
  }

  private async on_cancel_clicked(): Promise<void> {
    this._location.back();
  }

  private async loadPatient(patientId: string, isNew: boolean): Promise<void> {
    if (isNew) {
      this._dirty = true;
      this.patient = new Patient(this._userService.currentUser.accountRefId);
    }
    else
      this.patient = await this._patientService.getPatientById(patientId);
  }

  private async loadClinics(): Promise<void> {
    this.clinics = await this._clinicService.getAllClinics();
  }

  private show_error_dialog(error: any): void {
    var msg = error instanceof HttpErrorResponse ? (error.error ? error.error["error"] : error["message"]) : error;

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

  ngOnDestroy(): void {
    if (this._paramsDisposable != null) {
      this._paramsDisposable.unsubscribe();
      this._paramsDisposable = null;
    }
  }
}