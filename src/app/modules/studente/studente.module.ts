import { NgModule } from '@angular/core';
import { StudenteComponent } from './studente.component';
import { StudenteRoutingModule } from './studente-routing.modules';
import { StudenteDetailComponent } from '../studente-detail/studente-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    StudenteComponent,
    StudenteDetailComponent
  ],
  imports: [
    StudenteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatToolbarModule,
    HttpClientModule
  ]
})
export class StudenteModule { }
