// ROUTE: --> /ws/
const router = require( 'express' ).Router(),
    db = require( '../modules/dbQuery' ),
    io = require( '../index' ).io;


// SOCKET.IO WS:
// define constructor function that gets `io` send to it
// function( io ) {
// };
io.on( 'connection', ( socket ) => {
    console.log( `socket with the id ${socket.id} is now connected` );

    socket.on( 'disconnect', () => {
        console.log( `socket with the id ${socket.id} is now disconnected` );
        // remove here the disconnected socket from the list of online users
        console.log( 'onlineUsers: ', onlineUsers );
        const disconnectedUser = onlineUsers.find( user => user.socketId == socket.id );
        console.log( 'disconnectedUser: ', disconnectedUser );
        const index = onlineUsers.indexOf( disconnectedUser );
        console.log( 'index: ', index );
        console.log( onlineUsers.splice( index, 1 ) );
        console.log( 'new onlineUsers: ', onlineUsers );

    } );

    socket.on( 'thanks', function ( data ) {
        console.log( data );
    } );

    socket.emit( 'welcome', {
        message: 'Welcome. It is nice to see you'
    } );
} );
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function makeSureUserIsLoggedIn( req, res, next ) {
    console.log( 'webSocket.js - fn: makeSureUserIsLoggedIn' );
    next();
}

// function getUsersByIds(arrayOfIds) {
//     const query = `SELECT * FROM users WHERE id = ANY($1)`;
//     return db.query(query, [arrayOfIds]);
// }


let onlineUsers = [];
/* exemple...
onlineUsers = [
    {
        socketId: 'wJdwDQAKhUuXxZ2vAAAA',
        uid: 1
    }
]
*/

// SOCKET.IO ROUTES
router.post( '/connected/:socketId', makeSureUserIsLoggedIn, ( req, res ) => {
    const uid = req.session.user.uid;
    const socketId = req.params.socketId;

    const socketAlreadyThere = onlineUsers.find( user => user.socketId == socketId );
    const userAlreadyThere = onlineUsers.find( user => user.userId == uid );

    console.log( `API: method: POST /ws/connected/:${socketId} - uid: ${uid} - onlineUsers: `, onlineUsers );

    if ( !socketAlreadyThere && io.sockets.sockets[ socketId ] ) {
        onlineUsers.push( { socketId, uid } );

        return db.readAllUsersByIds( onlineUsers.map( user => user.uid ) )

            .then( ( users ) => {
                console.log( 'results: readAllUsersByIds - users: ', users );
                io.sockets.sockets[ socketId ].emit( 'onlineUsers', users );
                res.json( { success: true } );
            } )

            .catch( err => console.log( err ) );


        !userAlreadyThere && io.sockets.emit( 'userJoined' );
    }
} );




/* MODULE EXPORTS */
module.exports = router;
// module.exports.io = io;
