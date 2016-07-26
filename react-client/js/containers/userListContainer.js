import React from 'react';
import {connect} from 'react-redux';
import UserList from '../components/userList';
import {fetchUsers, fetchUsersSuccess, fetchUsersFailure} from '../actions/userActions';

const mapStateToProps = function (state) {
    return {
        users: state.user.users,
        totalCount: state.user.totalCount
    }
};

const mapDispatchToProps = function (dispatch) {
    return {
        fetchUsers: function () {
            dispatch(fetchUsers()).then(function (response) {
                response.payload.status == 200 ?
                    dispatch(fetchUsersSuccess(response.payload.data)) :
                    dispatch(fetchUsersFailure(response.payload))
            });
        }
    }
};

const UserListContainer = connect(mapStateToProps, mapDispatchToProps)(UserList);
export default UserListContainer;