import React, { Component } from 'react';
import getSocket from '../utils/socketIo';

export default class Chat extends Component {
    constructor( props ) {
        super( props );
    }

    componentDidMount() {
        this.newMessage.addEventListener( 'keydown', ( e ) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                console.log(e.target.value);
                getSocket().emit('chatMessage', e.target.value);
            }
        } );
    }

    componentDidUpdate() {}

    render() {
        console.log( 'Chat - RENDER - this.props: ', this.props );

        return (
            <div>
                Chat.js
                <div id="chat-messages" ref={elem => this.elem = elem}>
                    messages go here
                </div>
                <textarea
                    name='newMessage'
                    maxLength='300'
                    placeholder='Please somebody answer me..'
                    ref={newMessage => this.newMessage = newMessage}>
                </textarea>
            </div>
        );
    }
}
