import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import FadeIn from 'react-fade-in';
import { AiOutlinePhone } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import Seatmap from './../seatmap/Seatmap.js';

function PageLoadValidation(props) {
    // Check if user nagivated to this page legitimately
    if (!props.history.location.state) {
        props.history.push('/login');
        return null;
    } else {
        return <ViewPassengers {...props}/>;
    }
}

class ViewPassengers extends Component {

    constructor(props) {
        super(props);
        this.state = {passengers:[], rows: [], loadSeatmap: false, loadPassengers: false};
        this.historyState = this.props.history.location.state;
    }

    componentDidMount() {
        fetch(`https://flight-reservation-system-api.herokuapp.com/flight/occupied-seats?code=${this.historyState.flight.code}`)
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
                this.setState(prevState => ({
                    ...prevState,
                    rows: rows,
                    loadSeatmap: true
                }));   
        });

        fetch(`https://flight-reservation-system-api.herokuapp.com/booking/find-by-flight?flightCode=${this.historyState.flight.code}`)
            .then(response => response.json())
            .then(data => {
                this.setState(prevState => ({
                    ...prevState,
                    passengers: data,
                    loadPassengers: true
                }));   
        });
    }

    render() {
        const flight = this.historyState.flight;
        return (
            <FadeIn transitionDuration="750">
                <Container className="p-5" style={{ width: '45rem' }}>
                    <Row className="justify-content-center mb-5">
                        <h3>
                            Passenger List
                        </h3>
                    </Row>
                    <Row className="justify-content-end">
                        <Button 
                            variant="primary" 
                            className="mr-3" 
                            onClick={() => 
                                this.props.history.push('/admin', {adminEmail: this.historyState.adminEmail})
                            }
                        >
                            Back
                        </Button>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                            <h6 className="mb-3 mt-3">Flight code: {flight.code}</h6>
                            <h6 className="mb-3"><FaPlaneDeparture/> {flight.source} <BsArrowRight/> {flight.destination} <FaPlaneArrival/></h6>
                            <h5 className="mb-4">{flight.departure.substr(0, 5)} <BsArrowRight/> {flight.arrival.substr(0, 5)}</h5>
                            <hr/>
                            {this.state.loadPassengers &&
                                <Table striped bordered hover className="mt-3">
                                    <thead>
                                        <tr>
                                            <th>Seat</th>
                                            <th>Passenger</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.passengers.map(passenger => (
                                            <tr key={passenger.seatNumber}>
                                                <td>{passenger.seatNumber}</td>
                                                <td>
                                                    {passenger.firstname} {passenger.lastname}, aged {passenger.age}<br/>
                                                    <AiOutlinePhone/> {passenger.phone}<br/>
                                                    <HiOutlineMail/> {passenger.accountEmail}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            }
                        </Col>
                        <Col sm="auto">
                            <h5 className="mb-4 mt-3 text-center">Occupied Seats</h5>
                            {this.state.loadSeatmap && <Seatmap readOnly rows={this.state.rows} addSeatCallback={() => null} removeSeatCallback={() => null}/>}
                        </Col>
                    </Row>
                </Container>
            </FadeIn>
        );
    }
}
export default PageLoadValidation;
