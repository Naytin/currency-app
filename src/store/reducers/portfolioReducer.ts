import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CryptoCurrencyListing} from "../../services/types";
import {coinsApi} from "../../services/api/API";
import {setAppError, setAppStatus} from "../commonActions/appActions";

const getCoins = createAsyncThunk('portfolio/getCoins',
    async (arg, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({status: 'loading'}))
        try {
            const res = await coinsApi.getCoins()
            dispatch(setAppStatus({status: 'succeeded'}))
            return res.data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                const { message } = error as Error
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
            state.portfolio.push(action.payload)
        },
        setFromLocalStorage: (state, action: PayloadAction<CryptoCurrencyListing[]>) => {
            state.portfolio = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCoins.fulfilled, (state, action) => {
            state.coins = action.payload.map(coin => coin)
        })
    }
})

export const portfolio = slice.reducer;
export const { setCoinToState, setFromLocalStorage } = slice.actions

export const portfolioActions = {
    getCoins,
    setCoinToState,
    setFromLocalStorage,
}
