import { Pipe, PipeTransform } from '@angular/core';
import { Studente } from './core/iStudente.interface';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(Studenti: Studente[], searchValue: string  ): Studente[] {
    if(!Studenti || !searchValue){
      return Studenti;
    }
    return Studenti.filter(studente => studente.nome.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) ;
  }

}
