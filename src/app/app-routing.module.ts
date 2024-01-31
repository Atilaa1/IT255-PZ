import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MedicineComponent } from './components/medicine/medicine.component';
import { EditComponent } from './components/medicine/edit/edit.component';
import { ReservationComponent } from './components/reservation/reservation.component';

const routes: Routes = [
  { path: 'doktor', component: DoctorsComponent },
  { path: 'reg', component: RegistrationComponent },
  { path: '', component: LoginComponent },
  { path: 'nav', component: NavbarComponent },
  { path: 'med', component: MedicineComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'res', component: ReservationComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
