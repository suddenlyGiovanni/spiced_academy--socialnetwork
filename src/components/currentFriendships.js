import React from 'react';
import ProfilePicOther from './profilePicOther'

const CurrentFriendship = ( props ) => {
    const { handleFriendshipChange } = props
    console.log( props.currentFriendships );

    const listCurrentFriendships = props.currentFriendships.map( ( currentFriend ) => {
        const { uid, firstName, lastName, profilePic } = currentFriend;
        return (
            <li key={uid}>
                <ProfilePicOther
                    src={profilePic}
                    alt={`${firstName} ${lastName}`}
                    uid={uid}/>
                <h3>{firstName} {lastName}</h3>
                <button onClick={e => handleFriendshipChange( uid ) }>END FRIENDSHIP</button>
            </li>
        );
    } );

    return (
        <div style={{border: 'thin dashed gold'}}>
            CurrentFriendshipContainer
            <ul>
                {listCurrentFriendships}
            </ul>
        </div>
    );

};

export default CurrentFriendship;
