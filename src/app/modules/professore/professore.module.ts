import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProfessoreRoutingModule } from './professore-routing.module';
import { ProfessoreComponent } from './professore.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ProfessoreComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfessoreRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    HttpClientModule
  ]
})
export class ProfessoreModule { }
