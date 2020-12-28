import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleLogin(event) {
        event.preventDefault();
        console.log("Email: " + this.state.email);
        console.log("Password: " + this.state.password);
        this.props.history.push("/");    
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
                    <Col lg={4}>
                        <Form>
                            <Form.Group>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.handleEmailChange}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Link to={'/register'}>
                        <Button variant="primary" className="mt-3 mx-2">
                            Register
                        </Button>
                    </Link>
                    <Button variant="primary" type="submit" onClick={this.handleLogin} className="mt-3 mx-2">
                        Login
                    </Button>
                </Row>
            </Container>
        );
    }
}

export default Login;