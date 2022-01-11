import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudenteFormRoutingModule } from './studente-form-routing.module';
import { StudenteFormComponent } from './studente-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import{ MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from "@angular/material/dialog";


@NgModule({
  declarations: [
    StudenteFormComponent
  ],
  imports: [
    CommonModule,
    StudenteFormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatDialogModule
  ]
})
export class StudenteFormModule { }
