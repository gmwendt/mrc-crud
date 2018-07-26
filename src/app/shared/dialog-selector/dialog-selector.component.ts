import { Component, ViewEncapsulation } from '@angular/core';

import { SelectionModel } from '@angular/cdk/collections';

export class DialogSelectorColumn {
  public key: string;
  public title?: string;
}

@Component({
  selector: 'dialog-selector',
  templateUrl: './dialog-selector.component.html',
  //styleUrls: ['./dialog-selector.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogSelector {
  public dataSource: any = [{ 'especialidade': 'Cardiologista' }, { 'especialidade': 'Oftalmologista' }, { 'especialidade': 'Urologista' }];
  public columns: DialogSelectorColumn[] = [];

  private selection = new SelectionModel<any>(true, []);

  constructor() {
    this.columns.push({key:'especialidade', title: 'Especialidade'})
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

  private get displayedColumns(): string[] {
    var columns: string[] = [];

    columns.push('select');
    this.columns.forEach(c => columns.push(c.key));

    return columns;
  }
}