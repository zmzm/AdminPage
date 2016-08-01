import ActionTypes from '../constants/actionTypes';
import axios from 'axios';
import toastr from 'toastr';

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

export function fetchGroupsFailure(data) {
    toastr.error(data.status);
    return {
        type: ActionTypes.FETCH_GROUPS_FAIL,
        payload: data.status
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

export function createGroupSuccess(data) {
    toastr.success(data.status);
    return {
        type: ActionTypes.CREATE_GROUP_SUCCESS,
        payload: data
    }
}

export function createGroupFailure(data) {
    toastr.error(data.status);
    return {
        type: ActionTypes.CREATE_GROUP_FAIL,
        payload: data.status
    }
}

export function fetchGroup(props) {
    const request = axios({
        method: 'GET',
        url: ROOT_URL + '/groups/' + props
    });

    return {
        type: ActionTypes.FETCH_GROUP,
        payload: request
    }
}

export function fetchGroupSuccess(data) {
    return {
        type: ActionTypes.FETCH_GROUP_SUCCESS,
        payload: data
    }
}

export function fetchGroupFailure(data) {
    toastr.error(data.status);
    return {
        type: ActionTypes.FETCH_GROUP_FAIL,
        payload: data.status
    }
}

export function updateGroup(props) {
    const request = axios({
        method: 'PUT',
        data: props,
        url: ROOT_URL + '/groups/' + props.group._id
    });

    return {
        type: ActionTypes.UPDATE_GROUP,
        payload: request
    }
}

export function updateGroupSuccess(data) {
    toastr.success(data.status);
    return {
        type: ActionTypes.UPDATE_GROUP_SUCCESS,
        payload: data
    }
}

export function updateGroupFailure(data) {
    toastr.error(data.status);
    return {
        type: ActionTypes.UPDATE_GROUP_FAIL,
        payload: data.status
    }
}