import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { debounceTime, Observable, Subscription } from 'rxjs';
import { Studente } from 'src/app/core/iStudente.interface';
import { StudenteServiceService } from 'src/app/services/studente-service.service';
import { LOCALE_ID, Inject } from '@angular/core';
import { DateValidator } from 'src/app/shared/date.validator';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import * as dayjs from 'dayjs';
import { TranslateService } from '@ngx-translate/core';

const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }),
};

@Component({
  selector: 'app-studente-form',
  templateUrl: './studente-form.component.html',
  styleUrls: ['./studente-form.component.sass'],
})
export class StudenteFormComponent implements OnInit, OnDestroy {
  public checkoutForm: FormGroup = {} as FormGroup;
  public isNew: boolean = false;
  private studentId: number | undefined;
  public studentOutput: Studente = {} as Studente;
  public studentToModify: Studente = {} as Studente;

  private addStudentSubscription$: Subscription | undefined;
  private modifyStudentSubscription$: Subscription | undefined;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) public locale: string,
    private studenteService: StudenteServiceService,
    public dialog: MatDialogRef<StudenteFormComponent>,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    const id = this.studenteService?.getIdStudente();
    if (!id) {
      this.isNew = true;
    }
    this.assignForm(this.studenteService.studenteCorrente);
    this.checkoutForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.studentToModify = value;
      });
  }

  ngOnDestroy(): void {
    this.studenteService.studenteCorrente = {} as Studente;
    this.addStudentSubscription$?.unsubscribe();
    this.modifyStudentSubscription$?.unsubscribe();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.checkoutForm.controls[controlName].hasError(errorName);
  };

  onSubmit(): void {
    if (this.isNew) {
      this.addStudentSubscription$ = this.addStudente().subscribe(
        (Response) => (this.studentOutput = Response)
      );
      setTimeout(() => {
        this.dialog.close(this.studentOutput);
      }, 200);
    } else {
      this.modifyStudentSubscription$ = this.modifica(
        this.checkoutForm.value
      ).subscribe((Response) => {
        this.studentOutput = Response;
      });
      setTimeout(() => {
        this.dialog.close(this.studentOutput);
      }, 200);
    }
  }

  addStudente(): Observable<any> {
    return this.httpClient.post<Studente>(
      'http://localhost:8092/esercitazionePlansoft/student/save',
      this.checkoutForm.value,
      httpOptions
    );
  }

  assignForm(student: any) {
    const createdAt = dayjs(Date.now()).format('YYYY-MM-DD');
    this.checkoutForm = this.formBuilder.group({
      name: new FormControl(student?.name, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      surname: new FormControl(student?.surname, [
        Validators.required,
        Validators.maxLength(60),
      ]),
      birthdayDate: new FormControl(student?.birthdayDate, [
        Validators.required,
        DateValidator.dateVaidator,
      ]),
      number: new FormControl(student?.number, [
        Validators.required,
        Validators.maxLength(30),
      ]),
      fiscalCode: new FormControl(student?.fiscalCode, [
        Validators.required,
        Validators.maxLength(30),
      ]),
      cap: new FormControl(student?.cap, [
        Validators.required,
        Validators.maxLength(6),
      ]),
      city: new FormControl(student?.city, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      address: new FormControl(student?.address, [
        Validators.required,
        Validators.maxLength(80),
      ]),
      houseNumber: new FormControl(student?.houseNumber, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      createdAt: student.createdAt ? student.createdAt : createdAt,
    });
  }

  modifica(element: any): Observable<Studente> {
    this.studentId = this.studenteService?.getIdStudente();
    this.studentToModify.id = this.studentId;
    this.studentToModify.createdAt =
      this.studenteService?.getCreateDateStudent();
    this.studentToModify.updateAt = dayjs(Date.now()).format('YYYY-MM-DD');
    return this.httpClient.put<Studente>(
      `http://localhost:8092/esercitazionePlansoft/student/updateStudentById/${this.studentId}`,
      this.studentToModify,
      httpOptions
    );
  }
}
