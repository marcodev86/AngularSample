import { Injectable } from '@angular/core';
import { Studente } from 'src/app/core/iStudente.interface';

@Injectable({
  providedIn: 'root'
})
export class StudenteServiceService {

  constructor() { }
  
  public studenteCorrente :Studente = {} as Studente;

}
