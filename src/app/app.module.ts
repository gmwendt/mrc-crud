import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';

//Mrc Components
import { MrcComponent }     from './mrc/mrc.component';
import { MrcContentComponent } from './mrc/mrc-content/mrc-content.component';
import { MrcHeaderComponent }     from './mrc/mrc-header/mrc-header.component';
import { MrcHeaderConfigComponent } from './mrc/mrc-header/mrc-header-config/mrc-header-config.component';
import { MrcHeaderMenuComponent } from './mrc/mrc-header-menu/mrc-header-menu.component';
import { NavigationComponent }     from './mrc/navigation/navigation.component';

//Services
import { AuthGuardService } from './login/auth-guard.service';
import { UserService } from './login/user.service';
import { MrcContentService } from './mrc/mrc-content/mrc-content.service';
import { AccountService } from './shared/account.service';
import { DialogService } from './shared/dialog.service';
import { SystemInfoService } from './shared/system-info.service';

//Shared
import { DialogAddUserComponent } from './shared/dialog-add-user/dialog-add-user.component';
import { DialogAlertComponent } from './shared/dialog-alert/dialog-alert.component';

//Modules
import { MaterialModule } from './material.module';
import { PagesModule } from './mrc/pages/pages.module';
import { RibbonsModule } from './mrc/ribbons/ribbons.module';


const appRoutes: Routes = [
  {
    path: 'mrc-login',
    loadChildren: 'app/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/register/register.module#RegisterModule'
  },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    component: MrcComponent
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    AppComponent, DialogAddUserComponent, DialogAlertComponent, MrcComponent, MrcContentComponent, MrcHeaderComponent, 
    MrcHeaderConfigComponent, MrcHeaderMenuComponent, NavigationComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    HttpModule,
    LoginModule,
    MaterialModule,
    PagesModule,
    RegisterModule,
    RibbonsModule
  ],
  providers: [AccountService, AuthGuardService, DialogService, MrcContentService, SystemInfoService, 
    UserService],
  exports: [LoginModule, MaterialModule, PagesModule, RegisterModule, RibbonsModule],
  bootstrap: [AppComponent],
  entryComponents: [DialogAddUserComponent, DialogAlertComponent]
})
export class AppModule { }
