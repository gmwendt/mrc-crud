import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MatTableDataSource } from '@angular/material';

import { SelectionModel } from '@angular/cdk/collections';

export class DialogSelectorColumn {
  public key: string;
  public title?: string;
}

@Component({
  selector: 'dialog-selector',
  templateUrl: './dialog-selector.component.html',
  styleUrls: ['./dialog-selector.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogSelector {
  public dataSource = new MatTableDataSource(DATA_MOCKED);
  public columns: DialogSelectorColumn[] = [];

  private selection = new SelectionModel<any>(true, []);

  constructor(private _dialogRef: MatDialogRef<DialogSelector>) {
    //mock
    this.columns.push({key:'especialidade', title: 'Especialidade'});
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  private cancel_clicked(): void {
    this._dialogRef.close();
  }

  private get displayedColumns(): string[] {
    var columns: string[] = [];

    columns.push('select');
    this.columns.forEach(c => columns.push(c.key));

    return columns;
  }
}

const DATA_MOCKED: any[] = [
  { 'especialidade': 'Cardiologista' }, 
  { 'especialidade': 'Dermatologista' }, 
  { 'especialidade': 'Oftalmologista' }, 
  { 'especialidade': 'Oftalmologista' }, 
  { 'especialidade': 'Oftalmologista' }, 
  { 'especialidade': 'Oftalmologista' }, 
  { 'especialidade': 'Oftalmologista' }, 
  { 'especialidade': 'Oftalmologista' }, 
  { 'especialidade': 'Oftalmologista' }, 
  { 'especialidade': 'Oftalmologista' }, 
  { 'especialidade': 'Oftalmologista' }, 
  { 'especialidade': 'Oftalmologista' }, 
  { 'especialidade': 'Oftalmologista' }, 
  { 'especialidade': 'Oftalmologista' }, 
  { 'especialidade': 'Oftalmologista' }, 
  { 'especialidade': 'Oftalmologista' }, 
  { 'especialidade': 'Urologista' }
]
