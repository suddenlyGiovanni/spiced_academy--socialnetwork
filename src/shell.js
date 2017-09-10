import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';

// REACT Components
import Welcome from './containers/welcome';
import Registration from './components/registration';
import Login from './components/login';
import App from './containers/app';
import ProfileSelf from './components/profileSelf';
import ProfileOther from './components/profileOther';



// REACT Router

let router;


if ( location.pathname === '/welcome/' ) {
    console.log( 'React Component: Shell: ', location.pathname );
    router = (
        <Router history={hashHistory}>
            <Route path='/' component={Welcome}>
                <IndexRoute component={Registration}/>
                <Route path='/login' component={Login}/>
            </Route>
        </Router>
    );
} else if ( location.pathname !== '/welcome/' ) {
    console.log( 'React Component: Shell: ', location.pathname );
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
