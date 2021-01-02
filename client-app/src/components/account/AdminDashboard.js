import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import FadeIn from 'react-fade-in';
import { FaPlus } from 'react-icons/fa';
import { IoMdExit } from 'react-icons/io';
import FlightList from './../flight/FlightList.js';

class AdminDashboard extends Component {

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
                            <small>({this.historyState.adminEmail})&nbsp;&nbsp;&nbsp;<Alert.Link href="/">Logout&nbsp;<IoMdExit/></Alert.Link></small>
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
                            <Button 
                                variant="primary" 
                                className="float-right mr-2" 
                                onClick={() => this.props.history.push('/admin/new-flight', this.historyState)}
                            >
                                New Flight&nbsp;&nbsp;&nbsp;<FaPlus/>
                            </Button>
                        </Row>
                        <hr/>
                        <FlightList type="admin" adminEmail={this.historyState.adminEmail} history={this.props.history}/>
                    </Container>
                </div>
            </FadeIn>
        );
    }
}

export default AdminDashboard;