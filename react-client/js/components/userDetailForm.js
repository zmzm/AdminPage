import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {Form, FormGroup, Col, FormControl, Button} from 'react-bootstrap';

function validate(values) {
    const errors = {};

    if (!values.username || values.username.trim() === '') {
        errors.username = 'Enter a user name';
    }
    else if (!/^[a-z][a-z0-9]*?([-.][a-z0-9]+){0,2}$/i.test(values.username)) {
        errors.username = 'Invalid User name';
    }

    if (!values.firstName || values.firstName.trim() === '') {
        errors.firstName = 'Enter First name';
    }
    else if (!/^[a-z]*?([\s-][a-z]+){0,2}$/i.test(values.firstName)) {
        errors.firstName = 'Invalid First name';
    }

    if (!values.lastName || values.lastName.trim() === '') {
        errors.lastName = 'Enter Last name';
    }
    else if (!/^[a-z]{2,20}$/i.test(values.lastName)) {
        errors.lastName = 'Invalid Last name';
    }

    return errors;
}

class UserDetailForm extends Component {
    render() {
        const {fields: {username, firstName, lastName, email}, handleSubmit, invalid} = this.props;
        return (
            <div className="col-lg-5 col-md-5 col-sm-12" style=
                {{backgroundColor:'whitesmoke',
                borderRadius: '8px',
                boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3)'}}>
                <Form horizontal onSubmit={handleSubmit}>
                    <h2 style={{color: "black"}}>Edit user</h2>
                    <FormGroup controlId="formHorizontalUserName">
                        <Col lg={10} lgOffset={1} md={8} mdOffset={2}>
                            <FormControl type="text" placeholder="Username" {...username}/>
                            {username.touched && username.error &&
                            <div style={{color:'red'}}>{username.error}</div>}
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalFirstName">
                        <Col lg={10} lgOffset={1} md={8} mdOffset={2}>
                            <FormControl type="text" placeholder="First name" {...firstName}/>
                            {firstName.touched && firstName.error &&
                            <div style={{color:'red'}}>{firstName.error}</div>}
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalLastName">
                        <Col lg={10} lgOffset={1} md={8} mdOffset={2}>
                            <FormControl type="text" placeholder="Last name" {...lastName}/>
                            {lastName.touched && lastName.error &&
                            <div style={{color:'red'}}>{lastName.error}</div>}
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col lg={10} lgOffset={1} md={8} mdOffset={2}>
                            <FormControl type="email" placeholder="Email" {...email}/>
                            {email.touched && email.error && <div style={{color:'red'}}>{email.error}</div>}
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col lg={10} lgOffset={1}>
                            <Button disabled={invalid} type="submit">
                                Save
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'userDetailForm',
    fields: ['_id', 'username', 'firstName', 'lastName', 'email'],
    validate
})(UserDetailForm);