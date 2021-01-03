import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';

class PageNotFound extends Component {

    render() {
        return (
            <div className="m-5">
                <h2>404 - Page not found</h2>
                <Alert.Link href="/">Home</Alert.Link>
            </div>
        );
    }
}

export default PageNotFound;
