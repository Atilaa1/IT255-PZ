import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user!: User;
  isLoggedIn = false;

  constructor(private router: Router) { }


  login(user: User) {
    this.user = user;
    this.isLoggedIn = true;

    this.router.navigate(['/nav']);

  }


  logout() {
    this.isLoggedIn = false;
    this.user = ({
      id: 0, username: "",
      password: "",
      mail: "",
      admin: false
    });
    this.router.navigate(['/']);
  }
  get currentUser(): User {
    return this.user;
  }
}
