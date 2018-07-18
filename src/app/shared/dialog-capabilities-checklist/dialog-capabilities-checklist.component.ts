import { Component, ViewEncapsulation } from '@angular/core';

import { MatDialogRef } from '../dialog.service';
import { CheckListItem } from '../check-list/check-list.component';
import { Capabilities } from '../../mrc/common/types';

export enum DialogCapabilitiesCheckListResult {
  Cancel,
  OK
}

@Component({
  selector: 'dialog-capabilities-checklist',
  templateUrl: './dialog-capabilities-checklist.component.html',
  styleUrls: ['./dialog-capabilities-checklist.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogCapabilitiesChecklistComponent {

  public data: CheckListItem[] = [];
  public capabilities: Capabilities = new Capabilities();

  constructor(private _dialogRef: MatDialogRef<DialogCapabilitiesChecklistComponent>) {
  }

  public createData(): void {
    this.data.push(new CheckListItem([], 'Agendamento de consultas e cadastro de pacientes.', this.capabilities.scheduleAndRegisterPatient));
    this.data.push(new CheckListItem([], 'Acesso às finanças da clínica/consultório.', this.capabilities.accessGlobalFinances));

    var managementCapabilities: CheckListItem[] = [];
    managementCapabilities.push(new CheckListItem([], 'Gerenciamento de clínicas/consultórios.', this.capabilities.registerClinics || this.capabilities.fullAccessAdministrativeTools));
    managementCapabilities.push(new CheckListItem([], 'Gerenciamento de convênios.', this.capabilities.registerAgreements || this.capabilities.fullAccessAdministrativeTools));
    managementCapabilities.push(new CheckListItem([], 'Gerenciamento de documentos.', this.capabilities.registerDocuments || this.capabilities.fullAccessAdministrativeTools));
    managementCapabilities.push(new CheckListItem([], 'Gerenciamento de pacientes.', this.capabilities.registerPatients || this.capabilities.fullAccessAdministrativeTools));
    managementCapabilities.push(new CheckListItem([], 'Gerenciamento de profissionais.', this.capabilities.registerProfessionals || this.capabilities.fullAccessAdministrativeTools));
    managementCapabilities.push(new CheckListItem([], 'Gerenciamento de serviços.', this.capabilities.registerServices || this.capabilities.fullAccessAdministrativeTools));
    managementCapabilities.push(new CheckListItem([], 'Gerenciamento de usuários.', this.capabilities.registerUsers || this.capabilities.fullAccessAdministrativeTools));

    this.data.push(new CheckListItem(managementCapabilities, 'Gerenciamento de todos os recursos do sistema.', this.capabilities.fullAccessAdministrativeTools));
  }

  private ok_clicked(): void {
    this.retrieveCapabilities();
    this._dialogRef.close(DialogCapabilitiesCheckListResult.OK);
  }

  private cancel_clicked(): void {
    this._dialogRef.close(DialogCapabilitiesCheckListResult.Cancel);
  }

  private retrieveCapabilities(): void {
    this.capabilities.scheduleAndRegisterPatient = this.data.length > 0 ? this.data[0].checked : false;
    this.capabilities.accessGlobalFinances = this.data.length > 1 ? this.data[1].checked : false;
    this.capabilities.fullAccessAdministrativeTools = this.data.length > 2 ? this.data[2].checked : false;

    if (this.data.length > 2) {
      if (this.data[2].indeterminate)
        this.capabilities.fullAccessAdministrativeTools = false;

      this.capabilities.registerClinics = this.data[2].children.length > 0 ? this.data[2].children[0].checked : false;
      this.capabilities.registerAgreements = this.data[2].children.length > 1 ? this.data[2].children[1].checked : false;
      this.capabilities.registerDocuments = this.data[2].children.length > 2 ? this.data[2].children[2].checked : false;
      this.capabilities.registerPatients = this.data[2].children.length > 3 ? this.data[2].children[3].checked : false;
      this.capabilities.registerProfessionals = this.data[2].children.length > 4 ? this.data[2].children[4].checked : false;;
      this.capabilities.registerServices = this.data[2].children.length > 5 ? this.data[2].children[5].checked : false;;
      this.capabilities.registerUsers = this.data[2].children.length > 6 ? this.data[2].children[6].checked : false;;
    }
  }
}