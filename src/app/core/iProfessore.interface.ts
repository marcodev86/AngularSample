export interface IProfessore {
    id: number;
    name: string;
    surname: string;
    birthdayDate: string;
    city: string;
    fiscalCode: string;
    number: string;
    cap: string;
    address: string;
    houseNumber: string;
}

export class Professore implements IProfessore {
    id: number;
    name: string;
    surname: string;
    birthdayDate: string;
    city: string;
    fiscalCode: string;
    number: string;
    cap: string;
    address: string;
    houseNumber: string;

    constructor(id: number, name: string, surname: string, birthdayDate: string, city: string, fiscalCode: string, telefono: string, cap: string, address: string, houseNumber: string) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.birthdayDate = birthdayDate;
        this.city = city;
        this.fiscalCode = fiscalCode;
        this.number = telefono;
        this.cap = cap;
        this.address = address;
        this.houseNumber = houseNumber;
    }
}