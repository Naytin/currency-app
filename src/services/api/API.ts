import axios from 'axios'
import {ResponseCoinsType} from "../types";

const instance = axios.create({
    baseURL: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency',
    withCredentials: true,
    headers: {
        'X-CMC_PRO_API_KEY': "b4dd5499-4837-4d1b-85c5-11d968b0af88",
    }
})

export const coinsApi = {
    getCoins() {
        return instance.get<ResponseCoinsType>(`/listings/latest`)
            .then(res => res.data)
    },
    getCurrentPrice(id: string) {
        return instance.get<ResponseCoinsType>(`/quotes/latest?id=${id}`)
            .then(res => res.data)
    },
}