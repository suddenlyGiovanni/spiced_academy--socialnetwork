import React from 'react';

export default class ProfilePic extends React.Component {
    render() {
        return (
            <div style={{
                border : 'thin dotted blue'
            }}>
                <h4>ProfilePic</h4>
                <img src={this.props.profilePic} alt={`${this.props.firstName} ${this.props.lastName}` }/>
            </div>
        );
    }
}
