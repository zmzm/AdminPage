import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {Form, FormGroup, Col, FormControl, Button} from 'react-bootstrap';

function validate(values) {
    const errors = {};

    if (!values.groupName || values.groupName.trim() === '') {
        errors.groupName = 'Enter a Group name';
    }
    else if (!/^[a-z][a-z0-9]*?([-.][a-z0-9]+){0,2}$/i.test(values.groupName)) {
        errors.groupName = 'Invalid Group name';
    }

    if (!values.title || values.title.trim() === '') {
        errors.title = 'Enter title';
    }
    else if (!/^[a-z]{2,20}$/i.test(values.title)) {
        errors.title = 'Invalid title';
    }
    return errors;
}

class GroupDetailForm extends Component {
    render() {
        const {fields: {title, groupName}, handleSubmit, invalid} = this.props;
        return (
            <div className="col-lg-6 col-lg-offset-1 col-md-6 col-md-offset-1 col-sm-12" style=
                {{backgroundColor:'whitesmoke',
                borderRadius: '8px',
                boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3)'}}>
                <Form horizontal onSubmit={handleSubmit}>
                    <h2 style={{color: "black"}}>Edit group</h2>
                    <FormGroup controlId="formHorizontalGroupName">
                        <Col lg={10} lgOffset={1} md={8} mdOffset={2}>
                            <FormControl type="text" placeholder="Group name" {...groupName}/>
                            {groupName.touched && groupName.error && <div style={{color:'red'}}>{groupName.error}</div>}
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalTitle">
                        <Col lg={10} lgOffset={1} md={8} mdOffset={2}>
                            <FormControl type="text" placeholder="Title" {...title}/>
                            {title.touched && title.error && <div style={{color:'red'}}>{title.error}</div>}
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
    form: 'groupDetailForm',
    fields: ['_id','groupName', 'title'],
    validate
})(GroupDetailForm);