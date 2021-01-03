import React from 'react';
import cx from 'classnames';

export default class Row extends React.Component {

    render() {
        const className = cx(
            'Row',
            { 'Row--enabled': this.props.isEnabled }
        );
        return (
            <div className={ className }>
                {this.props.children}
            </div>
        );
    }
}
