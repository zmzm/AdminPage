import React from 'react';
import {connect} from 'react-redux';
import GroupList from '../components/groupList';
import {fetchGroups, fetchGroupsSuccess, fetchGroupsFailure} from '../actions/groupActions';

const mapStateToProps = function (state) {
    return {
        groups: state.group.groups,
        totalCount: state.group.totalCount
    }
};

const mapDispatchToProps = function (dispatch) {
    return {
        fetchGroups: function (page) {
            dispatch(fetchGroups(page)).then(function (response) {
                response.payload.status == 200 ?
                    dispatch(fetchGroupsSuccess(response.payload.data)) :
                    dispatch(fetchGroupsFailure(response.payload.data))
            });
        }
    }
};

const GroupListContainer = connect(mapStateToProps, mapDispatchToProps)(GroupList);
export default GroupListContainer;