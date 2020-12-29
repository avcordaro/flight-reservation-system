import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Login from './Login.js';
import Register from './Register.js';
import logo from "./logo.png";
import './App.css';

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navbar bg="dark" variant="dark">
                        <img alt="logo" src={logo} width="40" height="40" />
                        <Navbar.Brand className="p-2">
                            Foobar Airways
                        </Navbar.Brand>
                    </Navbar>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/login" />
                        </Route>
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/my-account' component={Login} />
                        <Route exact path='/admin' component={Register} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
