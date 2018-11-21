import { NgModule } from '@angular/core';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    RegisterRoutingModule,
    SharedModule
  ],
  declarations: [ RegisterComponent ],
  exports: [RegisterComponent],
  bootstrap: [RegisterComponent],
})
export class RegisterModule { }