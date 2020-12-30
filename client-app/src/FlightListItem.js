import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';
import { FaTimes, FaPencilAlt, FaUsers, FaPlus, FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';

class FlightListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {showModal: false};
    }

    render() {
        const flight = this.props.flight;
        return (
            <Card className="mb-3">
                <Card.Header>Flight code: {flight.code}</Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title>{flight.srcCity} <BsArrowRight/> {flight.destCity}</Card.Title>
                            <Card.Subtitle className="text-muted"><FaPlaneDeparture/> {flight.source} <BsArrowRight/> {flight.destination} <FaPlaneArrival/></Card.Subtitle>
                            <hr/>
                            <Row>
                                <Col sm="auto">
                                    <Card.Text className="float-left">
                                        <i>Date:<br/>Depature:<br/>Arrival:</i>
                                    </Card.Text>
                                    <Card.Text className="float-left ml-5">
                                        {new Date(flight.date).toDateString()}<br/>{flight.departure.substr(0, 5)}<br/>{flight.arrival.substr(0, 5)}
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm="auto">
                            {this.props.type === "admin" &&
                                <div>
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Delete</Tooltip>}>
                                    <Button variant="primary" className="float-right mr-1" onClick={() => this.setState({showModal: true})}><FaTimes/></Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Edit</Tooltip>}>
                                    <Button variant="primary" className="float-right mr-1"><FaPencilAlt/></Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Passengers</Tooltip>}>
                                    <Button variant="primary" className="float-right mr-1"><FaUsers/></Button>
                                    </OverlayTrigger>
                                </div>
                            }
                            {this.props.type === "customer" &&
                                <div>
                                    <Button 
                                        variant="primary" 
                                        className="float-right mr-2" 
                                        onClick={() => 
                                            this.props.history.push('/my-account/new-booking', {
                                                flightCode: flight.code, 
                                                source: flight.source,
                                                destination: flight.destination,
                                                departure: flight.departure,
                                                arrival: flight.arrival,
                                                custName: this.props.custName, 
                                                custEmail: this.props.custEmail
                                            })}
                                    >
                                        Book&nbsp;&nbsp;&nbsp;<FaPlus/>
                                    </Button>
                                </div>
                            }
                        </Col>
                    </Row>
                </Card.Body>
                <Modal show={this.state.showModal} onHide={() => this.setState({showModal: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete {this.props.flight.code}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this flight?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({showModal: false})}>Cancel</Button>
                        <Button variant="primary" onClick={() => this.props.onDelete(flight.code)}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </Card>
        );
    }
}

export default FlightListItem;