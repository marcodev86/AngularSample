import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formatDate} from '@angular/common';
import { LOCALE_ID, Inject } from "@angular/core";
import { Corso } from 'src/app/core/iCorso.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-corso-form',
  templateUrl: './corso-form.component.html',
  styleUrls: ['./corso-form.component.sass']
})
export class CorsoFormComponent implements OnInit {

  myDate = new Date();
  createdAt = formatDate(new Date(), 'yyyy-MM-dd', this.locale);
  professor = [{
    id: Number(),
    name: '',
    surname: '',
    birthdayDate: '',
    number: '',
    fiscalCode: '',
    cap: '',
    city: '',
    address: '',
    houseNumber: '',
    createdAt: '',
    updateAt: ''
  }];

  checkoutForm = this.formBuilder.group({
    name: '',
    description: '',
    professor: Number(),
    startDate: '',
    endDate: '',
    createdAt: this.createdAt
  });

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) public locale: string
  ) { }

  ngOnInit(): void {
    this.getProfessore().subscribe(Response => {
      this.professor = Response;
    });
  }

  getProfessore() : Observable<any>{
    return this.httpClient.get('http://localhost:8092/esercitazionePlansoft/professor/findAll');
  }

  onSubmit(): void {
    for (let i = 0; i < this.professor.length; i++) {
      if(this.professor[i].id == this.checkoutForm.value.professor) {
        this.checkoutForm.value.professor = this.professor[i];
      }
    }
    this.addCorso().subscribe(Response => console.log(Response));
    this.checkoutForm.reset();
  }

  addCorso() : Observable<any> {
    return this.httpClient.post<Corso>('http://localhost:8092/esercitazionePlansoft/course/save', this.checkoutForm.value, httpOptions);
  }

}
