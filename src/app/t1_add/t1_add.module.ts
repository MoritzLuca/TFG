import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { T1_addPage } from './t1_add.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { T1_addPageRoutingModule } from './t1_add-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    T1_addPageRoutingModule
  ],
  declarations: [T1_addPage]
})
export class T1_addPageModule {}
