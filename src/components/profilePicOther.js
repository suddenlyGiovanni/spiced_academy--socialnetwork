import React from 'react';
import { Link } from 'react-router';

const ProfilePicOther = ( props ) => {
    const { src, alt, uid } = props;
    return (
        <div >
            <Link to={`/user/${uid}`}>
                <img src={src} alt={alt}
                    style={{ width: '100px', height: '100px', borderRadius: '50%'}}/>
            </Link>
        </div>
    );
};

export default ProfilePicOther;
