import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professore } from 'src/app/core/iProfessore.interface';
import { formatDate} from '@angular/common';
import { LOCALE_ID, Inject } from "@angular/core";

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

export class ProfessoreComponent implements OnInit {

  isVisible = false;

  docenteMod = {
    id: '',
    name: '',
    surname: '',
    birthdayDate: '',
    number: '',
    fiscalCode: '',
    cap: '',
    city: '',
    address: '',
    houseNumber: '',
    createdAt: ''
  };

  myDate = new Date();
  updateAt = formatDate(new Date(), 'yyyy-MM-dd', this.locale);

  displayedColumns: string[] = ['id', 'nome', 'cognome', 'data', 'comune', 'codiceFiscale', 'telefono', 'cap', 'indirizzo', 'civico', 'azione'];
  dataSource : any;

  checkoutForm = this.formBuilder.group({
    name: '',
    surname: '',
    birthdayDate: '',
    number: '',
    fiscalCode: '',
    cap: '',
    city: '',
    address: '',
    houseNumber: '',
    createdAt: this.docenteMod.createdAt,
    updateAt: this.updateAt
  });

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    @Inject(LOCALE_ID) public locale: string
  ) { }

  ngOnInit(): void {
    this.getProfessore().subscribe(Response => {
      this.dataSource = Response;
    });
  }

  getProfessore() : Observable<any>{
    return this.httpClient.get('http://localhost:8092/esercitazionePlansoft/professor/findAll');
  }

  delete(id: number) : Observable<unknown> {
    return this.httpClient.delete(`http://localhost:8092/esercitazionePlansoft/professor/deleteById/${id}`);
  }

  deleteProfessore(id: number) {
    this.delete(id).subscribe(Response => console.log(Response));
    window.location.reload();
  }

  startModify(element : any) {
    this.isVisible = true;
    this.docenteMod = element;
  }

  modifica(element:any) : Observable<Professore> {
    
    const docente = {
      id: this.docenteMod.id,
      name: (element.name != '') ? element.name : this.docenteMod.name,
      surname: (element.surname != '') ? element.surname : this.docenteMod.surname,
      birthdayDate: (element.birthdayDate != '') ? element.birthdayDate : this.docenteMod.birthdayDate,
      number: (element.number != '') ? element.number : this.docenteMod.number,
      fiscalCode: (element.fiscalCode != '') ? element.fiscalCode : this.docenteMod.fiscalCode,
      cap: (element.cap != '') ? element.cap : this.docenteMod.cap,
      city: (element.city != '') ? element.city : this.docenteMod.city,
      address: (element.address != '') ? element.address : this.docenteMod.address,
      houseNumber: (element.houseNumber != '') ? element.houseNumber : this.docenteMod.houseNumber,
      createdAt: this.docenteMod.createdAt,
      updateAt: this.updateAt 
    };
    return this.httpClient.put<Professore>('http://localhost:8092/esercitazionePlansoft/professor/update', docente, httpOptions);
  }

  onSubmit() {
    this.modifica(this.checkoutForm.value).subscribe(Response => console.log(Response));
    window.location.reload();
  }

}
