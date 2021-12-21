import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudenteFormComponent } from './studente-form.component';

const routes: Routes = [{ path: '', component: StudenteFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudenteFormRoutingModule { }
