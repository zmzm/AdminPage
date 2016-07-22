import React from 'react';
import {connect} from 'react-redux';
import UserList from '../components/userList';
import {fetchUsers, fetchUsersSuccess, fetchUsersFailure} from '../actions/users.actions';

const mapStateToProps = function (state) {
    return {
        users: state.user.users
    }
};

const mapDispatchToProps = function (dispatch) {
    return {
        fetchUsers: function () {
            dispatch(fetchUsers()).then(function (response) {
                response.payload.status == 200 ?
                    dispatch(fetchUsersSuccess(response.payload.data.users)) :
                    dispatch(fetchUsersFailure(response.payload))
            });
        }
    }
};

const UserListContainer = connect(mapStateToProps, mapDispatchToProps)(UserList);
export default UserListContainer;