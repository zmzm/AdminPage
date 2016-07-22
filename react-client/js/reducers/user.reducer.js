import ActionTypes from '../constants/actionTypes';

const initialState = {
    users: [],
    error: null
};

export default function (state = initialState, action) {

    switch (action.type) {
        case ActionTypes.FETCH_USERS:
            return { ...state, users: [], error: null};
            break;
        case ActionTypes.FETCH_USERS_SUCCESS:
            return { ...state, users: action.payload, error: null};
            break;
        case ActionTypes.FETCH_USERS_FAIL:
            return { ...state, users: [], error: action.payload};
            break;
        default:
            return state;
    }
}