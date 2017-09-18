import axios from '../utils/axios';




export function fetchFriends() {
    console.log( 'REDUX - ACTION - fn: fetchFriends' );

    return axios.get( '/api/friends' )

        .then( result => {
            console.log( 'REDUX - ACTION - fn: fetchFriends - data', result.data.friends );
            return {
                type: 'FETCH_FRIENDS',
                friends: result.data.friends
            };
        } )

        .catch( err => {
            console.log( err );
            return { type: 'ERROR' };
        } );
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




export function updateFriendship( fromUserId, toUserId, status ) {

    console.log( `REDUX - ACTION - fn: updateFriendship
        fromUserId: ${fromUserId},
        toUserId: ${toUserId},
        status: ${status}` );

    return axios.put( `/api/friends/${fromUserId}/${toUserId}`, { status: status } )

        .then( result => {
            console.log( 'REDUX - ACTION - fn: updateFriendship - data', result.data );
            return {
                type: 'UPDATE_FRIENDSHIP',
                status: result.data.status,
                fromUserId: result.data.fromUserId,
                toUserId: result.data.toUserId
            };
        } )

        .catch( err => {
            console.log( err );
            return { type: 'ERROR' };
        } );
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




export function connectLoggedInUser( socketId ) {
    console.log( 'REDUX - ACTION - fn: connectLoggedInUser' );
    return axios.post( `/ws/connected/${socketId}` )

        .then( () => {
            return { type: 'CONNECT_LOGGEDIN_USER' };
        } )

        .catch( err => console.log( err ) );
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




export function createOnlineUsers( onlineUsers ) {
    console.log( 'REDUX - ACTION - fn: createOnlineUsers' );
    return {
        type: 'CREATE_ONLINE_USERS',
        onlineUsers
    };
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




export function addOnlineUser( userJoined ) {
    console.log( 'REDUX - ACTION - fn: addOnlineUser' );
    return {
        type: 'ADD_ONLINE_USER',
        userJoined
    };
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




export function removeOnlineUser() {
    console.log( 'REDUX - ACTION - fn: removeOnlineUser' );
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
