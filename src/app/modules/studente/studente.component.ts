import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStudente, Studente } from 'src/app/core/iStudente.interface';
import { StudenteServiceService} from 'src/app/services/studente-service.service';
import { formatDate} from '@angular/common';
import { LOCALE_ID, Inject } from "@angular/core";
import { MatTableDataSource } from '@angular/material/table';

/* const studente: Studente[] = [{ nome: 'Marco', cognome: 'Micalizzi', dataDiNascita: '1991-11-12', comune: 'Messina', codiceFiscale: 'FGHJK45678', telefono: '3456789', cap: '45345', via: 'via gcdfsd', numeroCivico: '12'},
{ nome: 'Luca', cognome: 'Sbragi',dataDiNascita: '1998-10-18', comune: 'Firenze', codiceFiscale: 'DFGHJK5678', telefono: '523525235', cap: '52454', via: 'via fwaegag', numeroCivico: '2' },
{ nome: 'Ilenia', cognome: 'Concu', dataDiNascita: '1994-10-11', comune: 'Cagliari', codiceFiscale: 'ERTYUUFCVB4634', telefono: '3452657823', cap: '35423', via: 'via zasvfsdhg', numeroCivico: '14' }];
*/

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-studente',
  templateUrl: './studente.component.html',
  styleUrls: ['./studente.component.sass']
})


export class StudenteComponent implements OnInit {

  isVisible = false;

  studenteMod = {
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
  dataSource : MatTableDataSource<IStudente> = new MatTableDataSource;

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
    createdAt: this.studenteMod.createdAt,
    updateAt: this.updateAt
  });

  constructor(private router: Router, 
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) public locale: string,
    private studenteService : StudenteServiceService
    ) {
  }

  ngOnInit(): void {
    this.getStudente().subscribe(Response => {
      this.dataSource = new MatTableDataSource<IStudente>(Response);
    });
  }

  public clickedButton(event: Event): void {
    console.log(event)
    const currentUrl = this.router.url;
    this.router.navigate([`${currentUrl}/detail`]);
  }

  getStudente() : Observable<any>{
    return this.httpClient.get('http://localhost:8092/esercitazionePlansoft/student/findAll');
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
    this.isVisible = true;
    this.studenteMod = element;
    this.studenteService.studenteCorrente = element as Studente;
    const currentUrl = this.router.url;
    this.router.navigate([`/studente-form`]);
  }

  modifica(element:any) : Observable<Studente> {
    
    const studente = {
      id: this.studenteMod.id,
      name: (element.name != '') ? element.name : this.studenteMod.name,
      surname: (element.surname != '') ? element.surname : this.studenteMod.surname,
      birthdayDate: (element.birthdayDate != '') ? element.birthdayDate : this.studenteMod.birthdayDate,
      number: (element.number != '') ? element.number : this.studenteMod.number,
      fiscalCode: (element.fiscalCode != '') ? element.fiscalCode : this.studenteMod.fiscalCode,
      cap: (element.cap != '') ? element.cap : this.studenteMod.cap,
      city: (element.city != '') ? element.city : this.studenteMod.city,
      address: (element.address != '') ? element.address : this.studenteMod.address,
      houseNumber: (element.houseNumber != '') ? element.houseNumber : this.studenteMod.houseNumber,
      createdAt: this.studenteMod.createdAt,
      updateAt: this.updateAt 
    };
    return this.httpClient.put<Studente>('http://localhost:8092/esercitazionePlansoft/student/update', studente, httpOptions);
  }

  onSubmit() {
    this.modifica(this.checkoutForm.value).subscribe(Response => console.log(Response));
    window.location.reload();
  }

}
