import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Studente } from 'src/app/core/iStudente.interface';
import { formatDate} from '@angular/common';
import { StudenteServiceService} from 'src/app/services/studente-service.service';
import { LOCALE_ID, Inject } from "@angular/core";
import { DateValidator } from 'src/app/shared/date.validator';
import { Router } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-studente-form',
  templateUrl: './studente-form.component.html',
  styleUrls: ['./studente-form.component.sass']
})

export class StudenteFormComponent implements OnInit, OnDestroy {
  myDate = new Date();
  createdAt = formatDate(new Date(), 'yyyy-MM-dd', this.locale);
  updateAt = formatDate(new Date(), 'yyyy-MM-dd', this.locale);

  public checkoutForm: FormGroup = {} as FormGroup;
  public isNew: boolean = false;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) public locale: string,
    private studenteService : StudenteServiceService
  ) { }

  ngOnInit(): void {
    const id = this.studenteService?.getIdStudente();
    if(!id) {
      this.isNew = true;
    }
    this.assignForm(this.studenteService.studenteCorrente);
  }

  ngOnDestroy(): void {
    this.studenteService.studenteCorrente = {} as Studente;
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.checkoutForm.controls[controlName].hasError(errorName);
  }

  onSubmit(): void {
    if(this.isNew) {
      this.addStudente().subscribe(Response => console.log(Response));
      //this.checkoutForm.reset();
      //this.router.navigate([`/studente`]);
    } else {
      this.modifica(this.checkoutForm.value).subscribe();
      //this.checkoutForm.reset();
      //setTimeout( () => this.router.navigate([`/studente`]), 100);
    }
  }

  addStudente() : Observable<any> {
    return this.httpClient.post<Studente>('http://localhost:8092/esercitazionePlansoft/student/save', this.checkoutForm.value, httpOptions);
  }

  assignForm(student : any) {
    this.checkoutForm = this.formBuilder.group({
      name: new FormControl(student?.name, [Validators.required, Validators.maxLength(50)]),
      surname: new FormControl(student?.surname, [Validators.required, Validators.maxLength(60)]),
      birthdayDate: new FormControl(student?.birthdayDate, [Validators.required, DateValidator.dateVaidator]),
      number: new FormControl(student?.number, [Validators.required, Validators.maxLength(30)]),
      fiscalCode: new FormControl(student?.fiscalCode, [Validators.required, Validators.maxLength(30)]),
      cap: new FormControl(student?.cap, [Validators.required, Validators.maxLength(6)]),
      city: new FormControl(student?.city, [Validators.required, Validators.maxLength(50)]),
      address: new FormControl(student?.address, [Validators.required, Validators.maxLength(80)]),
      houseNumber: new FormControl(student?.houseNumber, [Validators.required, Validators.maxLength(10)]),
      createdAt: student.createdAt ? student.createdAt : this.createdAt
    });
    console.log(this.checkoutForm);
  }

  modifica(element:any) : Observable<Studente> {

    const studentId = this.studenteService?.getIdStudente();

    const studente = {
      id: this.studenteService?.getIdStudente(),
      name: element.name,
      surname: element.surname,
      birthdayDate: element.birthdayDate,
      number: element.number,
      fiscalCode: element.fiscalCode,
      cap: element.cap,
      city: element.city,
      address: element.address,
      houseNumber: element.houseNumber,
      createdAt: element.createdAt,
      updateAt: this.updateAt
    };
    return this.httpClient.put<Studente>(`http://localhost:8092/esercitazionePlansoft/student/updateStudentById/${studentId}`, studente, httpOptions);
  }

}
