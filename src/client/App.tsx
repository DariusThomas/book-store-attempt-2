import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import tokenstore from "./utils/tokenstore"
import { Context } from './utils/context';
import './scss/app';
import Home from './Routes/Home';
import AccountBtn from "./Routes/AccountBtn"
import Login from './Routes/Login';
const App: React.SFC<IAppProps> = (props) => {

    const store = tokenstore()

    return (
        <Router>
            <Context.Provider value={store}>
                <div className="d-flex justify-content-end">
                <Route path="/" component={AccountBtn} />
                </div>
                <Switch>
                <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                </Switch>
            </Context.Provider>
        </Router>
    )
}

interface IAppProps {

}

export default App