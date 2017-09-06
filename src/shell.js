import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';

// REACT Components
import Welcome from './welcome';
import Registration from './registration';
import Login from './login';
import App from './app';

// REACT Router

let router;


if ( location.pathname === '/welcome/' ) {
    console.log('welcome');
    router = (
        <Router history={hashHistory}>
            <Route path='/' component={Welcome}>
                <IndexRoute component={Registration}/>
                <Route path='/login' component={Login}/>
            </Route>
        </Router>
    );
} else {
    router = (
        <Router history={hashHistory}>
            <Route path='/' component={App}/>
        </Router>
    );
}



ReactDOM.render(
    router,
    document.querySelector( 'main' )
);
