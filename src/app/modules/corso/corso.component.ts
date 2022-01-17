import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { StudenteServiceService } from 'src/app/services/studente-service.service';
import { formatDate } from '@angular/common';
import { LOCALE_ID, Inject } from '@angular/core';
import { Corso, ICorso } from 'src/app/core/iCorso.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-corso',
  templateUrl: './corso.component.html',
  styleUrls: ['./corso.component.sass'],
})
export class CorsoComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'id',
    'nome',
    'descrizione',
    'docente',
    'dataDiInizio',
    'dataDiFine',
    'modifica',
    'rimuovi',
  ];
  dataSource: MatTableDataSource<ICorso> = new MatTableDataSource();
  public idCourse: any;
  public isClicked: boolean = false;
  public selectedRowIndex = -1;

  private getCourseSubscription$: Subscription | undefined;
  private deleteCourseSubscription$: Subscription | undefined;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) public locale: string,
    private studenteService: StudenteServiceService
  ) {}

  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;

  ngOnInit(): void {
    this.getCourseSubscription$ = this.studenteService
      .getCorso()
      .subscribe((Response) => {
        for (let i of Response) {
          if (i.professor == null) {
            i.professor = {
              name: '',
              surname: '',
            };
          }
        }
        this.dataSource = new MatTableDataSource<ICorso>(Response);
        this.studenteService.dataSourceCorso = this.dataSource;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  ngOnDestroy(): void {
    this.studenteService.dataSourceCorso = new MatTableDataSource();
    this.getCourseSubscription$?.unsubscribe();
    this.deleteCourseSubscription$?.unsubscribe();
  }

  delete(id: number): Observable<unknown> {
    return this.httpClient.delete(
      `http://localhost:8092/esercitazionePlansoft/course/deleteById/${id}`
    );
  }

  deleteCorso(id: number) {
    this.deleteCourseSubscription$ = this.delete(id).subscribe((Response) => {
      const data = this.dataSource.data;
      const index = data.findIndex((x) => x.id === id);
      data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    });
  }

  startModify(element: any) {
    this.studenteService.corsoCorrente = element as Corso;
    this.idCourse = this.studenteService?.getIdCorso();
    this.isClicked = true;
  }

  filter(changes: any): void {
    if (changes) {
      console.log(JSON.stringify(changes.target.value));
      this.dataSource.filter = changes.target.value;
      this.dataSource.filter.trim().toLowerCase();
    }
  }

  addCourse() {
    this.isClicked = true;
    this.idCourse = undefined;
  }

  public digitClickEvent(event: Corso): void {
    this.changeClick(event);
  }

  public changeClick(corso: Corso) {
    if (corso != undefined) {
      this.isClicked = false;
    }
    if (corso.id != undefined) {
      this.idCourse = undefined;
      const data = this.dataSource.data;
      const index = data.findIndex((x) => x.id === corso.id);
      if (index != -1) {
        data.splice(index, 1);
        data.push(corso);
        this.dataSource.data = data;
        this.dataSource._updateChangeSubscription();
      } else {
        data.push(corso);
        this.dataSource.data = data;
        this.dataSource._updateChangeSubscription();
      }
      this.selectedRowIndex = corso.id;
      setTimeout(() => (this.selectedRowIndex = -1), 5000);
    }
  }
}
