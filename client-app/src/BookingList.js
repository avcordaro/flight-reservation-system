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
    }

    componentDidMount() {
        fetch(`http://localhost:8080/booking/find-by-account?email=${this.props.custEmail}`)
            .then(response => response.json())
            .then(data => {
                this.setState({bookings: data});
            });

    }

    render() { 
        return (
            <div className="mt-3">
                {this.state.bookings.map((booking) =>
                    <BookingListItem key={booking.id} booking={booking} custEmail={this.props.custEmail} onDelete={this.handleBookingDeletion}/>
                )}
            </div>
        );
    }
}

export default BookingList;