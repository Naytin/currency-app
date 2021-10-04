import {CryptoCurrencyListing, QuoteType, TransactionType} from "./types";
import {checkCost, format, reduceValue, returnToFixed} from "./helpers";

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
    const totalValue = returnToFixed(reduceValue(transaction.map(tr => +tr.coins * price)),2);
    const cost = reduceValue(transaction.map(tr => +tr.coins * +tr.cost));
    const profit = format(totalValue - cost, '$');
    const percentage = format(checkCost(totalValue, cost), '');
    const changes24h = percent_change_24h;
    const changes = checkCost(totalValue, cost) >= 0;

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
