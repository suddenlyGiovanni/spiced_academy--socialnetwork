import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chat from '../components/chat';

class ChatContainer extends Component {
    constructor( props ) {
        super( props );
    }

    render() {
        console.log( 'ChatContainer - RENDER - this.props: ', this.props );
        return (
            <div>
                ChatContainer.js
                {
                    this.props.globalMessages &&
                    <Chat globalMessageList={this.props.globalMessages}/>
                }
            </div>
        );
    }
}

const mapStateToProps = ( state ) => {
    console.log( 'ChatContainer - fn: mapStateToProps' );
    return {
        globalMessages: state.globalMessages && state.globalMessages
    };
};

export default connect( mapStateToProps )( ChatContainer );
