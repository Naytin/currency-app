
export type ResponseCoinsType = {
    status: CmcStatus
    data: CryptoCurrencyListing[]
}

export type CmcStatus = {
    credit_count: number;
    elapsed: number;
    error_code: number;
    error_message: string | null;
    notice: string | null;
    timestamp: string;
    total_count: number;
};

export type TransactionType = {
    id: number;
    uuid: string;
    coins: number;
    cost: number;
}

export type ProfitType = {
    id: number;
    coins: number;
    cost: number;
    value: number;
    profit: string;
    percentage: number;
    actualPrice: string;
    changes24h: number;
    changes: boolean;
};

export type CryptoCurrencyListing = {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    cmc_rank: number;
    num_market_pairs: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    last_updated: string;
    date_added: string;
    tags: string[];
    platform: unknown;
    transactions: TransactionType[];
    quote: Record<
        string,
        {
            price: number;
            volume_24h: number;
            percent_change_1h: number;
            percent_change_24h: number;
            percent_change_7d: number;
            market_cap: number;
            last_updated: string;
        }
        >;
};
