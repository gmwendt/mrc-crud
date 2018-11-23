import { NgModule } from '@angular/core';

import {
  MatExpansionModule, 
	MatButtonModule,
	MatCheckboxModule,
	MatDatepickerModule,
	MatDialogModule,
	MatDividerModule,
	MatInputModule, 
	MatMenuModule,
	MatNativeDateModule,
	MatTableModule,
	MatTabsModule,
} from '@angular/material';

import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  imports: [
		CdkTableModule,
		MatButtonModule,
		MatCheckboxModule,
		MatDatepickerModule,
		MatDialogModule,
		MatDividerModule,
		MatExpansionModule, 
		MatInputModule, 
		MatMenuModule,
		MatNativeDateModule,
		MatTableModule,
		MatTabsModule,
  ],
  exports: [
		CdkTableModule,
		MatButtonModule,
		MatCheckboxModule,
		MatDatepickerModule,
		MatDialogModule,
		MatDividerModule,
		MatExpansionModule, 
		MatInputModule,  
		MatMenuModule,
		MatNativeDateModule,
		MatTableModule,
		MatTabsModule,
  ]
})
export class MaterialModule {}