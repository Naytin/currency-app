import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CryptoCurrencyListing} from "../../services/types";
import {coinsApi} from "../../services/api/API";
import {setAppError, setAppStatus} from "../actions/appActions";

const initialState = {
    portfolio: [] as CryptoCurrencyListing[],
    coins: [] as CryptoCurrencyListing[]
}

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

export const setCoinToState = createAction('portfolio/set_coin', function prepare(data: CryptoCurrencyListing) {
    return {payload: data}
})

export const portfolioActions = {
    getCoins,
    setCoinToState,
}

const slice = createSlice({
    name: "portfolio",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCoins.fulfilled, (state, action) => {
            state.coins = action.payload.map(coin => coin)
        })
        builder.addCase(setCoinToState,(state, action) => {
           state.portfolio.push(action.payload)
        })
    }
})

export const portfolioReducer = slice.reducer;

