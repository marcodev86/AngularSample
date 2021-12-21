import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { View1Component } from './view/view1/view1.component';
import { View2Component } from './view/view2/view2.component';

const routes: Routes = [
  { path: 'view1', component: View1Component },
  { path: 'view2', component: View2Component },
  {
    path: 'studente',
    loadChildren: () => import('./modules/studente/studente.module').then(m => m.StudenteModule)
  },
  { path: 'corso', loadChildren: () => import('./modules/corso/corso.module').then(m => m.CorsoModule) },
  { path: 'professore', loadChildren: () => import('./modules/professore/professore.module').then(m => m.ProfessoreModule) },
  { path: 'studente-form', loadChildren: () => import('./modules/studente-form/studente-form.module').then(m => m.StudenteFormModule) },
  { path: 'professore-form', loadChildren: () => import('./modules/professore-form/professore-form.module').then(m => m.ProfessoreFormModule) },
  { path: 'corso-form', loadChildren: () => import('./modules/corso-form/corso-form.module').then(m => m.CorsoFormModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
