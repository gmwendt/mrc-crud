import { Component, ViewEncapsulation, ViewChild } from '@angular/core';

import { ProfessionalData, AddProfessionalComponent } from '../add-professional/add-professional.component';

import { DialogCapabilitiesChecklistComponent, DialogCapabilitiesCheckListResult } from '../dialog-capabilities-checklist/dialog-capabilities-checklist.component';

import { MatDialogRef, DialogService } from '../dialog.service';

import { Capabilities, User, Professional } from '../../core/common/types';

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

  @ViewChild(AddProfessionalComponent, {static: false}) professionalView: AddProfessionalComponent;

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

  private emailError: boolean;
  private nameError: boolean;
  private userNameError: boolean;
  private birthDateError: boolean;

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
    if (!this.check_errors())
      return;
    
    this._dialogRef.close(DialogAddUserResult.OK);
  }

  private update_clicked(): void {
    if (!this.check_errors())
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

  private check_errors(): boolean {
    this.clear_errors();

    if (!this.editMode && this.is_null_or_empty(this.newUserData.email))
      this.emailError = true;
    
    if (!this.editMode && this.is_null_or_empty(this.newUserData.userName))
      this.userNameError = true;
    
    if (this.is_null_or_empty(this.newUserData.name))
      this.nameError = true;

    if (this.is_null_or_empty(this.newUserData.birthdate))
      this.birthDateError = true;

    //TODO: Check if email format is valid.

    if (this.hasError) {
      this.errorMsg = 'Os campos em destaque devem ser preenchidos.'
      return false;
    }

    var emailDuplicated = !this.editMode ? this.usersList.find(u => u.email === this.newUserData.email) : null;
    if (emailDuplicated) {
      this.emailError = true;
      this.errorMsg = 'Já existe um usuário com este E-mail.'
      return false;
    }
   
    var userNameDuplicated = !this.editMode ? this.usersList.find(u => u.userName === this.newUserData.userName) : null;
    if (userNameDuplicated) {
      this.userNameError = true;
      this.errorMsg = 'Já existe um usuário com este Nome de usuário.'
      return false;
    }

    var profError = this.professionalView.hasErrors();
    console.log(profError);
    console.log(this.newProfessionalData.errors);

    if (profError)
      return false;

    return true;
  }

  private clear_errors(): void {
    this.nameError = false;
    this.emailError = false;
    this. userNameError = false;
  }

  private is_null_or_empty(content: string | Date): boolean {
    if (content == null)
      return true;
    if (content instanceof Date)
      return content.toString().length < 1;
    
    return content.length < 1;
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

  private get userBirthDate(): string {
    if (this.newUserData && !this.is_null_or_empty(this.newUserData.birthdate))
      return this.newUserData.birthdate.toISOString().slice(0, 10);
  }

  public get hasError(): boolean {
    if (this.nameError || this.emailError || this.userNameError || this.birthDateError) 
      return true;
  }
}