import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formatDate} from '@angular/common';
import { LOCALE_ID, Inject } from "@angular/core";
import { Corso } from 'src/app/core/iCorso.interface';

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

export class CorsoComponent implements OnInit {

  isVisible = false;

  corsoMod = {
    id: '',
    name: '',
    description: '',
    professor: '',
    startDate: '',
    endDate: '',
    createdAt: ''
  };

  myDate = new Date();
  updateAt = formatDate(new Date(), 'yyyy-MM-dd', this.locale);

  displayedColumns: string[] = ['id', 'nome', 'descrizione', 'docente', 'dataDiInizio', 'dataDiFine', 'azione'];
  dataSource : any;

  checkoutForm = this.formBuilder.group({
    name: '',
    description: '',
    professor: '',
    startDate: '',
    endDate: '',
    createdAt: this.corsoMod.createdAt,
    updateAt: this.updateAt
  });

  constructor(
    private router: Router, 
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) public locale: string
  ) { }

  ngOnInit(): void {
    this.getCorso().subscribe(Response => {
      this.dataSource = Response;
    });
  }

  getCorso() : Observable<any>{
    return this.httpClient.get('http://localhost:8092/esercitazionePlansoft/course/findAll');
  }

  delete(id: number) : Observable<unknown> {
    return this.httpClient.delete(`http://localhost:8092/esercitazionePlansoft/course/deleteById/${id}`);
  }

  deleteCorso(id: number) {
    this.delete(id).subscribe(Response => console.log(Response));
    window.location.reload();
  }

  startModify(element : any) {
    this.isVisible = true;
    this.corsoMod = element;
  }

  modifica(element:any) : Observable<Corso> {
    
    const corso = {
      id: this.corsoMod.id,
      name: (element.name != '') ? element.name : this.corsoMod.name,
      description: (element.description != '') ? element.description : this.corsoMod.description,
      professor: (element.professor != '') ? element.professor : this.corsoMod.professor,
      startDate: (element.startDate != '') ? element.startDate : this.corsoMod.startDate,
      endDate: (element.endDate != '') ? element.endDate : this.corsoMod.endDate,
      createdAt: this.corsoMod.createdAt,
      updateAt: this.updateAt 
    };
    return this.httpClient.put<Corso>('http://localhost:8092/esercitazionePlansoft/course/update', corso, httpOptions);
  }

  onSubmit() {
    this.modifica(this.checkoutForm.value).subscribe(Response => console.log(Response));
    window.location.reload();
  }

}
