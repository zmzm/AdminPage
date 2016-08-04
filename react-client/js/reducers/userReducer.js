import ActionTypes from '../constants/actionTypes';

const initialState = {
    user: {},
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
            return {...state, error: null};
            break;
        case ActionTypes.CREATE_USER_SUCCESS:
            return {...state, error: null};
            break;
        case ActionTypes.CREATE_USER_FAIL:
            return {...state, error: action.payload};
            break;
        case ActionTypes.FETCH_USER:
            return {...state, user: {}, users: [], error: null};
            break;
        case ActionTypes.FETCH_USER_SUCCESS:
            return {...state, user: action.payload.user[0], users: [], error: null};
            break;
        case ActionTypes.FETCH_USER_FAIL:
            return {...state, error: action.payload};
            break;
        case ActionTypes.RESET_ACTIVE_USER:
            return {...state, user: {}, users: [], error: null};
            break;
        case ActionTypes.UPDATE_USER:
            return {...state, error: null};
            break;
        case ActionTypes.UPDATE_USER_SUCCESS:
            return {...state, error: null};
            break;
        case ActionTypes.UPDATE_USER_FAIL:
            return {...state, error: action.payload};
            break;
        case ActionTypes.ADD_GROUP_TO_USER:
            return {...state, error: null};
            break;
        case ActionTypes.ADD_GROUP_TO_USER_SUCCESS:
            return {...state, error: null};
            break;
        case ActionTypes.ADD_GROUP_TO_USER_FAIL:
            return {...state, error: action.payload};
            break;
        default:
            return state;
    }
}