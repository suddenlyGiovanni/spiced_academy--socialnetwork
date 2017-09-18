// SOCKETio.js
import * as io from 'socket.io-client';
import axios from './axios';
import { store } from '../shell';
// import {} from '../actions/actions';

let socket;

const getSocket = () => {
    if ( !socket ) {
        socket = io.connect();


        socket.on( 'connect', function () {
            axios.post( `/ws/connected/${socket.id}` )
                .then( resp => console.log( resp.data ) )
                .catch( err => console.log( err ) );
        } );


        socket.on( 'welcome', function ( data ) {
            console.log( data );
            socket.emit( 'thanks', {
                message: 'Thank you. It is great to be here.'
            } );
        } );


        socket.on( 'onlineUsers', ( data ) => {
            console.log( data );
        } );


        socket.on( 'userJoined', ( data ) => {
            console.log( data );
        } );


        socket.on( 'userLeft', ( data ) => {
            console.log( data );
        } );

        // socket.on( 'connect', () => {
        //     axios.post( `/api/connected/${soket.io}` );
        // } );

        // socket.on( 'userJoined', function ( payload ) {
        //     store.dispatch( {
        //         type: 'USER_JOINED',
        //         user: payload.user
        //     } )
        // } );

    }
    return socket;
};

export default getSocket;
