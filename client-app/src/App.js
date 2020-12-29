import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Login from './Login.js';
import Register from './Register.js';
import FlightList from './FlightList.js';
import logo from "./logo.png";
import './App.css';

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navbar bg="dark" variant="dark">
                        <Link to={"/"}>
                            <img alt="logo" src={logo} width="40" height="40" />
                            <Navbar.Brand className="p-2">
                                Foobar Airways
                            </Navbar.Brand>
                        </Link>
                    </Navbar>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/login" />
                        </Route>
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/my-account' render={(props) => (<FlightList type="customer"/>)}/>
                        <Route exact path='/admin' render={(props) => (<FlightList type="admin"/>)}/>

                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
