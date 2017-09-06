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
                console.log( resp );
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
                <Logo />
            </div>
        );
    }

}
