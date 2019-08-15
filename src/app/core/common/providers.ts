import { Provider } from "@angular/core";

import { AccountService } from "../account.service";
import { ConsultService } from '../consult.service';
import { ClinicService } from "../clinic.service";
import { FoodService } from "../food.service";
import { LoginService } from "../login.service";
import { PatientService } from "../patient.service";
import { ProfessionalService } from "../professional.service";
import { SystemInfoService } from "../system-info.service";
import { UserService } from "../user.service";
import { UserConfigurationsService } from '../user-configurations.service';
import { ZipcodeService } from "../zipcode.service";

export const COMMOM_PROVIDERS: Array<Provider> = [
  AccountService, ConsultService, ClinicService, FoodService, LoginService, PatientService, ProfessionalService, SystemInfoService,
  UserService, UserConfigurationsService, ZipcodeService
]; 