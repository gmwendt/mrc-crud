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
import { SystemInfoService } from './shared/system-info.service';

//Shared
import { DialogAddUserComponent } from './shared/dialog-add-user/dialog-add-user.component';
import { DialogAlertComponent } from './shared/dialog-alert/dialog-alert.component';

//Modules
import { MaterialModule } from './material.module';
import { MrcModule } from './mrc/mrc.module';
import { PagesModule } from './mrc/pages/pages.module';
import { RibbonsModule } from './mrc/ribbons/ribbons.module';

@NgModule({
  declarations: [
    AppComponent, DialogAddUserComponent, DialogAlertComponent
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
    RibbonsModule
  ],
  providers: [AccountService, DialogService, SystemInfoService, UserService],
  exports: [LoginModule, MaterialModule, MrcModule, PagesModule, RegisterModule, RibbonsModule],
  bootstrap: [AppComponent],
  entryComponents: [DialogAddUserComponent, DialogAlertComponent]
})
export class AppModule { }
