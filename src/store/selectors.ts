import {RootState} from "./store";
import {createDraftSafeSelector} from "@reduxjs/toolkit";
import {CryptoCurrencyListing} from "../services/types";

export const selectPortfolio = (state: RootState) => state.portfolio
export const selectCurrency = (state: RootState, coin: string): CryptoCurrencyListing[] => {
    return state.portfolio.portfolio.filter(current => current.name === coin);
}
export const selectApp = (state: RootState) => state.app