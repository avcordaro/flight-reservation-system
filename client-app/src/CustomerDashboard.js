import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Alert from 'react-bootstrap/Alert';
import FlightList from './FlightList.js';
import BookingList from './BookingList.js';
import { IoMdExit } from 'react-icons/io';
import FadeIn from 'react-fade-in';

class CustomerDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = this.props.history.location.state;
    }

    render() { 
        return (
            <FadeIn transitionDuration="750">
                <div>
                    <Alert variant="light">
                        <div className="d-flex justify-content-end">
                            <small>({this.state.custEmail})&nbsp;&nbsp;&nbsp;<Alert.Link href="/">Logout&nbsp;<IoMdExit/></Alert.Link></small>
                        </div>
                    </Alert>
                    <Container className="px-5 pb-5" style={{ width: '45rem' }}>

                        <Row className="my-4 ml-2">
                            <h5>Welcome, {this.state.custName}.</h5>
                        </Row>
                        <hr/>
                        <Tabs defaultActiveKey="flights">
                            <Tab eventKey="flights" title="Flights">
                                <FlightList type="customer" custName={this.state.custName} custEmail={this.state.custEmail} history={this.props.history}/>
                            </Tab>
                            <Tab eventKey="bookings" title="My Bookings">
                                <BookingList custEmail={this.state.custEmail}/>
                            </Tab>
                        </Tabs>
                    </Container>
                </div>
            </FadeIn>
        );
    }
}

export default CustomerDashboard;