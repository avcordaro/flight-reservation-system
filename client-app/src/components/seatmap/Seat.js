import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Seat extends React.Component {

    static propTypes = {
        isSelected: PropTypes.bool,
        isReserved: PropTypes.bool,
        seatNumber: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        selectSeat: PropTypes.func.isRequired
    };

    static defaultProps = {
        isSelected: false
    };

    handleClick = () => {
        !this.props.isReserved && this.props.selectSeat();
    }

    render() {
        const { isSelected, isReserved, isEnabled } = this.props;
        const className = cx('Seat',
            { 'Seat--selected': isSelected },
            { 'Seat--enabled': !isSelected && isEnabled && !isReserved},
            { 'Seat--reserved': isReserved}
        );
        return (
            <div className={className} onClick={this.handleClick}>
                <span className="SeatNumber">{this.props.seatNumber}</span>
            </div>
        );
    };
}
