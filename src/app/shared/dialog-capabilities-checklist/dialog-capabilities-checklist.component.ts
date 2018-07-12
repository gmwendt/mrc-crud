import { Component, ViewEncapsulation } from '@angular/core';

import { MatDialogRef } from '../dialog.service';

@Component({
  selector: 'dialog-capabilities-checklist',
  templateUrl: './dialog-capabilities-checklist.component.html',
  styleUrls: ['./dialog-capabilities-checklist.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogCapabilitiesChecklistComponent {
  constructor(private _dialogRef: MatDialogRef<DialogCapabilitiesChecklistComponent>) {
  }

  private create_clicked(): void {
  }

  private cancel_clicked(): void {
    this._dialogRef.close();
  }
}