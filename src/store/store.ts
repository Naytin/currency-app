import {combineReducers} from 'redux';
import thunk from 'redux-thunk'
import {configureStore} from "@reduxjs/toolkit";
import {portfolioReducer} from "./reducers/portfolioReducer";


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния (редюсера)
export const rootReducer = combineReducers({
    portfolio: portfolioReducer
})
// непосредственно создаём store

// create our store use configureStore
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch




