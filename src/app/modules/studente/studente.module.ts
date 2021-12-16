import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudenteComponent } from './studente.component';
import { StudenteRoutingModule } from './studente-routing.modules';
import { StudenteDetailComponent } from '../studente-detail/studente-detail.component';



@NgModule({
  declarations: [
    StudenteComponent,
    StudenteDetailComponent
  ],
  imports: [
    CommonModule,
    StudenteRoutingModule
  ]
})
export class StudenteModule { }
