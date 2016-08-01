import React from 'react';
import {createGroup, createGroupSuccess, createGroupFailure} from '../actions/groupActions';
import {reduxForm} from 'redux-form';
import AddGroup from '../components/addGroup';

function validate(values) {
    const errors = {};

    if (!values.groupName || values.groupName.trim() === '') {
        errors.groupName = 'Enter a Group name';
    }
    else if (!/^[a-z][a-z0-9]*?([-.][a-z0-9]+){0,2}$/i.test(values.groupName)) {
        errors.groupName = 'Invalid Group name';
    }

    if (!values.title || values.title.trim() === '') {
        errors.title = 'Enter title';
    }
    else if (!/^[a-z]{2,20}$/i.test(values.title)) {
        errors.title = 'Invalid title';
    }
    return errors;
}

const mapStateToProps = function (state) {
};

const mapDispatchToProps = function (dispatch) {
    return {
        createGroup: function (values) {
            dispatch(createGroup(values)).then(function (response) {
                response.payload.status == 200 ?
                    dispatch(createGroupSuccess(response.payload.data)) :
                    dispatch(createGroupFailure(response.payload.response.data))
            })
        }
    }
};

export default reduxForm({
    form: 'addGroup',
    fields: ['groupName', 'title'],
    validate
}, mapStateToProps, mapDispatchToProps)(AddGroup);