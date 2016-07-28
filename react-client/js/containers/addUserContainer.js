import React from 'react';
import {createUser, createUserSuccess, createUserFailure} from '../actions/userActions';
import {reduxForm} from 'redux-form';
import AddUser from '../components/addUser';

function validate(values) {
    const errors = {};

    if (!values.username || values.username.trim() === '') {
        errors.username = 'Enter a user name';
    }
    else if (!/^[a-z][a-z0-9]*?([-.][a-z0-9]+){0,2}$/i.test(values.username)) {
        errors.username = 'Invalid User name';
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
};

const mapDispatchToProps = function (dispatch) {
    return {
        createUser: function (values) {
            dispatch(createUser(values)).then(function (response) {
                response.payload.status == 200 ?
                    dispatch(createUserSuccess(response.payload.data)) :
                    dispatch(createUserFailure(response.payload.response.data))
            })
        }
    }
};

export default reduxForm({
    form: 'addUser',
    fields: ['username', 'firstName', 'lastName', 'email'],
    validate
}, mapStateToProps, mapDispatchToProps)(AddUser);