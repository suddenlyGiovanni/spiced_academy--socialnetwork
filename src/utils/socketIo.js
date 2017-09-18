// SOCKETio.js
import * as io from 'socket.io-client';
import axios from './axios';
import { store } from '../shell';
import { connectLoggedInUser, createOnlineUsers, addOnlineUser } from '../actions/actions';

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
            store.dispatch( createOnlineUsers( onlineUsers ) )
        } );


        socket.on( 'userJoined', ( userJoined ) => {
            console.log( 'Socket.io Event: userJoined', userJoined );
            store.dispatch( addOnlineUser( userJoined ) );
        } );


        socket.on( 'userLeft', ( data ) => {
            console.log( 'Socket.io Event: userLeft', data );
        } );

    }
    return socket;
};

export default getSocket;
