import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { formatDate } from '@angular/common';
import { LOCALE_ID, Inject } from '@angular/core';
import { StudenteServiceService } from 'src/app/services/studente-service.service';
import { Studente } from 'src/app/core/iStudente.interface';
import { Corso } from 'src/app/core/iCorso.interface';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }),
};

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.sass'],
})
export class RegistrationFormComponent implements OnInit, OnDestroy {
  public checkoutForm: FormGroup = {} as FormGroup;
  public student: Studente = {} as Studente;
  public course: Corso[] = [];
  public studentCourses: Corso[] = [];
  public courseOutput: Corso = {} as Corso;

  private addRegistrationsSubscription$: Subscription | undefined;
  private getRegistrationsSubscription$: Subscription | undefined;
  private getCourseSubscription$: Subscription | undefined;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) public locale: string,
    private studenteService: StudenteServiceService,
    public dialog: MatDialogRef<RegistrationFormComponent>
  ) {}

  ngOnInit(): void {
    const id = this.studenteService?.getIdStudente();
    let isThere: boolean = false;

    this.student = this.studenteService.studenteCorrente;
    this.getRegistrationsSubscription$ = this.studenteService
      .getRegistration(id)
      .subscribe((Response) => {
        for (let c of Response.courseRegistrationDto) {
          this.studentCourses.push(c.courseDto);
        }
      });

    this.getCourseSubscription$ = this.studenteService
      .getCorso()
      .subscribe((Response) => {
        for (let c of Response) {
          for (let cs of this.studentCourses) {
            if (c.id === cs.id) {
              isThere = true;
            }
          }
          if (!isThere) {
            this.course.push(c);
          }
          isThere = false;
        }
      });
    this.assignForm();
  }

  ngOnDestroy(): void {
    this.studenteService.studenteCorrente = {} as Studente;
    this.getCourseSubscription$?.unsubscribe();
    this.getRegistrationsSubscription$?.unsubscribe();
    this.addRegistrationsSubscription$?.unsubscribe();
  }

  onSubmit(): void {
    const createdAt = formatDate(new Date(), 'yyyy-MM-dd', this.locale);
    this.checkoutForm.value.studentDto = this.student;
    for (let i = 0; i < this.course.length; i++) {
      if (this.course[i].id === this.checkoutForm.value.courseRegistrationDto) {
        this.courseOutput = this.course[i];
        this.checkoutForm.value.courseRegistrationDto = [
          {
            courseDto: this.course[i],
            createdAt: createdAt,
          },
        ];
      }
    }
    this.addRegistrationsSubscription$ = this.addRegistration().subscribe(
      (Response) => {
        console.log(Response);
      }
    );
    setTimeout(() => {
      this.dialog.close(this.courseOutput);
    }, 200);
  }

  addRegistration(): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8092/esercitazionePlansoft/courseRegistration/addRegistrationCourse',
      this.checkoutForm.value,
      httpOptions
    );
  }

  assignForm() {
    this.checkoutForm = this.formBuilder.group({
      studentDto: {},
      courseRegistrationDto: [
        {
          courseDto: {},
          createdAt: '',
        },
      ],
    });
  }
}
