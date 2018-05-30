import { Component, Inject, ViewEncapsulation } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '../dialog.service';

export enum DialogAddUserResult {
  Cancel,
  OK
}

@Component({
  selector: 'dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogAddUserComponent {

  public alertResult = DialogAddUserResult;

  public message: string;

  constructor(private _dialog: MatDialogRef<DialogAddUserComponent>) {
  }

  on_close(result: DialogAddUserResult): void {
    this._dialog.close(result);
  }

  private create_clicked(): void {

  }

  private cancel_clicked(): void {
    
  }
}