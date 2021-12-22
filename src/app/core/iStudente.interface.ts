import * as dayjs from 'dayjs';

export interface IStudente {
    id?: number;
    nome: string;
    cognome: string;
    data: string;
    comuneDiNascita: string;
    codiceFiscale: string;
    indirizzo: string;
    comune: string;
    cap: string;
    prov: string;
    telefono: string;

}


export class Studente implements IStudente {
    id?:number;
    nome: string;
    cognome: string;
    data: string;
    comuneDiNascita: string;
    codiceFiscale: string;
    indirizzo: string;
    comune: string;
    cap: string;
    prov: string;
    telefono: string;
   
   

    constructor(id: number, nome: string, cognome: string, data: string, comuneDiNascita: string, codiceFiscale: string,
        indirizzo: string, comune: string, cap: string, prov: string, telefono: string) {
        this.id= id;
        this.nome = nome;
        this.cognome = cognome;
        this.data = data;
        this.comuneDiNascita = comuneDiNascita;
        this.codiceFiscale = codiceFiscale;
        this.indirizzo = indirizzo;
        this.comune = comune;
        this.cap = cap;
        this.prov = prov;
        this.telefono = telefono;
       
    }

   
}
 /*   nome, 
    cognome,
    data,
    comuneDiNascita,
    codiceFiscale,
    indirizzo,
    comune,
    cap,
    prov, 
    telefono, 
    createdAt, 
    updatedAt  */
