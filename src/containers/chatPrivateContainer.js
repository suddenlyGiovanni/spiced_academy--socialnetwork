import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chat from '../components/chat';

class ChatPrivateContainer extends Component {
    constructor( props ) {
        super( props );
    }

    render() {
        console.log( 'ChatPrivateContainer - RENDER - this.props: ', this.props );
        const { privateMessages } = this.props;
        const { otherUid } = this.props.routeParams;
        console.log( `otherUid: ${otherUid}` );

        const filteredPrivateMessages = privateMessages && privateMessages.filter( messenger => {
            return ( messenger.fromUserId === otherUid || messenger.toUserId === otherUid )
        } );
        return (
            <div>
                ChatPrivateContainer.js
                {
                    privateMessages &&
                    <Chat globalMessageList={privateMessages}/>
                }


            </div>
        );
    }
}

const mapStateToProps = ( state ) => {
    console.log( 'ChatPrivateContainer - fn: mapStateToProps' );
    return {
        privateMessages: state.privateMessages && state.privateMessages,
        currentUser: state.user && state.user
    };
};

export default connect( mapStateToProps )( ChatPrivateContainer );
