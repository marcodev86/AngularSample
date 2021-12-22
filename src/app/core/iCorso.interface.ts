export interface ICorso {
    id: number;
    name: string;
    description: string;
    professor: string;
    startDate: string;
    endDate: string;
}

export class Corso implements ICorso {
    id: number;
    name: string;
    description: string;
    professor: string;
    startDate: string;
    endDate: string;

    constructor(id: number, name: string, description: string, professor: string, startDate: string, endDate: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.professor = professor;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}