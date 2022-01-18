import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudenteComponent } from './studente.component';
import { StudenteRoutingModule } from './studente-routing.modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [StudenteComponent],
  imports: [
    CommonModule,
    StudenteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatToolbarModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    SharedModule,
  ],
})
export class StudenteModule {}
