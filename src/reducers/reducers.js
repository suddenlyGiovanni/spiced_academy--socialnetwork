export default ( state = {}, action ) => {
    console.log( 'REDUX - REDUCER - Action: ', action );

    switch ( action.type ) {


    case 'FETCH_FRIENDS':
        state = Object.assign( {}, state, { friends: action.friends } );
        break;


    case 'UPDATE_FRIENDSHIP':
        state = Object.assign( {}, state, {
            friends: state.friends.map( friend => {
                if (friend.uid == action.toUserId) {
                    return Object.assign({}, friend, {
                        status : action.status
                    });
                } else {
                    return friend;
                }
            } )
        } );
        break;
    }

    console.log( 'REDUX - REDUCER - State: ', state );
    return state;
};
