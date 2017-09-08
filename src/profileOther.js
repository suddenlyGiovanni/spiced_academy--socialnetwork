import React from 'react';
import ProfilePic from './profilePic';

export default class ProfileOther extends React.Component {
    constructor( props ) {
        super( props );
    }

    render() {
        console.log( 'React Component: ProfileOther - RENDER - this.props: ', this.props );

        const {
            profilePic,
            firstName,
            lastName
        } = this.props;

        return (
            <div style={{
                border:'medium dotted blue'
            }}>
                <p>ProfileOther</p>
                <ProfilePic
                    src={profilePic}
                    alt={firstName + ' ' + lastName}/>
            </div>
        );
    }
}
