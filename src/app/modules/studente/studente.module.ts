import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudenteComponent } from './studente.component';
import { StudenteRoutingModule } from 'src/app/modules/studente/studente-routing.modules';
import { StudenteDetailComponent } from '../studente-detail/studente-detail.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
// import {FormsModule } from '@angular/forms'; 
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';

import {HttpClientModule } from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatNativeDateModule } from '@angular/material/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatToolbarModule} from '@angular/material/toolbar';



@NgModule({
  declarations: [
    StudenteComponent,
     
  ],
  imports: [
    CommonModule,
    StudenteRoutingModule, 
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatTabsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatNativeDateModule,
    
    FormsModule,
    MatToolbarModule
  ],
  providers:[],
  exports:[
    MatFormFieldModule,
    MatInputModule,
    MatSortModule]
})
export class StudenteModule { }
