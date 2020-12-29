import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FaTimes, FaPencilAlt, FaUsers, FaPlus, FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';

class FlightList extends Component {

    constructor(props) {
        super(props);
        this.listType = this.props.type;
    }

    render() { 
        return (
            <Container className="p-5" style={{ width: '45rem' }}>
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
                <Card className="mb-3">
                    <Card.Header>Flight code: FA001</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Card.Title>London &#8594; Los Angeles</Card.Title>
                                <Card.Subtitle className="text-muted"><FaPlaneDeparture/> LHR &#8594; LAX <FaPlaneArrival/></Card.Subtitle>
                                <hr/>
                                <Row>
                                    <Col>
                                        <Card.Text className="float-left">
                                            <i>Date:<br/>Depature:<br/>Arrival:</i>
                                        </Card.Text>
                                        <Card.Text className="float-left ml-5">
                                            {new Date("2020-12-27").toDateString()}<br/>18:00:00<br/>20:00:00
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
                <Card className="mb-3">
                    <Card.Header>Flight code: FA001</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Card.Title>London &#8594; Los Angeles</Card.Title>
                                <Card.Subtitle className="text-muted"><FaPlaneDeparture/> LHR &#8594; LAX <FaPlaneArrival/></Card.Subtitle>
                                <hr/>
                                <Row>
                                    <Col>
                                        <Card.Text className="float-left">
                                            <i>Date:<br/>Depature:<br/>Arrival:</i>
                                        </Card.Text>
                                        <Card.Text className="float-left ml-5">
                                            {new Date("2020-12-27").toDateString()}<br/>18:00:00<br/>20:00:00
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
                <Card className="mb-3">
                    <Card.Header>Flight code: FA001</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Card.Title>London &#8594; Los Angeles</Card.Title>
                                <Card.Subtitle className="text-muted"><FaPlaneDeparture/> LHR &#8594; LAX <FaPlaneArrival/></Card.Subtitle>
                                <hr/>
                                <Row>
                                    <Col>
                                        <Card.Text className="float-left">
                                            <i>Date:<br/>Depature:<br/>Arrival:</i>
                                        </Card.Text>
                                        <Card.Text className="float-left ml-5">
                                            {new Date("2020-12-27").toDateString()}<br/>18:00:00<br/>20:00:00
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
            </Container>
        );
    }
}

export default FlightList;