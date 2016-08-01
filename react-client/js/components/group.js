import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

class Group extends Component {
    render() {
        var {group} = this.props;

        return (
            <tr>
                <th scope="row">#</th>
                <td><Link to={"/groups/" + group.groupName}>{group.groupName}</Link></td>
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