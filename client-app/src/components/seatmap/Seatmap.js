import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row.js';
import Seat from './Seat.js';
import Blank from './Blank.js';
import './main.css'

export default class Seatmap extends React.Component {

    static propTypes = {
        addSeatCallback: PropTypes.func,
        removeSeatCallback: PropTypes.func,
        rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
            number: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]).isRequired,
            isReserved: PropTypes.bool
        }))).isRequired,
        seatWidth: PropTypes.number
    };

    static defaultProps = {
        seatWidth: 30
    };

    constructor(props) {
        super(props);
        const { rows, seatWidth } = props;
        this.state = {
            selectedSeat: this.props.selectedSeat,
            width: seatWidth * Math.max.apply(null, rows.map(row => row.length))
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.selectedSeat !== this.state.selectedSeat;
    }

    selectSeat = (row, number) => {
        if(!this.props.readOnly) {
            const seatAlreadySelected = this.state.selectedSeat === number ? true : false;

            if (!seatAlreadySelected) {
                this.setState({
                    selectedSeat: number,
                }, () => this.props.addSeatCallback(row, number));
            } else {
                this.setState({
                    selectedSeats: null,
                }, () => this.props.removeSeatCallback(row, number))
            }
        }
    }

    render() {
        const { width } = this.state;
        return <div style={{ width }}>{ this.renderRows() }</div>;
    };

    renderRows() {
        return this.props.rows.map((row, index) => {
            const rowNumber = (index + 1).toString();
            const props = {
            	isEnabled: !this.props.readOnly,
                seats: row,
                key: `Row${rowNumber}`
            };

            return (
                <Row  {...props}>
                    {this.renderSeats(row, rowNumber)}
                </Row>
            );
        });
    };

    renderSeats(seats, rowNumber) {
        return seats.map((seat, index) => {
            if (seat === null) return <Blank key={index}/>;
            const isSelected = seat.number === this.state.selectedSeat ? true : false;
            const props = {
                isSelected,
                isEnabled: !this.props.readOnly,
                isReserved: seat.isReserved,
                selectSeat: this.selectSeat.bind(this, rowNumber, seat.number),
                seatNumber: seat.number,
                key: index
            };
            return <Seat {...props} />;
        });
    }
}
