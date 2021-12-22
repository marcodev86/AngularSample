import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IStudente, Studente } from 'src/app/core/iStudente.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { StudenteServiceService } from 'src/app/service/studente-service.service';
import { FormBuilder } from '@angular/forms';

/*    nome, 
    cognome,
    data,
    comuneDiNascita,
    codiceFiscale,
    indirizzo,
    comune,
    cap,
    prov, 
    telefono, 
    createdAt, 
    updatedAt  */

/* const studente: Studente[] = [{id:1, nome: 'Michele', cognome: 'Sanna', data: new Date("1980-01-05").toLocaleDateString(),comuneDiNascita: 'cagliari', codiceFiscale:'CDFDER45R345D',
indirizzo:'via roma 23',
comune:'cagliari',
cap:'09027',
prov:'ca', 
telefono:'03846583728', 
createdAt: new Date(), 
updatedAt: new Date() }
,
]; */
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
export class StudenteComponent implements OnInit, AfterViewInit  {
  // public studente: Studente[] = [{ nome: 'Marco', cognome: 'Micalizzi' }];
 //dataSource = studente;
 //proprietà della tabella 
 displayedColumns: string []= [
  'id','nome','cognome','data','comuneDiNascita','codiceFiscale','indirizzo','comune',
  'cap','prov', 'telefono','createdAt','modifica','cancella'];
  //dichiaro il dataSource any
  //dataSource: any;

  dataSourceStudente : MatTableDataSource<IStudente> = new MatTableDataSource;

  isVisible = false;

  //creo un oggetto con i parametri vuoti
  studenteMod = {
    id:'',
    nome:'', 
    cognome:'',
    data:'',
    comuneDiNascita:'',
    codiceFiscale:'',
    indirizzo:'',
    comune:'',
    cap:'',
    prov:'',
    telefono:'', 
    createdAt:''
  }

  //creo un oggetto per creare la form con parametri vuoti
  studenteForm = this.formBuilder.group({
    nome:'', 
    cognome:'',
    data:'',
    comuneDiNascita:'',
    codiceFiscale:'',
    indirizzo:'',
    comune:'',
    cap:'',
    prov:'',
    telefono:'', 
    createdAt:''//this.studenteMod.createdAt,
  });

  
  constructor( private router: Router, private httpClient: HttpClient,
    private studenteService : StudenteServiceService, private formBuilder: FormBuilder) {
     
  }
   
  ngOnInit(): void {
    this.getStudente().subscribe((response: Studente[]) =>{
      this.dataSourceStudente = new MatTableDataSource<IStudente>(response);
      //recupera dati dalle api collegate al db 
      //this.dataSource = response as Studente[];
    }, );
    // this.dataSource.filterPredicate = (data: Element, filter: string) => {
    //   return data.nome == filter;
    //  };
  }
  // API path
  base_path = 'http://localhost:8092/gestioneAnagraficaCorso/student/';
  
  getStudente(): Observable<any>{
    return this.httpClient.get(this.base_path);
  }

  delete(id: number):Observable<unknown> {
    return this.httpClient.delete(`${this.base_path}delete/${id}`);
  }
  toDeleteStudente(id:number){
    this.delete(id).subscribe(response =>{
      const data = this.dataSourceStudente.data;
      const index = data.findIndex( x => x.id === id);
      data.splice(index, 1);
      this.dataSourceStudente._updateChangeSubscription();
    });
  }


  modifyRow(element : any) {
    this.isVisible = true;
    this.studenteMod = element;
    this.studenteService.studenteCorrente = element as Studente;
    const currentUrl = this.router.url;
    this.router.navigate([`/studente-detail`]);
  }

  modifica(element:any) : Observable<Studente> {
    
    const studente = {
      id: this.studenteMod.id,
      nome: (element.nome != '') ? element.nome : this.studenteMod.nome,
      cognome: (element.cognome != '') ? element.cognome : this.studenteMod.cognome,
      data: (element.data != '') ? element.data : this.studenteMod.data,
      comuneDiNascita: (element.comuneDiNascita != '') ? element.comuneDiNascita : this.studenteMod.comuneDiNascita,
      codiceFiscale: (element.codiceFiscale != '') ? element.codiceFiscale : this.studenteMod.codiceFiscale,
      indirizzo: (element.indirizzo != '') ? element.indirizzo : this.studenteMod.indirizzo,
      comune: (element.comune != '') ? element.comune : this.studenteMod.comune,
      cap: (element.cap != '') ? element.cap : this.studenteMod.cap,
      telefono: (element.telefono !='') ? element.telefono : this.studenteMod.telefono,
      createdAt: this.studenteMod.createdAt
      
    };
    return this.httpClient.put<Studente>(`${this.base_path}update`, studente, httpOptions);
  }

  // onSubmit() {
  //   this.modifica(this.studenteForm.value).subscribe(response => console.log(response));
  //   window.location.reload();
  // }
 
  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort) sort: MatSort = {} as MatSort;
  
   // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator = {} as MatPaginator;
   
   ngAfterViewInit() {
    this.dataSourceStudente.sort = this.sort;
    this.dataSourceStudente.paginator = this.paginator;
  } 
  searchValue: string = "";

  public applyFilter (filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSourceStudente.filter = filterValue;
  }


}
// public clickedButton(event: Event) : void{
//   console.log('cliccato');
//   const currentUrl = this.router.url;
//   this.router.navigate([`{$currentUrl}+/detail`]);

// }
