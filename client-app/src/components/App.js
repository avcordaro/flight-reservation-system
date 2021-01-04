import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import logo from "./../logo.png";
import AdminDashboard from './account/AdminDashboard.js';
import CustomerDashboard from './account/CustomerDashboard.js';
import Login from './account/Login.js';
import Register from './account/Register.js';
import MyAccount from './account/MyAccount.js';
import EditBooking from './booking/EditBooking.js';
import NewBooking from './booking/NewBooking.js';
import EditFlight from './flight/EditFlight.js';
import NewFlight from './flight/NewFlight.js';
import ViewPassengers from './flight/ViewPassengers.js';
import PageNotFound from './PageNotFound.js';

class App extends Component {

    constructor(props) {
        super(props);
        this.routes = [
            { path: '/login', Component: Login },
            { path: '/register', Component: Register },
            { path: '/admin', Component: AdminDashboard },
            { path: '/admin/view-passengers', Component: ViewPassengers },
            { path: '/admin/new-flight', Component: NewFlight },
            { path: '/admin/edit-flight', Component: EditFlight },
            { path: '/my-account', Component: CustomerDashboard },
            { path: '/my-account/details', Component: MyAccount },
            { path: '/my-account/new-booking', Component: NewBooking },
            { path: '/my-account/edit-booking', Component: EditBooking }
        ];  
    }

    componentDidMount() {
    	// Random GET request to wake up Heroku backend server.
        fetch(`https://flight-reservation-system-api.herokuapp.com/flight/all`);
    }

    render() {
        return (
            <div>
                <BrowserRouter>
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
                        <Route exact path="/*" component={PageNotFound}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
