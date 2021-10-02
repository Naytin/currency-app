import {CryptoCurrencyListing} from "../types";

export const saveState = (state: CryptoCurrencyListing[]) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('portfolio', serializedState);
    } catch (e) {
        console.log('save localStorage error', e)
    }
};