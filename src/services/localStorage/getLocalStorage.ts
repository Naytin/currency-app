import {CryptoCurrencyListing} from "../types";

export const getLocalStorage = (): CryptoCurrencyListing[] => {
    if (typeof window !== 'undefined') {
        const storage = window.localStorage.getItem('portfolio');

        return  storage === null ? [] as CryptoCurrencyListing[] : JSON.parse(storage);
    }

    return [] as CryptoCurrencyListing[]
};
