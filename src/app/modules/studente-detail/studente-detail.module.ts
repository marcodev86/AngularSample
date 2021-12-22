import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudenteDetailComponent } from './studente-detail.component';
import { StudenteDetailRoutingModule } from './studente-detail-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [StudenteDetailComponent],
  imports: [
    CommonModule,
    StudenteDetailRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule

  ]
})
export class StudenteDetailModule { }
