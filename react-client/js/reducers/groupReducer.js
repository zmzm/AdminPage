import ActionTypes from '../constants/actionTypes';

const initialState = {
    groups: [],
    error: null
};

export default function (state = initialState, action) {

    switch (action.type) {
        case ActionTypes.FETCH_GROUPS:
            return {...state, groups: [], error: null};
            break;
        case ActionTypes.FETCH_GROUPS_SUCCESS:
            return {...state, groups: action.payload.groups, totalCount: action.payload.totalCount, error: null};
            break;
        case ActionTypes.FETCH_GROUPS_FAIL:
            return {...state, groups: [], error: action.payload};
            break;
        case ActionTypes.CREATE_GROUP:
            return {...state, group: [], error: null};
            break;
        case ActionTypes.CREATE_GROUP_SUCCESS:
            return {...state, group: action.payload.group, error: null};
            break;
        case ActionTypes.CREATE_GROUP_FAIL:
            return {...state, group: [], error: action.payload};
            break;
        default:
            return state;
    }
}