import {RootState} from "./store";
import {CryptoCurrencyListing} from "../services/types";
import {createDraftSafeSelector} from "@reduxjs/toolkit";
import {reduceValue} from "../services/helpers";

export const selectPortfolio = (state: RootState) => state.portfolio
export const selectTotalProfit = createDraftSafeSelector(
    selectPortfolio, (state) =>  {
        let result = [] as Array<number>
        return reduceValue(state.portfolio.map(coin => coin.profit.totalValue))
    }
)

//TODO need refactoring #3 - selectCurrency
export const selectCurrency = (state: RootState, coin: string): CryptoCurrencyListing[] => {
    return state.portfolio.portfolio.filter(current => current.name === coin);
}
export const selectApp = (state: RootState) => state.app