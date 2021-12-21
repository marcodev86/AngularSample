import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Studente } from 'src/app/core/iStudente.interface';
import { formatDate} from '@angular/common';
import { StudenteServiceService} from 'src/app/services/studente-service.service';
import { LOCALE_ID, Inject } from "@angular/core";


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

export class StudenteFormComponent implements OnInit {
  myDate = new Date();
  createdAt = formatDate(new Date(), 'yyyy-MM-dd', this.locale);

  public checkoutForm: FormGroup = {} as FormGroup;
  public isNew: boolean = false;
 
  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) public locale: string,
    private studenteService : StudenteServiceService
  ) { }

  ngOnInit(): void {
    if(!this.studenteService.studenteCorrente) {
      this.isNew = true;
    }
    this.assignForm(this.studenteService.studenteCorrente);
  }

  onSubmit(): void {
    this.addStudente().subscribe(Response => console.log(Response));
    console.log(this.checkoutForm.value);
    this.checkoutForm.reset();
  }

  addStudente() : Observable<any> {
    return this.httpClient.post<Studente>('http://localhost:8092/esercitazionePlansoft/student/save', this.checkoutForm.value, httpOptions);
  }

  assignForm(student : Studente) {
    this.checkoutForm = this.formBuilder.group({
      name: student?.name,
      surname: student?.surname,
      birthdayDate: student?.birthdayDate,
      number: student?.number,
      fiscalCode: student?.fiscalCode,
      cap: student?.cap,
      city: student?.city,
      address: student?.address,
      houseNumber: student?.houseNumber,
      createdAt: this.createdAt
    });
  }

}
