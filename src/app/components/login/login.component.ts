import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
 
  public userForm!: FormGroup;

  constructor(private logS: LoginService, private _userSer: UserService, private router: Router) {
    this.inicForm();
  }
  ngOnInit(): void {

  }

  public inicForm() {
    this.userForm = new FormGroup({
      username: new FormControl('', [
        Validators.required, Validators.minLength(4)
      ]),
      password: new FormControl('', [
        Validators.required, Validators.minLength(4)
      ])

    })
  }
  public submitForm() {
    if (!this.userForm.controls["username"].valid) {
      alert("Username mora da ima minimum 4 karaktera")
    }
    else if (!this.userForm.controls["password"].valid) {
      alert("Password mora da ima minimum 4 karaktera")
    }
    else {
      let username = this.userForm.get('username')!.value;
      let password = this.userForm.get('password')!.value;

      this._userSer.getUserss(username, password)
        .pipe(catchError(err => {
          alert("Netacni username i password")
          return throwError(err);
        })).subscribe((data) => {
          if (data) {
            this.logS.login(data);
          }
        })
    }

  }

}
