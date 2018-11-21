import { NgModule } from '@angular/core';

//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatExpansionModule, 
	MatButtonModule,
	MatCheckboxModule,
	MatDatepickerModule,
	MatDialogModule,
	MatInputModule, 
	MatMenuModule,
	MatNativeDateModule,
	MatTableModule,
	MatTabsModule,
} from '@angular/material';

import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  imports: [
		// BrowserAnimationsModule,
		CdkTableModule,
		MatButtonModule,
		MatCheckboxModule,
		MatDatepickerModule,
		MatDialogModule,
    MatExpansionModule, 
		MatInputModule, 
		MatMenuModule,
		MatNativeDateModule,
		MatTableModule,
		MatTabsModule,
  ],
  exports: [
		// BrowserAnimationsModule,
		CdkTableModule,
		MatButtonModule,
		MatCheckboxModule,
		MatDatepickerModule,
		MatDialogModule,
		MatExpansionModule, 
		MatInputModule, 
		MatMenuModule,
		MatNativeDateModule,
		MatTableModule,
		MatTabsModule,
  ]
})
export class MaterialModule {}