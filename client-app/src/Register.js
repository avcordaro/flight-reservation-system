import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {name: "", email: "", password: ""};

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleLogin(event) {
        event.preventDefault();
        console.log("Name: " + this.state.name);
        console.log("Email: " + this.state.email);
        console.log("Password: " + this.state.password);
        this.props.history.push("/login");   
    }

    render() { 
        return (
            <Container className="p-5">
                <Row className="justify-content-center mb-5">
                    <h3>
                        New Account
                    </h3>
                </Row>
                <Row className="justify-content-center">
                    <Col lg={4}>
                        <Form>
                            <Form.Group>
                                <Form.Label>Full name</Form.Label>
                                <Form.Control type="text" placeholder="Enter full name" value={this.state.name} onChange={this.handleNameChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.handleEmailChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Link to={'/login'}>
                        <Button variant="primary" className="mt-3 mx-2">
                            Cancel
                        </Button>
                    </Link>
                    <Button variant="primary" type="submit" onClick={this.handleLogin} className="mt-3 mx-2">
                        Create
                    </Button>
                </Row>
            </Container>
        );
    }
}

export default Register;