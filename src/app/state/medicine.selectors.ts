import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Medicine } from "../models/medicine";

export const selectSveRezervacije = createSelector(
    createFeatureSelector('rezervacijeUnosi'), (state: Medicine[]) => {
        return state;
    }
);

export const selectBrojRezervacija = createSelector(
    createFeatureSelector('rezervacijeUnosi'), (state: Medicine[]) => {
        return state.length;
    }
);