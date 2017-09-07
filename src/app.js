import React from 'react';
import axios from 'axios';
import Logo from './logo';
import ProfilePic from './profilePic';
import ProfilePicUploader from './profilePicUploader';

export default class App extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {};
        // this.showUploader = this.showUploader.bind( this );
    }

    // lifecycle method
    componentDidMount() {

        axios.get( '/api/getUserInfo' )

            .then( ( resp ) => {
                console.log( resp.data );
                this.setState( {
                    uid: resp.data.uid,
                    firstName: resp.data.firstName,
                    lastName: resp.data.lastName,
                    bio: resp.data.bio,
                    profilePic: resp.data.profilePic
                } );
            } )

            .catch( ( err ) => {
                console.error( err.stack );
            } );
    }

    showUploader() {
        this.setState( {
            uploaderIsVisible: true
        } );
    }

    render() {
        if ( !this.state.uid ) {
            return <div>Loading....</div>;
        }
        return (
            <div style={{
                border : 'thin dashed green'
            }}>
                <h1>App</h1>

                <ProfilePic setImage={this.setImage}/>

                {/* { this.state.uploaderIsVisible &&
                    <ProfilePicUploader
                        uid={this.state.uid}
                        setImage={this.setImage}
                closeUploader={this.close}/> } */}

                <ProfilePicUploader
                    uid={this.state.uid}
                    setImage={this.setImage}
                    closeUploader={this.close}/>

                <p>uid: { this.state.uid }</p>
                <p>firstName: { this.state.firstName }</p>
                <p>lastName: { this.state.lastName }</p>
                <p>profilePic: { this.state.profilePic }</p>
                <p>bio: { this.state.bio }</p>


                <Logo />
            </div>
        );
    }

}
