import {CryptoCurrencyListing, TransactionType} from "./types";

type PropsType = {
    coin: CryptoCurrencyListing[]
    action: {id: number, cost: number, coins: number,}
}

export const countProfit = ({coin, action}: PropsType) => {
    return coin.map((elem) =>
        calculationOfProfit(elem, action)
    );
}

const calculationOfProfit = (
    coin: CryptoCurrencyListing,
    action: {id: number, cost: number, coins: number,}
) => {
    const {quote} = coin;
    const {price} = quote.USD
    // return {
    //     id,
    //     holdings,
    //     cost,
    //     value,
    //     profit,
    //     percentage,
    //     changes24h,
    //     actualPrice,
    //     changes,
    // };
};

