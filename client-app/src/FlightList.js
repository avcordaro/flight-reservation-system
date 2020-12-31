import React, { Component } from 'react';
import FlightListItem from './FlightListItem.js';

class FlightList extends Component {

    constructor(props) {
        super(props);
        this.handleFlightDeletion = this.handleFlightDeletion.bind(this);
        this.state = {flights: []};
    }

    handleFlightDeletion(flight_code) {
        let updatedFlights = this.state.flights.filter((flight) => flight.code !== flight_code);
        this.setState({flights: updatedFlights});
        fetch(`https://flight-reservation-system-api.herokuapp.com/flight/delete?code=${flight_code}`, 
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'text/plain'
                }
        });
    }

    componentDidMount() {
        fetch('https://flight-reservation-system-api.herokuapp.com/flight/all-chronological')
            .then(response => response.json())
            .then(data => {
                this.setState({flights: data});
            });
    }

    render() { 
        return (
            <div className="mt-3">
                {this.state.flights.map((flight) =>
                    <FlightListItem 
                        key={flight.code} 
                        type={this.props.type} 
                        flight={flight} 
                        custName={this.props.custName}
                        custEmail={this.props.custEmail} 
                        adminEmail={this.props.adminEmail}
                        onDelete={this.handleFlightDeletion}
                        history={this.props.history}
                    />
                )}
            </div>
        );
    }
}

export default FlightList;