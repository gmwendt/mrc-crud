import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';

//Mrc Components
import { MrcComponent }     from './mrc/mrc.component';

@NgModule({
  declarations: [
    AppComponent, MrcComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [],
  exports: [MaterialModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
