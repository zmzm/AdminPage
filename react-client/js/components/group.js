import React, {Component, PropTypes} from 'react';

class Group extends Component {
    render() {
        var {group} = this.props;

        return (
            <tr>
                <th scope="row">#</th>
                <td>{group.groupName}</td>
                <td>{group.title}</td>
            </tr>
        );
    }
}

Group.PropTypes = {
    groupName: PropTypes.string,
    title: PropTypes.string
};

export default Group;