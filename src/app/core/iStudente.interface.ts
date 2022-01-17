export interface IStudente {
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
  createdAt: string;
  updateAt: string;
}

export class Studente implements IStudente {
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
  createdAt: string;
  updateAt: string;

  constructor(
    id: number,
    name: string,
    surname: string,
    birthdayDate: string,
    city: string,
    fiscalCode: string,
    telefono: string,
    cap: string,
    address: string,
    houseNumber: string,
    createdAt: string,
    updateAt: string
  ) {
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
    this.createdAt = createdAt;
    this.updateAt = updateAt;
  }
}
