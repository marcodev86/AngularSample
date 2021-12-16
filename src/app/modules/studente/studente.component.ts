import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Studente } from 'src/app/core/iStudente.interface';


const studente: Studente[] = [{ nome: 'Marco', cognome: 'Micalizzi' },
{ nome: 'Luca', cognome: 'Sbragi' },
{ nome: 'Ilenia', cognome: 'Concu' }];

@Component({
  selector: 'app-studente',
  templateUrl: './studente.component.html',
  styleUrls: ['./studente.component.sass']
})


export class StudenteComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'cognome'];
  dataSource = studente;
  //public studente: Studente[] = [{ nome: 'Marco', cognome: 'Micalizzi' }];
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  public clickedButton(event: Event): void {
    console.log(event)
    const currentUrl = this.router.url;
    this.router.navigate([`${currentUrl}/detail`]);
  }

}
