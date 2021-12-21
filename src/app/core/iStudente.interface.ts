export interface IStudente {
    id: number;
    nome: string;
    cognome: string;
    dataDiNascita: string;
    comune: string;
    codiceFiscale: string;
    telefono: string;
    cap: string;
    via: string;
    numeroCivico: string;
}

export class Studente implements IStudente {
    id: number;
    nome: string;
    cognome: string;
    dataDiNascita: string;
    comune: string;
    codiceFiscale: string;
    telefono: string;
    cap: string;
    via: string;
    numeroCivico: string;

    constructor(id: number, nome: string, cognome: string, dataDiNascita: string, comune: string, codiceFiscale: string, telefono: string, cap: string, via: string, numeroCivico: string) {
        this.id = id;
        this.nome = nome;
        this.cognome = cognome;
        this.dataDiNascita = dataDiNascita;
        this.comune = comune;
        this.codiceFiscale = codiceFiscale;
        this.telefono = telefono;
        this.cap = cap;
        this.via = via;
        this.numeroCivico = numeroCivico;
    }
}