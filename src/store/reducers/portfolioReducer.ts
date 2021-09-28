import {createSlice} from "@reduxjs/toolkit";
import {CryptoCurrencyListing} from "../../services/types";

const initialState = {
    portfolio: [] as CryptoCurrencyListing[]
}

const slice = createSlice({
    name: "portfolio",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})

export const portfolioReducer = slice.reducer;