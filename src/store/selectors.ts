import {RootState} from "./store";
import {CryptoCurrencyListing} from "../services/types";

export const selectPortfolio = (state: RootState) => state.portfolio

//TODO need refactoring #3 - selectCurrency
export const selectCurrency = (state: RootState, coin: string): CryptoCurrencyListing[] => {
    return state.portfolio.portfolio.filter(current => current.name === coin);
}
export const selectApp = (state: RootState) => state.app