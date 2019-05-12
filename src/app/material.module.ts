import { NgModule } from '@angular/core';

import {
  MatExpansionModule, 
	MatButtonModule,
	MatButtonToggleModule,
	MatCheckboxModule,
	MatDatepickerModule,
	MatDialogModule,
	MatDividerModule,
	MatInputModule, 
	MatListModule,
	MatMenuModule,
	MatNativeDateModule,
	MatPaginatorIntl,
	MatPaginatorModule,
	MatRadioModule,
	MatSelectModule,
	MatTableModule,
	MatTabsModule,
} from '@angular/material';

import { CdkTableModule } from '@angular/cdk/table';

import { MatPaginatorIntlBr } from './core/common/types';

@NgModule({
  imports: [
		CdkTableModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatCheckboxModule,
		MatDatepickerModule,
		MatDialogModule,
		MatDividerModule,
		MatExpansionModule, 
		MatInputModule, 
		MatListModule,
		MatMenuModule,
		MatNativeDateModule,
		MatPaginatorModule,
		MatRadioModule,
		MatSelectModule,
		MatTableModule,
		MatTabsModule,
  ],
  exports: [
		CdkTableModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatCheckboxModule,
		MatDatepickerModule,
		MatDialogModule,
		MatDividerModule,
		MatExpansionModule, 
		MatInputModule,  
		MatListModule,
		MatMenuModule,
		MatNativeDateModule,
		MatRadioModule,
		MatPaginatorModule,
		MatSelectModule,
		MatTableModule,
		MatTabsModule,
	], 
	providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlBr}]
})
export class MaterialModule {}