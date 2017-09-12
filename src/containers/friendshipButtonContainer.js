import React from 'react';
import axios from '../utils/axios';
import FriendshipButton from '../components/FriendshipButton';

export default class FriendshipButtonContainer extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            fromUserId: props.fromUserId
        };
    }

    componentDidMount() {
        console.log( 'FriendshipButtonContainer - fn: componentDidMount - this.props: ', this.props );
        this.setState( {
            fromUserId: this.props.fromUserId,
            toUserId: this.props.toUserId
        } );
        // R:   READ    -   GET     -   /api/friends/:fromUserId/:toUserI   SEE FRIENDSHIP STATUS OF TWO USERS
        axios.get( `/api/friends/${this.state.fromUserId}/${this.props.toUserId}` )
            .then( resp => console.log( resp ) )
            .catch( err => console.error( err ) );
    }




    handleClick() {
        console.log( 'FriendshipButtonContainer - fn: handleClick' );
        axios.put( `/api/friends/${this.state.fromUserId}/${this.props.toUserId}/delete`, { status: 'CANCE' } )
            .then( resp => console.log( resp.data ) )
            .catch( err => console.error( err.stack ) );
    }

    render() {
        console.log( 'FriendshipButtonContainer - RENDER - this.state: ', this.state );
        return <FriendshipButton
            onClick={ e => this.handleClick(e) }/>;
    }
}
