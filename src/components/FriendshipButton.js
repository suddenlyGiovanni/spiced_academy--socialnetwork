import React from 'react';

const FriendshipButton = (props) => {
    return(
        <button onClick={props.onClick}>{props.action}temp</button>
    );
};

export default FriendshipButton;
