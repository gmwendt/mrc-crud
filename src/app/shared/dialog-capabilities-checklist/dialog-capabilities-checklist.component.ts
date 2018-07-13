import { AfterViewInit, Component, ElementRef, ViewChildren, ViewEncapsulation } from '@angular/core';

import { MatDialogRef } from '../dialog.service';

@Component({
  selector: 'dialog-capabilities-checklist',
  templateUrl: './dialog-capabilities-checklist.component.html',
  styleUrls: ['./dialog-capabilities-checklist.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogCapabilitiesChecklistComponent implements AfterViewInit {

  @ViewChildren('boxLevel0') _boxLevel0;
  @ViewChildren('boxLevel1') _boxLevel1;

  constructor(private _dialogRef: MatDialogRef<DialogCapabilitiesChecklistComponent>, private _element: ElementRef) {
  }

  ngAfterViewInit() {
    console.log(this._boxLevel0);
    console.log(this._element);
    this._boxLevel0.last.nativeElement.checked = true;
    this._boxLevel0.first.nativeElement.indeterminate = true;
  }

  private create_clicked(): void {
  }

  private cancel_clicked(): void {
    this._dialogRef.close();
  }
}