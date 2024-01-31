import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  public registerForm!: FormGroup;

  constructor(private logS: UserService) {
    this.initForms();
  }

  ngOnInit(): void {
  }

  public MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceValue = control.get(source);
      const targetValue = control.get(target);

      if (sourceValue !== targetValue) {

        return { mismatch: true };
      } else {
        return null;
      }
    };
  }

  public initForms() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [
        Validators.required, Validators.minLength(4)
      ]),
      password: new FormControl('', [
        Validators.required, Validators.minLength(4)
      ]),
      mail: new FormControl('', [
        Validators.required, Validators.email
      ])
    });
  }

  public submitForm() {
    if (!this.registerForm.valid) {
      if (!this.registerForm.controls["username"].valid) {
        alert("Username mora da ima 4 karaktera");
      }
      else if (!this.registerForm.controls["mail"].valid) {
        alert("Mail mora da ima @ i . nakon @");
      }
    } else if (!this.registerForm.controls["password"].valid) {
      alert("Password mora da ima 4 karaktera");
    }


    else {
      let username = this.registerForm.get("username")!.value;
      let password = this.registerForm.get("password")!.value;
      let mail = this.registerForm.get("mail")!.value;

      this.logS.addUser(username, password, mail);
    }
  }
}
