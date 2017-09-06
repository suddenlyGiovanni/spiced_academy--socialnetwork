import React from 'react';
// import Registration from './registration'

export default class Welcome extends React.Component {
    constructor( props ) {
        super( props );
    }
    render() {
        console.log(this.props);
        return (
            <div style={{
                border: 'medium dotted purple'
            }}>
                <h1>Welcome Component</h1>
                {this.props.children}
                {/* <Registration /> */}
            </div>
        );
    }
}
