import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header, Portfolio, Cryptocurrency} from "./components";

function App() {
  return (
    <div className="App">
        <Header />
        <main>
            <Switch>
                <Route exact path="/" render={() => <Portfolio/>} />
                <Route exact path="/cryptocurrency" render={() => <Cryptocurrency />} />
            </Switch>
        </main>
    </div>
  );
}

export default App;
