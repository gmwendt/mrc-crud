import { PatientComponent } from "../patient.component";

import { MeasurementItemComponent } from "../measurement-item/measurement-item.component";

import { PageAnamnesesEditComponent } from "../page-anamneses-edit/page-anamneses-edit.component";
import { PagePatientConsultComponent } from "../page-patient-consult/page-patient-consult.component";
import { PagePatientEdit } from "../page-patient-edit/page-patient-edit.component";

export const COMMON_COMPONENTS: Array<any> = [
  MeasurementItemComponent,
  PatientComponent, 
  PageAnamnesesEditComponent, PagePatientConsultComponent, PagePatientEdit,
];

export const ENTRY_COMPONENTS: Array<any> = [
];