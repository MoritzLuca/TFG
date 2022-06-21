import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { T1_reportPage } from './t1_report.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { T1_reportPageRoutingModule } from './t1_report-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: T1_reportPage }]),
    T1_reportPageRoutingModule,
  ],
  declarations: [T1_reportPage]
})
export class T1_reportPageModule {}
