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

  constructor(
      private router: Router, 
      private httpClient: HttpClient,
      private formBuilder: FormBuilder,
      @Inject(LOCALE_ID) public locale: string,
      private studenteService : StudenteServiceService
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

  /* ngOnChanges(changes: SimpleChanges): void {
      if(changes) {
        console.log(JSON.stringify(changes));
      }
  } */

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
    this.studenteService.studenteCorrente = element as Studente;
    this.router.navigate([`/studente-form`]);
  }

  courses(element : any) {
    this.studenteService.studenteCorrente = element as Studente;
    this.router.navigate([`/registrations`]);
  }

}
