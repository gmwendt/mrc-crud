import { Component, ViewEncapsulation } from '@angular/core';

import { DialogCapabilitiesChecklistComponent } from '../dialog-capabilities-checklist/dialog-capabilities-checklist.component';

import { MatDialogRef, DialogService } from '../dialog.service';

import { Capabilities, User } from '../../mrc/common/types';

export enum DialogAddUserResult {
  Cancel,
  OK
}

export class NewUserData {
  public capabilities: Capabilities;
  public email: string;
  public name: string;
  public userName: string;
} 

@Component({
  selector: 'dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogAddUserComponent {

  public newUserData: NewUserData;
  public usersList: User[];

  private errorMsg: string;
  private hasError: boolean;

  private email: string;
  private emailError: boolean;

  private name: string;
  private nameError: boolean;

  private userName: string;
  private userNameError: boolean;

  private canScheduleAndRegisterPatient: boolean;
  private canManageSystemData: boolean;
  private canAccessFinances: boolean;

  constructor(private _dialogRef: MatDialogRef<DialogAddUserComponent>, private _dialog: DialogService) {
  }

  private create_clicked(): void {
    if (!this.check_errors())
      return;

    this.newUserData = {
      capabilities: new Capabilities(),
      name: this.name,
      email: this.email,
      userName: this.userName
    }    

    if (this.canScheduleAndRegisterPatient)
      this.newUserData.capabilities.scheduleAndRegisterPatient = true;

    if (this.canManageSystemData)
      this.newUserData.capabilities.fullAccessAdministrativeTools = true;

    if (this.canAccessFinances)
      this.newUserData.capabilities.accessGlobalFinances = true;

    this._dialogRef.close(DialogAddUserResult.OK);
  }

  private cancel_clicked(): void {
    this._dialogRef.close(DialogAddUserResult.Cancel);
  }

  private customize_capabilities_clicked(): void {
    var dialogRef = this._dialog.open(DialogCapabilitiesChecklistComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      
    });
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

    //TODO: Check if email format is valid.

    return true;
  }

  private clear_errors(): void {
    this.nameError = false;
    this.emailError = false;
    this. userNameError = false;
  }
}