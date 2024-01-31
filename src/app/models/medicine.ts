export class Medicine {
    id: number;
    name: string;
    company: string;
    dose: string;
    description: string;
    img: string;

    constructor(id: number, name: string, company: string, dose: string, description: string, img: string) {
        this.id = id;
        this.name = name;
        this.company = company;
        this.dose = dose;
        this.description = description;
        this.img = img;
    }
}
