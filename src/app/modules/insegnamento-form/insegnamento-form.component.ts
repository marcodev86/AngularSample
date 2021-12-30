import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudenteServiceService} from 'src/app/services/studente-service.service';
import { Router } from '@angular/router';
import { Professore } from 'src/app/core/iProfessore.interface';
import { Corso } from 'src/app/core/iCorso.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-insegnamento-form',
  templateUrl: './insegnamento-form.component.html',
  styleUrls: ['./insegnamento-form.component.sass']
})

export class InsegnamentoFormComponent implements OnInit, OnDestroy {

  public checkoutForm: FormGroup = {} as FormGroup;
  public professor : Professore = {} as Professore;
  public course : Corso[] = [];

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private studenteService : StudenteServiceService
  ) { }

  ngOnInit(): void {
    this.professor = this.studenteService.professoreCorrente;
    this.studenteService.getCorso().subscribe( Response => {
      for ( let c of Response ) {
        if ( c.professor == null ) {
          this.course.push(c);
        }
      }
    } );
    this.assignForm();
  }

  ngOnDestroy(): void {
    this.studenteService.professoreCorrente = {} as Professore;
  }

  onSubmit(): void {
    this.checkoutForm.value.professorDto = this.professor;
    for (let i = 0; i < this.course.length; i++) {
      if(this.course[i].id === this.checkoutForm.value.courses) {
        this.checkoutForm.value.courses = [this.course[i]];
      }
    }
    this.addRegistration().subscribe();
    this.checkoutForm.reset();
    this.router.navigate([`/professore`]);
  }

  addRegistration() : Observable<any>{
    return this.httpClient.post('http://localhost:8092/esercitazionePlansoft/courseProfessorRegistration/addCourseToProfessor', this.checkoutForm.value, httpOptions);
  }

  assignForm() {
    this.checkoutForm = this.formBuilder.group({
      professorDto : {},
      courses: []
    });
  }

}
