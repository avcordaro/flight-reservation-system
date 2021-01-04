import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FadeIn from 'react-fade-in';
import { FiUser } from 'react-icons/fi';
import { IoMdExit } from 'react-icons/io';
import BookingList from './../booking/BookingList.js';
import FlightList from './../flight/FlightList.js';

function PageLoadValidation(props) {
    // Check if user nagivated to this page legitimately
    if (!props.history.location.state) {
        props.history.push('/login');
        return null;
    } else {
        return <CustomerDashboard {...props}/>;
    }
}

class CustomerDashboard extends Component {

    constructor(props) {
        super(props);
        this.historyState = this.props.history.location.state;
    }

    render() { 
        return (
            <FadeIn transitionDuration="750">
                <div>
                    <Alert variant="light">
                        <div className="d-flex justify-content-end">
                            <Button 
                                variant="link" 
                                size="sm" 
                                onClick={
                                    () => this.props.history.push("/my-account/details", this.historyState)
                                }
                            >
                                <FiUser/>&nbsp;My Account
                            </Button>
                            <Button variant="link" size="sm" disabled>|</Button> 
                            <Button 
                                variant="link" 
                                size="sm" 
                                onClick={
                                    () => this.props.history.push("/login", this.historyState)
                                }
                            >
                                Logout&nbsp;<IoMdExit/>
                            </Button>                       
                        </div>
                    </Alert>
                    <Container className="px-5 pb-5" style={{ width: '45rem' }}>
                        <Row className="my-4 ml-2">
                            <h5>Welcome, {this.historyState.custName}.</h5>
                        </Row>
                        <hr/>
                        <Tabs defaultActiveKey="flights">
                            <Tab eventKey="flights" title="Flights">
                                <FlightList type="customer" custName={this.historyState.custName} custEmail={this.historyState.custEmail} history={this.props.history}/>
                            </Tab>
                            <Tab eventKey="bookings" title="My Bookings">
                                <BookingList custName={this.historyState.custName} custEmail={this.historyState.custEmail} history={this.props.history}/>
                            </Tab>
                        </Tabs>
                    </Container>
                </div>
            </FadeIn>
        );
    }
}

export default PageLoadValidation;