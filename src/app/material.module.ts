import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatExpansionModule, 
	MatButtonModule,
	MatDialogModule,
	MatInputModule, 
	MatMenuModule,
	MatTableModule,
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
		MatTableModule,
		MatTabsModule
  ],
  exports: [
		BrowserAnimationsModule,
		MatButtonModule,
		MatDialogModule,
		MatExpansionModule, 
		MatInputModule, 
		MatMenuModule,
		MatTableModule,
		MatTabsModule
  ]
})
export class MaterialModule {}