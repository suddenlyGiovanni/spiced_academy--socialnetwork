import React from 'react';
import axios from '../utils/axios';
import FriendshipButton from '../components/FriendshipButton';

export default class FriendshipButtonContainer extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {};
    }

    componentDidMount() {
        console.log( 'FriendshipButtonContainer - fn: componentDidMount - this.props: ', this.props );
        // axios.get('/api/getf')
        return this.setState({
            fromUserId: this.props.fromUserId,
            toUserId: this.props.toUserId
        });
    }




    handleClick() {
        console.log( 'FriendshipButtonContainer - fn: handleClick' );
        axios.post( `/api/friends/${this.state.fromUserId}/${this.props.toUserId}` )
            .then( resp => console.log( resp.data ) )
            .catch( err => console.error( err.stack ) );
    }

    render() {
        console.log( 'FriendshipButtonContainer - RENDER - this.state: ', this.state );
        return <FriendshipButton
            onClick={ e => this.handleClick(e) }/>;
    }
}
