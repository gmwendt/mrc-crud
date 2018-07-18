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
    this.data.push(new CheckListItem([], 'Agendamento de consultas e cadastro de pacientes', this.capabilities.scheduleAndRegisterPatient));
    this.data.push(new CheckListItem([], 'Acesso às finanças da clínica/consultório', this.capabilities.accessGlobalFinances));

    var managementCapabilities: CheckListItem[] = [];
    managementCapabilities.push(new CheckListItem([], 'Gerenciamento de clínicas/consultórios'));
    managementCapabilities.push(new CheckListItem([], 'Gerenciamento de convênios'));
    managementCapabilities.push(new CheckListItem([], 'Gerenciamento de documentos'));
    managementCapabilities.push(new CheckListItem([], 'Gerenciamento de pacientes'));
    managementCapabilities.push(new CheckListItem([], 'Gerenciamento de profissionais'));
    managementCapabilities.push(new CheckListItem([], 'Gerenciamento de serviços'));
    managementCapabilities.push(new CheckListItem([], 'Gerenciamento de usuários'));

    this.data.push(new CheckListItem(managementCapabilities, 'Gerenciamento de todos os recursos do sistema', this.capabilities.fullAccessAdministrativeTools));
  }

  private ok_clicked(): void {
    this.retrieveCapabilities();
    this._dialogRef.close(DialogCapabilitiesCheckListResult.OK);
  }

  private cancel_clicked(): void {
    this._dialogRef.close(DialogCapabilitiesCheckListResult.Cancel);
  }

  private retrieveCapabilities(): void {
    if (this.data.length > 0 && this.data[0].checked)
      this.capabilities.scheduleAndRegisterPatient = true;
    if (this.data.length > 1 && this.data[1].checked)
      this.capabilities.accessGlobalFinances = true;
    if (this.data.length > 2 && this.data[2].checked && !this.data[2].indeterminate)
      this.capabilities.fullAccessAdministrativeTools = true;

    if (this.data.length > 2 && this.data[2].indeterminate) {
      this.capabilities.fullAccessAdministrativeTools = false;
      if (this.data[2].children.length > 0 && this.data[2].children[0].checked) 
        this.capabilities.registerClinics = true;
      if (this.data[2].children.length > 1 && this.data[2].children[1].checked) 
        this.capabilities.registerAgreements = true;
      if (this.data[2].children.length > 2 && this.data[2].children[2].checked) 
        this.capabilities.registerDocuments = true;
      if (this.data[2].children.length > 3 && this.data[2].children[3].checked) 
        this.capabilities.registerPatients = true;
      if (this.data[2].children.length > 4 && this.data[2].children[4].checked) 
        this.capabilities.registerProfessionals = true;
      if (this.data[2].children.length > 5 && this.data[2].children[5].checked) 
        this.capabilities.registerServices = true;
      if (this.data[2].children.length > 6 && this.data[2].children[6].checked) 
        this.capabilities.registerUsers = true;
    }
  }
}