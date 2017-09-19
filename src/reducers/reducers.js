export default ( state = {}, action ) => {
    console.log( 'REDUX - REDUCER - Action: ', action );

    switch ( action.type ) {


    case 'FETCH_FRIENDS':
        state = Object.assign( {}, state, { friends: action.friends } );
        break;


    case 'UPDATE_FRIENDSHIP':
        state = Object.assign( {}, state, {
            friends: state.friends.map( friend => {
                if ( friend.uid == action.toUserId ) {
                    return Object.assign( {}, friend, {
                        status: action.status
                    } );
                } else {
                    return friend;
                }
            } )
        } );
        break;


    case 'CONNECT_LOGGEDIN_USER':
        // state = Object.assign( {}, state);
        break;


    case 'CREATE_ONLINE_USERS':
        state = Object.assign( {}, state, { onlineUsers: action.onlineUsers } );
        break;


    case 'ADD_ONLINE_USER':
        // BUG: FIX ME!!!!!

        console.log( 'ADD_ONLINE_USER - state:', state );
        console.log( 'ADD_ONLINE_USER - userjoined:', action.userJoined );
        var newOnlineUsers = state.onlineUsers.slice();
        newOnlineUsers.push(action.userJoined);

        console.log( 'ADD_ONLINE_USER - slice: ', newOnlineUsers );

        var newState = Object.assign( {}, state, { onlineUsers: newOnlineUsers } );
        console.log( 'ADD_ONLINE_USER - newState: ', newState );
        return newState;

        // state = Object.assign( {}, state, {
        //     onlineUsers: state.onlineUsers.map( user => {
        //         if ( user.uid == action.userJoined.uid ) {
        //             return Object.assign( {}, user, action.userJoined );
        //         } else {
        //             return user;
        //         }
        //     } )
        // } );
        break;

    }

    console.log( 'REDUX - REDUCER - State: ', state );
    return state;
};
