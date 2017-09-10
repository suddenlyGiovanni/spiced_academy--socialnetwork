import React from 'react';
import ProfilePic from './profilePic';
import PropTypes from 'prop-types';

const ProfileOther = ( props ) => {
    console.log( 'React Component: ProfileOther - RENDER - this.props: ', props );
    const {
        profilePic,
        firstName,
        lastName
    } = props;
    return (
        <div style={{border:'medium dotted blue'}}>
            <p>ProfileOther</p>
            <ProfilePic
                src={profilePic}
                alt={firstName + ' ' + lastName}/>
        </div>
    );
};

ProfileOther.propTypes = {
    profilePic: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string
};

export default ProfileOther;
