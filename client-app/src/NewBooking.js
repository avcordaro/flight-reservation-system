import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Seatmap from './seatmap/Seatmap.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import Spinner from 'react-bootstrap/Spinner';
import FadeIn from 'react-fade-in';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {rows: [], loadSeatmap: false, selectedSeat: '', loading: false};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddSeat = this.handleAddSeat.bind(this);
        this.handleRemoveSeat = this.handleRemoveSeat.bind(this);
        this.historyState = this.props.history.location.state;
    }

    componentDidMount() {
        fetch(`https://flight-reservation-system-api.herokuapp.com/flight/occupied-seats?code=${this.historyState.flightCode}`)
            .then(response => response.json())
            .then(data => {
                let occupiedSeats = data;
                let null_seats = [3,10,17,21,22,23,24,25,26,27,31,38,45,52,59,63,64,65,66,67,68,69,73,80,87];
                let rows = [];
                let row = [];
                for(let i = 0; i < 91; i++) {
                    if(null_seats.includes(i)) {
                        row.push(null);
                    } else if(occupiedSeats.includes(i+1)) {
                        row.push({number: (i+1), isReserved: true});
                    } else {
                        row.push({number: (i+1)});
                    }
                    if((i+1) % 7 === 0) {
                        rows.push(row);
                        row = [];
                    }
                }
                this.setState({rows: rows, loadSeatmap: true});
            });
    }

    handleSubmit(values) {
        this.setState(prevState => ({
            ...prevState,
            loading: true
        }));   
        let url = `https://flight-reservation-system-api.herokuapp.com/booking/create?flightCode=${this.historyState.flightCode}` + 
            `&email=${this.historyState.custEmail}&firstname=${values.firstname}&lastname=${values.lastname}&phone=${values.phone}` +
            `&age=${values.age}&seatNumber=${values.seatNumber}`;
        fetch(url, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                }
            })
            .then(response => response.text())
            .then(data => {
                this.props.history.push('/my-account', this.historyState)
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
        return (
            <FadeIn transitionDuration="750">
                <Container className="p-5" style={{ width: '45rem' }}>
                    <Row className="justify-content-center mb-5">
                        <h3>
                            New Booking
                        </h3>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                            <h6 className="mb-3 mt-3">Flight code: {this.historyState.flightCode}</h6>
                            <h6 className="mb-3"><FaPlaneDeparture/> {this.historyState.source} <BsArrowRight/> {this.historyState.destination} <FaPlaneArrival/></h6>
                            <h5 className="mb-4">{this.historyState.departure.substr(0, 5)} <BsArrowRight/> {this.historyState.arrival.substr(0, 5)}</h5>
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
                                    firstname: '',
                                    lastname: '',
                                    phone: '',
                                    age: '',
                                    seatNumber: ''
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
                                            <Button type="submit" className="mt-3 mx-2">
                                                Book {this.state.loading && <Spinner animation="border" size="sm"/>}
                                            </Button>
                                        </Form.Row>
                                    </Form>
                                )}
                            </Formik>
                        </Col>
                        <Col sm="auto">
                            <h5 className="mb-3 mt-3">Please select your seat...</h5>
                            {this.state.loadSeatmap && <Seatmap rows={this.state.rows} addSeatCallback={this.handleAddSeat} removeSeatCallback={this.handleRemoveSeat}/>}
                        </Col>
                    </Row>
                </Container>
            </FadeIn>
        );
    }
}
export default App;
