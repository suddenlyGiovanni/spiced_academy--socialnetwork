import axios from '../utils/axios';

export function fetchFriends() {
    console.log( 'REDUX - ACTION - fn: receiveFriends' );
    return axios.get( '/api/friends' )

        .then( result => {
            console.log( 'REDUX - ACTION - fn: receiveFriends - data', result.data.friends );
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
