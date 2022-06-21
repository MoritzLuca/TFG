import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { T1_addPage } from './t1_add.page';

const routes: Routes = [
  {
    path: '',
    component: T1_addPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class T1_addPageRoutingModule {}
