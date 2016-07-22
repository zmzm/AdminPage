import {createStore, applyMiddleware, compose} from 'redux';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import rootReducer from '../reducers'

export default function configureStore(initialState) {
    var logger = createLogger();
    const finalCreateStore = compose(
        applyMiddleware(promise),
        applyMiddleware(logger)
    )(createStore);
    const store = finalCreateStore(rootReducer, initialState);
    return store;
}