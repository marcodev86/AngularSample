import { Component, Input, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Studente } from 'src/app/core/iStudente.interface';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { StudenteServiceService } from 'src/app/service/studente-service.service';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-studente-detail',
  templateUrl: './studente-detail.component.html',
  styleUrls: ['./studente-detail.component.sass']
})

export class StudenteDetailComponent implements OnInit, OnDestroy  {

  public studenteForm: FormGroup = {} as FormGroup;
  public isNew: boolean = false;
  
  constructor(private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private studenteService : StudenteServiceService ) { }

  ngOnInit(): void {

    if(!this.studenteService?.studenteCorrente?.id) {
      this.isNew = true;
    }
    this.assignForm(this.studenteService.studenteCorrente);
  }
  ngOnDestroy(): void {
      this.studenteService.studenteCorrente = {} as Studente;
  }
  /* ngAfterViewInit() {
    this.studenteForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      date: new FormControl(new Date()),
      cognome: new FormControl('', [Validators.required, Validators.maxLength(30)])
    });
  }  */

  public hasError = (controlName: string, errorName: string) =>{
    return this.studenteForm.controls[controlName].hasError(errorName);
  }
  
  onSubmit(): void {
    if(this.isNew){
    this.addStudente().subscribe(response => console.log(response));
    console.log(this.studenteForm.value);
     this.studenteForm.reset();}
     else{
       

     }
  }

  reset(): void{
    this.studenteForm.reset();
  }

  addStudente() : Observable<any> {
    return this.httpClient.post<Studente>('http://localhost:8092/gestioneAnagraficaCorso/student/', this.studenteForm.value, httpOptions);
  }

  assignForm(studente : Studente) {
    this.studenteForm = this.formBuilder.group({
      id: studente?.id,
      nome: new FormControl(studente?.nome,[Validators.required, Validators.maxLength(30)]),
      cognome: studente?.cognome,
      data: studente?.data,
      comuneDiNascita: studente?.comuneDiNascita,
      codiceFiscale: studente?.codiceFiscale,
      indirizzo: studente?.indirizzo,
      comune: studente?.comune,
      cap: studente?.cap,
      prov: studente?.prov,
      telefono: studente?.telefono
    });
  }

}
/* 

export class FormFieldErrorExample {
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
} */

