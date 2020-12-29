import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import FlightList from './FlightList.js';
import { IoMdExit } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa';

class AdminDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = this.props.history.location.state;
    }

    render() { 
        return (
                <div>
                    <Alert variant="light">
                        <div className="d-flex justify-content-end">
                            <small>({this.state.adminEmail})&nbsp;&nbsp;&nbsp;<Alert.Link href="/">Logout&nbsp;<IoMdExit/></Alert.Link></small>
                        </div>
                    </Alert>
                    <Container className="px-5 pb-5" style={{ width: '45rem' }}>
                        <Row className="mt-4 ml-2">
                            <h5>Welcome back, Administrator.</h5>
                        </Row>
                        <Row className="mt-3 ml-2">
                            <h3>Scheduled Flights</h3>
                        </Row>
                        <Row className="mt-4 justify-content-end">
                            <Button variant="primary" className="mr-3">New Flight&nbsp;&nbsp;<FaPlus/></Button>
                        </Row>
                        <hr/>
                        <FlightList type="admin"/>
                    </Container>
                </div>
        );
    }
}

export default AdminDashboard;