import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStudente, Studente } from 'src/app/core/iStudente.interface';
import { StudenteServiceService} from 'src/app/services/studente-service.service';
import { formatDate} from '@angular/common';
import { LOCALE_ID, Inject } from "@angular/core";
import { MatTableDataSource } from '@angular/material/table';
import {StudenteFormComponent} from "../studente-form/studente-form.component";
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-studente',
  templateUrl: './studente.component.html',
  styleUrls: ['./studente.component.sass']
})

export class StudenteComponent implements OnInit, OnDestroy {

  myDate = new Date();
  updateAt = formatDate(new Date(), 'yyyy-MM-dd', this.locale);

  displayedColumns: string[] = ['id', 'nome', 'cognome', 'data', 'comune', 'codiceFiscale', 'telefono', 'cap', 'indirizzo', 'civico', 'corso', 'modifica', 'rimuovi'];
  dataSource : MatTableDataSource<IStudente> = new MatTableDataSource;

  public selectedRowIndex = -1;

  constructor(
      private router: Router,
      private httpClient: HttpClient,
      private formBuilder: FormBuilder,
      @Inject(LOCALE_ID) public locale: string,
      private studenteService : StudenteServiceService,
      public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.studenteService.getStudente().subscribe(Response => {
      this.dataSource = new MatTableDataSource<IStudente>(Response);
      this.studenteService.dataSourceStudente = this.dataSource;
    });
  }

  ngOnDestroy(): void {
      this.studenteService.dataSourceStudente = new MatTableDataSource;
  }

  filter(changes: any) : void{
    if(changes) {
      console.log(JSON.stringify(changes.target.value));
      this.dataSource.filter = changes.target.value;
      this.dataSource.filter.trim().toLowerCase();
    }
  }

  delete(id: number) : Observable<unknown> {
    return this.httpClient.delete(`http://localhost:8092/esercitazionePlansoft/student/deleteById/${id}`);
  }

  deleteStudente(id: number) {
    this.delete(id).subscribe(Response => {
      const data = this.dataSource.data;
      const index = data.findIndex( x => x.id === id);
      data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    });
  }

  startModify(element : any) {
    let found = false;
    this.studenteService.studenteCorrente = element as Studente;
    const dialogRef = this.dialog.open(StudenteFormComponent, {
      height: '700px',
      width: '1000px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe( () => {
      this.studenteService.getStudente().subscribe(Response => {
        setTimeout( () => {
          const temp = this.dataSource;
          this.dataSource = new MatTableDataSource<IStudente>(Response);
          this.studenteService.dataSourceStudente = this.dataSource;
          for (let i of this.dataSource.data) {
            for (let j of temp.data) {
              if (this.areEquals(i, j)) {
                found = true;
                break;
              } else {
                found = false;
              }
            }
            if (!found) {
              this.selectedRowIndex = i.id;
            }
          }
        }, 300);
        setTimeout( () => this.selectedRowIndex = -1, 5000);
      });
    });
  }

  addStudent() {
    let found = false;
    const dialogRef = this.dialog.open(StudenteFormComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe( () => {
      this.studenteService.getStudente().subscribe(Response => {
        setTimeout( () => {
          const temp = this.dataSource;
          this.dataSource = new MatTableDataSource<IStudente>(Response);
          this.studenteService.dataSourceStudente = this.dataSource;
          for (let i of this.dataSource.data) {
            for (let j of temp.data) {
              if (i.id == j.id) {
                found = true;
                break;
              } else {
                found = false;
              }
            }
            if (!found) {
              this.selectedRowIndex = i.id;
            }
          }
        }, 300);
        setTimeout( () => this.selectedRowIndex = -1, 5000);
      });
    });
  }

  courses(element : any) {
    this.studenteService.studenteCorrente = element as Studente;
    this.router.navigate([`/registrations`]);
  }

  areEquals(obj1:Studente, obj2:Studente) : boolean {
    if (obj1.id === obj2.id &&
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
