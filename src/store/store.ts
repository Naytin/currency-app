import {combineReducers} from 'redux';
import thunk from 'redux-thunk'
import {configureStore} from "@reduxjs/toolkit";
import {portfolio} from "./reducers/portfolioReducer";
import {appReducer} from "./reducers/appReducer";
import { saveState } from '../services/localStorage/saveLocalStorage';
import {CryptoCurrencyListing} from "../services/types";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния (редюсера)
export const rootReducer = combineReducers({
    portfolio,
    app: appReducer
})

// create our store use configureStore
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


//TODO need refactoring #1
let oldTimeStamp = (Date.now()).valueOf()
const millisecondsBetween = 1000 // Each X milliseconds
function updateLocalStorage(newState: CryptoCurrencyListing[])
{
    if (((Date.now()).valueOf() - oldTimeStamp) > millisecondsBetween) {
        saveState(newState)
        oldTimeStamp = (Date.now()).valueOf()
    }
}

store.subscribe(() => {
    updateLocalStorage(store.getState().portfolio.portfolio)
})





