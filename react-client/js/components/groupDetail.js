import React, {Component} from 'react';
import GroupDetailForm from './groupDetailForm';
import User from './user';

class GroupDetail extends Component {
    constructor(props, context) {
        super(props, context);
        this.renderUsers = this.renderUsers.bind(this);
    }

    componentWillMount() {
        this.props.fetchGroupByName(this.context.groupName);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    renderUsers(users) {
        if (users !== undefined) {
            if (users.length > 0) {
                return users.map(function (user) {
                    return <User key={user._id} user={user}/>
                });
            }
            else {
                return <h1>No users!</h1>
            }
        }
    }

    onSubmit(e) {
        this.props.updateGroup(e);
    }

    render() {
        const {group, users, loading} = this.props;

        if (loading) {
            return <div className="container"><h3>Loading...</h3></div>
        }

        return (
            <div>
                <GroupDetailForm
                    initialValues={group}
                    onSubmit={this.onSubmit.bind(this)}
                />
                <div className="col-lg-6 col-lg-offset-1 col-md-6 col-md-offset-1 col-sm-12" style=
                    {{backgroundColor:'whitesmoke',
                    borderRadius: '8px',
                    boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3)'}}>
                    <h2 style={{color: "black"}}>Group users</h2>
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
            </div>
        );
    }
}

GroupDetail.contextTypes = {
    groupName: React.PropTypes.string
};

export default GroupDetail;