import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from "./component/Login";
import Signup from "./component/Signup";
import Home from "./component/Home";
import Main from "./component/user/Main";
import Chat from "./component/user/Chat";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/main" component={Main}/>
                <Route exact path="/chat/:id" component={Chat}/>
                <Route exact path="/" component={Home}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
