import { PatientComponent } from "../patient.component";

import { MeasurementItemComponent } from "../measurement-item/measurement-item.component";

import { PageAnamnesesEditComponent } from "../page-anamneses-edit/page-anamneses-edit.component";
import { PageFoodPlanEditComponent } from "../page-food-plan-edit/page-food-plan-edit.component";
import { PageGetEditComponent } from '../page-get-edit/page-get-edit.component';
import { DialogAddMeal } from "../page-food-plan-edit/dialog-add-meal/dialog-add-meal.component";
import { DialogNutrients } from '../page-food-plan-edit/dialog-nutrients/dialog-nutrients.component';
import { PageLabAnalysisEditComponent } from "../page-lab-analysis-edit/page-lab-analysis-edit.component";
import { PagePatientConsultComponent } from "../page-patient-consult/page-patient-consult.component";
import { PagePatientEdit } from "../page-patient-edit/page-patient-edit.component";

export const COMMON_COMPONENTS: Array<any> = [
  DialogAddMeal, DialogNutrients,
  MeasurementItemComponent,
  PatientComponent, 
  PageAnamnesesEditComponent, PageFoodPlanEditComponent, PageGetEditComponent, PageLabAnalysisEditComponent, PagePatientConsultComponent, PagePatientEdit,
];

export const ENTRY_COMPONENTS: Array<any> = [
  DialogAddMeal, DialogNutrients
];