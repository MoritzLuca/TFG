import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path:"",
            loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
          },
          {
            path:"user",
            loadChildren: () => import('../tab2/user/user.module').then(m => m.UserPageModule)
          },
          {
            path:"tab4",
            loadChildren: () => import('../t1_add/t1_add.module').then(m => m.T1_addPageModule)
          }
        ]
      },
      {
        
        path: 'tab2',
        children: [
          {
            path:"",
            loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
          },
          {
            path:"load",
            loadChildren: () => import('../tab2/upload-data/upload-data.module').then(m => m.UploadDataPageModule)
          }]
        
      },/*
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },*/
      {
        path: 't1_add',
        loadChildren: () => import('../t1_add/t1_add.module').then(m => m.T1_addPageModule)
      },
      {
        path: 't1_anchor',
          loadChildren: () => import('../t1_anchor/t1_anchor.module').then(m => m.T1_anchorPageModule)
      },
      {
        path: 't1_ocup',
        loadChildren: () => import('../t1_ocup/t1_ocup.module').then(m => m.T1_ocupPageModule)
      },
     {
        path: 't1_report',
        loadChildren: () => import('../t1_report/t1_report.module').then(m => m.T1_reportPageModule)
      },

      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
