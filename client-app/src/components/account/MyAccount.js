import { Formik } from 'formik';
import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
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
        this.state = {
            loadTabs: false, 
            account: null,
            passwordLoading: false, 
            detailsLoading: false,
            showDetailsAlert: false,
            showPasswordAlert: false
        };
        this.historyState = this.props.history.location.state;
        this.handleDetailsSubmit = this.handleDetailsSubmit.bind(this);
        this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
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

    handlePasswordSubmit(values, { setFieldError, setSubmitting, resetForm }) {
        this.setState(prevState => ({
            ...prevState,
            passwordLoading: true
        }));
        if(values.oldPassword !== this.state.account.password) {
            setFieldError("oldPassword", "Incorrect password.");
            setSubmitting(false);
            this.setState(prevState => ({
                ...prevState,
                passwordLoading: false
            })); 
        } else if(values.newPassword !== values.confirmNewPassword) {
            setFieldError("confirmNewPassword", "Passwords do not match.");
            setSubmitting(false);
            this.setState(prevState => ({
                ...prevState,
                passwordLoading: false
            })); 
        }  else {
            fetch(`https://flight-reservation-system-api.herokuapp.com/account/edit?email=${this.historyState.custEmail}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "fullname": this.historyState.custName,
                        "email": this.historyState.custEmail,
                        "password": values.newPassword
                    })
                })
                .then(response => response.text())
                .then(data => {
                    setSubmitting(false);
                    resetForm();
                    this.setState(prevState => ({
                        ...prevState,
                        account: {...prevState.account, password: values.newPassword},
                        passwordLoading: false,
                        showPasswordAlert: true
                    })); 
            });
        }
    }

    handleDetailsSubmit(values, { setFieldError, setSubmitting }) {
        this.setState(prevState => ({
            ...prevState,
            detailsLoading: true
        }));
        fetch(`https://flight-reservation-system-api.herokuapp.com/account/edit?email=${this.historyState.custEmail}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "fullname": values.name,
                    "email": values.email
                })
            })
            .then(response => response.text())
            .then(data => {
                if(data === "Email already in use") {
                    setFieldError("email", "Email already in use.");
                    setSubmitting(false);
                    this.setState(prevState => ({
                        ...prevState,
                        detailsLoading: false
                    })); 
                } else {
                    setSubmitting(false);
                    this.setState(prevState => ({
                        ...prevState,
                        account: {...prevState.account, fullname: values.name, email: values.email},
                        detailsLoading: false,
                        showDetailsAlert: true
                    })); 
                }
            }
        );
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
                                this.props.history.push('/my-account', {custName: this.state.account.fullname, custEmail: this.state.account.email})
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
                                                onSubmit={this.handleDetailsSubmit}
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
                                                        <Form.Row className="justify-content-start mt-3">
                                                            <Alert 
                                                                variant="info" 
                                                                show={this.state.showDetailsAlert} 
                                                                onClose={() => this.setState(prevState => ({...prevState, showDetailsAlert: false}))} 
                                                                dismissible
                                                            >
                                                                Your details has been updated successfully!
                                                            </Alert>
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
                                                onSubmit={this.handlePasswordSubmit}
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
                                                        <Form.Row className="justify-content-start mt-3">
                                                            <Alert 
                                                                variant="info" 
                                                                show={this.state.showPasswordAlert} 
                                                                onClose={() => this.setState(prevState => ({...prevState, showPasswordAlert: false}))} 
                                                                dismissible
                                                            >
                                                                Your password has been updated successfully!
                                                            </Alert>
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

