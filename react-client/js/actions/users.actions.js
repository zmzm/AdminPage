import ActionTypes from '../constants/actionTypes';
import axios from 'axios';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

export function fetchUsers() {
    const request = axios({
        method: 'GET',
        url: ROOT_URL + '/users',
        headers: []
    });
    return {
        type: ActionTypes.FETCH_USERS,
        payload: request
    }
}

export function fetchUsersSuccess(users) {
    return {
        type: ActionTypes.FETCH_USERS_SUCCESS,
        payload: users
    }
}

export function fetchUsersFailure(error) {
    return {
        type: ActionTypes.FETCH_USERS_FAIL,
        payload: error
    }
}