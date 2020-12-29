import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(values, { setFieldError, setSubmitting }) {
        fetch(`https://flight-reservation-system-api.herokuapp.com/account/find?email=${values.email}`)
            .then(response => response.json())
            .then(data => {
                if(data.length === 0) {
                    setFieldError("email", "Incorrect email address.");
                    setSubmitting(false);
                } else if(data[0].password !== values.password) {
                    setFieldError("password", "Incorrect password.");
                    setSubmitting(false);
                } else if(data[0].admin) {
                    this.props.history.push("/admin", { adminEmail: data[0].email }); 
                } else {
                    this.props.history.push('/my-account', { custName: data[0].fullname, custEmail: data[0].email });
                }
            });

    }

    render() { 
        return (
            <Container className="p-5">
                <Row className="justify-content-center mb-2">
                    <h2>
                        Welcome to Foobar Airways
                    </h2>
                </Row>
                <Row className="justify-content-center mb-5">
                    <h5>
                        Please login to continue
                    </h5>
                </Row>
                <Row className="justify-content-center">
                    <Col>
                        <Formik
                            validationSchema={yup.object({
                                email: yup.string().email("Invalid email address.").required("Email required."),
                                password: yup.string().required("Password required.")
                            })}
                            validateOnChange={false}
                            onSubmit={this.handleSubmit}
                            initialValues={{
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
                                        <Form.Group as={Col} lg="4">
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
                                        <Form.Group as={Col} lg="4">
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
                                        <Link to={'/register'}>
                                            <Button variant="primary" className="mt-3 mx-2">Register</Button>
                                        </Link>
                                        <Button type="submit" className="mt-3 mx-2" disabled={isSubmitting}>Login</Button>
                                    </Form.Row>
                                </Form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Login;