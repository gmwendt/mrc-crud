import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { User, Professional } from '../../common/types';

import { UserService } from '../../../login/user.service';

import { AccountService } from '../../../shared/account.service';
import { ProfessionalData } from '../../../shared/add-professional/add-professional.component';
import { DialogService } from '../../../shared/dialog.service';
import { DialogAddUserComponent, DialogAddUserResult } from '../../../shared/dialog-add-user/dialog-add-user.component';
import { DialogAlertButton, DialogAlertData, DialogAlertResult } from '../../../shared/dialog-alert/dialog-alert.component';
import { ProfessionalService } from '../../../shared/professional.service';

@Component({
	selector: 'page-users',
	templateUrl: './page-users.component.html',
	styleUrls: ['./page-users.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class PageUsersComponent implements OnInit { 
	
	private currentUser: User;
	private displayedColumns = ['current', 'name', 'username', 'commands'];
	private dataSource;
	private loading = true;

	private _usersList: User[];
	private _accId: number;

	constructor(private _account: AccountService, private _userService: UserService, 
		private _professionalService: ProfessionalService, private _dialog: DialogService, 
		private _router: Router) {
	}

	ngOnInit(): void {
		this.currentUser = this._userService.currentUser;
		this._accId = this._account.current.accountId;		

		if (!this.hasPermission) {
			this._router.navigate(['invalid-page']);
			return;
		}

		this._account.getAccountByAccountId(this._accId.toString()).then(accs => {
			if (accs.length == 0)
				return;

			this.listUsers(accs[0].accountId);
		}, err => this.show_error_dialog(err));
	}

	private createTable(): void {
		this.dataSource = new MatTableDataSource(this._usersList);
	}

	private addUserToTable(user: User): void {
		this._usersList.push(user);
		this.dataSource.data = this._usersList;
	}

	private add_user_clicked(): void {
		var dialogRef = this._dialog.open(DialogAddUserComponent, { disableClose: true });
		dialogRef.componentInstance.usersList = this._usersList;
		dialogRef.afterClosed().subscribe((result: DialogAddUserResult) => {
			
			if (result != DialogAddUserResult.OK)
				return;

			this.loading = true;
			var userResult = dialogRef.componentInstance.newUserData;
			var professionalResult = dialogRef.componentInstance.newProfessionalData;
			var userData: User = {
				accountRefId: this._accId,
				capabilities: userResult.capabilities,
				birthDate: userResult.birthdate,
				email: userResult.email,
				name: userResult.name,
				userName: userResult.userName,
				passwordExpired: true,
				passwordHash: '',
				passwordSalt: '',
				resetPwdToken: this._userService.generateToken(),
				isProfessional: userResult.isProfessional
			};

			this._userService.addUser(userData).then((user: User) => {
				console.log('Reset password link: http://localhost:4000/reset-pass/' + this._accId + '/' + btoa(user.userName).replace(/=/g , '') + '/' + user.resetPwdToken);
				this.addUserToTable(user);
				
				if (user.isProfessional) {
					this.addProfessional(professionalResult, user._id).then((professional: Professional) => {

						user.professionalRefId = professional._id;
						this._userService.updateUser(user).then(() => {
							this.user_created_message(user);
							this.loading = false;
						}, err => this.on_error(err));

					}, err => this.on_error(err));
				}
				else {
					this.loading = false;
					this.user_created_message(user);
				}

			}, err => this.on_error(err));
		});
	}

	private user_created_message(user: User): void {
		var dialogData: DialogAlertData = {
			text: 'Usuário criado com sucesso! Um email será enviado para ' + user.email + ' com os passos para definição de senha.',
			button: DialogAlertButton.OK,
			textAlign: 'center',
		}
		this._dialog.openAlert(dialogData);
	}

	private edit_user_clicked(user: User): void {
		if (user.isProfessional) {
			//this.loading = true;
			this._professionalService.getProfessionalByUserId(user._id).then(professionals => {

				//this.loading = false;
				
				if (professionals.length == 0) {
					user.isProfessional = false;
					this.editUser(user);
				}
				else
					this.editUser(user, professionals[0]);
			}, err => {
				//this.loading = false;
				this.show_error_dialog(err);
			})
		}
		else 
			this.editUser(user);
	}

	private delete_user_clicked(user: User): void {
		var dialogData: DialogAlertData = {
			text: 'Deseja remover ' + user.name + '?',
			button: DialogAlertButton.YesNo,
			textAlign: 'center',
		}

		this._dialog.openAlert(dialogData).then(res => {
			if (res == DialogAlertResult.No)
				return;

			this.loading = true;
			var index = this._usersList.indexOf(user);

			if (user.isProfessional)
				this._professionalService.deleteProfessional(user.professionalRefId).then((resp2: Response) => {
					if (!resp2.ok) {
						this.on_error(resp2.statusText);
						return;
					}
				}, err => { 
					this.loading = false;
					this.show_error_dialog(err);
				});

			this._userService.deleteUser(user._id).then((resp: Response) => {
				if (!resp.ok) {
					this.on_error(resp.statusText);
					return;
				}
								
				this._usersList.splice(index, 1);
				this.dataSource.data = this._usersList;
				this.loading = false;
				
			}, err => this.on_error(err));	
		});
	}

	private listUsers(accID: number): void {
		this._userService.listAccountUsers(accID).then(users => {
			this._usersList = users;
			this.createTable();
			this.loading = false;
		}, err => this.show_error_dialog(err));
	}

	private editUser(user: User, professional?: Professional): void {
		var dialogRef = this._dialog.open(DialogAddUserComponent, { disableClose: true });

		dialogRef.componentInstance.editMode = true;
		dialogRef.componentInstance.usersList = this._usersList;
		dialogRef.componentInstance.setUserData(user, this.currentUser, professional);

		dialogRef.afterClosed().subscribe((result: DialogAddUserResult) => {
			if (result != DialogAddUserResult.OK) {
				this.loading = false;
				return;
			}

			this.loading = true;

			var userResult = dialogRef.componentInstance.newUserData;
			user.birthDate = userResult.birthdate;
			user.capabilities = userResult.capabilities;
			user.isProfessional = userResult.isProfessional;
			user.name = userResult.name;

			this._userService.updateUser(user).then(updatedUser => {
				this.listUsers(this._accId);
				this.loading = false;
			}, err => this.on_error(err));

			if (professional && user.isProfessional) {
				//update professional
				var professionalResult = dialogRef.componentInstance.newProfessionalData;
				professional.active = professionalResult.active;
				professional.professionalRegisterNum = professionalResult.professionalRegisterNum;
				professional.professionalRegisterState = professionalResult.professionalRegisterState;
				professional.specialites = professionalResult.specialites;
				professional.schedule = professionalResult.schedule;

				this.loading = true;
				this._professionalService.updateProfessional(professional).then(() => {
					this.loading = false;
				}, err => this.on_error(err));
			}
			else if (professional && !user.isProfessional)
				//delete professional
				this._professionalService.deleteProfessional(professional._id).then(() => {
					this.loading = false;
				}, err => this.on_error(err));
			else if (!professional && user.isProfessional) {
				//create professional
				var professionalResult = dialogRef.componentInstance.newProfessionalData;
				this.addProfessional(professionalResult, user._id).then((p: Professional) => {
					user.professionalRefId = p._id;
					this._userService.updateUser(user).then(() => this.loading = false, err => this.on_error(err));
				}, err => this.on_error(err));
			}
		});
	}

	private async addProfessional(data: ProfessionalData, userRefId: string): Promise<Professional> {
		
		var professional: Professional = {
			accountRefId: this._accId,
			active: data.active,
			professionalRegisterNum: data.professionalRegisterNum,
			professionalRegisterState: data.professionalRegisterState,
			specialites: data.specialites,
			schedule: data.schedule,
			userRefId: userRefId
		};

		return new Promise<Professional>((resolve, reject) => {
			this._professionalService.addProfessional(professional).then((p: Professional) => {
				resolve(p);
			}, err => reject(err));
		})
	}

	private show_error_dialog(msg: string): void {
    var dialogData: DialogAlertData = {
      text: msg,
      caption: 'Erro',
			button: DialogAlertButton.OK,
    };
    this._dialog.openAlert(dialogData).then(result => { });
	}

	private on_error(error: any): void {
		this.loading = false;
		this.show_error_dialog(error);
	}
	
	private get hasPermission(): boolean {
		return this.currentUser.capabilities.registerUsers ||
			this.currentUser.capabilities.fullAccessAdministrativeTools;
	}
}
