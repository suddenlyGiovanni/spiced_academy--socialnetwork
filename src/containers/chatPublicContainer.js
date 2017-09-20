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
                    this.props.globalMessages &&
                    <Chat globalMessageList={this.props.globalMessages}/>
                }
            </div>
        );
    }
}

const mapStateToProps = ( state ) => {
    console.log( 'ChatPublicContainer - fn: mapStateToProps' );
    return {
        globalMessages: state.globalMessages && state.globalMessages
    };
};

export default connect( mapStateToProps )( ChatPublicContainer );
