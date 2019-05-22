import { Component, EventEmitter, OnDestroy, Output, ViewEncapsulation, Inject, ViewChild, ElementRef, } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA, MatSelectChange } from '@angular/material';

import { SelectionModel } from '@angular/cdk/collections';

import { IListSelection } from '../../core/common/types';

// import { SymptomOption } from '../../core/common/constants';

export class DialogSelectorColumn {
  public key: string;
  public title?: string;
}

export interface DialogSelectorData {
  source: IListSelection[];
  columns: DialogSelectorColumn[];
  title: string;
  // groups?: SymptomOption[];
}

@Component({
  selector: 'dialog-selector',
  templateUrl: './dialog-selector.component.html',
  styleUrls: ['./dialog-selector.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogSelector implements OnDestroy {
  //TODO: make private
  public dataSource: MatTableDataSource<any>;
  public columns: DialogSelectorColumn[] = [];
  public selection = new SelectionModel<any>(true, []);
  public notfoundMsg: string;
  public notfoundLinkMsg: string;

  private title: string;
  // private groups: SymptomOption[];
  
  private _data: any[];

  @ViewChild('otherBox') _otherBox: ElementRef;

  @Output() addItemClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _dialogRef: MatDialogRef<DialogSelector>, @Inject(MAT_DIALOG_DATA) data: DialogSelectorData) {
    this.columns = data.columns;
    this.data = data.source;
    this.title = data.title;
    // this.groups = data.groups;
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

  private save_clicked(): void {
    this._dialogRef.close(this.selection.selected);
  }

  private isNullOrEmpty(content: string): boolean {
    return content == null || content.length < 1;
  }

  private add_item_clicked(): void {
    this.addItemClicked.emit();
  }

  private on_group_selection_change(event: MatSelectChange): void {

    var filterd = event.value == 'Todos' ? 
                  this.data : this.data.filter(i => {
                    if (i.group == event.value)
                      return i;
                  });
    
    this.dataSource = new MatTableDataSource(filterd);
  }

  private add_item(name: string): void {
    if (this.columns.length == 0)
      return;

    if (this.data.some(i => i[this.columns[0].key] == name)) {
      console.log("Item already exist!"); //TODO
      return;
    }

    let data = this.data.slice();
    data.push({ 
      [this.columns[0].key]: name 
    });

    this._otherBox.nativeElement.value = '';
    this.data = data;

    this.selectItem(name);
  }

  private selectItem(itemValue: any): void {
    if (this.columns.length == 0)
      return;
      
    let data = this.data.find(i => i[this.columns[0].key] === itemValue);
    if (data)
      this.selection.select(data);
  }

  private get displayedColumns(): string[] {
    var columns: string[] = [];

    columns.push('select');
    this.columns.forEach(c => columns.push(c.key));

    return columns;
  }

  private get selectionText(): string {
    var num = 0;
    if (this.selection)
      num = this.selection.selected.length;

    if (num == 0)
      return 'Nenhum item selecionado.';
    else if (num == 1)
      return '1 item selecionado.';
    else
      return `${num} itens selecionados.`;
  }

  //private get selectedGroup(): string {
    // if (!this.groups)
    //   return;

    // return this.groups.find(i => i.selected).name;
  //}

  //TODO: make private
  get data(): any[] {
    return this._data;
  }

  set data(value: any[]) {
    if (value == this._data)
      return;

    this._data = value;
    this.dataSource = new MatTableDataSource(value);
  }

  ngOnDestroy() {
    this.addItemClicked.unsubscribe();
  }
}


