import { Provider } from "@angular/core";

import { AccountService } from "../account.service";
import { ClinicService } from "../clinic.service";
import { PatientService } from "../patient.service";
import { ProfessionalService } from "../professional.service";
import { SystemInfoService } from "../system-info.service";
import { UserService } from "../user.service";
import { ZipcodeService } from "../zipcode.service";

export const COMMOM_PROVIDERS: Array<Provider> = [
  AccountService, ClinicService, PatientService, ProfessionalService, SystemInfoService, UserService, ZipcodeService
];