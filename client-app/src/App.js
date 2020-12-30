import React, { Component } from 'react';
import { MemoryRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Login from './Login.js';
import Register from './Register.js';
import CustomerDashboard from './CustomerDashboard.js';
import AdminDashboard from './AdminDashboard.js';
import NewBooking from './NewBooking.js';
import logo from "./logo.png";

class App extends Component {

    render() {
        return (
            <div>
                <MemoryRouter>
                    <Navbar bg="dark" variant="dark">
                        <Link to={"/"}>
                            <img alt="logo" src={logo} width="40" height="40" />
                            <Navbar.Brand className="p-2">Foobar Airways</Navbar.Brand>
                        </Link>
                    </Navbar>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/login" />
                        </Route>
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/admin' component={AdminDashboard}/>
                        <Route exact path='/my-account' component={CustomerDashboard}/>
                        <Route exact path='/my-account/new-booking' component={NewBooking}/>
                    </Switch>
                </MemoryRouter>
            </div>
        );
    }
}

export default App;
