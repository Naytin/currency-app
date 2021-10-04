import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Cryptocurrencies, Currency, Header, Portfolio} from "./components";
import {portfolioActions} from "./store/reducers/portfolioReducer";
import {useActions} from "./hooks/useActions";

function App() {
    const {updateDataFromLS} = useActions(portfolioActions)

    useEffect(() => {
        updateDataFromLS()
    }, [])

    return (
        <div className="App">
            <Header/>
            <main>
                <Switch>
                    <Route exact path="/" render={() => <Portfolio/>}/>
                    <Route exact path="/cryptocurrencies" render={() => <Cryptocurrencies/>}/>
                    <Route path="/currency/:tokenName" render={() => <Currency/>}/>
                </Switch>
            </main>
        </div>
    );
}

export default App;
