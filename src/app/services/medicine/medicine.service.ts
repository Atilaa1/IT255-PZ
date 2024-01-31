import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Medicine } from 'src/app/models/medicine';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  private baseUr = "http://localhost:3000/medicine";
  constructor(private _httpClient: HttpClient, private route: Router) { }



  private _createMedicineFromObject(item: any) {
    return new Medicine(item.id, item.name, item.company, item.dose, item.description, item.img);
  }

  public getAllMedicine(): Observable<Medicine[]> {
    return this._httpClient.get<Medicine[]>(this.baseUr).pipe
      (map((data: any[]) => data.map((item: any) => this._createMedicineFromObject(item))));
  }
  public getMedicine(id: Number): Observable<Medicine> {
    return this._httpClient.get<Medicine>(this.baseUr + "/" + id).pipe
      (map((data: Medicine) => this._createMedicineFromObject(data)));
  }
  public deleteMedicine(id: Number) {
    this._httpClient.delete(this.baseUr + "/" + id).subscribe(
      (data: any) => {
        this._createMedicineFromObject(data)
      }
    );
  }
  public createMedicine(medicine: Medicine) {
    
      this._httpClient.post(this.baseUr, medicine).subscribe(
        (data: any) => {
          this._createMedicineFromObject(data)
        }
      );
    ;
  }


  public updateMedicine(medicine: Medicine) {
    return this._httpClient.put(this.baseUr + "/" + medicine.id, medicine).pipe(
      map((data: any) => this._createMedicineFromObject(data))
    );
  }

}
