import { Formik } from 'formik';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import FadeIn from 'react-fade-in';
import { BsArrowRight } from 'react-icons/bs';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
import * as yup from 'yup';
import Seatmap from './../seatmap/Seatmap.js';

function PageLoadValidation(props) {
    // Check if user nagivated to this page legitimately
    if (!props.history.location.state) {
        props.history.push('/login');
        return null;
    } else {
        return <EditBooking {...props}/>;
    }
}

class EditBooking extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddSeat = this.handleAddSeat.bind(this);
        this.handleRemoveSeat = this.handleRemoveSeat.bind(this);
        this.historyState = this.props.history.location.state;
        this.state = {
            rows: [], 
            loadSeatmap: false, 
            oldBooking: this.historyState.booking, 
            selectedSeat: this.historyState.booking.seatNumber, 
            loading: false
        };
    }

    componentDidMount() {
        fetch(`https://flight-reservation-system-api.herokuapp.com/flight/occupied-seats?code=${this.historyState.booking.flightCode}`)
            .then(response => response.json())
            .then(data => {
                let occupiedSeats = data;
                let null_seats = [3,10,17,21,22,23,24,25,26,27,31,38,45,52,59,63,64,65,66,67,68,69,73,80,87];
                let rows = [];
                let row = [];
                for(let i = 0; i < 91; i++) {
                    if(null_seats.includes(i)) {
                        row.push(null);
                    } else if(occupiedSeats.includes(i+1) && i+1 !== this.state.oldBooking.seatNumber) {
                        row.push({number: (i+1), isReserved: true});
                    } else {
                        row.push({number: (i+1)});
                    }
                    if((i+1) % 7 === 0) {
                        rows.push(row);
                        row = [];
                    }
                }
                this.setState(prevState => ({
                    ...prevState,
                    rows: rows,
                    loadSeatmap: true
                }));   
        });
    }

    handleSubmit(values, { setFieldError, setSubmitting }) {
        this.setState(prevState => ({
            ...prevState,
            loading: true
        }));   
        fetch(`https://flight-reservation-system-api.herokuapp.com/booking/edit?id=${this.historyState.booking.id}&flightCode=${this.historyState.booking.flightCode}`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "firstname": values.firstname,
                    "lastname": values.lastname,
                    "phone": values.phone,
                    "age": values.age,
                    "seatNumber": values.seatNumber
                })
            })
            .then(response => response.text())
            .then(data => {
                if(data === "Seat already taken") {
                    setFieldError("seatNumber", "Seat has just been taken. Please select another.");
                    setSubmitting(false);
                    this.setState(prevState => ({
                        ...prevState,
                        loading: false
                    })); 
                } else{
                    this.props.history.push('/my-account', this.historyState)
                }
        });
    }

    handleAddSeat(row, number) {
        this.setState(prevState => ({
            ...prevState,
            selectedSeat: number.toString()
        }));    
    }

    handleRemoveSeat(row, number) {
        this.setState(prevState => ({
            ...prevState,
            selectedSeat: ""
        }));    
    }

    render() {
        let booking = this.historyState.booking;
        return (
            <FadeIn transitionDuration="750">
                <Container className="p-5" style={{ width: '45rem' }}>
                    <Row className="justify-content-center mb-5">
                        <h3>
                            Edit Booking
                        </h3>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                            <h6 className="mb-3 mt-3">Flight code: {booking.flightCode}</h6>
                            <h6 className="mb-3"><FaPlaneDeparture/> {booking.source} <BsArrowRight/> {booking.destination} <FaPlaneArrival/></h6>
                            <h5 className="mb-4">{booking.departure.substr(0, 5)} <BsArrowRight/> {booking.arrival.substr(0, 5)}</h5>
                            <hr/>
                            <Formik
                                validationSchema={yup.object({
                                    firstname: yup.string().required("Forename required."),
                                    lastname: yup.string().required("Surname required."),
                                    phone: yup.string().required("Phone number required."),
                                    age: yup.number().typeError('Age must be a number.').required("Age required.").positive("Age must be positive."),
                                    seatNumber: yup.string().required("Please select your seat.")
                                })}
                                validateOnChange={false}
                                onSubmit={this.handleSubmit}
                                initialValues={{
                                    firstname: this.state.oldBooking.firstname,
                                    lastname: this.state.oldBooking.lastname,
                                    phone: this.state.oldBooking.phone,
                                    age: this.state.oldBooking.age,
                                    seatNumber: this.state.oldBooking.seatNumber
                                }}
                            >
                                {({
                                handleSubmit,
                                handleChange,
                                values,
                                isSubmitting,
                                errors,
                                }) => (
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <Form.Row className="justify-content-start">
                                            <Form.Group as={Col} xs="10" sm="10">
                                                <Form.Label>Forename</Form.Label>
                                                <Form.Control
                                                id ="firstname"
                                                name="firstname"
                                                type="text"
                                                value={values.firstname}
                                                onChange={handleChange}
                                                isInvalid={errors.firstname}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.firstname}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className="justify-content-start">
                                            <Form.Group as={Col} xs="10" sm="10">
                                                <Form.Label>Surname</Form.Label>
                                                <Form.Control
                                                id ="lastname"
                                                name="lastname"
                                                type="text"
                                                value={values.lastname}
                                                onChange={handleChange}
                                                isInvalid={errors.lastname}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.lastname}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className="justify-content-start">
                                            <Form.Group as={Col} xs="10" sm="10">
                                                <Form.Label>Phone Number</Form.Label>
                                                <Form.Control
                                                id="phone"
                                                name="phone"
                                                type="text"
                                                value={values.phone}
                                                onChange={handleChange}
                                                isInvalid={errors.phone}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className="justify-content-start">
                                            <Form.Group as={Col} xs="6" sm="6">
                                                <Form.Label>Age</Form.Label>
                                                <Form.Control
                                                id="age"
                                                name="age"
                                                type="text"
                                                value={values.age}
                                                onChange={handleChange}
                                                isInvalid={errors.age}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className="justify-content-start">
                                            <Form.Group as={Col} xs="6" sm="6">
                                                <Form.Label>Seat Number</Form.Label>
                                                <Form.Control
                                                id="seatNumber"
                                                name="seatNumber"
                                                type="text"
                                                value={values.seatNumber = this.state.selectedSeat}
                                                onChange={handleChange}
                                                isInvalid={errors.seatNumber}
                                                readOnly
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.seatNumber}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className="justify-content-start">
                                            <Button 
                                                variant="primary" 
                                                className="mt-3 mx-2" 
                                                onClick={() => 
                                                    this.props.history.push('/my-account/', this.historyState)
                                                }
                                            >
                                                Cancel
                                            </Button>
                                            <Button variant="success" type="submit" className="mt-3 mx-2">
                                                Save Changes {this.state.loading && <Spinner animation="border" size="sm"/>}
                                            </Button>
                                        </Form.Row>
                                    </Form>
                                )}
                            </Formik>
                        </Col>
                        <Col sm="auto">
                            <h5 className="mb-3 mt-3">Please select your seat...</h5>
                            {this.state.loadSeatmap && <Seatmap rows={this.state.rows} selectedSeat={this.state.selectedSeat} addSeatCallback={this.handleAddSeat} removeSeatCallback={this.handleRemoveSeat}/>}
                        </Col>
                    </Row>
                </Container>
            </FadeIn>
        );
    }
}
export default PageLoadValidation;
