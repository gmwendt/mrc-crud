import { Component, ViewEncapsulation } from '@angular/core';

import { DialogCapabilitiesChecklistComponent, DialogCapabilitiesCheckListResult } from '../dialog-capabilities-checklist/dialog-capabilities-checklist.component';

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

  public newUserData: NewUserData = {
    capabilities: new Capabilities(),
    name: '',
    email: '',
    userName: ''
  };
  public usersList: User[];
  public editMode: boolean;

  private errorMsg: string;
  private hasError: boolean;

  private emailError: boolean;
  private nameError: boolean;
  private userNameError: boolean;

  constructor(private _dialogRef: MatDialogRef<DialogAddUserComponent>, private _dialog: DialogService) {
  }

  private create_clicked(): void {
    if (!this.check_creation_errors())
      return;

    this._dialogRef.close(DialogAddUserResult.OK);
  }

  private update_clicked(): void {
    if (!this.check_update_errors())
      return;
      
    //TODO
  }

  private cancel_clicked(): void {
    this._dialogRef.close(DialogAddUserResult.Cancel);
  }

  private customize_capabilities_clicked(): void {
    var dialogRef = this._dialog.open(DialogCapabilitiesChecklistComponent, { disableClose: true });
    dialogRef.componentInstance.capabilities = this.newUserData.capabilities;
    dialogRef.componentInstance.createData();

    dialogRef.afterClosed().subscribe((result: DialogCapabilitiesCheckListResult) => {
      if (result == DialogCapabilitiesCheckListResult.Cancel) 
        return;

      this.newUserData.capabilities = dialogRef.componentInstance.capabilities;
    });
  }

  private check_creation_errors(): boolean {
    this.clear_errors();

    if (!this.newUserData.name) 
      this.nameError = true;

    if (!this.newUserData.email)
      this.emailError = true;

    if (!this.newUserData.userName)
      this.userNameError = true;

    if (this.nameError || this.emailError || this.userNameError) {
      this.hasError = true;
      this.errorMsg = 'Os campos em destaque devem ser preenchidos.'
      return false;
    }

    var filter = this.usersList.filter(u => u.email === this.newUserData.email);
    if (filter.length > 0) {
      this.emailError = true;
      this.hasError = true;
      this.errorMsg = 'Já existe um usuário com este E-mail.'
      return false;
    }
   
    filter = this.usersList.filter(u => u.userName === this.newUserData.userName);
    if (filter.length > 0) {
      this.userNameError = true;
      this.hasError = true;
      this.errorMsg = 'Já existe um usuário com este Nome de usuário.'
      return false;
    }

    //TODO: Check if email format is valid.

    return true;
  }

  private check_update_errors(): boolean {
    if (!this.newUserData.name) 
      this.nameError = true;

    if (this.nameError) {
      this.hasError = true;
      this.errorMsg = 'Os campos em destaque devem ser preenchidos.'
      return false;
    }
    
    return true;
  }

  private clear_errors(): void {
    this.nameError = false;
    this.emailError = false;
    this. userNameError = false;
  }

  private get canManageSystemData(): boolean {
    return this.newUserData.capabilities.fullAccessAdministrativeTools;
  }

  private get canManageSystemDataIndeterminate(): boolean {
    if (!this.canManageSystemData) {
      if (this.newUserData.capabilities.registerAgreements || this.newUserData.capabilities.registerClinics ||
        this.newUserData.capabilities.registerDocuments || this.newUserData.capabilities.registerPatients ||
        this.newUserData.capabilities.registerProfessionals || this.newUserData.capabilities.registerServices ||
        this.newUserData.capabilities.registerUsers)
        return true;
    }
  }
}