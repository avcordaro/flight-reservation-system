import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
import Tooltip from 'react-bootstrap/Tooltip';
import { BsArrowRight } from 'react-icons/bs';
import { FaTimes, FaPencilAlt, FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';

class BookingListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {showModal: false}
    }

    render() {
        const booking = this.props.booking;
        return (
            <Card className="mb-3">
                <Card.Header>Booking ID: {booking.id}</Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title>{booking.srcCity} <BsArrowRight/> {booking.destCity}</Card.Title>
                            <Card.Subtitle className="text-muted"><FaPlaneDeparture/> {booking.source} <BsArrowRight/> {booking.destination} <FaPlaneArrival/></Card.Subtitle>
                            <hr/>
                            <Row>
                                <Col sm="auto">
                                    <Card.Text className="float-left">
                                        <i>Forename:<br/>Surname:<br/>Seat:</i>
                                    </Card.Text>
                                    <Card.Text className="float-left ml-3">
                                        {booking.firstname}<br/>{booking.lastname}<br/>{booking.seatNumber}
                                    </Card.Text>
                                </Col>
                                <Col sm="auto">
                                    <Card.Text className="float-left">
                                        <i>Date:<br/>Depature:<br/>Arrival:</i>
                                    </Card.Text>
                                    <Card.Text className="float-left ml-3">
                                        {new Date(booking.date).toDateString()}<br/>{booking.departure.substr(0, 5)}<br/>{booking.arrival.substr(0, 5)}
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm="auto">
                            <OverlayTrigger placement="bottom" overlay={<Tooltip>Delete</Tooltip>}>
                                <Button variant="danger" className="float-right mr-1" onClick={() => this.setState({showModal: true})}><FaTimes/></Button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="bottom" overlay={<Tooltip>Edit</Tooltip>}>
                                <Button 
                                    variant="primary" 
                                    className="float-right mr-1"
                                    onClick={() => 
                                        this.props.history.push('/my-account/edit-booking', {
                                            booking: booking,
                                            custName: this.props.custName,
                                            custEmail: this.props.custEmail
                                        })
                                    }
                                >
                                    <FaPencilAlt/>
                                </Button>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                    <small className="text-muted">
                        Flight code: {booking.flightCode}
                    </small>
                </Card.Body>
                <Modal show={this.state.showModal} onHide={() => this.setState({showModal: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Booking</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this booking?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({showModal: false})}>Cancel</Button>
                        <Button variant="primary" onClick={() => this.props.onDelete(booking.id)}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </Card>
        );
    }
}

export default BookingListItem;