import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule
  ],
  declarations: [ RegisterComponent ],
  exports: [RegisterComponent]
})
export class RegisterModule { }