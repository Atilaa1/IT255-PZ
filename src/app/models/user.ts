export class User {
    id: number;
    username: string;
    password: string;
    mail: string;
    admin: boolean;

    constructor(id: number,username: string,password: string,mail: string,admin: boolean,) 
    { 
        this.id=id;
        this.username=username;
        this.password=password;
        this.mail=mail=mail;
        this.admin=admin;
    }
}
