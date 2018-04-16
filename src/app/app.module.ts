import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

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

@NgModule({
  declarations: [
    AppComponent, MrcComponent, MrcContentComponent, MrcHeaderComponent, MrcHeaderConfigComponent, MrcHeaderMenuComponent, NavigationComponent,
    RibbonCadastroComponent
  ],
  imports: [
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
