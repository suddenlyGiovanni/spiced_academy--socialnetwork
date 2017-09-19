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
        // // BUG: FIX ME!!!!!

        console.log( 'CASE: ADD_ONLINE_USER: ', '\n state:', state, '\n action: ', action );
        state = Object.assign( {}, state, {
            onlineUsers: state.onlineUsers.map( user => {
                // if userJoined is already in the array

                if ( user.uid === action.userJoined.uid ) {
                    console.log('user is INSIDE of onlineUsers');
                    // then replace it with newer version of itself
                    const replacedUser =  Object.assign( {}, action.userJoined );
                    console.log('replacedUser', replacedUser);
                    return replacedUser;
                }
                // else just add it to the list of onlineUsers
                else {
                    // make a copy of the array
                    var newOnlineUsers = state.onlineUsers.slice();
                    // add a new obj to the array
                    newOnlineUsers.push( action.userJoined );

                    // const newState = Object.assign( {}, state, { onlineUsers: newOnlineUsers } );
                    console.log('newOnlineUsers', newOnlineUsers);
                    return newOnlineUsers;
                }
            } )
        } );

        break;

    }

    console.log( 'REDUX - REDUCER - State: ', state );
    return state;
};
