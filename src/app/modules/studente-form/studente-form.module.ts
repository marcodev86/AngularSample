import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudenteFormRoutingModule } from './studente-form-routing.module';
import { StudenteFormComponent } from './studente-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';


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
    HttpClientModule
  ]
})
export class StudenteFormModule { }
