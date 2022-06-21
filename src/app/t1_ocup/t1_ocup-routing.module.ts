import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { T1_ocupPage } from './t1_ocup.page';

const routes: Routes = [
  {
    path: '',
    component: T1_ocupPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class T1_ocupPageRoutingModule {}
