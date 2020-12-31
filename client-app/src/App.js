import React, { Component } from 'react';
import { MemoryRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Login from './Login.js';
import Register from './Register.js';
import CustomerDashboard from './CustomerDashboard.js';
import AdminDashboard from './AdminDashboard.js';
import NewBooking from './NewBooking.js';
import ViewPassengers from './ViewPassengers.js'
import logo from "./logo.png";

class App extends Component {

    constructor(props) {
        super(props);
        this.routes = [
            { path: '/login', Component: Login },
            { path: '/register', Component: Register },
            { path: '/admin', Component: AdminDashboard },
            { path: '/admin/view-passengers', Component: ViewPassengers },
            { path: '/my-account', Component: CustomerDashboard },
            { path: '/my-account/new-booking', Component: NewBooking }
        ];  
    }

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
                        {this.routes.map(route => (
                            <Route 
                                exact path={route.path} 
                                key={route.path} 
                                component={route.Component}
                            />
                        ))}
                    </Switch>
                </MemoryRouter>
            </div>
        );
    }
}

export default App;
