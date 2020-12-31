import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row.js';
import { Map, Set } from 'immutable/dist/immutable.min.js';
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
            selectedSeats: Map(),
            width: seatWidth * Math.max.apply(null, rows.map(row => row.length))
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.selectedSeats !== this.state.selectedSeats;
    }

    selectSeat = (row, number) => {
        if(!this.props.readOnly) {
            const { selectedSeats } = this.state;
            const seatAlreadySelected = selectedSeats.get(row, Set()).includes(number);

            if (!seatAlreadySelected) {
                this.setState({
                    selectedSeats: Map({[row]: Set([number])}),
                }, () => this.props.addSeatCallback(row, number));
            } else {
                this.setState({
                    selectedSeats: Map(),
                }, () => this.props.removeSeatCallback(row, number))
            }
        }
    }

    render() {
        const { width } = this.state;
        return <div style={{ width }}>{ this.renderRows() }</div>;
    };

    renderRows() {
        const { selectedSeats: seats } = this.state;
        const { alpha } = this.props;
        return this.props.rows.map((row, index) => {
            const rowNumber = alpha ?
                String.fromCharCode('A'.charCodeAt(0) + index) :
                (index + 1).toString();
            const isSelected = !seats.get(rowNumber, Set()).isEmpty();
            const props = {
                rowNumber,
                isSelected,
                selectedSeat: null,
                seats: row,
                key: `Row${rowNumber}`,
                selectSeat: this.selectSeat
            };

            return (
                <Row  {...props}>
                    {this.renderSeats(row, rowNumber, isSelected)}
                </Row>
            );
        });
    };

    renderSeats(seats, rowNumber, isRowSelected) {
        const { selectedSeats, size } = this.state;
        const { maxReservableSeats } = this.props;
        return seats.map((seat, index) => {
            if (seat === null) return <Blank key={index}/>;
            const isSelected = isRowSelected && selectedSeats.get(rowNumber).includes(seat.number);
            const props = {
                isSelected,
                isReserved: seat.isReserved,
                isEnabled: size < maxReservableSeats,
                selectSeat: this.selectSeat.bind(this, rowNumber, seat.number),
                seatNumber: seat.number,
                key: index
            };
            return <Seat {...props} />;
        });
    }
}
