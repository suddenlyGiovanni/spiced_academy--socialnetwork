import React from 'react';
import Modal from './modal.js';

export default class ProfilePicUpload extends React.Component {

    constructor( props ) {
        super( props );
        this.state = { isModalOpen: true };
    }

    openModal() {
        this.setState( { isModalOpen: true } );
    }

    closeModal() {
        this.setState( { isModalOpen: false } );
    }

    render() {
        console.log( 'React Component: ProfilePicUpload - this.props: ', this.props );
        const {
            hideProfilePicUpload,
            uploadProfilePic
        } = this.props;

        return (

            <div>

                <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>

                    <h4>ProfilePicUploader</h4>
                    <h3 onClick={hideProfilePicUpload}>X</h3>



                    <label for='profilePic'>Profile Picture</label>
                    <input
                        id='profilePic'
                        type="file"
                        name="profilePic"
                        required
                        onChange={uploadProfilePic} />

                    <p><button onClick={hideProfilePicUpload}>Close</button></p>
                </Modal>

            </div>
        );
    }
}
