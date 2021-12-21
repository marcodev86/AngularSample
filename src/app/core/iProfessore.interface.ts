export interface IProfessore {
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

export class Professore implements IProfessore {
    nome: string;
    cognome: string;
    dataDiNascita: string;
    comune: string;
    codiceFiscale: string;
    telefono: string;
    cap: string;
    via: string;
    numeroCivico: string;

    constructor(nome: string, cognome: string, dataDiNascita: string, comune: string, codiceFiscale: string, telefono: string, cap: string, via: string, numeroCivico: string) {
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