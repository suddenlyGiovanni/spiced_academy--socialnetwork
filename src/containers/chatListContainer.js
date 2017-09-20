import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ChatListContainer extends Component {
    constructor( props ) {
        super( props );
    }

    render() {
        console.log( 'ChatListContainer - RENDER - this.props: ', this.props );
        return (
            <div>
                ChatListContainer.js
                <ul>
                    <li>
                        <Link to='/chat/public'>PUBLIC CHAT</Link>
                    </li>
                    <li>
                        <Link to='/chat/private/2'>PRIVATE CHAT: toUserId:2</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = ( state ) => {
    console.log( 'ChatListContainer - fn: mapStateToProps' );
    return {
        publicMessages: state.publicMessages && state.publicMessages,
        privateMessages: state.privateMessages && state.privateMessages,
    };
};

export default connect( mapStateToProps )( ChatListContainer );
