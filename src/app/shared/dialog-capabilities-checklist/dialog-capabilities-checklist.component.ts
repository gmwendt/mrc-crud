import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';

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
export class DialogCapabilitiesChecklistComponent implements AfterViewInit {

  public data: CheckListItem[] = [];
  
  private capabilities: Capabilities = new Capabilities();

  constructor(private _dialogRef: MatDialogRef<DialogCapabilitiesChecklistComponent>) {
  }

  ngAfterViewInit() {
    this.createData();
  }

  private ok_clicked(): void {
    this.retrieveCapabilities();
    this._dialogRef.close(DialogCapabilitiesCheckListResult.OK);
  }

  private cancel_clicked(): void {
    this._dialogRef.close(DialogCapabilitiesCheckListResult.Cancel);
  }

  private createData(): void {
    this.data.push(new CheckListItem([], 'Agendamento de consultas e cadastro de pacientes'));
    this.data.push(new CheckListItem([], 'Acesso às finanças da clínica/consultório'));

    var managementCapabilities: CheckListItem[] = [];
    managementCapabilities.push(new CheckListItem([], 'Gerenciamento de usuários'));
    managementCapabilities.push(new CheckListItem([], 'Gerenciamento de profissionais'));

    this.data.push(new CheckListItem(managementCapabilities, 'Gerenciamento de todos os recursos do sistema'));
  }

  private retrieveCapabilities(): void {
    if (this.data[0].checked)
      this.capabilities.scheduleAndRegisterPatient = true;
    if (this.data[1].checked)
      this.capabilities.accessGlobalFinances = true;
    if (this.data[2].checked && !this.data[2].indeterminate)
      this.capabilities.fullAccessAdministrativeTools = true;

    if (this.data[2].indeterminate) {
      //if (this.data[2].children[0].checked) TODO todos
    }
  }
}