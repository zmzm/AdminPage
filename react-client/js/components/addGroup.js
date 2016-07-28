import React, {Component} from 'react';
import {Form, FormGroup, Col, FormControl, Button} from 'react-bootstrap';

class AddGroup extends Component {
    render() {
        const {fields: {title, groupName}, handleSubmit, invalid} = this.props;
        return (
            <div className="col-lg-6 col-lg-offset-1 col-md-6 col-md-offset-1 col-sm-12" style=
                {{backgroundColor:'whitesmoke',
                borderRadius: '8px',
                boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3)'}}>
                <Form horizontal onSubmit={handleSubmit(this.props.createGroup.bind(this))}>
                    <h2 style={{color: "black"}}>Add group</h2>
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
                                Add
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}
export default AddGroup;