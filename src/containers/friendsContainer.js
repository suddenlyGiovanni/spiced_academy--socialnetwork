import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFriends } from '../actions/actions'
import PendingFriendshipsContainer from './pendingFriendshipsContainer';
import CurrentFriendshipContainer from './currentFriendshipsContainer';

class FriendsContainer extends Component {
    constructor( props ) {
        super( props );
        this.state = {};
    }

    componentDidMount() {
        this.props.dispatch( fetchFriends() );
    }

    componentWillReceiveProps( props ) {
        const { friends } = props;
        this.setState( {
            pendingFriendships: friends.filter( friend => friend.status === 'PENDING' ),
            currentFriendships: friends.filter( friend => friend.status === 'ACCEPTED' )
        } );
    }

    render() {
        const { pendingFriendships, currentFriendships } = this.state;
        if ( !this.props.friends ) {
            return null;
        }
        return (
            <div>
                <h1>FriendContainer</h1>
                <PendingFriendshipsContainer pendingFriendships={pendingFriendships}/>
                <CurrentFriendshipContainer currentFriendships={currentFriendships}/>
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const mapStateToProps = ( state ) => {
    return { friends: state.friends.friends };
};


export default connect( mapStateToProps )( FriendsContainer );
