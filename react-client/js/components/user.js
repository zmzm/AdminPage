import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

class User extends Component {
    render() {
        var {user} = this.props;

        return (
            <tr>
                <th scope="row">#</th>
                <td><Link to={"/users/" + user.username}>{user.username}</Link></td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
            </tr>
        );
    }
}

User.PropTypes = {
    username: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string
};

export default User;