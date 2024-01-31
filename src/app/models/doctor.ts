export class Doctor {
    id: number;
    name: string;
    surname: string;
    speciality: string;
    img: string;

    constructor(id: number, name: string, surname: string, speciality: string, img: string) 
    {
        this.id=id;
        this.name=name;
        this.surname=surname;
        this.speciality=speciality;
        this.img=img;    
    }
}
