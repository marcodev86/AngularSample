import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formatDate} from '@angular/common';
import { LOCALE_ID, Inject } from "@angular/core";
import { Corso } from 'src/app/core/iCorso.interface';
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
  selector: 'app-corso-form',
  templateUrl: './corso-form.component.html',
  styleUrls: ['./corso-form.component.sass']
})

export class CorsoFormComponent implements OnInit, OnDestroy {

  myDate = new Date();
  createdAt = formatDate(new Date(), 'yyyy-MM-dd', this.locale);
  updateAt = formatDate(new Date(), 'yyyy-MM-dd', this.locale);

  public checkoutForm: FormGroup = {} as FormGroup;
  public isNew: boolean = false;

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

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) public locale: string,
    private studenteService : StudenteServiceService
  ) { }

  ngOnInit(): void {
    this.studenteService.getProfessore().subscribe(Response => {
      this.professor = Response;
    });
    const id = this.studenteService?.getIdCorso();
    if(!id) {
      this.isNew = true;
    } 
    this.assignForm(this.studenteService.corsoCorrente);
  }

  ngOnDestroy(): void {
    this.studenteService.corsoCorrente = {} as Corso;
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.checkoutForm.controls[controlName].hasError(errorName);
  }

  onSubmit(): void {
    if(this.isNew) {
      for (let i = 0; i < this.professor.length; i++) {
        if(this.professor[i].id == this.checkoutForm.value.professor) {
          this.checkoutForm.value.professor = this.professor[i];
        }
      }
      this.addCorso().subscribe(Response => console.log(Response));
      this.checkoutForm.reset();
      this.router.navigate([`/corso`]);
    } else {
      for (let i = 0; i < this.professor.length; i++) {
        if(this.professor[i].id == this.checkoutForm.value.professor) {
          this.checkoutForm.value.professor = this.professor[i];
        }
      }
      this.modifica(this.checkoutForm.value).subscribe();
      this.checkoutForm.reset();
      this.router.navigate([`/corso`]);
    }
  }

  addCorso() : Observable<any> {
    if(this.checkDate(this.checkoutForm.value.startDate, this.checkoutForm.value.endDate)) {
      let temp = this.checkoutForm.value.startDate;
      this.checkoutForm.value.startDate = this.checkoutForm.value.endDate;
      this.checkoutForm.value.endDate = temp;
    }
    return this.httpClient.post<Corso>('http://localhost:8092/esercitazionePlansoft/course/save', this.checkoutForm.value, httpOptions);
  }

  modifica(element:any) : Observable<Corso> {

    const corso = {
      id: this.studenteService?.getIdCorso(),
      name: element.name,
      description: element.description,
      professor: element.professor,
      startDate: element.startDate,
      endDate: element.endDate,
      createdAt: element.createdAt,
      updateAt: this.updateAt 
    };

    if(this.checkDate(corso.startDate, corso.endDate)) {
      let temp = corso.startDate;
      corso.startDate = corso.endDate;
      corso.endDate = temp;
    }

    return this.httpClient.put<Corso>('http://localhost:8092/esercitazionePlansoft/course/update', corso, httpOptions);
  }

  checkDate(date1 : string, date2 : string) {
    let newDate1 = new Date(date1);
    let newDate2 = new Date(date2);

    return newDate1 > newDate2;
  }

  assignForm(corso : any) {
    this.checkoutForm = this.formBuilder.group({
      name: new FormControl(corso?.name, [Validators.required, Validators.maxLength(100)]),
      description: new FormControl(corso?.description, [Validators.required, Validators.maxLength(200)]),
      professor: corso?.professor,
      startDate: new FormControl(corso?.startDate, [Validators.required, DateValidator.dateVaidator]),
      endDate: new FormControl(corso?.endDate, [Validators.required, DateValidator.dateVaidator]),
      createdAt: corso.createdAt ? corso.createdAt : this.createdAt
    });
  }

}
