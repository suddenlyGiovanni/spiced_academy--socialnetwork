import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chat from '../components/chat';

class ChatPublicContainer extends Component {
    constructor( props ) {
        super( props );
    }

    render() {
        console.log( 'ChatPublicContainer - RENDER - this.props: ', this.props );
        return (
            <div>
                ChatPublicContainer.js
                {
                    this.props.publicMessages &&
                    <Chat globalMessageList={this.props.publicMessages}/>
                }
            </div>
        );
    }
}

const mapStateToProps = ( state ) => {
    console.log( 'ChatPublicContainer - fn: mapStateToProps' );
    return {
        publicMessages: state.publicMessages && state.publicMessages
    };
};

export default connect( mapStateToProps )( ChatPublicContainer );
