import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { T1_anchorPage } from './t1_anchor.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { t1_anchorPageRoutingModule } from './t1_anchor-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: T1_anchorPage }]),
    t1_anchorPageRoutingModule,
  ],
  declarations: [T1_anchorPage]
})
export class T1_anchorPageModule {}
