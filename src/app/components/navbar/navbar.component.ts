import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user: User | null = null;

  constructor(private logS: LoginService){
    this.user = this.logS.currentUser;
  }
  logaut(){
    this.logS.logout();
  }
  }
  