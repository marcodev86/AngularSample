import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formatDate} from '@angular/common';
import { LOCALE_ID, Inject } from "@angular/core";
import { Corso } from 'src/app/core/iCorso.interface';
import { StudenteServiceService} from 'src/app/services/studente-service.service';

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
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) public locale: string,
    private studenteService : StudenteServiceService
  ) { }

  ngOnInit(): void {
    this.getProfessore().subscribe(Response => {
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

  getProfessore() : Observable<any>{
    return this.httpClient.get('http://localhost:8092/esercitazionePlansoft/professor/findAll');
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
    } else {
      /* da gestire */
    }
  }

  addCorso() : Observable<any> {
    return this.httpClient.post<Corso>('http://localhost:8092/esercitazionePlansoft/course/save', this.checkoutForm.value, httpOptions);
  }

  assignForm(corso : Corso) {
    this.checkoutForm = this.formBuilder.group({
      name: corso?.name,
      description: corso?.description,
      professor: corso?.professor,
      startDate: corso?.startDate,
      endDate: corso?.endDate,
      createdAt: this.createdAt
    });
  }

}
