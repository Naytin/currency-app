import {CryptoCurrencyListing, QuoteType, TransactionType} from "./types";
import {checkCost, reduceValue, returnToFixed} from "./helpers";

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
    const totalValue = returnToFixed(reduceValue(transaction.map(tr => +tr.coins * price)),3);
    const cost = reduceValue(transaction.map(tr => +tr.coins * +tr.cost));
    const profit = returnToFixed(totalValue - cost, 3);
    const percentage = returnToFixed(checkCost(totalValue, cost),2);
    const changes24h = percent_change_24h;
    const changes = percentage >= 0;

    return {
        id,
        numberOfCoins,
        totalValue,
        cost,
        profit,
        percentage,
        changes24h,
        price,
        changes,
    };
};
