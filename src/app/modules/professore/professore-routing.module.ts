import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessoreComponent } from './professore.component';

const routes: Routes = [{ path: '', component: ProfessoreComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessoreRoutingModule { }
