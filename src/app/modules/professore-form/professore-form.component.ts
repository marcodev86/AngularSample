import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formatDate} from '@angular/common';
import { LOCALE_ID, Inject } from "@angular/core";
import { Professore } from 'src/app/core/iProfessore.interface';
import { StudenteServiceService} from 'src/app/services/studente-service.service';

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
  updateAt = formatDate(new Date(), 'yyyy-MM-dd', this.locale);

  public checkoutForm: FormGroup = {} as FormGroup;
  public isNew: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) public locale: string,
    private studenteService : StudenteServiceService
  ) { }

  ngOnInit(): void {
    const id = this.studenteService?.getIdProfessore();
    if(!id) {
      this.isNew = true;
    } 
    this.assignForm(this.studenteService.professoreCorrente);   
  }

  onSubmit(): void {
    if(this.isNew) {
      this.addProfessore().subscribe(Response => console.log(Response));
      console.log(this.checkoutForm.value);
      this.checkoutForm.reset();
    } else {
      this.modifica(this.checkoutForm.value).subscribe();
      this.checkoutForm.reset();
    }
  }

  addProfessore() : Observable<any> {
    return this.httpClient.post<Professore>('http://localhost:8092/esercitazionePlansoft/professor/save', this.checkoutForm.value, httpOptions);
  }

  assignForm(professor : Professore) {
    this.checkoutForm = this.formBuilder.group({
      name: professor?.name,
      surname: professor?.surname,
      birthdayDate: professor?.birthdayDate,
      number: professor?.number,
      fiscalCode: professor?.fiscalCode,
      cap: professor?.cap,
      city: professor?.city,
      address: professor?.address,
      houseNumber: professor?.houseNumber,
      createdAt: this.createdAt
    });
  }

  modifica(element:any) : Observable<Professore> {
    
    const professore = {
      id: this.studenteService?.getIdProfessore(),
      name: element.name,
      surname: element.surname,
      birthdayDate: element.birthdayDate,
      number: element.number,
      fiscalCode: element.fiscalCode,
      cap: element.cap,
      city: element.city,
      address: element.address,
      houseNumber: element.houseNumber,
      createdAt: this.createdAt,
      updateAt: this.updateAt 
    };
    return this.httpClient.put<Professore>('http://localhost:8092/esercitazionePlansoft/professor/update', professore, httpOptions);
  }

}
