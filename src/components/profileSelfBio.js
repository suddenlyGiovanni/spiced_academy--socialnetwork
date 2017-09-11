import React from 'react';
import PropTypes from 'prop-types';
import axios from '../utils/axios';

export default class ProfileSelfBio extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {};
    }

    // componentWillReceiveProps( props ) {
    //     this.setState( { bio: props.bio } );
    // }


    handleInput( e ) {
        this.setState( {
            [ e.target.name ]: e.target.value
        } );
    }

    handleSubmit( e ) {
        e.preventDefault();
        // make POST request to this.url and handle response
        console.log( 'ProfileSelfBio - fn: Axios.put - data: ', this.state );

        axios.put( `/api/user/${this.props.uid}/bio`, this.state )

            .then( resp => {
                const data = resp.data;
                if ( !data.success ) {
                    this.setState( { error: true } );
                }
                this.setState( {
                    data: data,
                    editBioIsVisible: false
                } );
            } )

            .catch( err => {
                console.error( err.stack );
                this.setState( { error: true } );
            } );
    }

    editBioIsVisible( boolean ) {
        console.log( 'fn: editBioIsVisible ' );
        this.setState( { editBioIsVisible: boolean } );
    }


    render() {
        console.log( 'React Component: ProfileSelfBio - RENDER - this.props: ', JSON.stringify( this.props ) );

        const { editBioIsVisible, error } = this.state;
        const { bio } = this.props;

        // if no bio found..
        const noBioData = (
            <p onClick={ () => this.editBioIsVisible(true)}>Add your bio now</p>
        );

        // if bio is found..
        const bioData = (
            <p>{bio} <span onClick={ () => this.editBioIsVisible(true)}>Edit</span></p>
        );

        // to edit the bio..
        const editBio = (
            <div>
                <form onSubmit={(e)=>this.handleSubmit(e)}>

                    <label forHtml='bio'>Bio </label>
                    <textarea id='bio'
                        name="bio"
                        value={bio}
                        onChange={(e)=>this.handleInput(e)}/>

                    { error && <div>Something went wrong. Please try again!</div> }
                    <button type='submit'>Save</button>
                </form>
            </div>
        );

        // what to var to render..
        const bioRender = () => {
            if ( editBioIsVisible ) {
                return editBio;
            } else if ( bio ) {
                return bioData;
            } else {
                return noBioData;
            }
        };

        return (
            <div>{bioRender()}</div>
        );
    }

}


ProfileSelfBio.propTypes = {
    bio: PropTypes.string,
    uid: PropTypes.number
};
