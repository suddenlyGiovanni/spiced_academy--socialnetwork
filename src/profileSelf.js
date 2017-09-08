import React from 'react';
import ProfilePic from './profilePic';

export default class ProfileSelf extends React.Component {
    constructor( props ) {
        super( props );
    }

    render() {

        console.log( 'React Component: ProfileSelf - RENDER - this.props: ', this.props );

        const {
            profilePic,
            firstName,
            lastName
        } = this.props;

        return (
            <div style={{
                border:'medium dotted blue'
            }}>
                <p>ProfileSelf</p>
                <ProfilePic
                    src={profilePic}
                    alt={firstName + ' ' + lastName}/>
            </div>
        );
    }
}
