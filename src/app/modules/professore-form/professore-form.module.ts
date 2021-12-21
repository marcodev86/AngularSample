import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessoreFormRoutingModule } from './professore-form-routing.module';
import { ProfessoreFormComponent } from './professore-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ProfessoreFormComponent
  ],
  imports: [
    CommonModule,
    ProfessoreFormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule
  ]
})
export class ProfessoreFormModule { }
