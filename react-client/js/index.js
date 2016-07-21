import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';

import App from './containers/app';
import Home from './components/home';
import UserList from './components/userList';
import NotFound from './components/notFound';

import {Router, Route, IndexRoute, browserHistory} from 'react-router';

const store = configureStore();

ReactDOM.render((
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path='/' component={App}>
                    <IndexRoute component={Home}/>
                    <Route path='users' component={UserList}/>
                </Route>
                <Router path='*' component={NotFound}/>
            </Router>
        </Provider>),
    document.getElementById('root')
);