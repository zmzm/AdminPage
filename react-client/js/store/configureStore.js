import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import {rootReducer} from '../reducers'

export default function configureStore(initialState) {
    var logger = createLogger(),
        store = createStore(
            rootReducer,
            initialState,
            applyMiddleware(logger, thunk)
        );
    return store;
}