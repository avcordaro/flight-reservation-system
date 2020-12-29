import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Alert from 'react-bootstrap/Alert';
import FlightList from './FlightList.js';
import { IoMdExit } from 'react-icons/io';

class CustomerDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = this.props.history.location.state;
    }

    render() { 
        return (
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
                                <FlightList type="customer"/>
                            </Tab>
                            <Tab eventKey="bookings" title="My Bookings">
                                <div></div>
                            </Tab>
                        </Tabs>
                    </Container>
                </div>
        );
    }
}

export default CustomerDashboard;