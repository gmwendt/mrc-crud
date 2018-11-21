import { Provider } from "@angular/core";

import { MrcContentService } from '../mrc-content/mrc-content.service';

import { AuthGuardService } from '../../login/auth-guard.service';

export const COMMON_PROVIDERS: Array<Provider> = [
  AuthGuardService, MrcContentService
];