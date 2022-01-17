import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Corso, ICorso } from '../core/iCorso.interface';
import { IProfessore, Professore } from '../core/iProfessore.interface';
import { IStudente, Studente } from '../core/iStudente.interface';
import { MatTableDataSource } from '@angular/material/table';
import { IRegistration } from '../core/iRegistration.interface';

@Injectable({
  providedIn: 'root',
})
export class StudenteServiceService {
  constructor(private httpClient: HttpClient) {}

  public studenteCorrente: Studente = {} as Studente;
  public professoreCorrente: Professore = {} as Professore;
  public corsoCorrente: Corso = {} as Corso;
  public dataSourceStudente: MatTableDataSource<IStudente> =
    new MatTableDataSource();
  public dataSourceProfessore: MatTableDataSource<IProfessore> =
    new MatTableDataSource();
  public dataSourceCorso: MatTableDataSource<ICorso> = new MatTableDataSource();
  public dataSourceRegistration: MatTableDataSource<IRegistration> =
    new MatTableDataSource();

  public getIdStudente() {
    return this.studenteCorrente.id;
  }

  public getCreateDateStudent() {
    return this.studenteCorrente.createdAt;
  }

  public getIdProfessore() {
    return this.professoreCorrente.id;
  }

  public getCreateDateProfessor() {
    return this.professoreCorrente.createdAt;
  }

  public getIdCorso() {
    return this.corsoCorrente.id;
  }

  public getStudente(): Observable<any> {
    return this.httpClient.get(
      'http://localhost:8092/esercitazionePlansoft/student/findAll'
    );
  }

  public getStudentById(id: any): Observable<any> {
    return this.httpClient.get(
      `http://localhost:8092/esercitazionePlansoft/student/findById/${id}`
    );
  }

  public getProfessore(): Observable<any> {
    return this.httpClient.get(
      'http://localhost:8092/esercitazionePlansoft/professor/findAll'
    );
  }

  public getCorso(): Observable<any> {
    return this.httpClient.get(
      'http://localhost:8092/esercitazionePlansoft/course/findAll'
    );
  }

  public getCorsoById(id: any): Observable<any> {
    return this.httpClient.get(
      `http://localhost:8092/esercitazionePlansoft/course/findById/${id}`
    );
  }

  public getRegistration(id: any): Observable<any> {
    return this.httpClient.get(
      `http://localhost:8092/esercitazionePlansoft/courseRegistration/getRegistrationByStudentId/${id}`
    );
  }
}
