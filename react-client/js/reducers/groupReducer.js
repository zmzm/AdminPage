import ActionTypes from '../constants/actionTypes';

const initialState = {
    groups: [],
    error: null
};

export default function (state = initialState, action) {

    switch (action.type) {
        case ActionTypes.FETCH_GROUPS:
            return {...state, groups: [], error: null};
        case ActionTypes.FETCH_GROUPS_SUCCESS:
            return {...state, groups: action.payload.groups, totalCount: action.payload.totalCount, error: null};
        case ActionTypes.FETCH_GROUPS_FAIL:
            return {...state, groups: [], error: action.payload};
        case ActionTypes.CREATE_GROUP:
            return {...state, error: null};
        case ActionTypes.CREATE_GROUP_SUCCESS:
            return {...state, error: null};
        case ActionTypes.CREATE_GROUP_FAIL:
            return {...state, error: action.payload};
        case ActionTypes.FETCH_GROUP:
            return {...state, group: {}, loading: true, error: null};
        case ActionTypes.FETCH_GROUP_SUCCESS:
            return {...state, group: action.payload.group, users: action.payload.users, loading: false, error: null};
        case ActionTypes.FETCH_GROUP_FAIL:
            return {...state, group: {}, loading: false, error: action.payload};
        case ActionTypes.RESET_ACTIVE_GROUP:
            return {...state, group: {}, users: [], error: null};
        case ActionTypes.UPDATE_GROUP:
            return {...state, group: {}, error: null};
        case ActionTypes.UPDATE_GROUP_SUCCESS:
            return {...state, error: null};
        case ActionTypes.UPDATE_GROUP_FAIL:
            return {...state, error: action.payload};
        default:
            return state;
    }
}