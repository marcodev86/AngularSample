import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formatDate} from '@angular/common';
import { LOCALE_ID, Inject } from "@angular/core";
import { Professore } from 'src/app/core/iProfessore.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-professore-form',
  templateUrl: './professore-form.component.html',
  styleUrls: ['./professore-form.component.sass']
})
export class ProfessoreFormComponent implements OnInit {

  myDate = new Date();
  createdAt = formatDate(new Date(), 'yyyy-MM-dd', this.locale);

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
    createdAt: this.createdAt
  });

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) public locale: string
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.addProfessore().subscribe(Response => console.log(Response));
    console.log(this.checkoutForm.value);
    this.checkoutForm.reset();
  }

  addProfessore() : Observable<any> {
    return this.httpClient.post<Professore>('http://localhost:8092/esercitazionePlansoft/professor/save', this.checkoutForm.value, httpOptions);
  }

}
