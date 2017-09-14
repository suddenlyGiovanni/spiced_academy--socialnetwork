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

export function updateFriendship( uid ) {
    return console.log( `REDUX - ACTION - fn: updateFriendship ${uid}` );
}
