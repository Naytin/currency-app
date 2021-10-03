import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header, Portfolio, Cryptocurrencies, Currency} from "./components";

function App() {
  return (
    <div className="App">
        <Header />
        <main>
            <Switch>
                <Route exact path="/" render={() => <Portfolio/>} />
                <Route exact path="/cryptocurrencies" render={() => <Cryptocurrencies />} />
                <Route path="/currency/:tokenName" render={() => <Currency />} />
            </Switch>
        </main>
    </div>
  );
}

export default App;
