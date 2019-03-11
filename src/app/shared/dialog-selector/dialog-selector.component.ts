import { Component, EventEmitter, OnDestroy, Output, ViewChild, ViewEncapsulation, ChangeDetectorRef, ChangeDetectionStrategy, } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MatList } from '@angular/material';

import { SelectionModel } from '@angular/cdk/collections';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

export class DialogSelectorColumn {
  public key: string;
  public title?: string;
}

@Component({
  selector: 'dialog-selector',
  templateUrl: './dialog-selector.component.html',
  styleUrls: ['./dialog-selector.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogSelector implements OnDestroy {
  public dataSource: MatTableDataSource<any>;
  public columns: DialogSelectorColumn[] = [];
  public selection = new SelectionModel<any>(true, []);
  public notfoundMsg: string;
  public notfoundLinkMsg: string;
  
  private _data: any[];

  @ViewChild('selectedList') _selectedList: MatList;

  @Output() addItemClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _dialogRef: MatDialogRef<DialogSelector>, private _detector: ChangeDetectorRef, private _sanitizer: DomSanitizer) {
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

  private detect_changes(): void {
    this._detector.detectChanges();
  }

  private get displayedColumns(): string[] {
    var columns: string[] = [];

    columns.push('select');
    this.columns.forEach(c => columns.push(c.key));

    return columns;
  }

  private get tableHeight(): SafeStyle {
    if (!this.selection || !this._selectedList)
      return '';

    if (this.selection.selected.length == 0)
      return '';

    var listHeight = (<any>this._selectedList)._elementRef.nativeElement.clientHeight + 'px';
    var heightToSanitize: string = `calc(100% - ${listHeight})`;
    
    return this._sanitizer.bypassSecurityTrustStyle(heightToSanitize);
  }

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


