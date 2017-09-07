import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';


export default class Login extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {};
        // bind this to not lose reference
        this.handleChange = this.handleChange.bind( this );
    }

    handleChange( e ) {
        this[ e.target.name ] = e.target.value;
        this.setState( {
            [ e.target.name ]: e.target.value
        } );
    }


    submit( e ) {
        // prevent default form behavior
        e.preventDefault();
        const formData = {
            email: this.state.email,
            password: this.state.password,
        };

        console.log( 'fn: submit', formData );

        axios.post( '/api/login', formData )

            .then( resp => {
                const data = resp.data;
                console.log( data );

                if ( !data.success ) {
                    this.setState( { error: true } );
                } else {
                    location.replace( '/' );
                }
            } )

            .catch( ( err ) => {
                console.log( err );
                this.setState( { error: true } );
            } );
    }

    render() {
        return (
            <div style={{
                border: 'thin dotted red'
            }}>
                <h1>Log in</h1>
                { this.state.error && <div className='error'>Something went wrong. Please try again!</div> }
                <form>

                    <label for='email'>Email</label>
                    <input id='email' type="email" name="email" autoComplete="email" required onChange={this.handleChange}></input>

                    <label for='password'>Password</label>
                    <input id='password' type="password" name="password" autoComplete="current-password" required
                        onChange={this.handleChange}></input>

                    <button type='submit' onClick={e => this.submit(e)}>Log In</button>
                </form>
                <p>Not a member? <Link to='/'>Register</Link></p>
            </div>
        );
    }
}
