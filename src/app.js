import React from 'react';
import axios from './axios';
import Logo from './logo';
import ProfilePic from './profilePic';
import ProfilePicUpload from './profilePicUpload';
import { Link } from 'react-router';


export default class App extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            uploaderIsVisible: false,
            userData: {}
        };
        this.showProfilePicUpload = this.showProfilePicUpload.bind( this );
    }

    // life-cycle method
    componentDidMount() {
        axios.get( '/api/getUserInfo' )
            .then( ( resp ) => {
                this.setState( resp.data );
                console.log( 'React Component: App - fn: componentDidMount - this.state', this.state );
            } )
            .catch( ( err ) => {
                this.setState( {
                    error: 'Something went wrong. Please try again!'
                } );
                console.log( err );
            } );
    }

    showProfilePicUpload( e ) {
        e.stopPropagation();
        console.log( 'React Component: App - fn: showProfilePicUpload' );
        this.setState( { uploaderIsVisible: true } );
    }

    hideProfilePicUpload( e ) {
        e.stopPropagation();
        console.log( 'React Component: App - fn: hideProfilePicUpload' );
        this.setState( { uploaderIsVisible: false } );
    }

    uploadProfilePic( e ) {
        console.log( 'React Component: App - fn: uploadProfilePic' );
        e.stopPropagation();
        const formData = new FormData;
        formData.append( 'file', e.target.files[ 0 ] );

        axios.put( `/api/user/${this.state.userData.uid}/profile_pic`, formData )
            .then( ( resp ) => {
                console.log( resp.data );
                this.setState( resp.data );
            } )
            .catch( ( err ) => {
                this.setState( {
                    error: 'Something went wrong. Please try again!'
                } );
                console.error( err.stack );
            } );
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    render() {
        console.log( 'React Component: App - RENDER - this.state: ', this.state );

        const {
            uid,
            firstName,
            lastName,
            email,
            bio,
            profilePic
        } = this.state.userData;

        const { error, uploaderIsVisible } = this.state;

        const children = React.cloneElement( this.props.children, {
            uid,
            firstName,
            lastName,
            email,
            bio,
            profilePic
        } );


        if ( !uid ) {
            return <div>Loading....</div>;
        }


        return (
            <div style={{
                border : 'thin dashed green'
            }}>
                <header style={{
                    display: 'inline-flex',
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: 'goldenrod'

                }}>
                    <Logo />
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/logout">Logout</Link></li>
                        </ul>
                    </nav>

                    <title><h1>App</h1></title>

                    <ProfilePic
                        src={profilePic}
                        alt={firstName + ' ' + lastName}
                        showProfilePicUpload={ (e) => this.showProfilePicUpload(e) }
                    />

                </header>




                {
                    uploaderIsVisible &&

                    <ProfilePicUpload
                        uploadProfilePic={ (e) => this.uploadProfilePic(e) }
                        hideProfilePicUpload={ (e) => this.hideProfilePicUpload(e) }
                    />
                }

                {/* <ProfilePicUploader
                    uid={this.state.uid}
                    setImage={this.setImage}
                closeUploader={this.close}/> */}

                { error && <div>{ error }</div> }
                <p>uid: { uid }</p>
                <p>firstName: { firstName }</p>
                <p>lastName: { lastName }</p>
                <p>email: { email }</p>
                <p>profilePic: { profilePic }</p>
                <p>bio: { bio }</p>

                {children}


                <footer></footer>
            </div>
        );
    }

}
