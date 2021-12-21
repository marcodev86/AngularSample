import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorsoComponent } from './corso.component';

const routes: Routes = [{ path: '', component: CorsoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorsoRoutingModule { }
