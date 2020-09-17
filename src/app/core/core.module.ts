import { NgModule, Optional, SkipSelf } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProgressInterceptor } from './interceptors/progress.interceptor';
import { ProgressBarService } from './services/progress-bar.service';

@NgModule({
  imports: [SharedModule, CoreRoutingModule, HttpClientModule],
  exports: [HeaderComponent, HttpClientModule],
  declarations: [HeaderComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProgressInterceptor,
      multi: true,
      deps: [ProgressBarService]
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        `CoreModule has already been loaded. Import Core modules in the AppModule only.`
      );
    }
  }
}
