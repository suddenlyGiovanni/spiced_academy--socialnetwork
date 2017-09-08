import React from 'react';
import Modal from './modal.js';

export default class ProfilePicUpload extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            isModalOpen: true,
            hover: false
        };
        this.toggleHover = this.toggleHover.bind( this );
    }

    openModal() {
        this.setState( { isModalOpen: true } );
    }

    closeModal() {
        this.setState( { isModalOpen: false } );
    }

    toggleHover() {
        this.setState( { hover: !this.state.hover } );
    }

    render() {
        console.log( 'React Component: ProfilePicUpload - this.prop: ', this.prop );
        const {
            hideProfilePicUpload,
            uploadProfilePic
        } = this.props;

        const inputStyle = {
            width: '0.1px',
            height: '0.1px',
            opacity: '0',
            overflow: 'hidden',
            position: 'absolute',
            zIndex: '-1'
        };

        let labelStyle;

        if ( this.state.hover ) {
            labelStyle = {
                fontSize: '1.25em',
                fontWeight: '700',
                color: 'white',
                backgroundColor: 'red',
                display: 'inline-block',
                cursor: 'pointer'
            };
        } else {
            labelStyle = {
                fontSize: '1.25em',
                fontWeight: '700',
                color: 'white',
                backgroundColor: 'black',
                display: 'inline-block',
                cursor: 'pointer'
            };
        }

        return (

            <div>

                <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>

                    <h4>ProfilePicUploader</h4>
                    <h3 onClick={hideProfilePicUpload}>X</h3>



                    <label htmlFor='profilePic'
                        style={labelStyle}
                        onMouseEnter={this.toggleHover}
                        onMouseLeave={this.toggleHover}>Profile Picture</label>
                    <input
                        id='profilePic'
                        type="file"
                        name="profilePic"
                        required
                        onChange={uploadProfilePic}
                        style={inputStyle}/>

                    <p><button onClick={hideProfilePicUpload}>Close</button></p>
                </Modal>

            </div>
        );
    }
}
