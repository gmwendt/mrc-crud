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

import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  imports: [
		BrowserAnimationsModule,
		CdkTableModule,
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
		CdkTableModule,
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