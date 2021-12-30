import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsegnamentoFormComponent } from './insegnamento-form.component';

const routes: Routes = [{ path: '', component: InsegnamentoFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsegnamentoFormRoutingModule { }
