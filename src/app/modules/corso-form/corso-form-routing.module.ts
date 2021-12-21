import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorsoFormComponent } from './corso-form.component';

const routes: Routes = [{ path: '', component: CorsoFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorsoFormRoutingModule { }
