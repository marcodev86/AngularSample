import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsegnamentoFormRoutingModule } from './insegnamento-form-routing.module';
import { InsegnamentoFormComponent } from './insegnamento-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    InsegnamentoFormComponent
  ],
  imports: [
    CommonModule,
    InsegnamentoFormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    HttpClientModule
  ]
})
export class InsegnamentoFormModule { }
