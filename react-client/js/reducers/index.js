import {combineReducers} from 'redux';
import user from './userReducer';
import group from './groupReducer';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    user: user,
    group: group,
    form: formReducer
});

export default rootReducer;