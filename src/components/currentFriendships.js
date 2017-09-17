import React from 'react';
import ProfilePicOther from './profilePicOther';

const CurrentFriendship = ( props ) => {
    console.log( 'CurrentFriendship - RENDER - this.props: ', props );
    const { handleFriendshipChange } = props;
    const listCurrentFriendships = props.currentFriendships.map( ( currentFriend ) => {
        const { uid, firstName, lastName, profilePic } = currentFriend;
        return (
            <li key={uid}>
                <ProfilePicOther
                    src={profilePic}
                    alt={`${firstName} ${lastName}`}
                    uid={uid}/>
                <h3>{firstName} {lastName}</h3>
                <button onClick={() => handleFriendshipChange( uid, 'TERMINATED' ) }>END FRIENDSHIP</button>
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
