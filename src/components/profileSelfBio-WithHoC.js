import React from 'react';
import FormWrapper from '../utils/formWrapper';
import PropTypes from 'prop-types';

class BioForm extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            bio: this.props.bio
        };
    }

    editBioIsVisible( boolean ) {
        this.setState( {
            editBioIsVisible: boolean
        } );
        console.log( 'fn: editBioIsVisible ', this.state );
    }



    render() {
        const { handleInput, handleSubmit, error } = this.props;
        const { bio, editBioIsVisible } = this.state;

        // if no bio found..
        const noBioFound = (
            <p onClick={ () => this.editBioIsVisible(true)}>Add your bio now</p>
        );

        // if bio is found..
        const bioFound = (
            <p>{bio} <span onClick={ () => this.editBioIsVisible(true)}>Edit</span></p>
        );

        // to edit the bio..
        const bioEdit = (
            <div>
                <form onSubmit={this.props.handleSubmit}>

                    <label forHtml='bio'>Bio </label>
                    <textarea id='bio'
                        name="bio"
                        value={this.state.bio}
                        onChange={handleInput}/>

                    { error && <div>Something went wrong. Please try again!</div> }
                    <button type='submit' onClick={() => this.editBioIsVisible(false)}>Save</button>
                </form>
            </div>
        );

        // what to var to render..
        const bioRender = () => {
            if ( editBioIsVisible ) {
                return bioEdit;
            } else if (bio) {
                return bioFound;
            } else {
                return noBioFound;
            }
        };

        return (
            <div>{bioRender()}</div>
        );
    }

}


BioForm.propTypes = {
    handleInput: PropTypes.func,
    handleSubmit: PropTypes.func,
    error: PropTypes.string,
    bio: PropTypes.string
};
export default FormWrapper( BioForm, '/api/user/:uid' );
