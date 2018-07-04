import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import { DialogAlertComponent } from './dialog-alert/dialog-alert.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';

import { MaterialModule } from '../material.module';

@NgModule({
  imports: [ BrowserModule, FormsModule, MaterialModule ],
  declarations: [ DialogAddUserComponent, DialogAlertComponent, ProgressSpinnerComponent ],
  exports: [ DialogAddUserComponent, DialogAlertComponent, ProgressSpinnerComponent ],
  entryComponents: [DialogAddUserComponent, DialogAlertComponent]
})
export class SharedModule { }