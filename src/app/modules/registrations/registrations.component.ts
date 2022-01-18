import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StudenteServiceService } from 'src/app/services/studente-service.service';
import { Corso, ICorso } from 'src/app/core/iCorso.interface';
import { Studente } from 'src/app/core/iStudente.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationFormComponent } from '../registration-form/registration-form.component';
import { Observable, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.sass'],
})
export class RegistrationsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'id',
    'nome',
    'descrizione',
    'docente',
    'dataDiInizio',
    'dataDiFine',
    'rimuovi',
  ];

  public selectedRowIndex = -1;

  student: Studente = {} as Studente;
  studentCourses: Corso[] = [];
  dataSource: MatTableDataSource<ICorso> = new MatTableDataSource();

  private getRegistrationsSubscription$: Subscription | undefined;
  private deleteRegistrationsSubscription$: Subscription | undefined;

  constructor(
    private httpClient: HttpClient,
    private studenteService: StudenteServiceService,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;

  ngOnInit(): void {
    const id = this.studenteService?.getIdStudente();
    this.student = this.studenteService.studenteCorrente;
    this.getRegistrationsSubscription$ = this.studenteService
      ?.getRegistration(id)
      .subscribe((Response) => {
        if (Response.courseRegistrationDto != null) {
          for (let c of Response.courseRegistrationDto) {
            this.studentCourses.push(c.courseDto);
          }
        }
      });
    setTimeout(() => this.assignForm(), 100);
  }

  ngOnDestroy() {
    this.studenteService.studenteCorrente = {} as Studente;
    this.getRegistrationsSubscription$?.unsubscribe();
    this.deleteRegistrationsSubscription$?.unsubscribe();
  }

  assignForm(): void {
    this.dataSource = new MatTableDataSource<ICorso>(this.studentCourses);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  addCourse() {
    const dialogRef = this.dialog.open(RegistrationFormComponent, {
      height: '250px',
      width: '1000px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.id != undefined) {
        const data = this.dataSource.data;
        const index = data.findIndex((x) => x.id === result.id);
        if (index == -1) {
          data.push(result);
          this.dataSource.data = data;
          this.dataSource._updateChangeSubscription();
        }
        this.selectedRowIndex = result.id;
        setTimeout(() => (this.selectedRowIndex = -1), 5000);
      }
    });
  }

  removeRegistration(studentId: number, courseId: number): Observable<any> {
    return this.httpClient.delete(
      `http://localhost:8092/esercitazionePlansoft/courseRegistration/removeRegistrationCourse/${studentId}/${courseId}`
    );
  }

  deleteRegistration(student: Studente, element: any) {
    this.deleteRegistrationsSubscription$ = this.removeRegistration(
      student.id,
      element.id
    ).subscribe((Response) => {
      const data = this.dataSource.data;
      const index = data.findIndex((x) => x.id === element.id);
      data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    });
  }
}
