import { Formik } from 'formik';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import FadeIn from 'react-fade-in';
import * as yup from 'yup';

function PageLoadValidation(props) {
    // Check if user nagivated to this page legitimately
    if (!props.history.location.state) {
        props.history.push('/login');
        return null;
    } else {
        return <NewFlight {...props}/>;
    }
}

class NewFlight extends Component {

    constructor(props) {
        super(props);
        this.state = {loading: false};
        this.historyState = this.props.history.location.state;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.setState({loading: true}); 
        fetch(`https://flight-reservation-system-api.herokuapp.com/flight/edit?code=${values.code}`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "date": values.date,
                    "source": values.source,
                    "destination": values.destination,
                    "srcCity": values.srcCity,
                    "destCity": values.destCity,
                    "departure": values.departure,
                    "arrival": values.arrival
                })
            })
            .then(response => response.text())
            .then(data => {
                this.props.history.push('/admin', this.historyState)     
        });
    }

    render() {
        let flight = this.historyState.flight;
        return (
            <FadeIn transitionDuration="750">
                <Container className="p-5" style={{ width: '45rem' }}>
                    <Row className="justify-content-center mb-4">
                        <h3>
                            Edit Flight
                        </h3>
                    </Row>
                    <hr/>
                    <Row className="justify-content-center mt-5">
                        <Col>
                            <Formik
                                validationSchema={yup.object({
                                    code: yup.string().matches(/^[A-Z][A-Z]\d\d\d$/, {message: "Must be of the form FA###."}).required("Flight code required."),
                                    date: yup.string().matches(/^\d\d\d\d-\d\d-\d\d$/, {message: "Must be of the form YYYY-MM-DD."}).required("Date required."),
                                    source: yup.string().min(3).max(3).required("Source required."),
                                    destination: yup.string().min(3).max(3).required("Destination required."),
                                    srcCity: yup.string().required("Source City required."),
                                    destCity: yup.string().required("Destination City required."),
                                    departure: yup.string().matches(/^\d\d:\d\d:\d\d$/, {message: "Must be of the form HH:MM:SS."}).required("Departure required."),
                                    arrival: yup.string().matches(/^\d\d:\d\d:\d\d$/, {message: "Must be of the form HH:MM:SS."}).required("Arrival required.")
                                })}
                                validateOnChange={false}
                                onSubmit={this.handleSubmit}
                                initialValues={{
                                    code: flight.code,
                                    date: flight.date,
                                    source: flight.source,
                                    destination: flight.destination,
                                    srcCity: flight.srcCity,
                                    destCity: flight.destCity,
                                    departure: flight.departure,
                                    arrival: flight.arrival
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
                                        <Form.Row className="justify-content-center">
                                            <Form.Group as={Col} xs="6" sm="6">
                                                <Form.Label>Flight Code</Form.Label>
                                                <Form.Control
                                                id ="code"
                                                name="code"
                                                type="text"
                                                value={values.code}
                                                onChange={handleChange}
                                                isInvalid={errors.code}
                                                placeholder="FA###"
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.code}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className="justify-content-center">
                                            <Form.Group as={Col} xs="6" sm="6">
                                                <Form.Label>Date</Form.Label>
                                                <Form.Control
                                                id ="date"
                                                name="date"
                                                type="text"
                                                value={values.date}
                                                onChange={handleChange}
                                                isInvalid={errors.date}
                                                placeholder="YYYY-MM-DD"
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className="justify-content-center">
                                            <Form.Group as={Col} xs="6" sm="6">
                                                <Form.Label>Source Airport Code</Form.Label>
                                                <Form.Control
                                                id="source"
                                                name="source"
                                                type="text"
                                                value={values.source}
                                                onChange={handleChange}
                                                isInvalid={errors.source}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.source}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className="justify-content-center">
                                            <Form.Group as={Col} xs="6" sm="6">
                                                <Form.Label>Destination Airport Code</Form.Label>
                                                <Form.Control
                                                id="destination"
                                                name="destination"
                                                type="text"
                                                value={values.destination}
                                                onChange={handleChange}
                                                isInvalid={errors.destination}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.destination}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className="justify-content-center">
                                            <Form.Group as={Col} xs="6" sm="6">
                                                <Form.Label>Source City</Form.Label>
                                                <Form.Control
                                                id="srcCity"
                                                name="srcCity"
                                                type="text"
                                                value={values.srcCity}
                                                onChange={handleChange}
                                                isInvalid={errors.srcCity}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.srcCity}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className="justify-content-center">
                                            <Form.Group as={Col} xs="6" sm="6">
                                                <Form.Label>Destination City</Form.Label>
                                                <Form.Control
                                                id="destCity"
                                                name="destCity"
                                                type="text"
                                                value={values.destCity}
                                                onChange={handleChange}
                                                isInvalid={errors.destCity}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.destCity}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className="justify-content-center">
                                            <Form.Group as={Col} xs="6" sm="6">
                                                <Form.Label>Departure Time</Form.Label>
                                                <Form.Control
                                                id="departure"
                                                name="departure"
                                                type="text"
                                                value={values.departure}
                                                onChange={handleChange}
                                                isInvalid={errors.departure}
                                                placeholder="HH:MM:SS"
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.departure}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className="justify-content-center">
                                            <Form.Group as={Col} xs="6" sm="6">
                                                <Form.Label>Arrival Time</Form.Label>
                                                <Form.Control
                                                id="arrival"
                                                name="arrival"
                                                type="text"
                                                value={values.arrival}
                                                onChange={handleChange}
                                                isInvalid={errors.arrival}
                                                placeholder="HH:MM:SS"
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.arrival}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className="justify-content-center">
                                            <Button 
                                                variant="primary" 
                                                className="mt-3 mx-2" 
                                                onClick={() => 
                                                    this.props.history.push('/admin/', this.historyState)
                                                }
                                            >
                                                Cancel
                                            </Button>
                                            <Button variant="success"  type="submit" className="mt-3 mx-2">
                                                Save Changes {this.state.loading && <Spinner animation="border" size="sm"/>}
                                            </Button>
                                        </Form.Row>
                                    </Form>
                                )}
                            </Formik>
                        </Col>
                    </Row>
                </Container>
            </FadeIn>
        );
    }
}
export default PageLoadValidation;
