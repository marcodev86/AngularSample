import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorsoRoutingModule } from './corso-routing.module';
import { CorsoComponent } from './corso.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms'; 
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [
    CorsoComponent
  ],
  imports: [
    CommonModule,
    CorsoRoutingModule,MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatTabsModule  
  ]
})
export class CorsoModule { }
