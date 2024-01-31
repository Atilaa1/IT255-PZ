import { createAction, props } from "@ngrx/store";
import { Medicine } from "../models/medicine";

export const addReservation = createAction('Dodaj rezervaciju', props<Medicine>());
export const deleteReservation = createAction('Izbrisi rezervaciju', props<Medicine>());