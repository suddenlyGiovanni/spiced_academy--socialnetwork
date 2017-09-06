import React from 'react';
import axios from 'axios';
import Logo from './logo';

export default class App extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {};
    }

    componentDidMount() {

        axios.get( '/api/getUserInfo' )

            .then( ( resp ) => {
                console.log( resp.data );
                this.setState( {
                    uid: resp.data.uid,
                    firstName: resp.data.firstName,
                    lastName: resp.data.lastName,
                    profilePic: resp.data.profilePic
                } );
            } )

            .catch( ( err ) => {
                console.error( err.stack );
            } );
    }

    render() {
        return (
            <div style={{
                border : 'thin dashed green'
            }}>
                <p>App</p>
                <p>uid: {this.state.uid}</p>
                <p>firstName: {this.state.firstName}</p>
                <p>lastName: {this.state.lastName}</p>
                <p>profilePic: {this.state.profilePic}</p>

                <Logo />
            </div>
        );
    }

}
