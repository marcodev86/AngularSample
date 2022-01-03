import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorsoFormRoutingModule } from './corso-form-routing.module';
import { CorsoFormComponent } from './corso-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    CorsoFormComponent
  ],
  imports: [
    CommonModule,
    CorsoFormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    HttpClientModule
  ]
})
export class CorsoFormModule { }