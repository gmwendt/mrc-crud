import { NgModule } from "@angular/core";

import { ChartistModule} from 'ng-chartist';

import { COMMON_COMPONENTS } from "./common/components";

@NgModule({
  imports: [ChartistModule],
  declarations: [COMMON_COMPONENTS],
  exports: [COMMON_COMPONENTS]
})
export class WidgetModule {
  
}