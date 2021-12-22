import { Injectable } from '@angular/core';
import { Corso } from '../core/iCorso.interface';
import { Professore } from '../core/iProfessore.interface';
import { Studente } from '../core/iStudente.interface';

@Injectable({
  providedIn: 'root'
})
export class StudenteServiceService {

  constructor() { }

  public studenteCorrente: Studente = {} as Studente;
  public professoreCorrente: Professore = {} as Professore;
  public corsoCorrente: Corso = {} as Corso;

  public getIdStudente() {
    return this.studenteCorrente.id;
  }

  public getIdProfessore() {
    return this.professoreCorrente.id;
  }

  public getIdCorso() {
    return this.corsoCorrente.id;
  }
  
}
