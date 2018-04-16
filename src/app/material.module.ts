import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatExpansionModule, 
  MatButtonModule,
	MatInputModule, 
	MatMenuModule,
	MatTabsModule
} from '@angular/material';

@NgModule({
  imports: [
		BrowserAnimationsModule,
		MatButtonModule,
    MatExpansionModule, 
		MatInputModule, 
		MatMenuModule,
		MatTabsModule
  ],
  exports: [
		BrowserAnimationsModule,
		MatButtonModule,
		MatExpansionModule, 
		MatInputModule, 
		MatMenuModule,
		MatTabsModule
  ]
})
export class MaterialModule {}