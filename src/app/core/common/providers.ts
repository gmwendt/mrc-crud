import { Provider } from "@angular/core";

import { AccountService } from "../account.service";
import { ClinicService } from "../clinic.service";
import { ProfessionalService } from "../professional.service";
import { SystemInfoService } from "../system-info.service";
import { UserService } from "../user.service";

export const COMMOM_PROVIDERS: Array<Provider> = [
  AccountService, ClinicService, ProfessionalService, SystemInfoService, UserService
];