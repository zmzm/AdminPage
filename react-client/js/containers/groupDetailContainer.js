import React from 'react';
import {
    fetchGroup,
    fetchGroupSuccess,
    fetchGroupFailure,
    updateGroup,
    updateGroupSuccess,
    updateGroupFailure
} from '../actions/groupActions';
import {connect} from 'react-redux';
import GroupDetail from '../components/groupDetail';

const mapStateToProps = function (state) {
    return {
        group: state.group.group
    }
};

const mapDispatchToProps = function (dispatch) {
    return {
        fetchGroupByName: function (name) {
            dispatch(fetchGroup(name)).then(function (response) {
                response.payload.status == 200 ?
                    dispatch(fetchGroupSuccess(response.payload.data)) :
                    dispatch(fetchGroupFailure(response.payload.response.data))
            })
        },
        updateGroup: function (values) {
            dispatch(updateGroup({group: values})).then(function (response) {
                response.payload.status == 200 ?
                    dispatch(updateGroupSuccess(response.payload.data)) :
                    dispatch(updateGroupFailure(response.payload.response.data))
            })
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetail);