import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import tokenstore from "./utils/tokenstore"
import { Context } from './utils/context';
import './scss/app';
import Home from './Routes/Home';
import AccountBtn from "./Routes/AccountBtn"
import Login from './Routes/Login';
import Register from './Routes/Register';
import AllBooks from './Routes/AllBooks';
const App: React.SFC<IAppProps> = (props) => {

    const store = tokenstore()

    return (
        <Router>
            <Context.Provider value={store}>
                <div className="d-flex justify-content-end">
                    <Link className="btn btn-primary m-2" to="/">Home</Link>
                    <Link to="/books" className="btn btn-primary m-2"> View Books</Link>
                    <Route path="/" component={AccountBtn} />
                </div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/books" component={AllBooks} />
                </Switch>
            </Context.Provider>
        </Router>
    )
}

interface IAppProps {

}

export default App