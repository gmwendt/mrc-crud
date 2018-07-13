import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatExpansionModule, 
	MatButtonModule,
	MatCheckboxModule,
	MatDialogModule,
	MatInputModule, 
	MatMenuModule,
	MatTableModule,
	MatTabsModule
} from '@angular/material';

import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  imports: [
		BrowserAnimationsModule,
		CdkTableModule,
		MatButtonModule,
		MatCheckboxModule,
		MatDialogModule,
    MatExpansionModule, 
		MatInputModule, 
		MatMenuModule,
		MatTableModule,
		MatTabsModule
  ],
  exports: [
		BrowserAnimationsModule,
		CdkTableModule,
		MatButtonModule,
		MatCheckboxModule,
		MatDialogModule,
		MatExpansionModule, 
		MatInputModule, 
		MatMenuModule,
		MatTableModule,
		MatTabsModule
  ]
})
export class MaterialModule {}