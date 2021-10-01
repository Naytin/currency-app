import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './glogal.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./store/store";
import {BrowserRouter} from "react-router-dom";
import {getLocalStorage} from "./services/localStorage/getLocalStorage";
import {setFromLocalStorage} from "./store/reducers/portfolioReducer";


const localState = getLocalStorage()
if (localState.length > 0) {
    store.dispatch(setFromLocalStorage(localState))
}

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
