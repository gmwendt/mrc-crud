import { PatientComponent } from "../patient.component";

import { MeasurementItemComponent } from "../measurement-item/measurement-item.component";

import { PageAnamnesesEditComponent } from "../page-anamneses-edit/page-anamneses-edit.component";
import { PageFoodRecallEditComponent } from "../page-food-recall-edit/page-food-recall-edit.element";
import { PageLabAnalysisEditComponent } from "../page-lab-analysis-edit/page-lab-analysis-edit.component";
import { PagePatientConsultComponent } from "../page-patient-consult/page-patient-consult.component";
import { PagePatientEdit } from "../page-patient-edit/page-patient-edit.component";

export const COMMON_COMPONENTS: Array<any> = [
  MeasurementItemComponent,
  PatientComponent, 
  PageAnamnesesEditComponent, PageFoodRecallEditComponent, PageLabAnalysisEditComponent, PagePatientConsultComponent, PagePatientEdit,
];

export const ENTRY_COMPONENTS: Array<any> = [
];