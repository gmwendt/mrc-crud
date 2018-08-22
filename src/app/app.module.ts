import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';

//Services
import { UserService } from './login/user.service';
import { AccountService } from './shared/account.service';
import { DialogService } from './shared/dialog.service';
import { ProfessionalService } from './shared/professional.service';
import { SystemInfoService } from './shared/system-info.service';

//Modules
import { MaterialModule } from './material.module';
import { MrcModule } from './mrc/mrc.module';
import { PagesModule } from './mrc/pages/pages.module';
import { RibbonsModule } from './mrc/ribbons/ribbons.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LoginModule,
    MaterialModule,
    MrcModule,
    PagesModule,
    RegisterModule,
    RibbonsModule,
    SharedModule
  ],
  providers: [AccountService, DialogService, ProfessionalService, SystemInfoService, UserService],
  exports: [LoginModule, MaterialModule, MrcModule, PagesModule, RegisterModule, RibbonsModule],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
