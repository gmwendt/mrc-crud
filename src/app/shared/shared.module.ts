import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddProfessionalComponent } from './add-professional/add-professional.component';
import { CheckListComponent } from './check-list/check-list.component';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import { DialogAlertComponent } from './dialog-alert/dialog-alert.component';
import { DialogCapabilitiesChecklistComponent } from './dialog-capabilities-checklist/dialog-capabilities-checklist.component';
import { DialogProfessionalScheduleComponent } from './dialog-professional-schedule/dialog-professional-schedule.component';
import { DialogSelector } from './dialog-selector/dialog-selector.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';

import { MaterialModule } from '../material.module';

@NgModule({
  imports: [ BrowserModule, FormsModule, MaterialModule ],
  declarations: [ AddProfessionalComponent, CheckListComponent, DialogAddUserComponent, DialogAlertComponent, 
    DialogCapabilitiesChecklistComponent, DialogProfessionalScheduleComponent, DialogSelector, ProgressSpinnerComponent ],
  exports: [ AddProfessionalComponent, CheckListComponent, DialogAddUserComponent, DialogAlertComponent, 
    DialogCapabilitiesChecklistComponent, DialogProfessionalScheduleComponent, DialogSelector, ProgressSpinnerComponent ],
  entryComponents: [DialogAddUserComponent, DialogAlertComponent, DialogCapabilitiesChecklistComponent, DialogProfessionalScheduleComponent, DialogSelector]
})
export class SharedModule { }