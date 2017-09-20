// SOCKETio.js
import * as io from 'socket.io-client';
import { store } from '../shell';
import {
    connectLoggedInUser,
    createOnlineUsers,
    addOnlineUser,
    removeOnlineUser,
    createPublicMessageList,
    addNewPublicMessage
} from '../actions/actions';

let socket;

const getSocket = () => {
    if ( !socket ) {
        socket = io.connect();


        socket.on( 'connect', () => {
            console.log( `Socket.io Event: connect - socketId: ${socket.id}` );
            store.dispatch( connectLoggedInUser( socket.id ) );
        } );


        socket.on( 'onlineUsers', ( onlineUsers ) => {
            console.log( 'Socket.io Event: onlineUsers', onlineUsers );
            store.dispatch( createOnlineUsers( onlineUsers ) );
        } );


        socket.on( 'userJoined', ( userJoined ) => {
            console.log( 'Socket.io Event: userJoined', userJoined );
            store.dispatch( addOnlineUser( userJoined ) );
        } );


        socket.on( 'userLeft', ( uid ) => {
            console.log( 'Socket.io Event: userLeft', uid );
            store.dispatch( removeOnlineUser( uid ) );
        } );

        socket.on( 'chatMessages', ( publicMessageList ) => {
            console.log( 'Socket.io Event: chatMessages', publicMessageList );
            store.dispatch( createPublicMessageList( publicMessageList ) );
        } );


        socket.on( 'publicChatMessages', ( newPublicMessage ) => {
            console.log( 'Socket.io Event: publicChatMessages' );
            store.dispatch( addNewPublicMessage( newPublicMessage ) );
        } );

    }
    return socket;
};

export default getSocket;
