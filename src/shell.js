import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

// REACT Components
import Welcome from './welcome';
import Registration from './registration';
import Login from './login';
import App from './app';
import ProfileSelf from './profileSelf';
import ProfileOther from './profileOther';



// REACT Router

let router;


if ( location.pathname === '/welcome/' ) {
    console.log( 'welcome' );
    router = (
        <Router history={hashHistory}>
            <Route path='/' component={Welcome}>
                <IndexRoute component={Registration}/>
                <Route path='/login' component={Login}/>
            </Route>
        </Router>
    );
} else if ( location.pathname !== '/welcome/' ) {
    router = (
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={ProfileSelf} />
                <Route path='user/:id' component={ProfileOther} />


            </Route>
        </Router>
    );
}



ReactDOM.render(
    router,
    document.querySelector( 'main' )
);
