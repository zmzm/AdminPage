import React from 'react';
import {createUser, createUserSuccess, createUserFailure} from '../actions/userActions';
import {reduxForm} from 'redux-form';
import AddUser from '../components/addUser';

function validate(values) {
    const errors = {};

    if (!values.userName || values.userName.trim() === '') {
        errors.userName = 'Enter a user name';
    }
    else if (!/^[a-z][a-z0-9]*?([-.][a-z0-9]+){0,2}$/i.test(values.userName)) {
        errors.userName = 'Invalid User name';
    }

    if (!values.firstName || values.firstName.trim() === '') {
        errors.firstName = 'Enter First name';
    }
    else if (!/^[a-z]*?([\s-][a-z]+){0,2}$/i.test(values.firstName)) {
        errors.firstName = 'Invalid First name';
    }

    if (!values.lastName || values.lastName.trim() === '') {
        errors.lastName = 'Enter Last name';
    }
    else if (!/^[a-z]{2,20}$/i.test(values.lastName)) {
        errors.lastName = 'Invalid Last name';
    }

    return errors;
}

const mapStateToProps = function (state) {
    return {
        user: state.user.user
    }
};

const mapDispatchToProps = function (dispatch) {
    return {
        createUser: function (values) {
            dispatch(createUser(values)).then(function (response) {
                response.payload.status == 200 ?
                    dispatch(createUserSuccess(response.payload.data)) :
                    dispatch(createUserFailure(response.payload))
            })
        }
    }
};

export default reduxForm({
    form: 'addUser',
    fields: ['userName', 'firstName', 'lastName', 'email'],
    validate
}, mapStateToProps, mapDispatchToProps)(AddUser);