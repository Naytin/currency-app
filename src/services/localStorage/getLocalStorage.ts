import {CryptoCurrencyListing} from "../types";

export const getLocalStorage = (name: string): CryptoCurrencyListing[] => {
    if (typeof window !== 'undefined') {
        const storage = window.localStorage.getItem(name);

        return  storage === null ? [] as CryptoCurrencyListing[] : JSON.parse(storage);
    }

    return [] as CryptoCurrencyListing[]
};
