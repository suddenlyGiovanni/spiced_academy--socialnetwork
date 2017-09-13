const reducer = ( state = {}, action ) => {
    console.log( 'REDUX - REDUCER - Action: ', action );

    if ( action.type == 'RECEIVE_FRIENDS' ) {
        state = Object.assign( {}, state, {
            friends: action.friends
        } );
    }

    console.log( 'REDUX - REDUCER - State: ', state );
    return state;
};

export default reducer;
