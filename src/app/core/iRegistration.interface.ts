export interface IRegistration {
    studentDto: string;
    courseRegistrationDto: string;
}

export class Registration implements IRegistration {
    studentDto: string;
    courseRegistrationDto: string;

    constructor(studentDto: string, courseRegistrationDto: string) {
        this.studentDto = studentDto;
        this.courseRegistrationDto = courseRegistrationDto;
    }
}