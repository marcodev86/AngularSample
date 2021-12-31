import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Corso, ICorso } from '../../core/ICorso.interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-corso',
  templateUrl: './corso.component.html',
  styleUrls: ['./corso.component.sass']
})
export class CorsoComponent implements OnInit {

  constructor(private httpClient : HttpClient) { }

  ngOnInit(): void {
    this.getCorso().subscribe((response: Corso[])=>{
      this.dataSourceCorso = new MatTableDataSource<ICorso>(response);
    });
  }

   // API path
   base_path = 'http://localhost:8092/gestioneAnagraficaCorso/corso/';

   //dataSource
   dataSourceCorso = new MatTableDataSource<ICorso>();

   //proprietà colonne tabella
   displayedColumns: string[] = [
    'id', 'nome', 'dataInizioCorso', 'dataFineCorso', 'descrizione', 'createdAt', 'updatedAt', 'modifica', 'cancella'];
  
   //restituisce dati asincroni 
   getCorso(): Observable<any> {
     return this.httpClient.get(this.base_path);
   }
   delete(id: number): Observable<unknown> {
    return this.httpClient.delete(`${this.base_path}delete/${id}`);
  }
  toDeleteCorso(id: number) {
    this.delete(id).subscribe(response => {
      const data = this.dataSourceCorso.data;
      const index = data.findIndex(x => x.id === id);
      data.splice(index, 1);
      this.dataSourceCorso._updateChangeSubscription();
    });
  }


  //Filter
  filter(changes: any): void {
      if(changes){
        console.log(JSON.stringify(changes?.target?.value));
        const valueFilter = changes?.target?.value;
        this.dataSourceCorso.filter = valueFilter;
      }
  }//end method apply filter with table


}//end class CorsoComponent implements OnInit
