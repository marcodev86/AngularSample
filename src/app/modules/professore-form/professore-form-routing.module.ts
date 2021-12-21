import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessoreFormComponent } from './professore-form.component';

const routes: Routes = [{ path: '', component: ProfessoreFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessoreFormRoutingModule { }
