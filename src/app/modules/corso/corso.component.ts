import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudenteServiceService} from 'src/app/services/studente-service.service';
import { formatDate} from '@angular/common';
import { LOCALE_ID, Inject } from "@angular/core";
import { Corso, ICorso } from 'src/app/core/iCorso.interface';
import { MatTableDataSource } from '@angular/material/table';

/* const corso: Corso[] = [{nome: 'Informatica', descrizione: 'Questo corso insegna informatica', docente: 'Pietro Rossi', dataDiInizio: '2021-12-11', dataDiFine: '2022-12-11'},
{nome: 'Analisi', descrizione: 'Questo corso insegna analisi matematica', docente: 'Giacomo Verdi', dataDiInizio: '2021-02-11', dataDiFine: '2022-02-11'},
{nome: 'Geometria', descrizione: 'Questo corso insegna geometria', docente: 'Federica Gialli', dataDiInizio: '2021-10-11', dataDiFine: '2022-10-11'}]; */

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-corso',
  templateUrl: './corso.component.html',
  styleUrls: ['./corso.component.sass']
})

export class CorsoComponent implements OnInit, OnDestroy {

  myDate = new Date();
  updateAt = formatDate(new Date(), 'yyyy-MM-dd', this.locale);

  displayedColumns: string[] = ['id', 'nome', 'descrizione', 'docente', 'dataDiInizio', 'dataDiFine', 'modifica', 'rimuovi'];
  dataSource : MatTableDataSource<ICorso> = new MatTableDataSource;

  constructor(
    private router: Router, 
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) public locale: string,
    private studenteService : StudenteServiceService
  ) { }

  ngOnInit(): void {
    this.studenteService.getCorso().subscribe(Response => {
      this.dataSource = new MatTableDataSource<ICorso>(Response);
      this.studenteService.dataSourceCorso = this.dataSource;
    });
  }

  ngOnDestroy(): void {
    this.studenteService.dataSourceCorso = new MatTableDataSource;
  }

  delete(id: number) : Observable<unknown> {
    return this.httpClient.delete(`http://localhost:8092/esercitazionePlansoft/course/deleteById/${id}`);
  }

  deleteCorso(id: number) {
    this.delete(id).subscribe(Response => {
      const data = this.dataSource.data;
      const index = data.findIndex( x => x.id === id);
      data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    });
  }

  startModify(element : any) {
    this.studenteService.corsoCorrente = element as Corso;
    this.router.navigate([`/corso-form`]);
  }


  filter(changes: any) : void{
    if(changes) {
      console.log(JSON.stringify(changes.target.value));
      this.dataSource.filter = changes.target.value;
    }
  }

}
