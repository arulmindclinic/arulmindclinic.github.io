import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
@NgModule({
  imports: [SharedModule, DashboardRoutingModule],
  declarations: [HomeComponent, AboutComponent, ServicesComponent, ContactComponent]
})
export class DashboardModule {}
