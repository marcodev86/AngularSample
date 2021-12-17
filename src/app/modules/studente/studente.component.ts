import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Studente } from 'src/app/core/iStudente.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


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
  dataSource: any;
  //public studente: Studente[] = [{ nome: 'Marco', cognome: 'Micalizzi' }];
  constructor(private router: Router, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.getStudente().subscribe((response: Studente[]) => {
      this.dataSource = studente;
    });
  }

  public clickedButton(event: Event): void {
    console.log(event)
    const currentUrl = this.router.url;
    this.router.navigate([`${currentUrl}/detail`]);
  }

  getStudente(): Observable<any> {
    return this.httpClient.get('https://run.mocky.io/v3/070ecbdf-82af-4ffa-a519-3bf1d7b9dfcd');
  }

}
