import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formatDate} from '@angular/common';
import { LOCALE_ID, Inject } from "@angular/core";
import { Professore } from 'src/app/core/iProfessore.interface';
import { StudenteServiceService} from 'src/app/services/studente-service.service';
import { DateValidator } from 'src/app/shared/date.validator';
import { Router } from '@angular/router';

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

export class ProfessoreFormComponent implements OnInit, OnDestroy {

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
    const id = this.studenteService?.getIdProfessore();
    if(!id) {
      this.isNew = true;
    } 
    this.assignForm(this.studenteService.professoreCorrente);   
  }

  ngOnDestroy(): void {
    this.studenteService.professoreCorrente = {} as Professore;
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.checkoutForm.controls[controlName].hasError(errorName);
  }

  onSubmit(): void {
    if(this.isNew) {
      this.addProfessore().subscribe(Response => console.log(Response));
      this.checkoutForm.reset();
      this.router.navigate([`/professore`]);
    } else {
      this.modifica(this.checkoutForm.value).subscribe();
      this.checkoutForm.reset();
      this.router.navigate([`/professore`]);
    }
  }

  addProfessore() : Observable<any> {
    return this.httpClient.post<Professore>('http://localhost:8092/esercitazionePlansoft/professor/save', this.checkoutForm.value, httpOptions);
  }

  assignForm(professor : any) {
    this.checkoutForm = this.formBuilder.group({
      name: new FormControl(professor?.name, [Validators.required, Validators.maxLength(50)]),
      surname: new FormControl(professor?.surname, [Validators.required, Validators.maxLength(60)]),
      birthdayDate: new FormControl(professor?.birthdayDate, [Validators.required, DateValidator.dateVaidator]),
      number: new FormControl(professor?.number, [Validators.required, Validators.maxLength(30)]),
      fiscalCode: new FormControl(professor?.fiscalCode, [Validators.required, Validators.maxLength(30)]),
      cap: new FormControl(professor?.cap, [Validators.required, Validators.maxLength(6)]),
      city: new FormControl(professor?.city, [Validators.required, Validators.maxLength(50)]),
      address: new FormControl(professor?.address, [Validators.required, Validators.maxLength(80)]),
      houseNumber: new FormControl(professor?.houseNumber, [Validators.required, Validators.maxLength(10)]),
      createdAt: professor.createdAt ? professor.createdAt : this.createdAt
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
      createdAt: element.createdAt,
      updateAt: this.updateAt 
    };
    return this.httpClient.put<Professore>('http://localhost:8092/esercitazionePlansoft/professor/update', professore, httpOptions);
  }

}
