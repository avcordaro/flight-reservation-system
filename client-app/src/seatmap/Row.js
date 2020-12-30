import React from 'react';
import cx from 'classnames';

export default class Row extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            over: false
        };
    }

    handleMouseMove = (over) => {
        this.setState({ over });
    }

    render() {
        const { isSelected } = this.props;
        const className = cx(
            'Row',
            { 'Row--enabled': !isSelected },
            { 'Row--selected': isSelected }
        );
        return (
            <div
                className={className}
                onMouseOut={this.handleMouseMove.bind(this, false)}
                onMouseOver={this.handleMouseMove.bind(this, true)}
            >
                {this.props.children}
            </div>
        );
    }
}
