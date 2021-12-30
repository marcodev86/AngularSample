import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formatDate} from '@angular/common';
import { LOCALE_ID, Inject } from "@angular/core";
import { StudenteServiceService} from 'src/app/services/studente-service.service';
import { Studente } from 'src/app/core/iStudente.interface';
import { Corso } from 'src/app/core/iCorso.interface';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.sass']
})

export class RegistrationFormComponent implements OnInit, OnDestroy {

  public checkoutForm: FormGroup = {} as FormGroup;
  public student : Studente = {} as Studente;
  public course : Corso[] = [];
  public studentCourses : Corso[] = [];

  myDate = new Date();
  createdAt = formatDate(new Date(), 'yyyy-MM-dd', this.locale);

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) public locale: string,
    private studenteService : StudenteServiceService
  ) { }

  ngOnInit(): void {
    const id = this.studenteService?.getIdStudente();
    let isThere : boolean = false;

    this.student = this.studenteService.studenteCorrente;
    this.studenteService.getRegistration(id).subscribe( Response => {
      for(let c of Response.courseRegistrationDto) {
        this.studentCourses.push(c.courseDto);
      }
    } );
    
    this.studenteService.getCorso().subscribe( Response => {
      for(let c of Response) {
        for(let cs of this.studentCourses) {
          if (c.id === cs.id) {
            isThere = true;
          }   
        }
        if(!isThere) {
          this.course.push(c);
        }
        isThere = false;
      }
    } );
    this.assignForm();
  }

  ngOnDestroy(): void {
    this.studenteService.studenteCorrente = {} as Studente;
  }

  onSubmit(): void {
    this.checkoutForm.value.studentDto = this.student;
    for (let i = 0; i < this.course.length; i++) {
      if(this.course[i].id === this.checkoutForm.value.courseRegistrationDto) {
        this.checkoutForm.value.courseRegistrationDto = [{
          courseDto: this.course[i], 
          createdAt: this.createdAt
        }];
      }
    }
    this.addRegistration().subscribe(Response => console.log(Response));
    this.checkoutForm.reset();
    this.router.navigate([`/studente`]);
  }

  addRegistration() : Observable<any>{
    return this.httpClient.post('http://localhost:8092/esercitazionePlansoft/courseRegistration/addRegistrationCourse', this.checkoutForm.value, httpOptions);
  }

  assignForm() {
    this.checkoutForm = this.formBuilder.group({
      studentDto : {},
      courseRegistrationDto: [{
        courseDto: {}, 
        createdAt: ''
      }]
    });
  }

}
