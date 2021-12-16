import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudenteComponent } from './studente.component';
import { StudenteRoutingModule } from './studente-routing.modules';
import { StudenteDetailComponent } from '../studente-detail/studente-detail.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    StudenteComponent,
    StudenteDetailComponent
  ],
  imports: [
    CommonModule,
    StudenteRoutingModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class StudenteModule { }
