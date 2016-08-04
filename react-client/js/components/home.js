import React, {Component} from 'react';
import AddUser from '../containers/addUserContainer';
import AddGroup from '../containers/addGroupContainer';

export default class Home extends Component {
    render() {
        return (
            <div>
                <AddUser />
                <AddGroup />
            </div>
        );
    }
}