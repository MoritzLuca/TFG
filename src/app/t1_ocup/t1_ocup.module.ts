import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { T1_ocupPage } from './t1_ocup.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { T1_ocupPageRoutingModule } from './t1_ocup-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: T1_ocupPage }]),
    T1_ocupPageRoutingModule,
  ],
  declarations: [T1_ocupPage]
})
export class T1_ocupPageModule {}
