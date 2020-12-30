import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import FadeIn from 'react-fade-in';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {loading: false};
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(values, { setFieldError, setSubmitting }) {
        this.setState({loading: true});
        fetch(`https://flight-reservation-system-api.herokuapp.com/account/create?fullname=${values.name}&email=${values.email}&password=${values.password}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                }
            })
            .then(response => response.text())
            .then(data => {
                if(data === "Email already in use") {
                    setFieldError("email", "Email already in use.");
                    setSubmitting(false);
                    this.setState({loading: false});
                } else{
                    this.props.history.push('/my-account', { custName: values.fullname, custEmail: values.email });
                }
            });

    }

    render() { 
        return (
            <FadeIn transitionDuration="750">
                <Container className="p-5" style={{ width: '45rem' }}>
                    <Row className="justify-content-center mb-5">
                        <h3>
                            New Account
                        </h3>
                    </Row>
                    <Row className="justify-content-center">
                        <Col>
                            <Formik
                                validationSchema={yup.object({
                                    name: yup.string().required("Full name required."),
                                    email: yup.string().email("Invalid email address.").required("Email required."),
                                    password: yup.string().required("Password required.")
                                })}
                                validateOnChange={false}
                                onSubmit={this.handleSubmit}
                                initialValues={{
                                    name: '',
                                    email: '',
                                    password: ''
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
                                                <Form.Label>Full name</Form.Label>
                                                <Form.Control
                                                id ="name"
                                                name="name"
                                                type="text"
                                                value={values.name}
                                                onChange={handleChange}
                                                isInvalid={errors.name}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className="justify-content-center">
                                            <Form.Group as={Col} xs="6" sm="6">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                id ="email"
                                                name="email"
                                                type="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                isInvalid={errors.email}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className="justify-content-center">
                                            <Form.Group as={Col} xs="6" sm="6">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                id="password"
                                                name="password"
                                                type="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                isInvalid={errors.password}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className="justify-content-center">
                                            <Link to={'/login'}>
                                                <Button variant="primary" className="mt-3 mx-2">Cancel</Button>
                                            </Link>
                                            <Button type="submit" className="mt-3 mx-2" disabled={isSubmitting}>
                                                Create {this.state.loading && <Spinner animation="border" size="sm"/>}
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

export default Register;