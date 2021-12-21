export interface ICorso {
    nome: string;
    descrizione: string;
    docente: string;
    dataDiInizio: string;
    dataDiFine: string;
}

export class Corso implements ICorso {
    nome: string;
    descrizione: string;
    docente: string;
    dataDiInizio: string;
    dataDiFine: string;

    constructor(nome: string, descrizione: string, docente: string, dataDiInizio: string, dataDiFine: string) {
        this.nome = nome;
        this.descrizione = descrizione;
        this.docente = docente;
        this.dataDiInizio = dataDiInizio;
        this.dataDiFine = dataDiFine;
    }
}