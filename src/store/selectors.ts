import {RootState} from "./store";
import {CryptoCurrencyListing} from "../services/types";
import {createDraftSafeSelector} from "@reduxjs/toolkit";
import {reduceValue, returnToFixed} from "../services/helpers";

export const selectPortfolio = (state: RootState) => state.portfolio
export const selectTotalProfit = createDraftSafeSelector(
    selectPortfolio, (state) =>  {
        if (state.portfolio.length) {
            return returnToFixed(reduceValue(state.portfolio.map(coin => coin.profit.totalValue)),4)
        } else {
            return 0
        }
    }
)
export const selectAllIds  = createDraftSafeSelector(
    selectPortfolio, (state) =>  {
        if (state.portfolio.length) {
            return state.portfolio.map(coin => coin.id).join(',')
        } else {
            return null
        }
    }
)
//TODO need refactoring #3 - selectCurrency
export const selectCurrency = (state: RootState, coin: string): CryptoCurrencyListing[] => {
    return state.portfolio.portfolio.filter(current => current.name === coin);
}
export const selectApp = (state: RootState) => state.app