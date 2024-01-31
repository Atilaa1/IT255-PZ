import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Doctor } from 'src/app/models/doctor';
import { User } from 'src/app/models/user';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent {
  user: User | null = null;
  public doce: Doctor[];
  formValue !: FormGroup;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private doc: DoctorService, private fb: FormBuilder, private logS: LoginService) {
    this.user = this.logS.currentUser;
  }
  ngOnInit(): void {
    this.formValue = this.fb.group({
      id:[''],
      name: [''],
      surname: [''],
      speciality: [''],
      img: [''],
    })

    this.getAllDoctors();

  }
  clickAddDoctors() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postDoctorDetails() {
    let id = this.formValue.get('id')?.value;
    let name = this.formValue.get('name')?.value;
    let surname = this.formValue.get('surname')?.value;
    let speciality = this.formValue.get('speciality')?.value;
    let img = this.formValue.get('img')?.value;
    let d = new Doctor(id, name, surname, speciality, img);
    this.doc.createDoc(d);
    alert("Doktor dodat");
    let ref = document.getElementById('cancel');
    ref?.click();
    this.formValue.reset();
    this.getAllDoctors();
  }
  deleteDocs(row: any) {
    this.doc.deleteDoc(row.id);
    alert("Uspesno obrisano!");
    this.getAllDoctors();


  }
  getAllDoctors() {
    this.doc.getAllDoctors().subscribe(res => {
      this.doce = res;
    })
  }

}
