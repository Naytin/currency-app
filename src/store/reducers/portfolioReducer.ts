import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CryptoCurrencyListing} from "../../services/types";
import {coinsApi} from "../../services/api/API";
import {setAppError, setAppStatus} from "../commonActions/appActions";
import { v4 as uuid } from 'uuid';

const getCoins = createAsyncThunk('portfolio/getCoins',
    async (arg, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({status: 'loading'}))
        try {
            const res = await coinsApi.getCoins()
            dispatch(setAppStatus({status: 'succeeded'}))
            return res.data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                const {message} = error as Error
                dispatch(setAppStatus({status: 'failed'}))
                dispatch(setAppError({error: message}))
            }
            return rejectWithValue(null)
        }
    })

const initialState = {
    portfolio: [] as CryptoCurrencyListing[],
    coins: [] as CryptoCurrencyListing[]
}

const slice = createSlice({
    name: "portfolio",
    initialState,
    reducers: {
        setCoinToState: (state, action: PayloadAction<CryptoCurrencyListing>) => {
            state.portfolio.push({...action.payload, transactions: []})
        },
        setFromLocalStorage: (state, action: PayloadAction<CryptoCurrencyListing[]>) => {
            state.portfolio = action.payload
        },
        deleteCoin: (state, action: PayloadAction<{ id: number }>) => {
            state.portfolio = state.portfolio.filter(coin => coin.id !== action.payload.id)
        },
        addTransaction: (state, action: PayloadAction<{ id: number, cost: number, coins: number }>) => {
            state.portfolio = state.portfolio.map(coin => coin.id === action.payload.id ?
                {...coin, transactions: [...coin.transactions, {...action.payload, uuid: uuid()}]} : coin)
        },
        deleteTransaction: (state, action: PayloadAction<{ uuid: string, id: number }>) => {
            const result = state.portfolio.map((elem) => ({
                ...elem, transactions: elem.transactions.filter(
                    (trans) => trans.uuid !== action.payload.uuid),
            }));
            state.portfolio = result
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCoins.fulfilled, (state, action) => {
            state.coins = action.payload.map(coin => coin)
        })
    }
})

export const portfolio = slice.reducer;
export const {setCoinToState, setFromLocalStorage, deleteCoin,addTransaction,deleteTransaction} = slice.actions

export const portfolioActions = {
    getCoins,
    setCoinToState,
    setFromLocalStorage,
    deleteCoin,
    addTransaction,
    deleteTransaction
}
