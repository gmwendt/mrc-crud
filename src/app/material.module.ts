import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

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
		MatIconModule,
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
		MatIconModule,
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