import React, {Component} from 'react';
import UserDetailForm from './userDetailForm';
import {Form, FormGroup, Col, Button} from 'react-bootstrap';
import Select from 'react-select';

class GroupDetail extends Component {
    componentWillMount() {
        this.props.fetchUserByName(this.props.routeParams.userName)
    }

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
        console.log(value);
        this.typeahead = value.groupName;
    }

    render() {
        const {user} = this.props;
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
            </div>
        );
    }
}

export default GroupDetail;