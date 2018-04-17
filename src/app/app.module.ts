import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

//Mrc Components
import { MrcComponent }     from './mrc/mrc.component';
import { MrcContentComponent } from './mrc/mrc-content/mrc-content.component';
import { MrcHeaderComponent }     from './mrc/mrc-header/mrc-header.component';
import { MrcHeaderConfigComponent } from './mrc/mrc-header/mrc-header-config/mrc-header-config.component';
import { MrcHeaderMenuComponent } from './mrc/mrc-header-menu/mrc-header-menu.component';
import { NavigationComponent }     from './mrc/navigation/navigation.component';
import { RibbonCadastroComponent } from './mrc/ribbons/ribbon-cadastro/ribbon-cadastro.component';

//Services
import { MrcContentService } from './mrc/mrc-content/mrc-content.service';

//Modules
import { MaterialModule } from './material.module';
import { PagesModule } from './mrc/pages/pages.module';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
]

@NgModule({
  declarations: [
    AppComponent, LoginComponent, MrcComponent, MrcContentComponent, MrcHeaderComponent, 
    MrcHeaderConfigComponent, MrcHeaderMenuComponent, NavigationComponent, RegisterComponent,
    RibbonCadastroComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    PagesModule
  ],
  providers: [MrcContentService],
  exports: [MaterialModule, PagesModule],
  bootstrap: [AppComponent],
  entryComponents: [RibbonCadastroComponent]
})
export class AppModule { }
