import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CorsoRoutingModule } from './corso-routing.module';
import { CorsoComponent } from './corso.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    CorsoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CorsoRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    HttpClientModule
  ]
})
export class CorsoModule { }
