import React, { Component } from 'react';
import { connect } from 'react-redux';


class CurrentFriendshipContainer extends Component {

    constructor( props ) {
        super( props );
    }

    render() {
        console.log( this.props.currentFriendships );
        return (
            <div>CurrentFriendshipContainer</div>
        );
    }
}

const mapStateToProps = ( state ) => {
    return { friends: state.friends };
};
export default connect( mapStateToProps )( CurrentFriendshipContainer );
