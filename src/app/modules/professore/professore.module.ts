import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfessoreRoutingModule } from './professore-routing.module';
import { ProfessoreComponent } from './professore.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [ProfessoreComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProfessoreRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
  ],
})
export class ProfessoreModule {}
