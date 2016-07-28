import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';

import App from './containers/app';
import Home from './components/home';
import UserList from './containers/userListContainer';
import GroupList from './containers/groupListContainer';
import NotFound from './components/notFound';

import {Router, Route, IndexRoute, hashHistory} from 'react-router';

const store = configureStore();

ReactDOM.render((
        <Provider store={store}>
            <Router history={hashHistory} queryKey={false}>
                <Route path='/' component={App}>
                    <IndexRoute component={Home}/>
                    <Route path='users' component={UserList}/>
                    <Route path='groups' component={GroupList}/>
                </Route>
                <Route path='*' component={NotFound}/>
            </Router>
        </Provider>),
    document.getElementById('root')
);