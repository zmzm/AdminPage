import React, {Component} from 'react';
import UserDetailForm from './userDetailForm';
import Group from './group';
import {Form, FormGroup, Col, Button} from 'react-bootstrap';
import Select from 'react-select';

class UserDetail extends Component {
    componentWillMount() {
        this.props.fetchUserByName(this.props.routeParams.userName)
    }

    componentWillUnmount() {
        this.props.resetMe();
    }

    /*    componentWillReceiveProps(nextProps) {
     if (Object.getOwnPropertyNames(nextProps.user).length !== 0) {
     this.props = nextProps;
     }
     }*/

    onSubmit(e) {
        this.props.updateUser(e);
    }

    searchgroups(value) {
        return fetch('/api/groups/autocomplete/query?q=' + value,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (responseJson) {
                return {options: responseJson.groups};
            });
    }

    onChange(value) {
        this.typeahead = value.groupName;
    }

    renderGroups(groups) {
        if (groups !== undefined) {
            if (groups.length > 0) {
                return groups.map(function (group) {
                    return <Group key={group._id} group={group}/>
                });
            }
            else {
                return <h1>No groups!</h1>
            }
        }
    }

    render() {
        var {user} = this.props;
        console.log(this.props);
        return (
            <div>
                <UserDetailForm
                    initialValues={user}
                    onSubmit={this.onSubmit.bind(this)}
                />
                <div className="col-lg-5 col-lg-offset-1 col-md-6 col-md-offset-1 col-sm-12" style=
                    {{backgroundColor:'whitesmoke',
                    borderRadius: '8px',
                    boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3)'}}>
                    <Form horizontal>
                        <h2 style={{color: "black"}}>Add group</h2>
                        <FormGroup controlId="formHorizontalSelectGroup">
                            <Col lg={10} lgOffset={1} md={8} mdOffset={2}>
                                <Select.Async
                                    name="select"
                                    value={this.typeahead}
                                    valueKey="_id" labelKey="groupName"
                                    onChange={this.onChange.bind(this)}
                                    loadOptions={this.searchgroups.bind(this)}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col lg={10} lgOffset={1}>
                                <Button type="submit">
                                    Save
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
                <div className="col-lg-5 col-lg-offset-1 col-md-6 col-md-offset-1 col-sm-12" style=
                    {{backgroundColor:'whitesmoke',
                    borderRadius: '8px',
                    boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3)',
                    marginTop: '15px'}}>
                    <h2 style={{color: "black"}}>User groups</h2>
                    <table className="table table-bordered user-table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Groupname</th>
                            <th>Title</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderGroups(user.group)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default UserDetail;