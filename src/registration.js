import React from 'react';
import axios from 'axios';


export default class Registration extends React.Component {
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
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
        };

        console.log( 'fn: submit', formData );

        axios.post( '/api/register', formData )

            .then( resp => {
                const data = resp.data;
                console.log(data);

                if ( !data.success ) {
                    this.setState( {
                        error: true
                    } );
                }
            } )

            .catch( ( err ) => {
                console.log( err );
                this.setState( {
                    error: true
                } );
            } );
    }

    render() {
        return (
            <div>
                <h1>Join Us!</h1>
                {this.state.error && <div className='error'>Something went wrong. Please try again!</div>}
                <form>
                    <label for='firstName'>First Name</label>
                    <input id='firstName' type="text" name='firstName' autoComplete="given-name" required onChange={this.handleChange}></input>

                    <label for='lastName'>Last Name</label>
                    <input id='lastName' type="text" name="lastName" autoComplete="family-name" required onChange={this.handleChange}></input>

                    <label for='email'>Email</label>
                    <input id='email' type="email" name="email" autoComplete="email" required onChange={this.handleChange}></input>

                    <label for='password'>Password</label>
                    <input id='password' type="password" name="password" autoComplete="new-password" required
                        onChange={this.handleChange}></input>

                    <button type='submit' onClick={e => this.submit(e)}>Register</button>
                </form>
                <p>Already a member? <a href='/#/login'>Log In</a></p>
            </div>
        );
    }
}
