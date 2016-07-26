import ActionTypes from '../constants/actionTypes';
import axios from 'axios';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

export function fetchGroups(page) {
    const request = axios({
        method: 'GET',
        url: ROOT_URL + '/groups/page/' + page,
        headers: []
    });
    return {
        type: ActionTypes.FETCH_GROUPS,
        payload: request
    }
}

export function fetchGroupsSuccess(data) {
    return {
        type: ActionTypes.FETCH_GROUPS_SUCCESS,
        payload: data
    }
}

export function fetchGroupsFailure(error) {
    return {
        type: ActionTypes.FETCH_GROUPS_FAIL,
        payload: error
    }
}

export function createGroup(props) {
    const request = axios({
        method: 'POST',
        data: props,
        url: ROOT_URL + '/groups'
    });

    return {
        type: ActionTypes.CREATE_GROUP,
        payload: request
    }
}

export function createGroupSuccess(group) {
    return {
        type: ActionTypes.CREATE_GROUP_SUCCESS,
        payload: group
    }
}

export function createGroupFailure(error) {
    return {
        type: ActionTypes.CREATE_GROUP_FAIL,
        payload: error
    }
}