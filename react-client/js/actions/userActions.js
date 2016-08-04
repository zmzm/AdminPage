import ActionTypes from '../constants/actionTypes';
import axios from 'axios';
import toastr from 'toastr';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

export function fetchUsers(page) {
    const request = axios({
        method: 'GET',
        url: ROOT_URL + '/users/page/' + page,
        headers: []
    });
    return {
        type: ActionTypes.FETCH_USERS,
        payload: request
    }
}

export function fetchUsersSuccess(data) {
    return {
        type: ActionTypes.FETCH_USERS_SUCCESS,
        payload: data
    }
}

export function fetchUsersFailure(data) {
    toastr.error(data.status);
    return {
        type: ActionTypes.FETCH_USERS_FAIL,
        payload: data.status
    }
}

export function createUser(props) {
    const request = axios({
        method: 'POST',
        data: props,
        url: ROOT_URL + '/users'
    });

    return {
        type: ActionTypes.CREATE_USER,
        payload: request
    }
}

export function createUserSuccess(data) {
    toastr.success(data.status);
    return {
        type: ActionTypes.CREATE_USER_SUCCESS,
        payload: data
    }
}

export function createUserFailure(data) {
    console.log(data);
    toastr.error(data.status);
    return {
        type: ActionTypes.CREATE_USER_FAIL,
        payload: data.status
    }
}

export function fetchUser(props) {
    const request = axios({
        method: 'GET',
        url: ROOT_URL + '/users/' + props
    });

    return {
        type: ActionTypes.FETCH_USER,
        payload: request
    }
}

export function fetchUserSuccess(data) {
    return {
        type: ActionTypes.FETCH_USER_SUCCESS,
        payload: data
    }
}

export function fetchUserFailure(data) {
    toastr.error(data.status);
    return {
        type: ActionTypes.FETCH_USER_FAIL,
        payload: data.status
    }
}

export function resetActiveUser() {
    return {
        type: ActionTypes.RESET_ACTIVE_USER
    }
}

export function updateUser(props) {
    const request = axios({
        method: 'PUT',
        data: props,
        url: ROOT_URL + '/users/' + props.user._id
    });

    return {
        type: ActionTypes.UPDATE_USER,
        payload: request
    }
}

export function updateUserSuccess(data) {
    toastr.success(data.status);
    return {
        type: ActionTypes.UPDATE_USER_SUCCESS,
        payload: data
    }
}

export function updateUserFailure(data) {
    toastr.error(data.status);
    return {
        type: ActionTypes.UPDATE_USER_FAIL,
        payload: data.status
    }
}

export function addGroupToUser(userId, group) {
    const request = axios({
        method: 'PUT',
        data: group,
        url: ROOT_URL + '/users/' + userId + '/groups'
    });

    return {
        type: ActionTypes.ADD_GROUP_TO_USER,
        payload: request
    }
}

export function addGroupToUserSuccess(data) {
    console.log(data);
    toastr.success(data.status);
    return {
        type: ActionTypes.ADD_GROUP_TO_USER_SUCCESS,
        payload: data
    }
}

export function addGroupToUserFailure(data) {
    console.log(data);
    toastr.error(data.status);
    return {
        type: ActionTypes.ADD_GROUP_TO_USER_FAIL,
        payload: data.status
    }
}