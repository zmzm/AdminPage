import React, {Component} from 'react';
import User from './user';

class UserList extends Component {
    componentWillMount() {
        this.props.fetchUsers();
    }

    renderUsers(users) {
        return users.map(function (user) {
            return <User key={user._id} user={user}/>
        })
    }

    render() {
        const {users} = this.props;
        return (
            <div>
                <table className="table table-bordered user-table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderUsers(users)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default UserList;