import React from 'react';

export default class ProfilePic extends React.Component {

    constructor( props ) {
        super( props );
    }

    render() {
        const { showProfilePicUpload, src, alt } = this.props;
        return (
            <div style={{ border : 'thin dotted blue'}}
                onClick={showProfilePicUpload}>

                <img src={src} alt={alt} style={{ width: '40px', height: '40px', borderRadius: '50%'}}/>

            </div>
        );
    }
}
