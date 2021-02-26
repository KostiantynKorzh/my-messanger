import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from "./component/Login";
import Signup from "./component/Signup";
import Home from "./component/Home";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/" component={Home}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
