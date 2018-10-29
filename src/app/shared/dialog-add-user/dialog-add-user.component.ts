import { Component, ViewEncapsulation, ViewChild } from '@angular/core';

import { ProfessionalData, AddProfessionalComponent } from '../add-professional/add-professional.component';

import { DialogCapabilitiesChecklistComponent, DialogCapabilitiesCheckListResult } from '../dialog-capabilities-checklist/dialog-capabilities-checklist.component';

import { MatDialogRef, DialogService } from '../dialog.service';

import { Capabilities, User, Professional } from '../../mrc/common/types';

export enum DialogAddUserResult {
  Cancel,
  OK
}

export class NewUserData {
  public capabilities: Capabilities;
  public birthdate: Date;
  public email: string;
  public name: string;
  public userName: string;
  public isProfessional: boolean;
} 

@Component({
  selector: 'dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogAddUserComponent {

  @ViewChild(AddProfessionalComponent) professionalView: AddProfessionalComponent;

  public newUserData: NewUserData = {
    capabilities: new Capabilities(),
    birthdate: null,
    name: '',
    email: '',
    userName: '',
    isProfessional: false
  };
  public newProfessionalData: ProfessionalData = {
    active: true,
    professionalRegisterNum: '',
    professionalRegisterState: '',
    specialites: '',
    schedule: null,
    errors: { }
  };
  public usersList: User[];
  public editMode: boolean;

  private errorMsg: string;
  private hasError: boolean;

  private emailError: boolean;
  private nameError: boolean;
  private userNameError: boolean;

  private editedUser: User;
  private currentUser: User;

  constructor(private _dialogRef: MatDialogRef<DialogAddUserComponent>, private _dialog: DialogService) {
  }

  public setUserData(user: User, currentUser: User, professional?: Professional): void {
    //clone capabilities
    this.newUserData.capabilities = Capabilities.fromJSON(Capabilities.toJSON(user.capabilities));
    
    this.newUserData.birthdate = user.birthDate;
    this.newUserData.email = user.email;
    this.newUserData.isProfessional = user.isProfessional;
    this.newUserData.name = user.name;
    this.newUserData.userName = user.userName;

    this.editedUser = user;
    this.currentUser = currentUser;

    if (professional) {
      this.newProfessionalData.active = professional.active;
      this.newProfessionalData.professionalRegisterNum = professional.professionalRegisterNum;
      this.newProfessionalData.professionalRegisterState = professional.professionalRegisterState;
      this.newProfessionalData.specialites = professional.specialites;
      this.newProfessionalData.schedule = professional.schedule;
    }
  }

  private create_clicked(professional: any): void {
    if (!this.check_creation_errors())
      return;
    
    this._dialogRef.close(DialogAddUserResult.OK);
  }

  private update_clicked(): void {
    if (!this.check_update_errors())
      return;

    this._dialogRef.close(DialogAddUserResult.OK);
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
    this.clear_errors();

    if (!this.newUserData.name) 
      this.nameError = true;

    if (this.nameError) {
      this.hasError = true;
      this.errorMsg = 'Os campos em destaque devem ser preenchidos.'
      return false;
    }
    
    if (this.professionalView.checkErrors()) {
      this.hasError = true;

      if (this.newProfessionalData.errors.scheduleError)
        this.errorMsg = this.newProfessionalData.errors.scheduleErrorMsg;
      //TODO: other profesional errors
      return false;
    }
    
    return true;
  }

  private clear_errors(): void {
    this.nameError = false;
    this.emailError = false;
    this. userNameError = false;
  }

  private set canManageSystemData(value: boolean) {
    if (this.newUserData.capabilities.fullAccessAdministrativeTools == value)
      return;

    this.newUserData.capabilities.fullAccessAdministrativeTools = value;
    this.newUserData.capabilities.registerAgreements = value;
    this.newUserData.capabilities.registerClinics = value;
    this.newUserData.capabilities.registerDocuments = value;
    this.newUserData.capabilities.registerPatients = value;
    this.newUserData.capabilities.registerProfessionals = value;
    this.newUserData.capabilities.registerServices = value;
    this.newUserData.capabilities.registerUsers = value;
  }

  private get canManageSystemData(): boolean {
    return this.newUserData.capabilities.fullAccessAdministrativeTools;
  }

  private get manageSystemDataIsIndeterminate(): boolean {
    if (!this.canManageSystemData) {
      if (this.newUserData.capabilities.registerAgreements || this.newUserData.capabilities.registerClinics ||
        this.newUserData.capabilities.registerDocuments || this.newUserData.capabilities.registerPatients ||
        this.newUserData.capabilities.registerProfessionals || this.newUserData.capabilities.registerServices ||
        this.newUserData.capabilities.registerUsers)
        return true;
    }
  }
}