import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FaTimes, FaPencilAlt, FaUsers, FaPlus, FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';

class FlightListItem extends Component {

    constructor(props) {
        super(props);
        this.listType = this.props.type;
    }

    render() {
        const flight = this.props.flight;
        return (
            <Card className="mb-3">
                <Card.Header>Flight code: {flight.code}</Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title>{flight.srcCity} &#8594; {flight.destCity}</Card.Title>
                            <Card.Subtitle className="text-muted"><FaPlaneDeparture/> {flight.source} &#8594; {flight.destination} <FaPlaneArrival/></Card.Subtitle>
                            <hr/>
                            <Row>
                                <Col>
                                    <Card.Text className="float-left">
                                        <i>Date:<br/>Depature:<br/>Arrival:</i>
                                    </Card.Text>
                                    <Card.Text className="float-left ml-5">
                                        {new Date(flight.date).toDateString()}<br/>{flight.departure}<br/>{flight.arrival}
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs lg="auto">
                            {this.listType === "admin" &&
                                <div>
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Delete</Tooltip>}>
                                    <Button variant="primary" className="float-right mr-1"><FaTimes/></Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Edit</Tooltip>}>
                                    <Button variant="primary" className="float-right mr-1"><FaPencilAlt/></Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Passengers</Tooltip>}>
                                    <Button variant="primary" className="float-right mr-1"><FaUsers/></Button>
                                    </OverlayTrigger>
                                </div>
                            }
                            {this.listType === "customer" &&
                                <div>
                                    <Button variant="primary" className="float-right mr-2">Book&nbsp;&nbsp;&nbsp;<FaPlus/></Button>
                                </div>
                            }
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        );
    }
}

export default FlightListItem;