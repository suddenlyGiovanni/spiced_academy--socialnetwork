import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from '../utils/axios';
import PropTypes from 'prop-types';
import ProfilePic from './profilePic';
import FriendshipButtonContainer from '../containers/friendshipButtonContainer';

export default class ProfileOther extends Component {

    constructor( props ) {
        super( props );
        this.state = {
            otherUserData: {}
        };
    }

    componentDidMount() {
        // if the uid (this.props.params.uid) passed to this comp is the same as
        // the logged in user's (this.props.uid).
        if ( this.props.uid == this.props.params.uid ) {
            browserHistory.push( '/' );
        }
        console.log( 'ProfileOther - fn: componentDidMount', `/api/user/${this.props.params.uid}` );
        axios.get( `/api/user/${this.props.params.uid}` )

            .then( ( resp ) => {
                if ( resp.data.success ) {
                    const otherUserData = resp.data.otherUserData
                    this.setState( { otherUserData } );
                    console.log( 'ProfileOther - fn: componentDidMount - this.state', this.state );
                } else {
                    this.setState( {
                        error: 'Something went wrong. Please try again!'
                    } );
                }
            } )

            .catch( ( err ) => {
                this.setState( {
                    error: 'Something went wrong. Please try again!'
                } );
                console.log( err );
            } );
    }

    render() {
        console.log( 'ProfileOther - RENDER - this.state: ', this.state );
        const {
            uid,
            firstName,
            lastName,
            email,
            bio,
            profilePic
        } = this.state.otherUserData;
        return (
            <div style={{border:'medium dotted blue'}}>
                <p>ProfileOther</p>

                <ProfilePic
                    src={ profilePic }
                    alt={ firstName + ' ' + lastName } />


                <label forHtml='uid'>Uid </label>
                <input id='uid'
                    type="text"
                    name='uid'
                    value={uid} disabled />

                <label forHtml='name'>Name </label>
                <input id='name'
                    type="text"
                    name='name'
                    value={`${ firstName } ${ lastName }`} disabled />

                <label forHtml='mail'>Mail </label>
                <input id='mail'
                    type="email"
                    name='mail'
                    value={ email } disabled />
                {
                    bio && (
                        <div>

                            <label forHtml='bio'>Bio </label>
                            <textarea id='bio'
                                name="bio"
                                value={bio} disabled/>
                        </div>)
                }
                <FriendshipButtonContainer
                    fromUserId={this.props.uid}
                    toUserId={this.state.otherUserData.uid}/>
            </div>
        );
    }

}

// ProfileOther.propTypes = {
//     uid: PropTypes.number,
//     firstName: PropTypes.string,
//     lastName: PropTypes.string,
//     email: PropTypes.string,
//     bio: PropTypes.string,
//     profilePic: PropTypes.string
// };
