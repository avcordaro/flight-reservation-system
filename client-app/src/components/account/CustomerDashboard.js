import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FadeIn from 'react-fade-in';
import { FiUser } from 'react-icons/fi';
import { IoMdExit } from 'react-icons/io';
import BookingList from './../booking/BookingList.js';
import FlightList from './../flight/FlightList.js';

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
                            <small><Alert.Link href="/"><FiUser/>&nbsp;My Account</Alert.Link>&nbsp;({this.historyState.custEmail})&nbsp;&nbsp;|&nbsp;&nbsp;<Alert.Link href="/">Logout&nbsp;<IoMdExit/></Alert.Link></small>
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
                                <BookingList custEmail={this.historyState.custEmail}/>
                            </Tab>
                        </Tabs>
                    </Container>
                </div>
            </FadeIn>
        );
    }
}

export default CustomerDashboard;