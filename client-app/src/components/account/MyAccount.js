import { Formik } from 'formik';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Tab from 'react-bootstrap/Tab';
import FadeIn from 'react-fade-in';
import * as yup from 'yup';

function PageLoadValidation(props) {
    // Check if user nagivated to this page legitimately
    if (!props.history.location.state) {
        props.history.push('/login');
        return null;
    } else {
        return <MyAccount {...props}/>;
    }
}

class MyAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {loadTabs: false, account: null, passwordLoading: false, detailsLoading: false};
        this.historyState = this.props.history.location.state;
    }

    componentDidMount() {
        this.setState({loading: true}); 
        fetch(`https://flight-reservation-system-api.herokuapp.com/account/find?email=${this.historyState.custEmail}`)
            .then(response => response.json())
            .then(data => {
                this.setState(prevState => ({
                    ...prevState,
                    account: data[0],
                    loadTabs: true
            }));    
        });
    }

    render() { 
        return (
            <FadeIn transitionDuration="750">
                <Container className="p-5" style={{ width: '45rem' }}>
                    <Row className="justify-content-center mb-4">
                        <h3>
                            My Account
                        </h3>
                    </Row>
                    <Row className="justify-content-end">
                        <Button 
                            variant="primary" 
                            className="mr-3" 
                            onClick={() => 
                                this.props.history.push('/my-account', this.historyState)
                            }
                        >
                            Back
                        </Button>
                    </Row>
                    <hr/>
                    { this.state.loadTabs && 
                        <Tab.Container defaultActiveKey="first">
                            <Row className="mt-5">
                                <Col sm="4" className="border-right">
                                    <Nav className="flex-column">
                                        <Nav.Item>
                                            <Nav.Link eventKey="first">Personal Details</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="second">Change Password</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col className="ml-5">
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first">
                                            <Formik
                                                validationSchema={yup.object({
                                                    name: yup.string().required("Full name required."),
                                                    email: yup.string().email("Invalid email address.").required("Email required."),
                                                })}
                                                validateOnChange={false}
                                                onSubmit={console.log}
                                                initialValues={{
                                                    name: this.state.account.fullname,
                                                    email: this.state.account.email,
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
                                                            <Form.Group as={Col} sm="10">
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
                                                        <Form.Row className="justify-content-start">
                                                            <Form.Group as={Col} sm="10">
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
                                                        <Form.Row className="justify-content-start">
                                                            <Button variant="success"  type="submit" className="mt-3 mx-2" disabled={isSubmitting}>
                                                                Save Changes {this.state.detailsLoading && <Spinner animation="border" size="sm"/>}
                                                            </Button>
                                                        </Form.Row>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="second">
                                            <Formik
                                                validationSchema={yup.object({
                                                    oldPassword: yup.string().required("Current password required."),
                                                    newPassword: yup.string().required("New password required."),
                                                    confirmNewPassword: yup.string().required("Confirm new password required.")
                                                })}
                                                validateOnChange={false}
                                                onSubmit={this.handleSubmit}
                                                initialValues={{
                                                    oldPassword: '',
                                                    newPassword: '',
                                                    confirmNewPassword: ''
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
                                                            <Form.Group as={Col} sm="10">
                                                                <Form.Label>Current Password</Form.Label>
                                                                <Form.Control
                                                                id ="oldPassword"
                                                                name="oldPassword"
                                                                type="password"
                                                                value={values.oldPassword}
                                                                onChange={handleChange}
                                                                isInvalid={errors.oldPassword}
                                                                />
                                                                <Form.Control.Feedback type="invalid">{errors.oldPassword}</Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row className="justify-content-start">
                                                            <Form.Group as={Col} sm="10">
                                                                <Form.Label>New Password</Form.Label>
                                                                <Form.Control
                                                                id="newPassword"
                                                                name="newPassword"
                                                                type="password"
                                                                value={values.newPassword}
                                                                onChange={handleChange}
                                                                isInvalid={errors.newPassword}
                                                                />
                                                                <Form.Control.Feedback type="invalid">{errors.newPassword}</Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row className="justify-content-start">
                                                            <Form.Group as={Col} sm="10">
                                                                <Form.Label>Confirm New Password</Form.Label>
                                                                <Form.Control
                                                                id="confirmNewPassword"
                                                                name="confirmNewPassword"
                                                                type="password"
                                                                value={values.confirmNewPassword}
                                                                onChange={handleChange}
                                                                isInvalid={errors.confirmNewPassword}
                                                                />
                                                                <Form.Control.Feedback type="invalid">{errors.confirmNewPassword}</Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Form.Row>
                                                        <Form.Row className="justify-content-start">
                                                            <Button variant="success" type="submit" className="mt-3 mx-2" disabled={isSubmitting}>
                                                                Save Changes {this.state.passwordLoading && <Spinner animation="border" size="sm"/>}
                                                            </Button>
                                                        </Form.Row>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    }
                </Container>
            </FadeIn>
        );
    }
}

export default PageLoadValidation;