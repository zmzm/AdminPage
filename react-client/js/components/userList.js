import React, {Component} from 'react';
import User from './user';
import {Pagination} from 'react-bootstrap';

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
        const {users, totalCount} = this.props;
        return (
            <div>
                <div style=
                         {{backgroundColor:'white',
                         borderRadius: '8px',
                         boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3)'}}>
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
                <Pagination
                    className={users.length === 0? 'hidden':'shown'}
                    prev
                    next
                    first
                    last
                    ellipsis
                    items={Math.round(totalCount / 5)}
                    activePage={1}
                    onSelect={this.handleSelect}>
                </Pagination>
            </div>
        );
    }
}

export default UserList;