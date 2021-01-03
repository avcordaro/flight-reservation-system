import React, { Component } from 'react';
import BookingListItem from './BookingListItem.js';

class BookingList extends Component {

    constructor(props) {
        super(props);
        this.handleBookingDeletion = this.handleBookingDeletion.bind(this);
        this.state = {bookings: []};
    }

    handleBookingDeletion(booking_id) {
        let updatedBookings = this.state.bookings.filter((booking) => booking.id !== booking_id);
        this.setState({bookings: updatedBookings});
        fetch(`https://flight-reservation-system-api.herokuapp.com/booking/delete?id=${booking_id}`, 
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'text/plain'
                }
        });
    }

    componentDidMount() {
        fetch(`https://flight-reservation-system-api.herokuapp.com/booking/find-by-account?email=${this.props.custEmail}`)
            .then(response => response.json())
            .then(data => {
                this.setState({bookings: data});
            });

    }

    render() { 
        return (
            <div className="mt-3">
                {this.state.bookings.map((booking) =>
                    <BookingListItem 
                        key={booking.id} 
                        history={this.props.history}
                        booking={booking} 
                        custName={this.props.custName} 
                        custEmail={this.props.custEmail} 
                        onDelete={this.handleBookingDeletion}
                    />
                )}
            </div>
        );
    }
}

export default BookingList;