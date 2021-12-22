import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudenteDetailComponent } from './studente-detail.component';

const routes: Routes = [{ path: '', component: StudenteDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudenteDetailRoutingModule { }
