import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicine } from 'src/app/models/medicine';
import { MedicineService } from 'src/app/services/medicine/medicine.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  
  public registerForm!: FormGroup;
  @Input() medicine: Medicine;
  
  constructor(private route: ActivatedRoute, private medc: MedicineService, private routes: Router) {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.medc.getMedicine(id).subscribe((item) => {
        if (item) {
          this.medicine = new Medicine(item.id, item.name, item.company, item.dose, item.description, item.img);
          this.initForms();
        }
      });
    });
  }
  ngOnInit(): void {

  }

  public initForms() {

    this.registerForm = new FormGroup({
      name: new FormControl(this.medicine.name, [
        Validators.required
      ]),
      company: new FormControl(this.medicine.company, [
        Validators.required
      ]),
      dose: new FormControl(this.medicine.dose, [
        Validators.required
      ]),
      description: new FormControl(this.medicine.description, [
        Validators.required
      ]),
      img: new FormControl(this.medicine.img, [
        Validators.required
      ]),


    })

  }

  public submitForm() {
    if (!this.registerForm.valid) {
      alert("Polja moraju imati minimum 3 slova");
    }
    else {
      let newMed = new Medicine(
        this.medicine.id,
        this.registerForm.get("name")?.value,
        this.registerForm.get("company")?.value,
        this.registerForm.get("dose")?.value,
        this.registerForm.get("description")?.value,
        this.registerForm.get("img")?.value,
      );
      this.medc.updateMedicine(newMed).subscribe(
        (response) => {
          alert("Uspesno azurirano!")
          this.routes.navigate(["/med"]);
        },
        (error) => {
          alert("Greska!")
        }
      );
    }
  }
}


