import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AddProfessionalComponent } from './add-professional/add-professional.component';
import { CheckListComponent } from './check-list/check-list.component';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import { DialogAlertComponent } from './dialog-alert/dialog-alert.component';
import { DialogCapabilitiesChecklistComponent } from './dialog-capabilities-checklist/dialog-capabilities-checklist.component';
import { DialogSelector } from './dialog-selector/dialog-selector.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { TimeInputComponent } from './time-input/time-input.component';

import { MaterialModule } from '../material.module';

@NgModule({
  imports: [ 
    CommonModule,
    FormsModule, 
    MaterialModule,
    RouterModule,
  ],
  declarations: [ AddProfessionalComponent, CheckListComponent, DialogAddUserComponent, DialogAlertComponent, 
    DialogCapabilitiesChecklistComponent, DialogSelector, ProgressSpinnerComponent, TimeInputComponent ],
  exports: [ 
    AddProfessionalComponent,
    CheckListComponent, 
    CommonModule,
    DialogAddUserComponent, 
    DialogAlertComponent, 
    DialogCapabilitiesChecklistComponent,
    DialogSelector, 
    FormsModule,
    MaterialModule,
    ProgressSpinnerComponent, 
    TimeInputComponent ],
  entryComponents: [DialogAddUserComponent, DialogAlertComponent, DialogCapabilitiesChecklistComponent, DialogSelector],
})
export class SharedModule { }