export interface IStudente {
    nome: string;
    cognome: string
}

export class Studente implements IStudente {
    nome: string;
    cognome: string;

    constructor(nome: string, cognome: string) {
        this.nome = nome;
        this.cognome = cognome;
    }
}