import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { View1Component } from './view/view1/view1.component';
import { View2Component } from './view/view2/view2.component';

const routes: Routes = [
  { path: 'view1', component: View1Component },
  { path: 'view2', component: View2Component },
  { path: 'studente', loadChildren: () => import('./modules/studente/studente.module').then(m => m.StudenteModule) },
  { path: 'corso', loadChildren: () => import('./modules/corso/corso.module').then(m => m.CorsoModule) },
  { path: 'studente-detail', loadChildren: () => import('./modules/studente-detail/studente-detail.module').then(m => m.StudenteDetailModule) },
  { path: 'corso-detail', loadChildren: () => import('./modules/corso-detail/corso-detail.module').then(m => m.CorsoDetailModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
