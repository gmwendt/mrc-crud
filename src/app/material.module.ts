import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatExpansionModule, 
	MatButtonModule,
	MatDialogModule,
	MatInputModule, 
	MatMenuModule,
	MatTabsModule
} from '@angular/material';

@NgModule({
  imports: [
		BrowserAnimationsModule,
		MatButtonModule,
		MatDialogModule,
    MatExpansionModule, 
		MatInputModule, 
		MatMenuModule,
		MatTabsModule
  ],
  exports: [
		BrowserAnimationsModule,
		MatButtonModule,
		MatDialogModule,
		MatExpansionModule, 
		MatInputModule, 
		MatMenuModule,
		MatTabsModule
  ]
})
export class MaterialModule {}