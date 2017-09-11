import React from 'react';
import PropTypes from 'prop-types';
// import axios from '../utils/axios';

export default class Welcome extends React.Component {
    constructor( props ) {
        super( props );
    }
    render() {
        console.log( 'Welcome - RENDER - this.props: ', this.props );
        return (
            <div style={{ border: 'medium dotted purple' }}>
                <h1>Welcome Component</h1>
                {this.props.children}
            </div>
        );
    }
}

Welcome.propTypes = {
    children : PropTypes.element
};
