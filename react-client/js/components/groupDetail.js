import React, {Component} from 'react';
import GroupDetailForm from './groupDetailForm';

class GroupDetail extends Component {
    componentWillMount() {
        this.props.fetchGroupByName(this.props.routeParams.groupName)
    }

    onSubmit(e) {
        this.props.updateGroup(e);
    }

    render() {
        const {group} = this.props;
        return (
            <GroupDetailForm
                initialValues={group}
                onSubmit={this.onSubmit.bind(this)}
            />
        );
    }
}

export default GroupDetail;