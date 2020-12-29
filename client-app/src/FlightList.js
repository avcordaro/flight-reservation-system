import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FlightListItem from './FlightListItem.js';
import { FaPlus } from 'react-icons/fa';

class FlightList extends Component {

    constructor(props) {
        super(props);
        this.listType = this.props.type;
        this.state = {flights: []};
    }

    componentDidMount() {
        fetch('https://flight-reservation-system-api.herokuapp.com/flight/all-chronological')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({flights: data});
            });
    }

    render() { 
        return (
            <Container className="p-5" style={{ width: '45rem' }}>
                {this.listType == "admin" &&
                    <div>
                        <Row className="justify-content-center mb-3">
                            <h3>
                                Flight Listing
                            </h3>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="primary" className="float-right mr-2">New flight&nbsp;&nbsp;&nbsp;<FaPlus/></Button>
                            </Col>
                        </Row>
                        <hr/>
                    </div>
                }
                {this.state.flights.map((flight) =>
                    <FlightListItem key={flight.code} type={this.listType} flight={flight}/>
                )}
            </Container>
        );
    }
}

export default FlightList;