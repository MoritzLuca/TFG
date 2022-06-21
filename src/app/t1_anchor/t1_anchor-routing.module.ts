import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { T1_anchorPage } from './t1_anchor.page';

const routes: Routes = [
  {
    path: '',
    component: T1_anchorPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class t1_anchorPageRoutingModule {}
