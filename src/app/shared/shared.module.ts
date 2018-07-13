import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CheckListComponent } from './check-list/check-list.component';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import { DialogAlertComponent } from './dialog-alert/dialog-alert.component';
import { DialogCapabilitiesChecklistComponent } from './dialog-capabilities-checklist/dialog-capabilities-checklist.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';

import { MaterialModule } from '../material.module';

@NgModule({
  imports: [ BrowserModule, FormsModule, MaterialModule ],
  declarations: [ CheckListComponent, DialogAddUserComponent, DialogAlertComponent, DialogCapabilitiesChecklistComponent, 
    ProgressSpinnerComponent ],
  exports: [ CheckListComponent, DialogAddUserComponent, DialogAlertComponent, DialogCapabilitiesChecklistComponent, 
    ProgressSpinnerComponent ],
  entryComponents: [DialogAddUserComponent, DialogAlertComponent, DialogCapabilitiesChecklistComponent]
})
export class SharedModule { }