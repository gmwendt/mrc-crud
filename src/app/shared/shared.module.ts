import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DpDatePickerModule } from 'ng2-date-picker';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { AddProfessionalComponent } from './add-professional/add-professional.component';
import { CheckListComponent } from './check-list/check-list.component';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import { DialogAlertComponent } from './dialog-alert/dialog-alert.component';
import { DialogCapabilitiesChecklistComponent } from './dialog-capabilities-checklist/dialog-capabilities-checklist.component';
import { DialogHistoricalValueEditComponent } from './dialog-historical-value-edit/dialog-historical-value-edit.component';
import { DialogSelector } from './dialog-selector/dialog-selector.component';
import { MrcInputEmailValidatorDirective } from './input-email-validator.directive';
import { MrcInputDateValidator } from './input-mrc-date-validator.directive';
import { MrcInputPhoneMaskDirective } from './input-phone-mask.directive';
import { MrcInputRequiredDirective } from './input-required.directive';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { ProgressSpinner2Component } from './progress-spinner-2/progress-spinner-2.component';
import { TimeInputComponent } from './time-input/time-input.component';
import { ZipcodeInputComponent } from './zipcode-input/zipcode-input.component';

import { MaterialModule } from '../material.module';
import { MatMomentDateModule } from '../mat-moment-date.module';

import { COMMON_PIPES } from './common/pipes';

@NgModule({
  imports: [ 
    CommonModule,
    DpDatePickerModule,
    FormsModule, 
    MaterialModule,
    MatMomentDateModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [ COMMON_PIPES,
    AddProfessionalComponent, CheckListComponent, DialogAddUserComponent, DialogAlertComponent, 
    DialogCapabilitiesChecklistComponent, DialogHistoricalValueEditComponent, DialogSelector, MrcInputEmailValidatorDirective, 
    MrcInputDateValidator, MrcInputPhoneMaskDirective, MrcInputRequiredDirective, ProgressSpinnerComponent, ProgressSpinner2Component, TimeInputComponent, 
    ZipcodeInputComponent ],
  exports: [ 
    AddProfessionalComponent,
    CheckListComponent, 
    CommonModule,
    COMMON_PIPES,
    DialogAddUserComponent, 
    DialogAlertComponent, 
    DialogCapabilitiesChecklistComponent,
    DialogHistoricalValueEditComponent,
    DialogSelector, 
    DpDatePickerModule,
    FormsModule,
    MaterialModule,
    MatMomentDateModule,
    MrcInputEmailValidatorDirective,
    MrcInputDateValidator,
    MrcInputPhoneMaskDirective,
    MrcInputRequiredDirective,
    NgxMatSelectSearchModule,
    ProgressSpinnerComponent, 
    ProgressSpinner2Component,
    ReactiveFormsModule,
    TimeInputComponent,
    ZipcodeInputComponent ],
  entryComponents: [
    DialogAddUserComponent, 
    DialogAlertComponent, 
    DialogCapabilitiesChecklistComponent, 
    DialogHistoricalValueEditComponent, 
    DialogSelector],
})
export class SharedModule { }