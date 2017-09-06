import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';

// REACT Components
import Welcome from './welcome';
import Registration from './registration';
import Login from './login';
import Logo from './logo';

// REACT Router

let router;


if ( location.pathname === '/welcome/' ) {
    console.log('welcome');
    router = (
        <Router history={hashHistory}>
            <Route path='/' component={Welcome}>
                <IndexRoute component={Registration}/>
                <Route path='/login' component={Login}/>
                <Route path='/logo' component={Logo}/>
            </Route>
        </Router>
    );
} else {
    console.log('logo');
    router = <Logo/>;
}



ReactDOM.render(
    router,
    document.querySelector( 'main' )
);
