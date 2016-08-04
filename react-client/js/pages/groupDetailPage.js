import React, {Component} from 'react';
import GroupDetailContainer from '../containers/groupDetailContainer';

class GroupDetailPage extends Component {
    getChildContext() {
        return {groupName: this.props.routeParams.groupName};
    }

    render() {
        return (
            <div>
                <GroupDetailContainer/>
            </div>
        );
    }
}

GroupDetailPage.childContextTypes = {
    groupName: React.PropTypes.string
};

export default GroupDetailPage;
