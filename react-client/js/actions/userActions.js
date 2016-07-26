import ActionTypes from '../constants/actionTypes';
import axios from 'axios';

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

export function fetchUsersFailure(error) {
    return {
        type: ActionTypes.FETCH_USERS_FAIL,
        payload: error
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

export function createUserSuccess(user) {
    return {
        type: ActionTypes.CREATE_USER_SUCCESS,
        payload: user
    }
}

export function createUserFailure(error) {
    return {
        type: ActionTypes.CREATE_USER_FAIL,
        payload: error
    }
}