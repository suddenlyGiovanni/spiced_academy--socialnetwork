import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFriends, updateFriendship } from '../actions/actions'
import PendingFriendships from '../components/pendingFriendships';
import CurrentFriendships from '../components/currentFriendships';

class FriendsContainer extends Component {
    constructor( props ) {
        super( props );
        this.state = {};
        this.handleFriendshipChange = this.handleFriendshipChange.bind( this );
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

    handleFriendshipChange( uid ) {
        // console.log( `handleFriendshipChange ${uid}` );
        // note to self "uid" is the target friend uid
        this.props.dispatch( updateFriendship(uid) );
    }

    render() {
        const { pendingFriendships, currentFriendships } = this.state;
        if ( !this.props.friends ) {
            return null;
        }
        return (
            <div>
                <h1>FriendContainer</h1>
                <PendingFriendships
                    pendingFriendships={pendingFriendships}
                />
                <CurrentFriendships
                    currentFriendships={currentFriendships}
                    handleFriendshipChange={ uid => this.handleFriendshipChange( uid )}/>
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const mapStateToProps = ( state ) => {
    return { friends: state.friends.friends };
};


export default connect( mapStateToProps )( FriendsContainer );
