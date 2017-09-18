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
        state = Object.assign( {}, state, {
            onlineUsers: state.onlineUsers.map( user => {
                if ( user.uid == action.userJoined.uid ) {
                    return Object.assign( {}, user, action.userJoined );
                } else {
                    return user;
                }
            } )
        } );
        break;

    }

    console.log( 'REDUX - REDUCER - State: ', state );
    return state;
};
