import React from 'react';
import axios from 'axios';

export default class ProfilePicUploader extends React.Component {

    constructor( props ) {
        super( props );
        this.state = { profilePic: '' };
        this.handleChange = this.handleChange.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
    }

    handleChange( e ) {
        this.setState( {
            profilePic: e.target.value
        } );
    }

    handleSubmit( e ) {
        console.log( 'fn: handleSubmit' );
        // prevent default form behavior
        e.stopPropagation()
        e.preventDefault();

        const formData = new FormData;

        formData.append( 'uid', this.props.uid );
        formData.append( 'file', e.target.files[ 0 ] );

        console.log( 'fn: submit' );

        axios.post( `/api/user/${this.props.uid}/profile_pic`, formData )

            .then( ( resp ) => {
                console.log( resp.data );
            } )

            .catch( ( err ) => {
                console.error( err.stack );
            } );
    }

    render() {
        console.log( 'React Component: ProfilePicUploader - props: ', this.props );
        return (
            <div style={{
                border : 'thin dotted gold'
            }}>
                <h4>ProfilePicUploader</h4>

                { this.state.error && <div className='error'>Something went wrong. Please try again!</div> }
                <form>


                    <label for='profilePic'>Profile Picture</label>
                    <input id='profilePic' type="file" name="profilePic" required onChange={this.handleSubmit} />

                    <button type='submit'>Upload Pic!</button>
                </form>

            </div>
        );
    }
}
