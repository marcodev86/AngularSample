import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProfessore, Professore } from 'src/app/core/iProfessore.interface';
import { StudenteServiceService} from 'src/app/services/studente-service.service';
import { formatDate} from '@angular/common';
import { LOCALE_ID, Inject } from "@angular/core";
import { MatTableDataSource } from '@angular/material/table';

/* const professore: Professore[] = [{ nome: 'Pietro', cognome: 'Rossi', dataDiNascita: '1991-11-12', comune: 'Taranto', codiceFiscale: 'FGHJK45678', telefono: '3456789', cap: '45345', via: 'via gcdfsd', numeroCivico: '12'},
{ nome: 'Giacomo', cognome: 'Verdi',dataDiNascita: '1998-10-18', comune: 'Firenze', codiceFiscale: 'DFGHJK5678', telefono: '523525235', cap: '52454', via: 'via fwaegag', numeroCivico: '2' },
{ nome: 'Federica', cognome: 'Gialli', dataDiNascita: '1994-10-11', comune: 'Milano', codiceFiscale: 'ERTYUUFCVB4634', telefono: '3452657823', cap: '35423', via: 'via zasvfsdhg', numeroCivico: '14' }];
*/

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-professore',
  templateUrl: './professore.component.html',
  styleUrls: ['./professore.component.sass']
})

export class ProfessoreComponent implements OnInit, OnDestroy {

  myDate = new Date();
  updateAt = formatDate(new Date(), 'yyyy-MM-dd', this.locale);

  displayedColumns: string[] = ['id', 'nome', 'cognome', 'data', 'comune', 'codiceFiscale', 'telefono', 'cap', 'indirizzo', 'civico', 'corso', 'modifica', 'rimuovi'];
  dataSource : MatTableDataSource<IProfessore> = new MatTableDataSource;

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    @Inject(LOCALE_ID) public locale: string,
    private studenteService : StudenteServiceService
  ) { }

  ngOnInit(): void {
    this.studenteService.getProfessore().subscribe(Response => {
      this.dataSource = new MatTableDataSource<IProfessore>(Response);
      this.studenteService.dataSourceProfessore = this.dataSource;
    });
  }

  ngOnDestroy(): void {
    this.studenteService.dataSourceProfessore = new MatTableDataSource;
  }

  delete(id: number) : Observable<unknown> {
    return this.httpClient.delete(`http://localhost:8092/esercitazionePlansoft/professor/deleteById/${id}`);
  }

  deleteProfessore(id: number) {
    this.delete(id).subscribe(Response => {
      const data = this.dataSource.data;
      const index = data.findIndex( x => x.id === id);
      data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    });
  }

  startModify(element : any) {
    this.studenteService.professoreCorrente = element as Professore;
    this.router.navigate([`/professore-form`]);
  }

  filter(changes: any) : void{
    if(changes) {
      console.log(JSON.stringify(changes.target.value));
      this.dataSource.filter = changes.target.value;
      this.dataSource.filter.trim().toLowerCase();
    }
  }

  addCourse(element : any) {
    this.studenteService.professoreCorrente = element as Professore;
    this.router.navigate(['insegnamento-form']);
  }

}
