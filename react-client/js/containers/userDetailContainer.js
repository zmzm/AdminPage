import React from 'react';
import {
    fetchUser,
    fetchUserSuccess,
    fetchUserFailure,
    updateUser,
    updateUserSuccess,
    updateUserFailure
} from '../actions/userActions';
import {connect} from 'react-redux';
import UserDetail from '../components/userDetail';

const mapStateToProps = function (state) {
    return {
        user: state.user.user
    }
};

const mapDispatchToProps = function (dispatch) {
    return {
        fetchUserByName: function (name) {
            dispatch(fetchUser(name)).then(function (response) {
                response.payload.status == 200 ?
                    dispatch(fetchUserSuccess(response.payload.data)) :
                    dispatch(fetchUserFailure(response.payload.response.data))
            })
        },
        updateUser: function (values) {
            dispatch(updateUser({user: values})).then(function (response) {
                response.payload.status == 200 ?
                    dispatch(updateUserSuccess(response.payload.data)) :
                    dispatch(updateUserFailure(response.payload.response.data))
            })
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);