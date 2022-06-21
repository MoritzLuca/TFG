import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { T1_reportPage } from './t1_report.page';

const routes: Routes = [
  {
    path: '',
    component: T1_reportPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class T1_reportPageRoutingModule {}
