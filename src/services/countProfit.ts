import {CryptoCurrencyListing, QuoteType, TransactionType} from "./types";

export const countProfit = (coins: CryptoCurrencyListing[]) => {

    return coins.map((coin) =>
        ({...coin, profit: calculationOfProfit(coin.transactions, coin.quote, coin.id)})

    );
}

const calculationOfProfit = (
    transaction: TransactionType[],
    quote: QuoteType,
    id: number
) => {
    const {price, percent_change_24h} = quote.USD
    const numberOfCoins = reduceValue(transaction.map((tr) => +tr.coins));
    const coinValue = reduceValue(transaction.map(tr => +tr.cost));
    const cost = reduceValue(transaction.map(tr => +tr.coins * +tr.cost))
    const profit = reduceValue(transaction.map(tr => +tr.coins * price))
    const percentage = checkCost(cost, cost);
    const changes24h = percent_change_24h;
    const changes = changes24h >= 0;

    return {
        id,
        numberOfCoins,
        coinValue,
        cost,
        profit,
        percentage,
        changes24h,
        price,
        changes,
    };
};


const reduceValue = (arr: Array<number>) => {
    if (arr.length === 0) return 0

    return arr.reduce((acc, cur) => acc + cur, 0)
}

const checkCost = (value: number, cost: number) => {
    if (cost === 0) return cost;
    const division = value / cost;

    return (division - 1) * 100;
};
