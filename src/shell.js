// REACT components
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';

// REDUX components
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
// import allReducers from './reducers';
import reducers from './reducers/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

// MY Components:

// Containers:
import App from './containers/app';
import FriendsContainer from './containers/friendsContainer';
import ProfileOther from './containers/profileOther';

// Components
import Welcome from './components/welcome';
import Registration from './components/registration';
import Login from './components/login';
import ProfileSelf from './components/profileSelf';
import OnlineUsersContainer from './containers/onlineUsersContainer';
import ChatContainer from './containers/chatContainer';
import ChatListContainer from './containers/chatListContainer';
import ChatPublicContainer from './containers/chatPublicContainer';
import ChatPrivateContainer from './containers/chatPrivateContainer';


export const store = createStore( reducers, composeWithDevTools( applyMiddleware( reduxPromise ) ) );

// REACT Router
let router;

if ( location.pathname === '/welcome/' ) {
    console.log( 'Shell: ', location.pathname );
    router = (
        <Router history={hashHistory}>
            <Route path='/' component={Welcome}>
                <IndexRoute component={Registration}/>
                <Route path='/login' component={Login}/>
            </Route>
        </Router>
    );
} else if ( location.pathname !== '/welcome/' ) {
    console.log( 'Shell: ', location.pathname );
    router = (
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path='/' component={App}>
                    <IndexRoute component={ProfileSelf} />
                    <Route path='friends' component={FriendsContainer} />
                    <Route path='user/:uid' component={ProfileOther} />
                    <Route path='online' component={OnlineUsersContainer} />
                    <Route path='chat' component={ChatContainer}>
                        <IndexRoute component={ChatListContainer} />
                        <Route path='public' component={ChatPublicContainer} />
                        <Route path='private/:uid' component={ChatPrivateContainer} />
                    </Route>
                </Route>
            </Router>
        </Provider>
    );
}



ReactDOM.render(
    router,
    document.querySelector( 'main' )
);
