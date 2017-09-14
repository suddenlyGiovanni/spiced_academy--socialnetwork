import React, { Component } from 'react';
import { connect } from 'react-redux';


class PendingFriendshipsContainer extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            pendingFriendships: {}
        };
    }

    filterPendingFriendships() {

    }

    render() {
        console.log(this.props.pendingFriendships);

        return (
            <div>PendingFriendshipsContainer</div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const mapStateToProps = ( state ) => {
    return {
        friends: state.friends
    }
};
export default connect( mapStateToProps )( PendingFriendshipsContainer );
