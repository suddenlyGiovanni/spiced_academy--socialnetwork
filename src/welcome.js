import React from 'react';
import Registration from './registration'

export default class Welcome extends React.Component {
    render() {
        return (
            <div>
                <h1>Welcome Component</h1>
                <Registration />
            </div>
        );
    }
}
