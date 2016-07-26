import ActionTypes from '../constants/actionTypes';

const initialState = {
    users: [],
    error: null
};

export default function (state = initialState, action) {

    switch (action.type) {
        case ActionTypes.FETCH_USERS:
            return {...state, users: [], error: null};
            break;
        case ActionTypes.FETCH_USERS_SUCCESS:
            return {...state, users: action.payload.users, totalCount: action.payload.totalCount, error: null};
            break;
        case ActionTypes.FETCH_USERS_FAIL:
            return {...state, users: [], error: action.payload};
            break;
        case ActionTypes.CREATE_USER:
            return {...state, user: [], error: null};
            break;
        case ActionTypes.CREATE_USER_SUCCESS:
            return {...state, user: action.payload.user, error: null};
            break;
        case ActionTypes.CREATE_USER_FAIL:
            return {...state, user: [], error: action.payload};
            break;
        default:
            return state;
    }
}