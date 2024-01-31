import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Medicine } from 'src/app/models/medicine';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login/login.service';
import { MedicineService } from 'src/app/services/medicine/medicine.service';
import { addReservation } from 'src/app/state/medicine.actions';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss']
})
export class MedicineComponent {
  user: User | null = null;

  public medicine: Medicine[];
  formValue !: FormGroup;
  showAdd!: boolean;
  showUpdate!: boolean;
  @Input() searchText: any;

  constructor(private medc: MedicineService, private formBuilder: FormBuilder, private logS: LoginService,private store:Store) {
    this.user=this.logS.currentUser;
  }
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      id:[''],
      name: [''],
      company: [''],
      dose: [''],
      description: [''],
      img: [''],
    })
    this.searchText = "";
    this.getAllMedicine();

  }
  clickAddMedicine() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postMedicineDetails() {
    let id = this.formValue.get('id')?.value
    let name = this.formValue.get('name')?.value;
    let company = this.formValue.get('company')?.value;
    let dose = this.formValue.get('dose')?.value;
    let description = this.formValue.get('description')?.value;
    let img = this.formValue.get('img')?.value;
    let m = new Medicine(id, name, company, dose, description, img);
    this.medc.createMedicine(m);
    alert("Lek dodat");
    let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllMedicine();
  }
  deleteMedicine(row: any) {
    this.medc.deleteMedicine(row.id);
    alert("Uspesno obrisano!");
    this.getAllMedicine();


  }

  onEdit(row: any) {
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['company'].setValue(row.company);
    this.formValue.controls['dose'].setValue(row.dose);
    this.formValue.controls['description'].setValue(row.description);
    this.formValue.controls['img'].setValue(row.img);
    this.showAdd = false;
    this.showUpdate = true;
  }


  getAllMedicine() {
    this.medc.getAllMedicine().subscribe(res => {
      this.medicine = res;
    })
  }

  reserveMedicine(medicine:Medicine){
    alert("Rezervisano");
    this.store.dispatch(addReservation(medicine));
  }

}
