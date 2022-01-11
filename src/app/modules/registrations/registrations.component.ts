import { Component, OnInit } from '@angular/core';
import { StudenteServiceService} from 'src/app/services/studente-service.service';
import { Corso, ICorso } from 'src/app/core/iCorso.interface';
import { Studente } from 'src/app/core/iStudente.interface';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {RegistrationFormComponent} from "../registration-form/registration-form.component";

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.sass']
})

export class RegistrationsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'descrizione', 'docente', 'dataDiInizio', 'dataDiFine'];

  student: Studente = {} as Studente;
  studentCourses: Corso[] = [];
  dataSource : MatTableDataSource<ICorso> = new MatTableDataSource;

  constructor(
    private studenteService : StudenteServiceService,
    public dialog : MatDialog
  ) { }

  ngOnInit(): void {
    const id = this.studenteService?.getIdStudente();
    this.student = this.studenteService.studenteCorrente;
    this.studenteService?.getRegistration(id).subscribe( Response => {
      if(Response.courseRegistrationDto != null) {
        for(let c of Response.courseRegistrationDto) {
          this.studentCourses.push(c.courseDto);
        }
      }
    } );
    setTimeout(() => this.assignForm(), 50);
  }

  assignForm() : void{
    this.dataSource = new MatTableDataSource<ICorso>(this.studentCourses);
  }

  addCourse() {
    const dialogRef = this.dialog.open(RegistrationFormComponent, {
      height: '250px',
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe( () => {

    });
  }

}
