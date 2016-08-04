import {createStore, applyMiddleware, compose} from 'redux';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import rootReducer from '../reducers';
import thunk from 'redux-thunk'

export default function configureStore(initialState) {
    var logger = createLogger();
    const finalCreateStore = compose(
        applyMiddleware(promise),
        applyMiddleware(logger),
        applyMiddleware(thunk)
    )(createStore);
    const store = finalCreateStore(rootReducer, initialState);
    return store;
}