import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { fetchFriends, updateFriendship } from '../actions/actions';
import PendingFriendships from '../components/pendingFriendships';
import CurrentFriendships from '../components/currentFriendships';

class FriendsContainer extends Component {
    constructor( props ) {
        super( props );
        this.state = {};
        this.handleFriendshipChange = this.handleFriendshipChange.bind( this );
    }

    componentDidMount() {
        this.props.fetchFriends();
    }

    handleFriendshipChange( uid ) {
        this.props.updateFriendship( uid );
    }

    render() {
        console.log( 'FriendsContainer - RENDER - this.props: ', this.props );
        const { pendingFriendships, currentFriendships } = this.props;

        if ( !pendingFriendships && currentFriendships ) {
            return <div>Loading friendships...</div>;
        }

        return (
            <div>
                <h1>FriendContainer</h1>
                {
                    pendingFriendships &&
                    <PendingFriendships
                        pendingFriendships={pendingFriendships}
                    />
                }
                {
                    currentFriendships &&
                    <CurrentFriendships
                        currentFriendships={currentFriendships}
                        handleFriendshipChange={ uid => this.handleFriendshipChange( uid )}/>
                }
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const mapStateToProps = ( state ) => {
    console.log( 'FriendsContainer - fn: mapStateToProps - state:' );
    return {
        pendingFriendships: state.friends &&
            state.friends.filter( friend => friend.status === 'PENDING' ),
        currentFriendships: state.friends &&
            state.friends.filter( friend => friend.status === 'ACCEPTED' )
    };
};

// Get actions and pass them as props to to FriendsContainer
const mapDispatchToProps = ( dispatch ) => ( {
    fetchFriends: () => dispatch( fetchFriends() ),
    updateFriendship: ( uid ) => dispatch( updateFriendship( uid ) )

} );

export default connect( mapStateToProps, mapDispatchToProps )( FriendsContainer );
