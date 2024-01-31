import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Medicine } from 'src/app/models/medicine';
import { deleteReservation } from 'src/app/state/medicine.actions';
import { selectSveRezervacije } from 'src/app/state/medicine.selectors';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {
  rezervacijeUnosi$: Observable<any>;

  constructor(private store: Store) {
    this.rezervacijeUnosi$ = store.select(selectSveRezervacije);
  }
  izbrisiRezervaciju(medicine: Medicine) {
    this.store.dispatch(deleteReservation(medicine));
  }
}
