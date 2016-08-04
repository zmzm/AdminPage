import React, {Component} from 'react';
import {Form, FormGroup, Col, FormControl, Button} from 'react-bootstrap';

class AddUser extends Component {
    render() {
        const {fields: {username, firstName, lastName, email}, handleSubmit, invalid} = this.props;
        return (
            <div>
                <div className="col-lg-5 col-md-5 col-sm-12" style=
                    {{backgroundColor:'whitesmoke',
                    borderRadius: '8px',
                    boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3)'}}>
                    <Form horizontal onSubmit={handleSubmit(this.props.createUser.bind(this))}>
                        <h2 style={{color: "black"}}>Add user</h2>
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
                                    Add
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AddUser;