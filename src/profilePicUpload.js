import React from 'react';

export default class ProfilePicUpload extends React.Component {

    constructor( props ) {
        super( props );
    }

    render() {
        console.log( 'React Component: ProfilePicUpload - this.props: ', this.props );
        const {
            hideProfilePicUpload,
            uploadProfilePic
        } = this.props;

        return (
            <div style={{border : 'thin dotted gold'}}>
                <h4>ProfilePicUploader</h4>
                <h3 onClick={hideProfilePicUpload}>X</h3>



                <label for='profilePic'>Profile Picture</label>
                <input
                    id='profilePic'
                    type="file"
                    name="profilePic"
                    required
                    onChange={uploadProfilePic} />

            </div>
        );
    }
}
