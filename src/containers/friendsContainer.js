import React from 'react';
import { connect } from 'react-redux';
import { receiveFriends } from '../actions/actions'




class FriendsContainer extends React.Component {
    constructor( props ) {
        super( props );
    }

    componentDidMount() {
        this.props.dispatch(receiveFriends());
    }

    render() {
        return <div>FriendContainer</div>;
    }
}

const mapStateToProps = function ( state ) {
    return {
        friends: state.friends
    };
};

const connectFriendsContainer = connect( mapStateToProps );
const ConnectedFriendsContainer = connectFriendsContainer( FriendsContainer );
export default ConnectedFriendsContainer;
// exports default connect(mapStateToProps)( FriendsContainer );
