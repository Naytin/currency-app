import {createSlice} from "@reduxjs/toolkit";
import {RequestStatusType, setAppError, setAppStatus} from "../commonActions/appActions";

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(setAppStatus, (state, action) => {
            state.status = action.payload.status
        })
        builder.addCase(setAppError, (state, action) => {
            state.error = action.payload.error
        })
    }
})

export const appReducer = slice.reducer


