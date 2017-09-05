import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';

// REACT Components
import Welcome from './welcome';
import Logo from './logo';
import Login from './login';

// REACT Router

const router = (
    <Router history={hashHistory}>
        <Route path='/' component={Welcome}>
            <Route path='/login' component={Login}/>
            {/* <IndexRoute component={Registration}/> */}
        </Route>
    </Router>
);


// let component;
// if ( location.pathname === '/welcome' ) {
//     component = <Welcome/>;
// } else {
//     component = <Logo/>;
// }

// class Shell extends React.Component {
//     render() {
//         return ( <div> {this.component} </div> );
//     }
// }



ReactDOM.render(
    router,
    document.querySelector( 'main' )
);
