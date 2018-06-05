import { Component, Inject, ViewEncapsulation } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '../dialog.service';
import { User } from '../../mrc/common/types';

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

  public dialogResult = DialogAddUserResult;
  public usersList: User[];

  private errorMsg: string;
  private hasError: boolean;

  private email: string;
  private emailError: boolean;

  private name: string;
  private nameError: boolean;

  private userName: string;
  private userNameError: boolean;

  constructor(private _dialog: MatDialogRef<DialogAddUserComponent>) {
  }

  on_close(result: DialogAddUserResult): void {
    this._dialog.close(result);
  }

  private create_clicked(): void {
    if (!this.check_errors())
      return;

      // var user: User = {
      //   accountRefId: this
      // }
  }

  private cancel_clicked(): void {
    this._dialog.close(DialogAddUserResult.Cancel);
  }

  private check_errors(): boolean {
    this.clear_errors();

    if (!this.name) 
      this.nameError = true;

    if (!this.email)
      this.emailError = true;

    if (!this.userName)
      this.userNameError = true;

    if (this.nameError || this.emailError || this.userNameError) {
      this.hasError = true;
      this.errorMsg = 'Os campos em destaque devem ser preenchidos.'
      return false;
    }

    var filter = this.usersList.filter(u => u.email === this.email);
    if (filter.length > 0) {
      this.emailError = true;
      this.hasError = true;
      this.errorMsg = 'Já existe um usuário com este E-mail.'
      return false;
    }
   
    filter = this.usersList.filter(u => u.userName === this.userName);
    if (filter.length > 0) {
      this.userNameError = true;
      this.hasError = true;
      this.errorMsg = 'Já existe um usuário com este Nome de usuário.'
      return false;
    }

    return true;
  }

  private clear_errors(): void {
    this.nameError = false;
    this.emailError = false;
    this. userNameError = false;
  }
}