import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { IStudente, Studente } from 'src/app/core/iStudente.interface';
import { StudenteServiceService } from 'src/app/services/studente-service.service';
import { LOCALE_ID, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StudenteFormComponent } from '../studente-form/studente-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-studente',
  templateUrl: './studente.component.html',
  styleUrls: ['./studente.component.sass'],
})
export class StudenteComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'id',
    'nome',
    'cognome',
    'data',
    'comune',
    'codiceFiscale',
    'telefono',
    'cap',
    'indirizzo',
    'civico',
    'corso',
    'modifica',
    'rimuovi',
  ];
  dataSource: MatTableDataSource<IStudente> = new MatTableDataSource();

  public selectedRowIndex = -1;

  private getStudentSubscription$: Subscription | undefined;
  private deleteStudentSubscription$: Subscription | undefined;
  // private subscription$: Subscription | undefined;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) public locale: string,
    private studenteService: StudenteServiceService,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;

  ngOnInit(): void {
    this.getStudentSubscription$ = this.studenteService
      .getStudente()
      .subscribe((Response) => {
        this.dataSource = new MatTableDataSource<IStudente>(Response);
        this.studenteService.dataSourceStudente = this.dataSource;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    //this.subscription$ = this.getStudentSubscription$;
  }

  ngOnDestroy(): void {
    this.studenteService.dataSourceStudente = new MatTableDataSource();
    this.getStudentSubscription$?.unsubscribe();
    this.deleteStudentSubscription$?.unsubscribe();
    //this.subscription$?.unsubscribe();
  }

  filter(changes: any): void {
    if (changes) {
      console.log(JSON.stringify(changes.target.value));
      this.dataSource.filter = changes.target.value;
      this.dataSource.filter.trim().toLowerCase();
    }
  }

  delete(id: number): Observable<unknown> {
    return this.httpClient.delete(
      `http://localhost:8092/esercitazionePlansoft/student/deleteById/${id}`
    );
  }

  deleteStudente(id: number) {
    this.deleteStudentSubscription$ = this.delete(id).subscribe((Response) => {
      const data = this.dataSource.data;
      const index = data.findIndex((x) => x.id === id);
      data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    });
    // this.subscription$?.add(this.deleteStudentSubscription$);
  }

  startModify(element: any) {
    this.studenteService.studenteCorrente = element as Studente;

    const dialogRef = this.dialog.open(StudenteFormComponent, {
      height: '700px',
      width: '1000px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.id != undefined) {
        const data = this.dataSource.data;
        const index = data.findIndex((x) => x.id === result.id);
        if (index != undefined) {
          data.splice(index, 1);
          data.push(result);
          this.dataSource.data = data;
          this.dataSource._updateChangeSubscription();
        }
        this.selectedRowIndex = result.id;
        setTimeout(() => (this.selectedRowIndex = -1), 5000);
      }
    });
  }

  addStudent() {
    const dialogRef = this.dialog.open(StudenteFormComponent, {
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

  courses(element: any) {
    this.studenteService.studenteCorrente = element as Studente;
    this.router.navigate([`/registrations`]);
  }

  areEquals(obj1: Studente, obj2: Studente): boolean {
    if (
      obj1.id === obj2.id &&
      obj1.name === obj2.name &&
      obj1.surname === obj2.surname &&
      obj1.birthdayDate === obj2.birthdayDate &&
      obj1.city === obj2.city &&
      obj1.fiscalCode === obj2.fiscalCode &&
      obj1.number === obj2.number &&
      obj1.cap === obj2.cap &&
      obj1.address === obj2.address &&
      obj1.houseNumber === obj2.houseNumber
    ) {
      return true;
    } else {
      return false;
    }
  }
}
