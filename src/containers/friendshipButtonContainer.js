import React from 'react';
import axios from '../utils/axios';
import FriendshipButton from '../components/friendshipButton';

export default class FriendshipButtonContainer extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            currentUserId: props.currentUserId,
            otherUserId: props.otherUserId,
            fromUserId: '',
            toUserId: '',
            status: '',
            btnAction: ''
        };
    }

    componentDidMount() {
        console.log( 'FriendshipButtonContainer - fn: componentDidMount - this.props: ', this.props );
        // this.setState( {
        //     fromUserId: this.props.fromUserId,
        //     toUserId: this.props.toUserId
        // } );
        // R:   READ    -   GET     -   /api/friends/:fromUserId/:toUserI   SEE FRIENDSHIP STATUS OF TWO USERS
        axios.get( `/api/friends/${this.state.currentUserId}/${this.props.otherUserId}` )
            .then( resp => {
                if ( resp.data.success ) {
                    this.setState( resp.data );
                    return this.setBtnAction();
                } else {
                    throw 'ERR: FriendshipButtonContainer - fn: componentDidMount - unable to retrieve data';
                }
            } )
            .catch( err => console.error( err ) );
    }

    setBtnAction() {
        const { status, currentUserId, fromUserId, toUserId } = this.state;
        if ( !status || status == 'CANCELED' ) {
            return this.setState( { btnAction: 'make friend request' } );
        } else if ( status == 'PENDING' && currentUserId == fromUserId ) {
            return this.setState( { btnAction: 'cancel' } );
        } else if ( status == 'PENDING' && currentUserId == toUserId ) {
            return this.setState( { btnAction: 'accept' } );
        } else if ( status == 'ACCEPTED' ) {
            return this.setState( { btnAction: 'terminate' } );
        } else if ( status == 'TERMIONATED' ) {
            return this.setState( { btnAction: 'disabled' } );
        }
    }


    handleClick() {
        console.log( 'FriendshipButtonContainer - fn: handleClick' );
        axios.put( `/api/friends/${this.state.fromUserId}/${this.props.toUserId}/delete`, { status: 'CANCEL' } )
            .then( resp => console.log( resp.data ) )
            .catch( err => console.error( err.stack ) );
    }

    render() {

        console.log( 'FriendshipButtonContainer - RENDER - this.state: ', this.state );
        return <FriendshipButton
            onClick={ e => this.handleClick(e) }/>;
    }
}
