import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { RegisterModule } from './register/register.module';

import { DialogService } from './shared/dialog.service';

//Modules
import { CoreModule } from './core/core.module';
import { MrcModule } from './mrc/mrc.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    MrcModule,
    NoopAnimationsModule,
  ],
  exports: [RegisterModule], //Why need to export RegisterModule ?
  bootstrap: [AppComponent],
  providers: [DialogService]
})
export class AppModule { }
