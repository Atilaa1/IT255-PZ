import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MedicineComponent } from './components/medicine/medicine.component';
import { FilterPipe } from './filter/filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MedicineService } from './services/medicine/medicine.service';
import { UserService } from './services/user/user.service';
import { LoginService } from './services/login/login.service';
import { DoctorService } from './services/doctor/doctor.service';
import { EditComponent } from './components/medicine/edit/edit.component';
import { medicineReducer, metaReducerLocalStorage } from './state/medicine.reducer';
import { StoreModule } from '@ngrx/store';
import { ReservationComponent } from './components/reservation/reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    DoctorsComponent,
    LoginComponent,
    RegistrationComponent,
    NavbarComponent,
    MedicineComponent,
    FilterPipe,
    EditComponent,
    ReservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({rezervacijeUnosi: medicineReducer}, {metaReducers: [metaReducerLocalStorage]})
  ],
  providers: [MedicineService,UserService,LoginService,DoctorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
