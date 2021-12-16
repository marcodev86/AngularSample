import { Component, OnInit } from '@angular/core';
import { Studente } from 'src/app/core/iStudente.interface';

@Component({
  selector: 'app-studente',
  templateUrl: './studente.component.html',
  styleUrls: ['./studente.component.sass']
})
export class StudenteComponent implements OnInit {

  public studente: Studente = { nome: 'Marco', cognome: 'Micalizzi' };
  constructor() {
  }

  ngOnInit(): void {
  }

}
