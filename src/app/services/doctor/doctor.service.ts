import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Doctor } from 'src/app/models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private baseUr = "http://localhost:3000/doctors";
  constructor(private _httpClient: HttpClient) { }

  private _createDoctorFromObject(item: any) {
    return new Doctor(item.id, item.name, item.surname, item.speciality, item.img);
  }

  public getAllDoctors(): Observable<Doctor[]> {
    return this._httpClient.get<Doctor[]>(this.baseUr).pipe
      (map((data: any[]) => data.map((item: any) => this._createDoctorFromObject(item))));
  }

  public getDoctor(id: Number): Observable<Doctor> {
    return this._httpClient.get<Doctor>(this.baseUr + "/" + id).pipe
      (map((data: Doctor) => this._createDoctorFromObject(data)));
  }
  public deleteDoc(id: Number) {
    this._httpClient.delete(this.baseUr + "/" + id).subscribe(
      (data: any) => {
        this._createDoctorFromObject(data)
      }
    );
  }
  public createDoc(doctor: Doctor) {

    this._httpClient.post(this.baseUr, doctor).subscribe(
      (data: any) => {
        this._createDoctorFromObject(data)
      }
    );
  }
}
