import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { debounceTime, Observable, Subscription } from 'rxjs';
import { formatDate } from '@angular/common';
import { LOCALE_ID, Inject } from '@angular/core';
import { Professore } from 'src/app/core/iProfessore.interface';
import { StudenteServiceService } from 'src/app/services/studente-service.service';
import { DateValidator } from 'src/app/shared/date.validator';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }),
};

@Component({
  selector: 'app-professore-form',
  templateUrl: './professore-form.component.html',
  styleUrls: ['./professore-form.component.sass'],
})
export class ProfessoreFormComponent implements OnInit, OnDestroy {
  public checkoutForm: FormGroup = {} as FormGroup;
  public isNew: boolean = false;
  private professorId: number | undefined;
  public professorOutput: Professore = {} as Professore;
  public professorToModify: Professore = {} as Professore;

  private addProfessorSubscription$: Subscription | undefined;
  private modifyProfessorSubscription$: Subscription | undefined;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) public locale: string,
    private studenteService: StudenteServiceService,
    public dialog: MatDialogRef<ProfessoreFormComponent>
  ) {}

  ngOnInit(): void {
    const id = this.studenteService?.getIdProfessore();
    if (!id) {
      this.isNew = true;
    }
    this.assignForm(this.studenteService.professoreCorrente);
    this.checkoutForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.professorToModify = value;
      });
  }

  ngOnDestroy(): void {
    this.studenteService.professoreCorrente = {} as Professore;
    this.addProfessorSubscription$?.unsubscribe();
    this.modifyProfessorSubscription$?.unsubscribe();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.checkoutForm.controls[controlName].hasError(errorName);
  };

  onSubmit(): void {
    if (this.isNew) {
      this.addProfessorSubscription$ = this.addProfessore().subscribe(
        (Response) => (this.professorOutput = Response)
      );
      setTimeout(() => {
        this.dialog.close(this.professorOutput);
      }, 200);
    } else {
      this.modifyProfessorSubscription$ = this.modifica(
        this.checkoutForm.value
      ).subscribe((Response) => (this.professorOutput = Response));
      setTimeout(() => {
        this.dialog.close(this.professorOutput);
      }, 200);
    }
  }

  addProfessore(): Observable<any> {
    return this.httpClient.post<Professore>(
      'http://localhost:8092/esercitazionePlansoft/professor/save',
      this.checkoutForm.value,
      httpOptions
    );
  }

  assignForm(professor: any) {
    const createdAt = formatDate(new Date(), 'yyyy-MM-dd', this.locale);
    this.checkoutForm = this.formBuilder.group({
      name: new FormControl(professor?.name, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      surname: new FormControl(professor?.surname, [
        Validators.required,
        Validators.maxLength(60),
      ]),
      birthdayDate: new FormControl(professor?.birthdayDate, [
        Validators.required,
        DateValidator.dateVaidator,
      ]),
      number: new FormControl(professor?.number, [
        Validators.required,
        Validators.maxLength(30),
      ]),
      fiscalCode: new FormControl(professor?.fiscalCode, [
        Validators.required,
        Validators.maxLength(30),
      ]),
      cap: new FormControl(professor?.cap, [
        Validators.required,
        Validators.maxLength(6),
      ]),
      city: new FormControl(professor?.city, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      address: new FormControl(professor?.address, [
        Validators.required,
        Validators.maxLength(80),
      ]),
      houseNumber: new FormControl(professor?.houseNumber, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      createdAt: professor.createdAt ? professor.createdAt : createdAt,
    });
  }

  modifica(element: any): Observable<Professore> {
    const updateAt = formatDate(new Date(), 'yyyy-MM-dd', this.locale);
    this.professorId = this.studenteService?.getIdProfessore();
    this.professorToModify.id = this.professorId;
    this.professorToModify.createdAt =
      this.studenteService?.getCreateDateProfessor();
    this.professorToModify.updateAt = updateAt;

    return this.httpClient.put<Professore>(
      `http://localhost:8092/esercitazionePlansoft/professor/updateProfessorById/${this.professorId}`,
      this.professorToModify,
      httpOptions
    );
  }
}
