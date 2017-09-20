import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chat from '../components/chat';

class ChatPrivateContainer extends Component {
    constructor( props ) {
        super( props );
    }

    render() {
        console.log( 'ChatPrivateContainer - RENDER - this.props: ', this.props );
        return (
            <div>
                ChatContainer.js
                {
                    this.props.privateMessages &&
                    <Chat globalMessageList={this.props.privateMessages}/>
                }


            </div>
        );
    }
}

const mapStateToProps = ( state ) => {
    console.log( 'ChatContainer - fn: mapStateToProps' );
    return {
        privateMessages: state.privateMessages && state.privateMessages
    };
};

export default connect( mapStateToProps )( ChatPrivateContainer );
